"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function ($) {
    'use strict';

    var PLUGIN_NAME = 'jqSchedule';
    var methods = {
        /**
         *
         * @param {string}
         *            str
         * @returns {number}
         */
        calcStringTime: function calcStringTime(str) {
            var slice = str.split(':');
            var h = Number(slice[0]) * 60 * 60;
            var i = Number(slice[1]) * 60;
            return h + i;
        },

        calcStringTimeToMinute: function calcStringTimeToMinute(str) {
            var slice = str.split(':');
            var h = Number(slice[0]) * 60;
            var i = Number(slice[1]);
            return h + i;
        },

        /**
         *
         * @param {number}
         *            val
         * @returns {string}
         */
        formatTime: function formatTime(val) {
            var i1 = val % 3600;
            var h = '' + Math.floor(val / 36000) + Math.floor(val / 3600 % 10);
            var i = '' + Math.floor(i1 / 600) + Math.floor(i1 / 60 % 10);
            return h + ':' + i;
        },

        /**
         *
         * @param {number}
         *            val
         * @returns {string}
         */
        formatTime2: function formatTime2(val) {
            var h = '' + Math.floor(val / 600) + Math.floor(val / 60 % 10);
            var i_number = val - (parseInt(h) * 60);
            var i = '';
            if (i_number < 10) {
                i = '0' + i_number;
            } else {
                i = '' + i_number;
            }
            return h + ':' + i;
        },

        openAddTab: function openAddTab(id) {
            let tablinks = document.getElementsByClassName("add_tab_links");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(id).className += " active";
        },

        /**
         * save setting
         *
         * @param {Options}
         *            data
         * @returns {*}
         */
        _saveSettingData: function _saveSettingData(data) {
            return this.data(PLUGIN_NAME + 'Setting', data);
        },

        /**
         * load setting
         *
         * @returns Options
         */
        _loadSettingData: function _loadSettingData() {
            return this.data(PLUGIN_NAME + 'Setting');
        },

        /**
         * save data
         *
         * @param {SaveData}
         *            data
         * @returns {*}
         */
        _saveData: function _saveData(data) {
            var d = $.extend({
                tableStartTime: 0,
                tableEndTime: 0,
                schedule: [],
                timeline: []
            }, data);
            return this.data(PLUGIN_NAME, d);
        },

        /**
         * load data
         *
         * @returns SaveData
         */
        _loadData: function _loadData() {
            return this.data(PLUGIN_NAME);
        },

        /**
         * get all data schedule
         *
         * @returns ScheduleData[]
         */
        scheduleData: function scheduleData() {
            var $this = $(this);

            var saveData = methods._loadData.apply($this);

            if (saveData) {
                return saveData.schedule;
            }

            return [];
        },

        setDataMoney: function setDataMoney(scheduleOneDay, timeline, modeDialog) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);

            let indexRow = timeline;
            if (setting.modeCompare && modeDialog) {
                indexRow = (timeline - 1) / 2;
            }

            let nightSurcharge = formatTime2(methods.getTimeNightSurchargeByMinute(scheduleOneDay));
            $('#night-surcharge-time-' + indexRow).text(nightSurcharge);
        },

        /**
         * set data approve after change task
         *
         * @param dataApprove
         * @param timeline
         * @param modeDialog
         */
        setDataApprove: function setDataApprove(dataApprove, timeline, modeDialog = false) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            if (setting.screenId === 'CR3010') {
                methods._setDataApproveCR3010.apply($this, [dataApprove, timeline, modeDialog]);
            }
            if (setting.screenId === 'CR3020') {
                methods._setDataApproveCR3020.apply($this, [dataApprove]);
            }
        },

        /**
         * Set data approve when approve all at screen CR3010
         *
         * @param dataApprove
         * @param timeline
         * @returns {*}
         * @private
         */
        setDataApproveAllCR3010: function setDataApproveAllCR3010(dataApprove) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);

            for (let i = 0; i < dataApprove.length; i++) {
                let dataA = dataApprove[i];
                for (const property in dataA) {
                    if (dataA[property] === null || dataA[property] === undefined) {
                        dataA[property] = '0';
                    }
                }
                let index = i + 1;
                setting.listDataApprove[index] = dataA;
            }

            for (let i = 1; i < setting.listDataApprove.length; i++) {
                // setting time in approve menu
                methods._setDataApproveForOneRow.apply($this, [i, setting.listDataApprove[i]]);
            }

            methods._saveSettingData.apply($this, setting);
        },

        /**
         * Remove all schedule in one line by user code
         *
         * @param usrCode
         */
        removeScheduleByUsrCode: function removeScheduleByUsrCode(usrCode) {
            var $this = $(this);
            methods._removeScheduleByUsrCode.apply($this, [usrCode]);
        },

        /**
         * Remove all schedule in one line by work date
         *
         * @param workDate
         */
        removeScheduleByWorkDate: function removeScheduleByWorkDate(workDate) {
            var $this = $(this);
            methods._removeScheduleByWorkDate.apply($this, [workDate]);
        },

        /**
         * Remove all schedule in one line
         *
         * @param wordId
         */
        removeScheduleByWorkId: function removeScheduleByWorkId(wordId) {
            var $this = $(this);
            methods._removeScheduleByWorkId.apply($this, [wordId]);
        },

        /**
         * Get data focus
         *
         * @returns {*}
         */
        getDataFocus: function getDataFocus() {
            var $this = $(this);
            var setting = methods._loadSettingData.apply($this);
            return setting.dataFocus;
        },

        /**
         * Get mode delete
         *
         * @returns {*}
         */
        getDeleteMode: function getDeleteMode() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            return setting.deleteMode;
        },

        /**
         * Get mode need approve or not
         *
         * @returns {*}
         */
        getIsAlwaysEnableFlag: function getIsAlwaysEnableFlag() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            return setting.isAlwaysEnableFlag;
        },

        /**
         * get timelineData
         *
         * @returns {any[]}
         */
        timelineData: function timelineData() {
            var $this = $(this);

            var saveData = methods._loadData.apply($this);

            var data = [];
            var i;

            for (i in saveData.timeline) {
                data[i] = saveData.timeline[i];
                data[i].schedule = [];
            }

            for (i in saveData.schedule) {
                var d = saveData.schedule[i];

                if (typeof d.timeline === 'undefined') {
                    continue;
                }

                if (typeof data[d.timeline] === 'undefined') {
                    continue;
                }

                data[d.timeline].schedule.push(d);
            }

            return data;
        },

        /**
         * reset data
         */
        resetData: function resetData() {
            return this.each(function () {
                var $this = $(this);

                var saveData = methods._loadData.apply($this);

                saveData.schedule = [];

                methods._saveData.apply($this, [saveData]);

                $this.find('.sc_bar').remove();

                for (var i in saveData.timeline) {
                    saveData.timeline[i].schedule = [];

                    methods._resizeRow.apply($this, [i, 0]);
                }

                methods._saveData.apply($this, [saveData]);
            });
        },

        getRowDisable: function getRowDisable(timeline) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            if (setting.isAlwaysEnableFlag) {
                return false;
            } else {
                return setting.listDisableTask[timeline];
            }
        },

        changeContainmentDrag: function changeContainmentDrag(flag) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let saveData = methods._loadData.apply($this);
            let $scBar = $('.sc_bar');
            let $barList = $this.find('.sc_bar');
            let listDisableScBar = [];
            for (let i = 0; i < $barList.length; i++) {
                let $bar = $($barList[i]);
                let scKey = $bar.data('sc_key');
                if (scKey !== undefined) {
                    listDisableScBar.push(methods.getDisableAttributeOfScBar.apply($this, [scKey]));
                } else {
                    listDisableScBar.push(true);
                }
            }

            if (flag === 0) {

                $scBar.draggable({
                    containment: $this.find('#schedule'),
                    helper: 'clone',
                    axis: 'x',
                    disable: false,
                    appendTo: '#schedule',
                    zIndex: 600,

                    start: function start(event, ui) {
                        $(ui.helper).css({ top: ui.position.top + 'px' });
                        $(ui.helper).css({ left: ui.position.left + 'px' });
                        $(this).hide();
                        $this.find('.sc_main_box').css('overflow-x', 'hidden');
                        $this.find('.sc_main_box').css('overflow-y', 'hidden');
                        $(ui.helper).css('cursor', 'grabbing');
                        $(ui.helper).css('border', '4px solid black');
                    },

                    drag: function drag(event, ui) {
                        $(ui.helper).css('cursor', 'grabbing');
                        $(ui.helper).css('border', '4px solid black');
                    },

                    stop: function stop(event, ui) {
                        $(ui.helper).css('border', 'none');
                        $(ui.helper).css('cursor', 'pointer');
                        let $n = $(this);
                        let scKey = $n.data('sc_key');
                        let currentLocationTask = ui.position.left + ui.helper[0].clientWidth;
                        let positionOfMenuDelete = window.innerWidth - 250;
                        let timeline = saveData.schedule[scKey].timeline;

                        $this.find('.sc_main_box').css('overflow-x', 'auto');
                        $this.find('.sc_main_box').css('overflow-y', 'auto');

                        if (setting.deleteMode === 1 && currentLocationTask >= positionOfMenuDelete) {
                            let data_delete = saveData.schedule[scKey].data;
                            methods._removeScheduleByWorkId.apply($this, [data_delete.work_id]);

                            let indexRow = timeline;
                            if (setting.modeCompare) {
                                indexRow = (timeline - 1) / 2;
                            }

                            if (setting.onDeleteSchedule) {
                                setting.onDeleteSchedule.apply($this, [data_delete, indexRow]);
                            }
                        } else {
                            $(this).show();
                        }
                    }
                });

                $scBar.resizable({});
                $scBar.resizable('disable');

            } else {

                let currentNode = null;
                $scBar.draggable({
                    grid: [setting.widthTimeX, 1],
                    containment: $this.find('.sc_main'),
                    helper: 'original',
                    axis: "x",
                    start: function start(event, ui) {
                        let node = {};
                        node.node = this;
                        node.offsetTop = ui.position.top;
                        node.offsetLeft = ui.position.left;
                        node.currentTop = ui.position.top;
                        node.currentLeft = ui.position.left;
                        node.timeline = methods._getTimeLineNumber.apply($this, [currentNode, ui.position.top]);
                        node.nowTimeline = node.timeline;
                        currentNode = node;

                        $(this).css('cursor', 'grabbing');
                        $(this).css("z-index", 200);
                        $(this).css('border', '4px solid black');
                    },

                    drag: function drag(event, ui) {
                        $(this).data('dragCheck', true);
                        $(this).css('cursor', 'grabbing');
                        $(this).css('border', '4px solid black');

                        if (!currentNode) {
                            return false;
                        }

                        let $moveNode = $(this);
                        let scKey = $moveNode.data('sc_key');

                        let timelineNum = methods._getTimeLineNumber.apply($this, [currentNode, ui.position.top]);

                        ui.position.left = Math.floor(ui.position.left / setting.widthTimeX) * setting.widthTimeX;

                        if (currentNode.nowTimeline !== timelineNum) {
                            currentNode.nowTimeline = timelineNum;
                        }

                        currentNode.currentTop = ui.position.top;
                        currentNode.currentLeft = ui.position.left;

                        methods._rewriteBarText.apply($this, [$moveNode, saveData.schedule[scKey]]);

                        let $n = $(this);
                        let x = Math.round($n.position().left);

                        let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;
                        let end = start + (saveData.schedule[scKey].endTime - saveData.schedule[scKey].startTime);
                        let realStart = methods.formatTime(start);
                        let realEnd = methods.formatTime(end);
                        let taskName = saveData.schedule[scKey].text;

                        setting.hoverOnTask = true;
                        setting.dataTaskHover = [realStart, realEnd, taskName];

                        return true;
                    },

                    stop: function stop(event) {

                        $(this).data('dragCheck', false);
                        $(this).css('cursor', 'pointer');
                        $(this).css("z-index", 10);
                        $(this).css('border', 'none');

                        currentNode = null;
                        let $n = $(this);
                        let scKey = $n.data('sc_key');
                        let x = Math.round($n.position().left);

                        setting.hoverOnTask = false;
                        setting.dataTaskHover = null;

                        let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;

                        let end = start + (saveData.schedule[scKey].endTime - saveData.schedule[scKey].startTime);
                        saveData.schedule[scKey].start = methods.formatTime(start);
                        saveData.schedule[scKey].end = methods.formatTime(end);
                        saveData.schedule[scKey].startTime = start;
                        saveData.schedule[scKey].endTime = end;

                        if (setting.onChange) {
                            setting.onChange.apply($this, [$n, saveData.schedule[scKey]]);
                        }
                    }
                });

                $scBar.resizable({});
                if (setting.isAlwaysEnableFlag && !setting.modeCompare) {
                    $scBar.resizable('enable');
                } else {
                    let $barList = $this.find('.sc_bar');
                    for (let i = 0; i < $barList.length; i++) {
                        let $bar = $($barList[i]);
                        if (!listDisableScBar[i]) {
                            $bar.resizable('enable');
                        } else {
                            $bar.resizable('disable');
                        }
                    }
                }

            }
        },

        getDisableAttributeOfScBar: function getDisableAttributeOfScBar(scKey) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let saveData = methods._loadData.apply($this);
            let workId = saveData.schedule[scKey].data.work_id;
            let timeline = 0;
            let index = 0;
            if (setting.screenId === 'CR3010') {
                index = 1;
            }
            for (let i = index; i < saveData.timeline.length; i++) {
                let dataScheduleInRow = saveData.timeline[i].schedule;
                for (let j = 0; j < dataScheduleInRow.length; j++) {
                    if (dataScheduleInRow[j].data.work_id === workId) {
                        timeline = i;
                        break;
                    }
                }
            }

            if (setting.modeCompare) {
                if (timeline % 2 !== 1) {
                    return true;
                } else {
                    timeline = (timeline - 1) / 2;
                    if (setting.isAlwaysEnableFlag) {
                        return false;
                    }
                }
            }
            return setting.listDisableTask[timeline];
        },

        /**
         * turn on delete mode
         *
         * @returns {*}
         */
        turnOnDeleteMode: function turnOnDeleteMode() {
            return this.each(function () {
                var $this = $(this);
                var setting = methods._loadSettingData.apply($this);
                setting.deleteMode = 1;
                methods.changeContainmentDrag.apply($this, [0]);
                methods._saveSettingData.apply($this, setting);
            });
        },

        setInWorkFlag: function setInWorkFlag(flag) {
            return this.each(function () {
                var $this = $(this);
                var setting = methods._loadSettingData.apply($this);
                setting.inWorkFlag = flag;
            });
        },

        getInWorkFlag: function getInWorkFlag() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            return setting.inWorkFlag;
        },

        setMsgInWork: function setMsgInWork(msg) {
            return this.each(function () {
                var $this = $(this);
                var setting = methods._loadSettingData.apply($this);
                setting.msgInWork = msg;
            });
        },

        setMsgInWorkTitle: function setMsgInWorkTitle(msg) {
            return this.each(function () {
                var $this = $(this);
                var setting = methods._loadSettingData.apply($this);
                setting.msgInWorkTitle = msg;
            });
        },

        /**
         * turn off delete mode
         *
         * @returns {*}
         */
        turnOffDeleteMode: function turnOffDeleteMode() {
            return this.each(function () {
                var $this = $(this);
                var setting = methods._loadSettingData.apply($this);
                setting.deleteMode = null;
                methods.changeContainmentDrag.apply($this, [1]);
                methods._saveSettingData.apply($this, setting);
            });
        },

        /**
         * add schedule data
         *
         * @param {number}
         *            timeline
         * @param {object}
         *            data
         * @returns {methods}
         */
        addSchedule: function addSchedule(timeline, data) {
            return this.each(function () {
                var $this = $(this);
                var d = {
                    start: data.start,
                    end: data.end,
                    real_start: data.real_start,
                    real_end: data.real_end,
                    startTime: methods.calcStringTime(data.start),
                    endTime: methods.calcStringTime(data.end),
                    text: data.text,
                    color: data.color,
                    background: data.background,
                    timeline: timeline
                };

                if (data.data) {
                    d.data = data.data;
                }

                methods._addScheduleData.apply($this, [timeline, d]);

                methods._resetBarPosition.apply($this, [timeline]);
            });
        },

        /**
         * add schedule data
         *
         * @param {number}
         *            timeline
         * @param {object}
         *            data
         * @returns {methods}
         */
        addRow: function addRow(timeline, data) {
            return this.each(function () {
                var $this = $(this);

                methods._addRow.apply($this, [timeline, data]);
            });
        },

        /**
         * clear row
         *
         * @returns {methods}
         */
        resetRowData: function resetRowData() {
            return this.each(function () {
                var $this = $(this);

                var data = methods._loadData.apply($this);

                data.schedule = [];
                data.timeline = [];

                methods._saveData.apply($this, [data]);

                $this.find('.sc_bar').remove();
                $this.find('.timeline').remove();
                $this.find('.sc_data').height(0);
            });
        },

        /**
         * clear row
         *
         * @param {object}
         *            data
         * @returns {methods}
         */
        setRows: function setRows(data) {
            return this.each(function () {
                var $this = $(this);
                methods.resetRowData.apply($this, []);

                for (var timeline in data) {
                    methods.addRow.apply($this, [timeline, data[timeline]]);
                }
            });
        },

        /**
         * switch draggable
         *
         * @param {boolean}
         *            enable
         */
        setDraggable: function setDraggable(enable) {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                if (enable !== setting.draggable) {
                    setting.draggable = enable;

                    methods._saveSettingData.apply($this, setting);

                    if (enable) {
                        $this.find('.sc_bar').draggable('enable');
                    } else {
                        $this.find('.sc_bar').draggable('disable');
                    }
                }
            });
        },

        /**
         * switch resizable
         *
         * @param {boolean}
         *            enable
         */
        setResizable: function setResizable(enable) {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                if (enable !== setting.resizable) {
                    setting.resizable = enable;

                    methods._saveSettingData.apply($this, setting);

                    if (enable) {
                        $this.find('.sc_bar').resizable('enable');
                    } else {
                        $this.find('.sc_bar').resizable('disable');
                    }
                }
            });
        },

        /**
         * get time line, get row
         *
         * @param node
         * @param top
         * @returns {number}
         */
        _getTimeLineNumber: function _getTimeLineNumber(node, top) {
            var $this = $(this);

            var setting = methods._loadSettingData.apply($this);

            var num = 0;
            var n = 0;
            var tn = Math.ceil(top / (setting.timeLineY + setting.timeLinePaddingTop + setting.timeLinePaddingBottom));

            for (var i in setting.rows) {
                var r = setting.rows[i];
                var tr = 0;

                if (_typeof(r.schedule) === 'object') {
                    tr = r.schedule.length;
                }

                if (node && node.timeline) {
                    tr++;
                }

                n += Math.max(tr, 1);

                if (n >= tn) {
                    break;
                }

                num++;
            }

            return num;
        },

        /**
         * add schedule Bg data
         *
         * @param {ScheduleData}
         *            data
         */
        _addScheduleBgData: function _addScheduleBgData(data) {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                var saveData = methods._loadData.apply($this);

                var st = Math.ceil((data.startTime - saveData.tableStartTime) / setting.widthTime);
                var et = Math.floor((data.endTime - saveData.tableStartTime) / setting.widthTime);
                var $bar = $('<div class="sc_bgBar"><span class="text"></span></div>');

                $bar.css({
                    left: st * setting.widthTimeX,
                    top: 0,
                    width: (et - st) * setting.widthTimeX,
                    height: 72
                });

                if (data.text) {
                    $bar.find('.text').text(data.text);
                    if (setting.modeCompare) {
                        $bar.find('.text').css('margin-top', '-17px');
                    }
                }

                if (data.color) {
                    $bar.css('color',data.color);
                }

                $bar.css('margin-top',5);
                $bar.css('border-radius',5);

                if (data.background) {
                    $bar.css('background-color',data.background);
                    //$bar.css('opacity',0.7);
                    $bar.css('opacity',1);
                }

                if (data.class) {
                    $bar.addClass(data.class);
                } // $element.find('.sc_main').append($bar);


                $this.find('.sc_main .timeline').eq(data.timeline).append($bar);
            });
        },

        _setDisableMutipleRow: function _setDisableMutipleRow(listTimeline, id, val) {
            let $this = $(this);
            let saveData = methods._loadData.apply($this);
            let setting = methods._loadSettingData.apply($this);
            let indexDelete = [];

            let column;
            if (id === 'cnkApprove1Id_') {
                column = 'SHIP_BORD_APP_FLG';
            } else {
                column = 'LABOR_MANAG_APP_FLG';
            }

            let listData = [];
            for (let t = 0; t < listTimeline.length; t++) {
                let timeline = listTimeline[t];
                let indexRow = timeline;
                if (setting.modeCompare) {
                    indexRow = timeline * 2 + 1;
                }

                let aloUid = saveData.timeline[indexRow].alo_uid;

                if (setting.screenId === 'CR3010') {
                    let usrCode = saveData.timeline[indexRow].usr_code;
                    listData.push({usrCode: usrCode, aloUid: aloUid});
                }

                if (setting.screenId === 'CR3020') {
                    let workDate = saveData.timeline[indexRow].work_date;
                    listData.push({workDate: workDate, aloUid: aloUid});
                }
            }

            let isUpdateSuccess = false;
            let dataExcept = [];
            if (setting.onApproveAllSchedule) {
                let dataReturn = setting.onApproveAllSchedule.apply($this, [listData, column, val]);
                isUpdateSuccess = dataReturn.flg;
                dataExcept = dataReturn.dataExcept;
            }

            if (!isUpdateSuccess) {
                return false;
            }

            for (let t = 0; t < listTimeline.length; t++) {

                let timeline = listTimeline[t];
                if (dataExcept.length > 0) {
                    if (dataExcept.includes(timeline)) {
                        continue;
                    }
                    if (setting.screenId === 'CR3020') {
                        if (dataExcept.includes(timeline - 1)) {
                            continue;
                        }
                    }
                }

                // Check or uncheck each check box
                let check = false;
                if (val === '1') {
                    check = true;
                } else {
                    check = false;
                }
                $('#' + id + timeline).prop('checked', check);

                let indexRow = timeline;
                if (setting.modeCompare) {
                    indexRow = timeline * 2 + 1;
                }

                for (let i = 0; i < saveData.schedule.length; i++) {
                    if (saveData.schedule[i].timeline.toString() === indexRow.toString()) {
                        indexDelete.push(i);
                    }
                }

                let list;
                if (id === 'cnkApprove1Id_') {
                    list = setting.listDisableApprove1;
                } else {
                    list = setting.listDisableApprove2;
                }

                if (val === '1' && list[timeline] === '0') {
                    methods._addApproveDisplay.apply($this, [timeline.toString(), id]);
                    list[timeline] = '1';
                }
                if (val === '0' && list[timeline] === '1') {
                    methods._removeApproveDisplay.apply($this, [timeline.toString(), id]);
                    list[timeline] = '0';
                }

                setting.listDisableTask[timeline] = methods._getRowDisable(setting.approveLevel, setting.listDisableApprove1[timeline], setting.listDisableApprove2[timeline]);
                if (setting.isAlwaysEnableFlag) {
                    setting.listDisableTask[timeline] = false;
                }
                let $barList = $this.find('.sc_bar');

                for (let i = 0; i < indexDelete.length; i++) {
                    for (let j = 0; j < $barList.length; j++) {
                        let $bar = $($barList[j]);
                        if ($bar.data('sc_key') === indexDelete[i]) {
                            if (setting.listDisableTask[timeline]) {
                                $bar.draggable('disable');
                                $bar.resizable('disable');
                            } else {
                                $bar.draggable('enable');
                                $bar.resizable('enable');
                            }
                        }
                    }
                }

                methods._saveSettingData.apply($this, setting);
            }

            return true;
        },

        /**
         * Set schedule in a row disable
         *
         * @param timeline
         * @param action
         * @param id
         * @returns {*}
         * @private
         */
        _setDisableByUsr: function _setDisableByUsr(timeline, id, val) {
            return this.each(function () {
                let $this = $(this);
                let saveData = methods._loadData.apply($this);
                let setting = methods._loadSettingData.apply($this);
                let indexDelete = [];

                let indexRow = timeline;
                if (setting.modeCompare) {
                    indexRow = timeline * 2 + 1;
                }
                let usrCode = saveData.timeline[indexRow].usr_code;
                let aloUid = saveData.timeline[indexRow].alo_uid;

                for (let i = 0; i < saveData.schedule.length; i++) {
                    if (saveData.schedule[i].timeline.toString() === indexRow.toString()) {
                        indexDelete.push(i);
                    }
                }

                setting.listDisableTask[timeline] = methods._getRowDisable(setting.approveLevel, setting.listDisableApprove1[timeline], setting.listDisableApprove2[timeline]);
                if (setting.isAlwaysEnableFlag) {
                    setting.listDisableTask[timeline] = false;
                }

                let $barList = $this.find('.sc_bar');
                let $cmbCompensatory = $('#cmbCompensatory_' + timeline);
                let $cmbHoliday = $('#cmbHoliday_' + timeline);

                if (setting.listDisableTask[timeline]) {
                    $cmbCompensatory.prop('disabled', true);
                    $cmbHoliday.prop('disabled', true);
                } else {
                    $cmbCompensatory.prop('disabled', false);
                    $cmbHoliday.prop('disabled', false);
                }

                for (let i = 0; i < indexDelete.length; i++) {
                    for (let j = 0; j < $barList.length; j++) {
                        let $bar = $($barList[j]);
                        if ($bar.data('sc_key') === indexDelete[i]) {
                            if (setting.listDisableTask[timeline]) {
                                $bar.draggable('disable');
                                $bar.resizable('disable');
                                $cmbCompensatory.prop('disabled', true);
                                $cmbHoliday.prop('disabled', true);
                            } else {
                                $bar.draggable('enable');
                                $bar.resizable('enable');
                                $cmbCompensatory.prop('disabled', false);
                                $cmbHoliday.prop('disabled', false);
                            }
                        }
                    }
                }

                if (val === '0') {
                    methods._removeApproveDisplay.apply($this, [timeline.toString(), id]);
                } else {
                    methods._addApproveDisplay.apply($this, [timeline.toString(), id]);
                }

                methods._saveSettingData.apply($this, setting);

                let column = '';
                if (id === 'cnkApprove1Id_') {
                    column = 'SHIP_BORD_APP_FLG';
                } else {
                    column = 'LABOR_MANAG_APP_FLG';
                }

                if (setting.onApproveSchedule) {
                    if (setting.screenId === 'CR3010') {
                        setting.onApproveSchedule.apply($this, [usrCode, aloUid, column, val]);
                    }
                    if (setting.screenId === 'CR3020') {
                        setting.onApproveSchedule.apply($this, [usrCode, aloUid, column, val, indexRow]);
                    }
                }
            });
        },

        /**
         * Remove approve display
         *
         * @param timeline
         * @param id
         * @returns {*}
         * @private
         */
        _removeApproveDisplay: function _removeApproveDisplay(timeline, id) {
            return this.each(function () {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);

                let top = (timeline - 1 ) * 83 + 25;
                if (setting.screenId === 'CR3020') {
                    top = timeline * 83 + 10;
                }

                let clsAp1 = 'approve-label-1';
                if (setting.modeCompare) {
                    clsAp1 = 'approve-label-mode-compare-1';
                }

                let $header = $('#mask_color_header_'+ timeline);
                let $row = $('#mask_color_'+ timeline);
                let $approve = $('#approve_'+ timeline);

                if (id === 'cnkApprove1Id_') {

                    if (setting.listDisableApprove2[timeline] === '0') {

                        $header.children(":first").remove();
                        $header.replaceWith($header.children(":last"));
                        $row.replaceWith($row.children(":last"));
                        $approve.removeClass('mask_color_1');

                    }

                } else if (id === 'cnkApprove2Id_') {

                    if (setting.listDisableApprove1[timeline] === '0') {

                        $header.children(":first").remove();
                        $header.replaceWith($('#mask_color_header_'+ timeline).children(":last"));
                        $row.replaceWith($row.children(":last"));
                        $approve.removeClass('mask_color_2');

                    } else {

                        $header.children(":first").replaceWith('<span style="top: ' + top +'px;" class="'+ clsAp1 +'" >打刻締</span>');
                        $header.removeClass('mask_color_2').addClass('mask_color_1');
                        $row.removeClass('mask_color_2').addClass('mask_color_1');
                        $approve.removeClass('mask_color_2').addClass('mask_color_1');
                    }
                }
            });
        },

        /**
         * Add approve display
         *
         * @param timeline
         * @param id
         * @returns {*}
         * @private
         */
        _addApproveDisplay: function _addApproveDisplay(timeline, id) {
            return this.each(function () {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);

                let top = (timeline - 1 ) * 83 + 25;
                if (setting.screenId === 'CR3020') {
                    top = timeline * 83 + 10;
                }

                let clsAp1 = 'approve-label-1';
                let clsAp2 = 'approve-label-2';
                let indexRow = timeline;
                if (setting.modeCompare) {
                    indexRow = timeline * 2 + 1;
                    clsAp1 = 'approve-label-mode-compare-1';
                    clsAp2 = 'approve-label-mode-compare-2';
                }

                let $header = $this.find('.sc_data_scroll .timeline').eq(indexRow);
                let $row = $this.find('.sc_main .timeline').eq(indexRow);
                let $approve = $('#approve_'+ timeline);

                if (id === 'cnkApprove1Id_') {

                    if (setting.listDisableApprove2[timeline] === '0') {
                        $header.wrap('<div id ="mask_color_header_' + timeline + '" class="mask_color_1"></div>');
                        $row.wrap('<div id ="mask_color_' + timeline + '" class="mask_color_1"></div>');
                        $approve.addClass('mask_color_1');

                        let $header1 = $('#mask_color_header_'+ timeline);
                        $header1.prepend('<span style="top: ' + top +'px;" class="'+ clsAp1 +'" >打刻締</span>');
                    }

                } else if (id === 'cnkApprove2Id_') {

                    if (setting.listDisableApprove1[timeline] === '0') {

                        $header.wrap('<div id ="mask_color_header_' + timeline + '" class="mask_color_2"></div>');
                        $row.wrap('<div id ="mask_color_' + timeline + '" class="mask_color_2"></div>');
                        $approve.addClass('mask_color_2');

                        let $header1 = $('#mask_color_header_'+ timeline);
                        $header1.prepend('<span style="top: ' + top +'px;" class="'+ clsAp2 +'" >承認済</span>');

                    } else {

                        let $header1 = $('#mask_color_header_'+ timeline);
                        let $row1 = $('#mask_color_'+ timeline);
                        $approve.removeClass('mask_color_1').addClass('mask_color_2');

                        $header1.children(":first").replaceWith('<span style="top: ' + top +'px;" class="'+ clsAp2 +'" >承認済</span>');
                        $header1.removeClass('mask_color_1').addClass('mask_color_2');
                        $row1.removeClass('mask_color_1').addClass('mask_color_2');
                    }
                }
            });
        },

        /**
         * Set time in data approve
         *
         * @param dataApprove
         * @param timeline
         * @returns {*}
         * @private
         */
        _setDataApproveCR3010: function _setDataApproveCR3010(dataApprove, timeline, modeDialog) {
            return this.each(function () {
                let $this = $(this);

                let setting = methods._loadSettingData.apply($this);

                let indexRow = timeline;
                if (setting.modeCompare && modeDialog) {
                    indexRow = (timeline - 1) / 2;
                }

                setting.listDataApprove[indexRow] = dataApprove;

                let indexInRows = indexRow;
                if (setting.modeCompare) {
                    indexInRows = indexRow * 2 + 1;
                }
                setting.rows[indexInRows].data_approve = dataApprove;

                // setting time in approve menu
                methods._setDataApproveForOneRow.apply($this, [indexRow, dataApprove]);

                methods._saveSettingData.apply($this, setting);

            });
        },

        /**
         * Set time in data approve
         *
         * @param dataApprove
         * @param timeline
         * @returns {*}
         * @private
         */
        _setDataApproveCR3020: function _setDataApproveCR3020(dataApprove) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            setting.listDataApprove = [];

            for (let i = 0; i < dataApprove.length; i++) {
                let dataA = dataApprove[i];
                for (const property in dataA) {
                    if (dataA[property] === null || dataA[property] === undefined) {
                        dataA[property] = '0';
                    }
                }
                setting.listDataApprove.push(dataA);
            }

            for (let i = 0; i < setting.listDataApprove.length; i++) {
                let indexInRows = i;
                if (setting.modeCompare) {
                    indexInRows = i * 2 + 1;
                }
                setting.rows[indexInRows].data_approve = setting.listDataApprove[i];
                // setting time in approve menu
                methods._setDataApproveForOneRow.apply($this, [i, setting.listDataApprove[i]]);
            }

            methods._saveSettingData.apply($this, setting);

            methods._setDataRowTotalApproveMenu.apply($this, []);
        },

        _setDataApproveForOneRow: function _setDataApproveForOneRow(indexRow, dataApprove) {

            let workTime = methods.formatTime2(dataApprove.work_time);
            let overTimeWork = methods.formatTime2(dataApprove.overtime_work);
            let comHolidayWork = methods.formatTime2(dataApprove.com_holiday_work);
            let safeTempWork = methods.formatTime2(dataApprove.safe_temp_work);
            let restTime = methods.formatTime2(dataApprove.rest_time);
            let splitMaxRestTime = methods.formatTime2(dataApprove.split_max_rest_time);
            let compensatoryTimeCmb = dataApprove.compensatory_time !== "0" ? dataApprove.compensatory_time : '';
            let holidayTimeCmb = dataApprove.holiday_time !== "0" ? dataApprove.holiday_time : '';
            let restRefTime = dataApprove.rest_ref_time;

            $('#work-time-' + indexRow).text(workTime);
            $('#overtime-work-' + indexRow).text(overTimeWork);
            $('#holiday-work-time-' + indexRow).text(comHolidayWork);
            $('#safe-temp-work-' + indexRow).text(safeTempWork);
            $('#rest-time-' + indexRow).text(restTime);
            $('#split-max-rest-time-' + indexRow).text(splitMaxRestTime);
            $('#cmbCompensatory_' + indexRow).val(compensatoryTimeCmb);
            $('#cmbHoliday_' + indexRow).val(holidayTimeCmb);
            $('#rest-ref-time-picker-' + indexRow).val(restRefTime);

            $('#hours-per-hour-' + indexRow).text(dataApprove.hours_per_hour);

            let listAlert = dataApprove.alert;
            let numOfAlert = dataApprove.num_alert;
            methods.setCssForAlert(indexRow, listAlert, numOfAlert);
        },

        /**
         * Calculate data total and setting it display
         *
         * @private
         */
        _setDataRowTotalApproveMenu: function _setDataRowTotalApproveMenu() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let dataApprove = setting.listDataApprove;

            let totalWorkTime = 0;
            let totalOverTime = 0;
            let totalRestTime = 0;
            let totalNumAlert = 0;

            for (let i = 0; i < dataApprove.length; i++) {

                // work time, overtime, rest time get from database
                let w = dataApprove[i].work_time;
                let o = dataApprove[i].overtime_work;
                let r = dataApprove[i].rest_time;
                let n = 0;
                if (dataApprove[i].num_alert) {
                    n = dataApprove[i].num_alert;
                }

                totalWorkTime += parseInt(w);
                totalOverTime += parseInt(o);
                totalRestTime += parseInt(r);
                totalNumAlert += parseInt(n);
            }

            let index = dataApprove.length;
            $($this.find('#work-time-' + index)[0]).text(methods.formatTime2(totalWorkTime));
            $($this.find('#overtime-work-' + index)[0]).text(methods.formatTime2(totalOverTime));
            $($this.find('#rest-time-' + index)[0]).text(methods.formatTime2(totalRestTime));
            $($this.find('#number-alert-' + index)[0]).text(totalNumAlert + '件');
        },

        /**
         * Remove all schedule in a row by work date
         *
         * @param workDate
         * @returns {*}
         * @private
         */
        _removeScheduleByWorkDate: function _removeScheduleByWorkDate(workDate) {
            return this.each(function () {
                let $this = $(this);
                let indexDelete = [];
                let setting = methods._loadSettingData.apply($this);
                let saveData = methods._loadData.apply($this);

                for (let i = saveData.schedule.length - 1; i >= 0 ; i--) {
                    if (setting.modeCompare) {
                        let dataTask = saveData.schedule[i].data;

                        if (dataTask.isDataPlan) {
                        } else {
                            if (dataTask.work_date === workDate) {
                                saveData.schedule.splice(i, 1);
                                indexDelete.push(i);
                            }
                        }

                    } else {
                        if (saveData.schedule[i].data.work_date === workDate) {
                            saveData.schedule.splice(i, 1);
                            indexDelete.push(i);
                        }
                    }
                }

                for (let i = 0; i < indexDelete.length; i++) {
                    for (let j = 0; j < $this.find('.sc_bar').length; j++) {
                        if ($($this.find('.sc_bar')[j]).data('sc_key') === indexDelete[i]) {
                            $this.find('.sc_bar')[j].remove();
                        }
                    }
                }

                for (let i = 0; i < saveData.timeline.length; i++) {
                    for (let j = saveData.timeline[i].schedule.length - 1; j >0 ; j--) {
                        if (saveData.timeline[i].schedule[j].data.work_date === workDate) {
                            saveData.timeline[i].schedule.splice(j, 1);
                        }
                    }
                }

                methods._saveData.apply($this, [saveData]);

                var $barList = $this.find('.sc_bar');

                for (let j = 0; j < $barList.length; j++) {
                    var $bar = $($barList[j]);
                    var sc_key = $bar.data('sc_key');
                    var num = 0;
                    for (let i = 0; i < indexDelete.length; i++) {
                        if (sc_key > indexDelete[i]) {
                            num++;
                        }
                    }
                    $bar.data('sc_key', sc_key - num);
                }
            });
        },

        /**
         * Remove all schedule in a row by user code
         *
         * @param usr_code
         * @returns {*}
         * @private
         */
        _removeScheduleByUsrCode: function _removeScheduleByUsrCode(usr_code) {
            return this.each(function () {
                let $this = $(this);
                let indexDelete = [];
                let setting = methods._loadSettingData.apply($this);
                let saveData = methods._loadData.apply($this);

                for (let i = saveData.schedule.length - 1; i >= 0 ; i--) {
                    if (setting.modeCompare) {
                        let dataTask = saveData.schedule[i].data;

                        if (dataTask.isDataPlan) {
                        } else {
                            if (dataTask.usr_code === usr_code) {
                                saveData.schedule.splice(i, 1);
                                indexDelete.push(i);
                            }
                        }

                    } else {
                        if (saveData.schedule[i].data.usr_code === usr_code) {
                            saveData.schedule.splice(i, 1);
                            indexDelete.push(i);
                        }
                    }
                }

                for (let i = 0; i < indexDelete.length; i++) {
                    for (let j = 0; j < $this.find('.sc_bar').length; j++) {
                        if ($($this.find('.sc_bar')[j]).data('sc_key') === indexDelete[i]) {
                            $this.find('.sc_bar')[j].remove();
                        }
                    }
                }

                for (let i = 0; i < saveData.timeline.length; i++) {
                    for (let j = saveData.timeline[i].schedule.length - 1; j >0 ; j--) {
                        if (saveData.timeline[i].schedule[j].data.usr_code === usr_code) {
                            saveData.timeline[i].schedule.splice(j, 1);
                        }
                    }
                }

                methods._saveData.apply($this, [saveData]);

                var $barList = $this.find('.sc_bar');

                for (let j = 0; j < $barList.length; j++) {
                    var $bar = $($barList[j]);
                    var sc_key = $bar.data('sc_key');
                    var num = 0;
                    for (let i = 0; i < indexDelete.length; i++) {
                        if (sc_key > indexDelete[i]) {
                            num++;
                        }
                    }
                    $bar.data('sc_key', sc_key - num);
                }
            });
        },

        /**
         * Remove one schedule by work_id
         *
         * @param work_id
         * @returns {*}
         * @private
         */
        _removeScheduleByWorkId: function _removeScheduleByWorkId(work_id) {
            return this.each(function () {
                let $this = $(this);
                let indexDelete = '';
                let saveData = methods._loadData.apply($this);

                for (let i = 0; i < saveData.schedule.length; i++) {
                    if (saveData.schedule[i].data.work_id === work_id) {
                        saveData.schedule.splice(i, 1);
                        indexDelete = i;
                        break;
                    }
                }

                let n = $this.find('.sc_bar').length;
                for (let i = 0; i < n; i++) {
                    if ($($this.find('.sc_bar')[i]).data('sc_key') === indexDelete) {
                        $this.find('.sc_bar')[i].remove();
                        break;
                    }
                }

                let n1 = $this.find('.sc_bar').length;
                $this.find('.sc_bar')[n1 - 1].remove();

                for (let i = 0; i < saveData.timeline.length; i++) {
                    for (let j = 0; j < saveData.timeline[i].schedule.length; j++) {
                        if (saveData.timeline[i].schedule[j].data.work_id === work_id) {
                            saveData.timeline[i].schedule.splice(j, 1);
                            break;
                        }
                    }
                }
                methods._saveData.apply($this, [saveData]);

                let $barList = $this.find('.sc_bar');

                for (let i = 0; i < $barList.length; i++) {
                    let $bar = $($barList[i]);
                    let sc_key = $bar.data('sc_key');
                    if ( sc_key > indexDelete) {
                        $bar.data('sc_key', sc_key - 1);
                    }
                }
            });
        },

        _addRenderButtonAddCR3010: function _addRenderButtonAddCR3010(listTypeTask) {
            let $this = $(this);
            let listType = $this.find('#list_type_task');
            for (let i = 0; i < listTypeTask.length; i++) {
                let task = '<div class="button-in-sidebar" style="background-color:';
                task += listTypeTask[i]['BACK_COLOR'] + '; color:'+ listTypeTask[i]['FORE_COLOR'];
                task += ';" id="' + '_code_' + listTypeTask[i]['TASK_CODE'] + '">' + listTypeTask[i]['TASK_NAME_S'] + '</div>';
                listType.append(task);
            }
        },

        _addRenderButtonAddCR3020: function _addRenderButtonAddCR3020(listTypeTask) {
            let $this = $(this);
            let contentAdd = $this.find('#body-data-add');
            let n = listTypeTask.length;
            let marginTop;
            if (n % 2 === 0) {
                marginTop = (n / 2) * 20;
            } else {
                marginTop = ((n + 1) / 2) * 20;
            }
            contentAdd.css('margin-top', marginTop + 'px');
            for (let i = 0; i < n; i++) {
                let list = listTypeTask[i].list_type_task;
                let vesselCode = listTypeTask[i].vessel_code;
                let tabContent = '<ul style="display: none;" id="tab_content_' + listTypeTask[i].vessel_code + '" class="ul-in-sidebar">'
                for (let j = 0; j < list.length; j++) {
                    let task = '<div class="button-in-sidebar" style="background-color:';
                    task += list[j]['BACK_COLOR'] + '; color:'+ list[j]['FORE_COLOR'];
                    task += ';" id="' + vesselCode + '_code_' + list[j]['TASK_CODE'] + '">' + list[j]['TASK_NAME_S'] + '</div>';
                    tabContent += task;
                }
                tabContent += '</ul>';
                contentAdd.append(tabContent);
            }
        },

        /**
         * Setting task in ADD sidebar
         *
         * @returns {*}
         * @private
         */
        _addTypeTask: function _addTypeTask() {
            return this.each(function() {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);
                let saveData = methods._loadData.apply($this);
                let listTypeTask = setting.listTypeTask;

                if (listTypeTask !== null) {

                    if (setting.screenId === 'CR3010') {
                        methods._addRenderButtonAddCR3010.apply($this, [listTypeTask]);
                    } else if (setting.screenId === 'CR3020') {
                        methods._addRenderButtonAddCR3020.apply($this, [listTypeTask]);
                    }

                    let $node = $this.find('.button-in-sidebar');
                    let height = '72px';
                    if (setting.modeCompare) {
                        height = '30px';
                    }
                    $node.draggable({

                        containment: $this.find('#schedule'),
                        helper: 'clone',
                        cursorAt: { top:10, left: 10 },
                        disable: false,
                        appendTo: '#schedule',

                        start: function start(event, ui) {
                            $(ui.helper).width('45px');
                            $(ui.helper).height(height);
                            $(ui.helper).css('z-index', 300);
                            $(ui.helper).css('cursor', 'grabbing');
                        },

                        drag: function drag(event, ui) {
                            $(ui.helper).css('cursor', 'grabbing');
                        },

                        stop: function stop(event, ui) {
                            $(ui.helper).css('cursor', 'default');
                            let sc_main = document.getElementsByClassName("sc_main");
                            let leftBorder = sc_main[0].offsetLeft;
                            let topBorder = sc_main[0].offsetTop;
                            let widthArea = sc_main[0].offsetWidth;
                            let heightArea = sc_main[0].offsetHeight;

                            let sc_main_box = document.getElementsByClassName("sc_main_box");
                            let topMain = sc_main_box[0].offsetTop;
                            let heightMain = sc_main_box[0].offsetHeight;

                            let xPos = event.pageX;
                            let yPos = event.pageY;

                            if (xPos >= leftBorder && xPos <= (widthArea +leftBorder) && yPos <= (topMain + heightMain)) {

                                let x = xPos - leftBorder + Math.floor(setting.scrollLeft);
                                let y = yPos - topBorder + Math.floor(setting.scrollTop);

                                if (setting.screenId === 'CR3010' && y > 0 && y < heightArea) {
                                    let heightOfLine = 82;
                                    if (setting.modeCompare) {
                                        heightOfLine = 83;
                                    }
                                    let timeline = Math.floor(y / heightOfLine) + 1;
                                    if (setting.isAlwaysEnableFlag) {
                                        setting.listDisableTask[timeline] = false;
                                    }
                                    let isAddTask = methods._checkIsAddTask(setting, y, heightOfLine);
                                    if (timeline > 0 && setting.listDisableTask[timeline] === false && isAddTask) {
                                        let data = methods.creatDataTypeTask(saveData, setting, x, ui, timeline, methods.cutStringToGetID(this.id));
                                        if (setting.onAddTask) {
                                            setting.onAddTask.apply($this, [timeline, data]);
                                        }
                                    }
                                }

                                if (setting.screenId === 'CR3020' && y > 0 && y < heightArea) {
                                    let heightOfLine = 82;
                                    if (setting.modeCompare) {
                                        heightOfLine = 83;
                                    }
                                    let timeline = Math.floor(y / heightOfLine);
                                    let isAddTask = methods._checkIsAddTask(setting, y, heightOfLine);
                                    if (timeline < setting.listDisableTask.length && isAddTask) {
                                        let vesselCodeOfTab = $this.find('.add_tab_links.active').attr('id').replace('tab_link_', '');
                                        let vesselCodeTimeline = methods.getVesselCodeByTimeLine.apply($this, [setting, timeline]);
                                        if (setting.isAlwaysEnableFlag) {
                                            setting.listDisableTask[timeline] = false;
                                        }
                                        if (setting.listDisableTask[timeline] === false && vesselCodeOfTab === vesselCodeTimeline) {
                                            let data = methods.creatDataTypeTask(saveData, setting, x, ui, timeline, methods.cutStringToGetID(this.id));
                                            if (setting.onAddTask) {
                                                setting.onAddTask.apply($this, [timeline, data]);
                                            }
                                        }
                                    }
                                }

                            }
                            $(ui.helper).remove();
                        }
                    });

                    $node.click(function () {
                        let $n = $(this);
                        if (setting.taskTypeChoose === null) {
                            setting.taskTypeChoose = methods.settingChooseTask($n.attr('id'), $n[0].innerText, $n.css('color'), $n.css('background-color'));
                            $(this).css('border', '3px solid black');
                        } else {
                            if (setting.taskTypeChoose.taskId === $n.attr('id')) {
                                setting.taskTypeChoose = null;
                                $(this).css('border', 'none');
                            } else {
                                let $jq = $('#' + setting.taskTypeChoose.taskId);
                                $jq.css('border', 'none');
                                setting.taskTypeChoose = methods.settingChooseTask($n.attr('id'), $n[0].innerText, $n.css('color'), $n.css('background-color'));
                                $(this).css('border', '3px solid black');
                            }
                        }
                    });
                }
            });
        },

        settingChooseTask: function settingChooseTask(id, name, color, background) {
            let taskTypeChoose = {};
            taskTypeChoose.taskId = id;
            taskTypeChoose.taskName = name;
            taskTypeChoose.color = color;
            taskTypeChoose.background = background;
            return taskTypeChoose;
        },

        _checkIsAddTask: function _checkIsAddTask(setting, posY, heightOfLine) {
            if (setting.modeCompare) {
                if (posY % heightOfLine < 40) {
                    return false;
                }
            }
            return true;
        },

        getVesselCodeByTimeLine: function getVesselCodeByTimeLine(setting, timeline) {
            let $this = $(this);
            let saveData = methods._loadData.apply($this);
            if (setting.modeCompare) {
                timeline = timeline * 2 + 1;
            }
            let vesselCode = saveData.timeline[timeline].vessel_code;
            return vesselCode;
        },

        /**
         *
         * @param saveData
         * @param setting
         * @param x
         * @param ui
         * @returns {{}}
         */
        creatDataTypeTask: function creatDataTypeTask(saveData, setting, x, ui, timeline, taskCode) {
            let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;
            let end = start + 3600;

            let data = {};
            data.startTime = start;
            data.endTime = end;
            data.start = methods.formatTime(start);
            data.end = methods.formatTime(end);

            data.text = $(ui.helper).text();
            data.color = $(ui.helper).css("color");
            data.background = $(ui.helper).css("background");
            data.timeline = timeline;
            data.taskCode = taskCode;
            return data;
        },

        /**
         * add schedule
         *
         * @param timeline
         * @param {ScheduleData}
         *            d
         * @returns {number}
         */
        _addScheduleData: function _addScheduleData(timeline, d) {
            var data = d;
            data.startTime = data.startTime ? data.startTime : methods.calcStringTime(data.start);
            data.endTime = data.endTime ? data.endTime : methods.calcStringTime(data.end);
            return this.each(function () {
                let $this = $(this);

                let setting = methods._loadSettingData.apply($this);

                let saveData = methods._loadData.apply($this);

                let barHtml = '<div class="sc_bar"><span class="head"></span><span class="text"></span></div>';

                let st = Math.ceil((data.startTime - saveData.tableStartTime) / setting.widthTime);
                let et = Math.floor((data.endTime - saveData.tableStartTime) / setting.widthTime);
                let $bar = $(barHtml);
                let stext = methods.formatTime(data.startTime);
                let etext = methods.formatTime(data.endTime);

                if (stext === etext) {
                    return 0;
                }

                let snum = methods._getScheduleCount.apply($this, [data.timeline]);

                let heightBar = 72;
                if (setting.modeCompare) {
                    if (setting.screenId === 'CR3020' ||
                        (setting.screenId === 'CR3010' && timeline !== 1)) {
                        heightBar = 30;
                    }
                }

                $bar.css({
                    left: st * setting.widthTimeX,
                    top: snum * setting.timeLineY + setting.timeLinePaddingTop,
                    width: (et - st) * setting.widthTimeX,
                    height: heightBar
                });
                $bar.find('.time').text(stext + '-' + etext);

                if (data.text) {
                    $bar.find('.text').text(data.text);
                    if (setting.modeCompare) {
                        $bar.find('.text').css('margin-top', '-17px');
                    }
                }

                if (data.color) {
                    $bar.css('color',data.color);
                }

                $bar.css('margin-top',5);
                $bar.css('border-radius',5);

                if (data.background) {
                    $bar.css('background-color',data.background);
                    $bar.css('opacity',1);
                } else {
                    $bar.css('background-color', 'black');
                }

                if (data.class) {
                    $bar.addClass(data.class);
                }

                var $row = $this.find('.sc_main .timeline').eq(timeline);
                $row.append($bar);

                saveData.schedule.push(data);

                methods._saveData.apply($this, [saveData]);


                if (setting.onAppendSchedule) {
                    setting.onAppendSchedule.apply($this, [$bar, data]);
                }

                var key = saveData.schedule.length - 1;
                $bar.data('sc_key', key);
                $bar.on('mouseup', function () {
                    // �R�[���o�b�N���Z�b�g����Ă�����ďo
                    if (setting.onClick) {
                        if ($(this).data('dragCheck') !== true && $(this).data('resizeCheck') !== true) {
                            var $n = $(this);
                            var scKey = $n.data('sc_key');
                            setting.onClick.apply($this, [$n, saveData.schedule[scKey]]);
                        }
                    }
                });

                var $node = $this.find('.sc_main .timeline').eq(timeline).find('.sc_bar');
                var currentNode = null; // move node.

                $node.draggable({
                    grid: [setting.widthTimeX, 1],
                    containment: $this.find('.sc_main'),
                    helper: 'original',
                    create: function(event, ui) {
                        if (setting.modeCompare) {
                            if (timeline % 2 === 0) {
                                $node.attr('style', function(i,s) { return (s || '') + 'cursor: default !important;' });
                            }
                        }
                    },
                    axis: "x",
                    start: function start(event, ui) {
                        var node = {};
                        node.node = this;
                        node.offsetTop = ui.position.top;
                        node.offsetLeft = ui.position.left;
                        node.currentTop = ui.position.top;
                        node.currentLeft = ui.position.left;
                        node.timeline = methods._getTimeLineNumber.apply($this, [currentNode, ui.position.top]);
                        node.nowTimeline = node.timeline;
                        currentNode = node;
                        var setting = methods._loadSettingData.apply($this);
                        $(this).css('cursor', 'grabbing');
                        if (setting.deleteMode === 1) {
                            $(this).css("z-index", 310);
                            $this.find('.sc_main_box').css('overflow-x', 'hidden');
                            $this.find('.sc_main_box').css('overflow-y', 'hidden');
                        } else {
                            $(this).css("z-index", 200);
                        }
                        $(this).css('border', '4px solid black');
                    },

                    /**
                     *
                     * @param {Event}
                     *            event
                     * @param {function}
                     *            ui
                     * @returns {boolean}
                     */
                    drag: function drag(event, ui) {
                        $(this).data('dragCheck', true);
                        $(this).css('cursor', 'grabbing');
                        $(this).css('border', '4px solid black');

                        if (!currentNode) {
                            return false;
                        }

                        var $moveNode = $(this);
                        var scKey = $moveNode.data('sc_key');

                        var timelineNum = methods._getTimeLineNumber.apply($this, [currentNode, ui.position.top]);


                        ui.position.left = Math.floor(ui.position.left / setting.widthTimeX) * setting.widthTimeX;

                        if (currentNode.nowTimeline !== timelineNum) {
                            currentNode.nowTimeline = timelineNum;
                        }

                        currentNode.currentTop = ui.position.top;
                        currentNode.currentLeft = ui.position.left;

                        methods._rewriteBarText.apply($this, [$moveNode, saveData.schedule[scKey]]);

                        let $n = $(this);
                        let x = Math.round($n.position().left);

                        let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;
                        let end = start + (saveData.schedule[scKey].endTime - saveData.schedule[scKey].startTime);
                        let realStart = methods.formatTime(start);
                        let realEnd = methods.formatTime(end);
                        let taskName = saveData.schedule[scKey].text;

                        setting.hoverOnTask = true;
                        setting.dataTaskHover = [realStart, realEnd, taskName];

                        return true;
                    },

                    stop: function stop(event, ui) {

                        $(this).data('dragCheck', false);
                        $(this).css('cursor', 'pointer');
                        $(this).css('border', 'none');
                        currentNode = null;
                        let $n = $(this);
                        let scKey = $n.data('sc_key');
                        let x = Math.round($n.position().left);

                        let currentLocationTask = ui.position.left + ui.helper[0].clientWidth;
                        let positionOfMenuDelete = window.innerWidth - 250;
                        let setting = methods._loadSettingData.apply($this);
                        let timeline = saveData.schedule[scKey].timeline;

                        setting.hoverOnTask = false;
                        setting.dataTaskHover = null;

                        if (setting.deleteMode === 1 && currentLocationTask >= positionOfMenuDelete) {
                            var data_delete = saveData.schedule[scKey].data;
                            methods._removeScheduleByWorkId.apply($this, [data_delete.work_id]);

                            $this.find('.sc_main_box').css('overflow-x', 'auto');
                            $this.find('.sc_main_box').css('overflow-y', 'auto');

                            let indexRow = timeline;
                            if (setting.modeCompare) {
                                indexRow = (timeline - 1) / 2;
                            }

                            if (setting.onDeleteSchedule) {
                                setting.onDeleteSchedule.apply($this, [data_delete, indexRow]);
                            }
                        } else {
                            $(this).css("z-index", 10);
                            $this.find('.sc_main_box').css('overflow-x', 'auto');
                            $this.find('.sc_main_box').css('overflow-y', 'auto');

                            var start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;

                            var end = start + (saveData.schedule[scKey].endTime - saveData.schedule[scKey].startTime);
                            saveData.schedule[scKey].start = methods.formatTime(start);
                            saveData.schedule[scKey].end = methods.formatTime(end);
                            saveData.schedule[scKey].startTime = start;
                            saveData.schedule[scKey].endTime = end;

                            if (setting.onChange) {
                                setting.onChange.apply($this, [$n, saveData.schedule[scKey]]);
                            }
                        }
                    }
                });
                var resizableHandles = ['e'];

                if (setting.resizableLeft) {
                    resizableHandles.push('w');
                }

                let posLeft;
                let isResize = false;
                let widthR;
                $node.resizable({
                    handles: resizableHandles.join(','),
                    create: function(event, ui) {
                        if (setting.modeCompare) {
                            if (timeline % 2 === 0) {
                                $node.find(".ui-resizable-e").css("cursor","default");
                                $node.find(".ui-resizable-w").css("cursor","default");
                            }
                        }
                    },
                    grid: [setting.widthTimeX, setting.timeLineY - setting.timeBorder],
                    minWidth: setting.widthTimeX,
                    containment: $this.find('.sc_main_scroll'),
                    start: function start() {
                        var $n = $(this);
                        $n.data('resizeCheck', true);
                        $(this).css("z-index", 200);
                        $(this).css('border', '4px solid black');
                        $('.ui-resizable-handle').css('opacity', '0');

                        // position of the left edge of the task
                        posLeft = $n.position().left;
                        widthR = Math.round($n.outerWidth());
                    },

                    resize: function resize(ev, ui) {

                        let height = 64;
                        if (setting.modeCompare) {
                            height = 22;
                        }
                        ui.element.height(height);
                        ui.element.width(ui.size.offsetWidth);
                        ui.element.css('top', '0');

                        let $n = $(this);
                        let x = Math.round($n.position().left);
                        let w = Math.round(ui.size.width);
                        let scKey = $n.data('sc_key');

                        // check if the start time of the task has changed or the end time of the task has changed
                        let isChangeStart;
                        if (posLeft === $n.position().left) {
                            isChangeStart = false;
                        } else {
                            isResize = true;
                            isChangeStart = true;
                        }

                        let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;
                        let end = saveData.tableStartTime + Math.floor((x + w) / setting.widthTimeX) * setting.widthTime;
                        let startT = methods.formatTime(start);
                        let endT = methods.formatTime(end);
                        let taskName = saveData.schedule[scKey].text;

                        // if the end time of the task has changed
                        if (isChangeStart) {
                            endT = saveData.schedule[scKey].real_end;

                            // if the start time of the task has changed
                        } else {
                            if (isResize) {
                                endT = saveData.schedule[scKey].real_end;
                            } else {
                                startT = saveData.schedule[scKey].real_start;
                                if (widthR === w) {
                                    endT = saveData.schedule[scKey].real_end;
                                }
                            }
                        }

                        // Change data tooltip when resize
                        setting.isResizing = true;
                        setting.dataResize = [startT, endT, taskName];
                        $(this).css('border', '4px solid black');
                    },

                    stop: function stop() {
                        let $n = $(this);
                        $(this).css("z-index", 10);
                        $(this).css('border', 'none');
                        let scKey = $n.data('sc_key');
                        let x = Math.round($n.position().left);
                        let w = Math.round($n.outerWidth());

                        // check if the start time of the task has changed or the end time of the task has changed
                        let isChangeStart;
                        if (posLeft === $n.position().left) {
                            isChangeStart = false;
                        } else {
                            isChangeStart = true;
                        }

                        setting.isResizing = false;
                        setting.dataResize = null;

                        let start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;
                        let end = saveData.tableStartTime + Math.floor((x + w) / setting.widthTimeX) * setting.widthTime;
                        if (end > 86400) {
                            end = 86400;
                        }
                        let timelineNum = saveData.schedule[scKey].timeline;
                        saveData.schedule[scKey].start = methods.formatTime(start);
                        saveData.schedule[scKey].end = methods.formatTime(end);
                        saveData.schedule[scKey].startTime = start;
                        saveData.schedule[scKey].endTime = end;

                        // if the end time of the task has changed
                        if (isChangeStart) {
                            saveData.schedule[scKey].end = saveData.schedule[scKey].real_end;

                        // if the start time of the task has changed
                        } else {
                            if (isResize) {
                                saveData.schedule[scKey].end = saveData.schedule[scKey].real_end;
                            } else {
                                saveData.schedule[scKey].start = saveData.schedule[scKey].real_start;

                                if (widthR === w) {
                                    saveData.schedule[scKey].end = saveData.schedule[scKey].real_end;
                                }
                            }
                        }

                        methods._resetBarPosition.apply($this, [timelineNum]);

                        methods._rewriteBarText.apply($this, [$n, saveData.schedule[scKey]]);

                        $n.data('resizeCheck', false);

                        if (setting.onChange) {
                            setting.onChange.apply($this, [$n, saveData.schedule[scKey]]);
                        }
                    }
                });

                $node.dblclick(function() {

                    let $n = $(this);
                    let scKey = $n.data('sc_key');
                    let saveDataCur = methods._loadData.apply($this);
                    let dataNode = saveDataCur.schedule[scKey];
                    let schedule = $("#schedule").timeSchedule('timelineData');

                    let indexRow = timeline;
                    if (setting.modeCompare && timeline % 2 === 0) {
                        return;
                    }

                    let workDate = schedule[indexRow].work_date;
                    let vesselCode = schedule[indexRow].vessel_code;
                    let isUpdate = '0';

                    dataNode.work_date = workDate;
                    dataNode.vessel_code = vesselCode;

                    if (setting.onUpdateDialog) {

                        let iD = indexRow;
                        if (setting.modeCompare) {
                            iD = (indexRow - 1) / 2;
                        }

                        // Mode not use approve to add, update, delete task
                        if (setting.isAlwaysEnableFlag) {
                            isUpdate = '1';

                        // Mode use approve to add, update, delete task
                        } else {

                            // Row is approve
                            if(setting.listDisableTask[iD] === false) {

                                // Side-bar delete is open
                                if (setting.deleteMode) {

                                    // Enable button delete in dialog
                                    isUpdate = '2';

                                // Side-bar delete is close
                                } else {

                                    // Enable button delete and button update in dialog
                                    isUpdate = '1';
                                }

                            // Row is not approve
                            } else {

                                // Disable button delete and button update in dialog
                                isUpdate = '0';
                            }
                        }

                        if (!methods._checkCrewIsInCompany(setting.rows[indexRow])) {
                            isUpdate = '2';
                        }

                        dataNode.is_update = isUpdate;
                        setting.onUpdateDialog.apply($this, [dataNode]);
                    }
                });

                $node.hover(function () {
                    let $n = $(this);
                    let scKey = $n.data('sc_key');
                    let d = saveData.schedule[scKey];
                    setting.hoverOnTask = true;
                    setting.dataTaskHover = [d.real_start, d.real_end, d.text];
                }, function () {
                    setting.hoverOnTask = false;
                    setting.dataTaskHover = null;
                });

                let $edgeResize = $node.find('.ui-resizable-handle');
                let flagBorder = false;
                $edgeResize.mousedown(function(){
                    if (!$(this).parent().hasClass('ui-resizable-disabled')) {
                        $(this).parent().css('border-top', '4px solid black');
                        $(this).parent().css('border-bottom', '4px solid black');
                        $(this).parent().find('.ui-resizable-handle').css('background-color', 'black');
                        $(this).parent().find('.ui-resizable-handle').css('opacity', '1');
                        flagBorder = true;
                    }
                }).mouseup(function(){
                    if (flagBorder) {
                        $(this).parent().css('border-top', 'none');
                        $(this).parent().css('border-bottom', 'none');
                        $(this).parent().find('.ui-resizable-handle').css('opacity', '0');
                        flagBorder = false;
                    }
                });

                if (!setting.isAlwaysEnableFlag) {
                    methods._setDisableDragResizeWhenAddTask.apply($this, [setting, $node, timeline]);
                } else {
                    // Disable task in first row CR3010
                    if (setting.screenId === 'CR3010' && timeline === 0) {
                        $node.draggable('disable');
                        $node.resizable('disable');
                    }
                }

                // Comment to enable
                if (setting.modeCompare) {
                    if (timeline % 2 !== 1) {
                        $node.draggable('disable');
                        $node.resizable('disable');
                    }
                }

                return key;
            });
        },

        /**
         *
         * @param setting
         * @param $node
         * @param timeline
         * @private
         */
        _setDisableDragResizeWhenAddTask: function _setDisableDragResizeWhenAddTask(setting, $node, timeline) {

            if (setting.modeCompare) {
                timeline = (timeline - 1) / 2;
            }

            if (setting.draggable === false || setting.listDisableTask[timeline] === true) {
                $node.draggable('disable');
            } else if (setting.screenId === 'CR3010' && timeline === 0) {
                $node.draggable('disable');
            }

            if (setting.resizable === false || setting.listDisableTask[timeline] === true) {
                $node.resizable('disable');
            } else if (setting.screenId === 'CR3010' && timeline === 0) {
                $node.resizable('disable');
            }
        },

        /**
         *
         *
         * @param {number}
         *            n row number
         * @returns {number}
         */
        _getScheduleCount: function _getScheduleCount(n) {
            var $this = $(this);

            var saveData = methods._loadData.apply($this);

            var num = 0;

            for (var i in saveData.schedule) {
                if (saveData.schedule[i].timeline === n) {
                    num++;
                }
            }

            return num;
        },

        /**
         * Get row disable or enable
         *
         * @param approveLevel
         * @param shipBord
         * @param laborManag
         * @returns {boolean}
         * @private
         */
        _getRowDisable: function _getRowDisable(approveLevel, shipBord, laborManag) {
            let res = false;
            switch(approveLevel) {
                case 0:
                    if (laborManag === '1' || shipBord === '1') {
                        res = true;
                    }
                    break;
                case 1:
                    if (laborManag === '1') {
                        res = true;
                    } else if (shipBord === '0') {
                        res = true;
                    }
                    break;
                case 2:
                    if (laborManag === '0') {
                        res = true;
                    }
                    break;
            }
            return res;
        },

        _checkCrewIsInCompany: function _checkCrewIsInCompany(row) {
            let stringHeader = row.title;
            let pos = stringHeader.search("disabled");
            return pos === -1;
        },

        /**
         * add rows
         *
         * @param timeline
         * @param row
         */
        _addRow: function _addRow(timeline, row) {
            return this.each(function () {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);
                let saveData = methods._loadData.apply($this);

                let id = $this.find('.sc_main .timeline').length;
                let html;
                html = '';

                // Setting title contain name, position, date,...

                // Hidden first row at screen CR3010
                if ((timeline === '0'|| (timeline === '1' && setting.modeCompare)) && setting.screenId === 'CR3010') {
                    html += '<div class="timeline" style="display: none"></div>';
                } else {
                    html += '<div class="timeline"></div>';
                }
                let $data = $(html);

                if (row.title) {
                    if (setting.screenId === 'CR3010') {
                        $data.append('<span class="timeline-title">' + row.title + '</span>');
                    } else if (setting.screenId === 'CR3020') {
                        $data.append('<span class="crewline-title">' + row.title + '</span>');
                    }

                    if (setting.modeCompare) {
                        if (setting.screenId === 'CR3010') {
                            $data.append('<span class="headerCR3010-mode-compare-1">' + '予' + '</span>');
                            $data.append('<span class="headerCR3010-mode-compare-2">' + '実' + '</span>');
                        } else if (setting.screenId === 'CR3020') {
                            $data.append('<span class="headerCR3020-mode-compare-1">' + '予' + '</span>');
                            $data.append('<span class="headerCR3020-mode-compare-2">' + '実' + '</span>');
                        }

                    }
                }

                if (row.subtitle) {
                    $data.append('<span class="timeline-subtitle">' + row.subtitle + '</span>');
                }

                // Setting color for title, red if approve 2, blue if approve 1
                methods.addTitleAtInit.apply($this, [setting, $data, timeline]);

                html = '';
                // In case mode normal, hidden first row data
                // In case mode compare, hidden first two rows data
                if ((timeline === '0'|| (timeline === '1' && setting.modeCompare)) && setting.screenId === 'CR3010') {
                    html += '<div class="timeline" style="display: none"></div>';
                } else {
                    html += '<div class="timeline"></div>';
                }
                let $timeline = $(html);
                let $numberOfCol = 0;
                let $numberOfCol_2 = 1;

                for (let t = saveData.tableStartTime; t < saveData.tableEndTime; t += setting.widthTime) {
                    let $tl = $('<div class="tl"></div>');

                    let numOfTimeline = parseInt(timeline);
                    if (setting.modeCompare && numOfTimeline % 2 === 0) {
                        $tl.css('background-color', '#f0f0f0');
                    } else {
                        if ($numberOfCol % 2 === 0) {
                        } else {
                            $tl.css('background-color', '#f7fafe');
                        }
                    }

                    if ($numberOfCol_2 % 4 === 0) {
                        $tl.css('border-right', 'solid 0.01em #ccc');
                    } else {
                    }

                    $tl.outerWidth(setting.widthTimeX);
                    $tl.data('time', methods.formatTime(t));
                    $tl.data('timeline', timeline);
                    $timeline.append($tl);
                    $numberOfCol += 1;
                    $numberOfCol_2 += 1;
                }

                let isDoubleClick = false;
                $timeline.find('.tl').on('dblclick', function () {
                    isDoubleClick = true;
                    let indexRow = timeline;
                    if (setting.modeCompare) {
                        indexRow = (timeline - 1) / 2;
                    }

                    if (setting.isAlwaysEnableFlag) {
                        setting.listDisableTask[indexRow] = false;
                    }

                    if (methods._checkCrewIsInCompany(row)) {
                        if (!setting.deleteMode) {
                            if (setting.onScheduleDoubleClick && setting.listDisableTask[indexRow] === false) {
                                if (setting.modeCompare && timeline % 2 !== 1) {

                                } else {
                                    let taskId = '';
                                    if(setting.taskTypeChoose) {
                                        taskId = methods.cutStringToGetID(setting.taskTypeChoose.taskId);
                                    }
                                    setting.onScheduleDoubleClick.apply($this, [$(this).data('time'), $(this).data('timeline'), taskId]);
                                }
                            }
                        }
                    }

                });

                let addModeByDragMouse = false;
                let positionHoldMouse = 0;
                let start = 0;
                let $jqTl = null;
                $timeline.find('.tl').mousedown(function(event) {
                    let $n = $(this);
                    $jqTl = $n;

                    let isRowEnable = true;
                    if (setting.modeCompare) {
                        if (timeline % 2 === 0) {
                            isRowEnable = false;
                        }
                    }

                    if (setting.screenId === 'CR3020') {
                        let vesselCodeRow = setting.rows[timeline].vessel_code;
                        if (vesselCodeRow !== "" && setting.taskTypeChoose) {
                            let vesselCodeTask = methods.cutStringToGetVesselCode(setting.taskTypeChoose.taskId);
                            if (vesselCodeTask !== vesselCodeRow) {
                                isRowEnable = false;
                            }
                        } else {
                            isRowEnable = false;
                        }
                    }

                    if (setting.deleteMode) {
                        isRowEnable = false;
                    }

                    $n.mouseleave(function() {
                        if (setting.taskTypeChoose && !addModeByDragMouse && isRowEnable && !isDoubleClick) {

                            $timeline.css('cursor', 'e-resize');

                            positionHoldMouse = $n[0].offsetLeft;
                            let mouseCur = event.pageX - 215;

                            addModeByDragMouse = true;
                            start = saveData.tableStartTime + Math.floor(mouseCur / setting.widthTimeX) * setting.widthTime;
                            let classText = 'text';
                            if (setting.modeCompare) {
                                classText = 'text-drag-add';
                            }

                            let barHtml = '<div id="task_add_by_drag" class="sc_bar"><span class="head"></span><span class="' + classText + '">' +
                                setting.taskTypeChoose.taskName + '</span></div>';
                            let $bar = $(barHtml);

                            let heightL = 72;
                            if (setting.modeCompare) {
                                heightL = 30;
                            }

                            $bar.css({
                                left: $n[0].offsetLeft,
                                top: $n[0].offsetTop + setting.timeLinePaddingTop,
                                width: setting.widthTimeX,
                                height: heightL
                            });

                            $bar.css('margin-top',5);
                            $bar.css('border-radius',5);
                            $bar.css('color', setting.taskTypeChoose.color);
                            $bar.css('background-color', setting.taskTypeChoose.background);

                            let $row = $this.find('.sc_main .timeline').eq(timeline);
                            $row.append($bar);
                        }
                    });
                });

                let $scheduleElement = $('#schedule');
                $scheduleElement.mousemove(function(event) {
                    if (addModeByDragMouse && setting.taskTypeChoose) {
                        let mouseCur = event.pageX - 215;
                        let $barDrag = $('#task_add_by_drag');
                        let w = mouseCur - positionHoldMouse;

                        if (w >= 0) {
                            let end = saveData.tableStartTime + Math.floor(mouseCur / setting.widthTimeX) * setting.widthTime;
                            if (end <= 86400) {
                                let width = Math.floor(w / setting.widthTimeX) * setting.widthTimeX;
                                $barDrag.css('width', width + 'px');
                            } else {
                                if (addModeByDragMouse && setting.taskTypeChoose) {
                                    end = 86400;
                                    let dataAddTask = {
                                        start: methods.formatTime(start),
                                        end: methods.formatTime(end),
                                        taskCode: methods.cutStringToGetID(setting.taskTypeChoose.taskId)
                                    };
                                    addModeByDragMouse = false;
                                    positionHoldMouse = 0;
                                    $("#task_add_by_drag").remove();
                                    if (setting.onAddTask) {
                                        $timeline.css('cursor', 'default');
                                        setting.onAddTask.apply($this, [timeline, dataAddTask]);
                                    }
                                }
                            }
                        } else {
                            $timeline.css('cursor', 'default');
                            addModeByDragMouse = false;
                            positionHoldMouse = 0;
                            $("#task_add_by_drag").remove();
                            $jqTl.off("mouseleave");
                        }
                    } else {
                        isDoubleClick = false;
                    }
                });

                $scheduleElement.mouseup(function(event) {
                    $timeline.css('cursor', 'default');
                    if (addModeByDragMouse && setting.taskTypeChoose) {
                        let mouseUp = event.pageX - 215;
                        let end = saveData.tableStartTime + Math.floor(mouseUp / setting.widthTimeX) * setting.widthTime;
                        if (end > start) {
                            let dataAddTask = {
                                start: methods.formatTime(start),
                                end: methods.formatTime(end),
                                taskCode: methods.cutStringToGetID(setting.taskTypeChoose.taskId)
                            };
                            addModeByDragMouse = false;
                            positionHoldMouse = 0;
                            $("#task_add_by_drag").remove();
                            $jqTl.off("mouseleave");
                            if (setting.onAddTask) {
                                let indexRow = timeline;
                                if (setting.modeCompare) {
                                    indexRow = (timeline - 1) / 2 ;
                                }
                                setting.onAddTask.apply($this, [indexRow, dataAddTask]);
                            }
                        } else {
                            addModeByDragMouse = false;
                            positionHoldMouse = 0;
                            $("#task_add_by_drag").remove();
                            $jqTl.off("mouseleave");
                        }
                    }
                });

                methods.addRowAtInit.apply($this, [setting, $timeline, timeline]);

                saveData.timeline[timeline] = row;

                methods._saveData.apply($this, [saveData]);

                if (row.class && row.class !== '') {
                    $this.find('.sc_data .timeline').eq(id).addClass(row.class);
                    $this.find('.sc_main .timeline').eq(id).addClass(row.class);
                }

                if (row.schedule) {
                    for (var i in row.schedule) {
                        var bdata = row.schedule[i];
                        var s = bdata.start ? bdata.start : methods.calcStringTime(bdata.startTime);
                        var e = bdata.end ? bdata.end : methods.calcStringTime(bdata.endTime);
                        var data = {};
                        data.start = s;
                        data.end = e;

                        data.real_start = bdata.real_start ;
                        data.real_end = bdata.real_end;

                        if (bdata.text) {
                            data.text = bdata.text;
                        }

                        if (bdata.color) {
                            data.color = bdata.color;
                        }

                        if (bdata.background) {
                            data.background = bdata.background;
                        }

                        data.timeline = timeline;
                        data.data = {};

                        if (bdata.data) {
                            data.data = bdata.data;
                        }

                        methods._addScheduleData.apply($this, [id, data]);
                    }
                }

                methods._resetBarPosition.apply($this, [id]);

                $this.find('.sc_main .timeline').eq(id).droppable({
                    accept: '.sc_bar',
                    drop: function drop(ev, ui) {
                    }
                });

            });
        },

        cutStringToGetID: function cutStringToGetID(stringId) {
            let index = stringId.indexOf("_code_");
            let rs = stringId.substring(index + 6);
            return rs;
        },

        cutStringToGetVesselCode: function cutStringToGetVesselCode(stringId) {
            let index = stringId.indexOf("_code_");
            let rs = stringId.substring(0, index);
            return rs;
        },

        addRowAtInit: function addRowAtInit(setting, $timeline, timeline) {
            let $this = $(this);
            let html = '';

            let indexRow = timeline;
            let displayFlag = true;
            if (setting.modeCompare) {
                displayFlag = false;
                if (((setting.screenId === 'CR3010' && timeline >= 3)
                    || setting.screenId === 'CR3020') && timeline % 2 === 1) {
                    displayFlag = true;
                    indexRow = (timeline - 1) / 2;
                }
            }

            if (setting.listDisableApprove2[indexRow] === '0' && setting.listDisableApprove1[indexRow] === '0' && displayFlag) {

                $this.find('.sc_main').append($timeline);

            } else if (setting.listDisableApprove2[indexRow] === '1' && displayFlag) {

                html = '<div id ="mask_color_' + indexRow + '" class="mask_color_2"></div>';
                let $data2 = $(html);
                $data2.append($timeline);
                $this.find('.sc_main').append($data2);

            } else if (setting.listDisableApprove1[indexRow] === '1' && displayFlag) {

                html = '<div id ="mask_color_' + indexRow + '" class="mask_color_1"></div>';
                let $data2 = $(html);
                $data2.append($timeline);
                $this.find('.sc_main').append($data2);

            } else {
                $this.find('.sc_main').append($timeline);
            }
        },

        addTitleAtInit: function addTitleAtInit(setting, $data, timeline) {
            let $this = $(this);
            let html = '';

            let top = (timeline - 1 ) * 83 + 25;
            if (setting.screenId === 'CR3020') {
                top = timeline * 83 + 10;
            }

            let clsAp1 = 'approve-label-1';
            let clsAp2 = 'approve-label-2';
            let indexRow = timeline;
            let displayFlag = true;
            if (setting.modeCompare) {
                clsAp1 = 'approve-label-mode-compare-1';
                clsAp2 = 'approve-label-mode-compare-2';
                displayFlag = false;
                if (setting.screenId === 'CR3010' && timeline >= 3 && timeline % 2 === 1) {
                    displayFlag = true;
                    indexRow = (timeline - 1) / 2;
                    top = (indexRow - 1 ) * 83 + 49;
                }
                if (setting.screenId === 'CR3020' && timeline % 2 === 1) {
                    displayFlag = true;
                    indexRow = (timeline - 1) / 2;
                    top = indexRow * 83 + 48;
                }
            }

            if (setting.listDisableApprove2[indexRow] === '0' && setting.listDisableApprove1[indexRow] === '0' && displayFlag) {

                $this.find('.sc_data_scroll').append($data);

            } else if (setting.listDisableApprove2[indexRow] === '1' && displayFlag) {

                html = '<div id ="mask_color_header_' + indexRow + '" class="mask_color_2"><span style="top: ' + top +'px;" class="'+ clsAp2 +'" >承認済</span></div>';
                let $data1 = $(html);
                $data1.append($data);
                $this.find('.sc_data_scroll').append($data1);

            } else if (setting.listDisableApprove1[indexRow] === '1' && displayFlag) {

                html = '<div id ="mask_color_header_' + indexRow + '" class="mask_color_1"><span style="top: ' + top +'px;" class="'+ clsAp1 +'" >打刻締</span></div>';
                let $data1 = $(html);
                $data1.append($data);
                $this.find('.sc_data_scroll').append($data1);

            } else {
                $this.find('.sc_data_scroll').append($data);
            }
        },

        /**
         * add rows vessel schedule
         *
         * @param row
         */
        _addRowVesselSchedule: function _addRowVesselSchedule(row) {
            return this.each(function () {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);
                let saveData = methods._loadData.apply($this);

                let html;
                html = '';
                html += '<div class="sc_header_cell_2">' + row.title + '</div>';
                let $data = $(html);

                $this.find('.sc_menu_2').append($data);

                $this.find('.sc_menu_2').append('<div class="sc_header_2"></div>');

                html = '';
                html += '<div class="sc_header_scroll_2"></div>';
                let $timeline = $(html);
                let $numberOfCol = 0;
                let $numberOfCol_2 = 1;

                for (let t = saveData.tableStartTime; t < saveData.tableEndTime; t += setting.widthTime) {
                    let $tl = $('<div class="tl"></div>');
                    if ($numberOfCol % 2 === 0) {
                    } else {
                        $tl.css('background-color', '#f7fafe');
                    }
                    if ($numberOfCol_2 % 4 === 0) {
                        $tl.css('border-right', 'solid 0.01em #ccc');
                    } else {
                    }
                    $tl.outerWidth(setting.widthTimeX);
                    $tl.data('time', methods.formatTime(t));
                    $timeline.append($tl);
                    $numberOfCol += 1;
                    $numberOfCol_2 += 1;
                }

                let indexCopy = 0;
                if (setting.modeCompare) {
                    indexCopy = 1;
                }
                let $barList = $this.find('.sc_main .timeline').eq(indexCopy).find('.sc_bar');

                $timeline.append($barList.css('top', '0px'));

                $this.find('.sc_menu_2 .sc_header_2').append($timeline);
            });
        },

        /**
         * add row total at the end of crew schedule
         *
         * @returns {*}
         * @private
         */
        _addRowTotalSchedule: function _addRowTotalSchedule() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let saveData = methods._loadData.apply($this);

            let html;
            html = '';
            html += '<div class="timeline" style="height: 83px"><span class="row-total">' + '合計' + '</span></div>';
            let $data = $(html);
            $this.find('.sc_data .sc_data_scroll').append($data);

            html = '';
            html += '<div class="timeline" style="height: 83px"></div>';
            let $timeline = $(html);
            let $numberOfCol = 0;
            let $numberOfCol_2 = 1;

            for (let t = saveData.tableStartTime; t < saveData.tableEndTime; t += setting.widthTime) {
                let $tl = $('<div class="tl"></div>');
                $tl.css('background-color', '#f0f0f0');
                if ($numberOfCol_2 % 4 === 0) {
                    $tl.css('border-right', 'solid 0.01em #ccc');
                } else {
                }
                $tl.outerWidth(setting.widthTimeX);
                $tl.data('time', methods.formatTime(t));
                $timeline.append($tl);
                $numberOfCol += 1;
                $numberOfCol_2 += 1;
            }

            $this.find('.sc_main_scroll .sc_main').append($timeline);
        },

        /**
         * rewrite text
         *
         * @param {jQuery}
         *            node
         * @param {Object}
         *            data
         */
        _rewriteBarText: function _rewriteBarText(node, data) {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                var saveData = methods._loadData.apply($this);

                var x = node.position().left;

                var start = saveData.tableStartTime + Math.floor(x / setting.widthTimeX) * setting.widthTime;

                var end = start + (data.endTime - data.startTime);
                var html = methods.formatTime(start) + '-' + methods.formatTime(end);
                $(node).find('.time').html(html);
            });
        },

        /**
         *
         * @param {Number}
         *            n
         */
        _resetBarPosition: function _resetBarPosition(n) {
            return this.each(function () {
                var $this = $(this);

                var $barList = $this.find('.sc_main .timeline').eq(n).find('.sc_bar');
                var codes = [],
                    check = [];
                var h = 0;
                var $e1, $e2;
                var c1, c2, s1, s2, e1, e2;
                var i;

                for (i = 0; i < $barList.length; i++) {
                    codes[i] = {
                        code: i,
                        x: $($barList[i]).position().left
                    };
                }

                codes.sort(function (a, b) {
                    if (a.x < b.x) {
                        return -1;
                    }

                    if (a.x > b.x) {
                        return 1;
                    }

                    return 0;
                });

                for (i = 0; i < codes.length; i++) {
                    c1 = codes[i].code;
                    $e1 = $($barList[c1]);

                    for (h = 0; h < check.length; h++) {
                        var next = false;

                        for (var j = 0; j < check[h].length; j++) {
                            c2 = check[h][j];
                            $e2 = $($barList[c2]);
                            s1 = $e1.position().left;
                            e1 = $e1.position().left + $e1.outerWidth();
                            s2 = $e2.position().left;
                            e2 = $e2.position().left + $e2.outerWidth();

                            if (s1 < e2 && e1 > s2) {
                                next = true;
                                continue;
                            }
                        }

                        if (!next) {
                            break;
                        }
                    }

                    if (!check[h]) {
                        check[h] = [];
                    }

                    $e1.css({
                        //top: h * setting.timeLineY + setting.timeLinePaddingTop
                        top: 0
                    });
                    check[h][check[h].length] = c1;
                }

                methods._resizeRow.apply($this, [n, 1]);
            });
        },

        /**
         *
         * @param n
         * @param height
         */
        _resizeRow: function _resizeRow(n, height) {
            return this.each(function () {
                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);
                let h = Math.max(height, 1);

                let heightTitle = h * setting.timeLineY + setting.timeLineBorder + setting.timeLinePaddingTop + setting.timeLinePaddingBottom;
                let heightData = heightTitle;
                if (setting.modeCompare) {

                    if ((setting.screenId === 'CR3010' && n !== 0) || setting.screenId === 'CR3020') {
                        if (n % 2 === 0) {
                            heightData = 41;
                        } else {
                            heightData = 42;
                        }
                    }

                }

                $this.find('.sc_data .timeline').eq(n).outerHeight(heightTitle);
                $this.find('.sc_main .timeline').eq(n).outerHeight(heightData);
                $this.find('.sc_main .timeline').eq(n).find('.sc_bgBar').each(function () {
                    $(this).outerHeight($(this).closest('.timeline').outerHeight());
                });
                $this.find('.sc_data').outerHeight($this.find('.sc_main_box').outerHeight());

                if (setting.modeCompare) {
                    if ((setting.screenId === 'CR3010' && n !== 0) || setting.screenId === 'CR3020') {
                        if (n % 2 === 0) {
                            $this.find('.sc_data .timeline').eq(n).css('display', 'none');
                        }
                    }
                }
            });
        },

        resizeWindowA: function resizeWindowA() {
            let $this = $(this);
            methods.settingHeight.apply($this);
        },

        /**
         * resizeWindow
         */
        _resizeWindow: function _resizeWindow() {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                var saveData = methods._loadData.apply($this);

                var scWidth = $this.width();
                var scMainWidth = scWidth - setting.dataWidth - setting.verticalScrollbar;
                var cellNum = Math.floor((saveData.tableEndTime - saveData.tableStartTime) / setting.widthTime);
                if (setting.screenId === 'CR3010') {
                    $this.find('.sc_header_cell').width(setting.dataWidth);
                    $this.find('.sc_header').width(scMainWidth);
                    $this.find('.sc_header_scroll').width(setting.widthTimeX * cellNum);
                }
                if (setting.screenId === 'CR3020') {
                    $this.find('.sc_header_cell_CR3020').width(setting.dataWidth);
                    $this.find('.sc_header_CR3020').width(scMainWidth);
                    $this.find('.sc_header_scroll_CR3020').width(setting.widthTimeX * cellNum);
                }
                $this.find('.sc_data,.sc_data_scroll').width(setting.dataWidth);
                $this.find('.sc_header_2').width(scMainWidth);
                $this.find('.sc_main_box').width(scMainWidth);
                $this.find('.sc_header_scroll_2').width(setting.widthTimeX * cellNum);
                $this.find('.sc_main_scroll').width(setting.widthTimeX * cellNum);
            });
        },

        /**
         * move all cells of the right of the specified time line cell
         *
         * @param timeline
         * @param baseTimeLineCell
         * @param moveWidth
         */
        _moveSchedules: function _moveSchedules(timeline, baseTimeLineCell, moveWidth) {
            return this.each(function () {
                var $this = $(this);

                var setting = methods._loadSettingData.apply($this);

                var saveData = methods._loadData.apply($this);

                var $barList = $this.find('.sc_main .timeline').eq(timeline).find('.sc_bar');

                for (var i = 0; i < $barList.length; i++) {
                    var $bar = $($barList[i]);

                    if (baseTimeLineCell.position().left <= $bar.position().left) {
                        var v1 = $bar.position().left + setting.widthTimeX * moveWidth;
                        var v2 = Math.floor((saveData.tableEndTime - saveData.tableStartTime) / setting.widthTime) * setting.widthTimeX - $bar.outerWidth();
                        $bar.css({
                            left: Math.max(0, Math.min(v1, v2))
                        });
                        var scKey = $bar.data('sc_key');
                        var start = saveData.tableStartTime + Math.floor($bar.position().left / setting.widthTimeX) * setting.widthTime;
                        var end = start + (saveData.schedule[scKey].end - saveData.schedule[scKey].start);
                        saveData.schedule[scKey].start = methods.formatTime(start);
                        saveData.schedule[scKey].end = methods.formatTime(end);
                        saveData.schedule[scKey].startTime = start;
                        saveData.schedule[scKey].endTime = end;

                        methods._rewriteBarText.apply($this, [$bar, saveData.schedule[scKey]]);

                        if (setting.onChange) {
                            setting.onChange.apply($this, [$bar, saveData.schedule[scKey]]);
                        }
                    }
                }

                methods._resetBarPosition.apply($this, [timeline]);
            });
        },

        /**
         *
         * @param id
         * @param i
         * @param val
         * @returns {boolean}
         */
        _setCheckBox: function _setCheckBox(id, i ,val) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let flag = true;
            if (id === 'cnkApprove1Id_') {
                if (setting.listDisableApprove1[i] === val) {
                    flag = false;
                } else {
                    setting.listDisableApprove1[i] = val;
                }
            } else {
                if (setting.listDisableApprove2[i] === val) {
                    flag = false;
                } else {
                    setting.listDisableApprove2[i] = val;
                }
            }
            methods._saveSettingData.apply($this, setting);
            return flag;
        },

        _setEventTabMenuAddCR3020: function _setEventTabMenuAddCR3020() {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);

            let tabLinks = $this.find('.add_tab_links');
            let tabContents = $this.find('.ul-in-sidebar');

            tabLinks.click(function() {
                let idTabLink = $(this).attr('id');
                let classTabLink = $(this).attr('class');
                let idTabContent = idTabLink.replace('tab_link_', 'tab_content_');
                methods._setTabShow.apply($this, [idTabLink, idTabContent]);
                if (!classTabLink.includes("active") && setting.taskTypeChoose !== null) {
                    let $jq = $('#' + setting.taskTypeChoose.taskId);
                    $jq.css('border', 'none');
                    setting.taskTypeChoose = null;
                }
            });

            if (tabLinks.length > 0) {
                tabLinks[0].className += ' active';
                $(tabContents[0]).show();
            }
        },

        _setTabShow: function _setTabShow(idTabLink, idTabContent) {

            let $this = $(this);
            let tabLinks = $this.find('.add_tab_links');
            let tabContents = $this.find('.ul-in-sidebar');
            tabLinks.removeClass('active');
            tabContents.hide();

            $('#' + idTabLink).addClass(' active');
            $('#' + idTabContent).show();
        },

        /**
         * Setting event for checkbox approve
         *
         * @param id
         * @returns {*}
         * @private
         */
        _setEventCheckApprove: function _setEventCheckApprove(id, startIndex) {

            return this.each(function () {

                let $this = $(this);
                let setting = methods._loadSettingData.apply($this);

                for (let i = startIndex; i < setting.rows.length; i++) {
                    $("#" + id + i).change(function() {
                        var ischecked= $(this).is(':checked');
                        if(ischecked) {
                            var turnOn = true;
                            for (let j = startIndex; j < setting.rows.length; j++) {
                                if (j !== i) {
                                    if($("#" + id + j).prop('checked') === false) {
                                        turnOn = false;
                                    }
                                }
                            }
                            if (turnOn) {
                                $("#" + id + "all").prop('checked', true);
                            }
                        } else {
                            $("#" + id + "all").prop('checked', false);
                        }
                    });
                }

                var chk_all = false;
                var chk_all_checked = false;
                var is_show = true;
                var chk_1 = false;

                $("#" + id + "all").change(function() {
                    chk_all = true;
                    let ischecked = $(this).is(':checked');
                    let isSuccess = false;
                    let rs;
                    if(ischecked){
                        rs = methods._getListDisableWhenApproveAll.apply($this, [id, startIndex]);
                        isSuccess = methods._setDisableMutipleRow.apply($this, [rs, id, '1']);
                        if (!isSuccess) {
                            $("#" + id + "all").prop('checked', false);
                        }
                        chk_all_checked = false;
                    } else {
                        rs = methods._getListDisableWhenApproveAll.apply($this, [id, startIndex]);
                        isSuccess = methods._setDisableMutipleRow.apply($this, [rs, id, '0']);
                        if (!isSuccess) {
                            $("#" + id + "all").prop('checked', true);
                        }
                    }
                    chk_all = false;
                    is_show = true;
                });


                for (let i = startIndex; i < setting.rows.length; i++) {

                    $("#" + id + i).change(function() {
                        let ischecked= $(this).is(':checked');
                        let val = '';
                        let flag = true;

                        chk_1 = true;

                        let saveData = methods._loadData.apply($this);

                        let index = i;
                        if (setting.modeCompare) {
                            index = i * 2 + 1;
                        }
                        let usr_code = saveData.timeline[index].usr_code;
                        let alo_uid = saveData.timeline[index].alo_uid;

                        let t = i;
                        if (setting.screenId === 'CR3020') {
                            t = index;
                        }

                        let params = {
                            'alo_uid' : alo_uid,
                            'usr_code':usr_code,
                            'timeline':t,
                        }

                        setting.onCheckInWork.apply($this, [params]);
                        let in_work = setting.inWorkFlag;
                        let msg = setting.msgInWork;
                        let msg_title = setting.msgInWorkTitle;

                        if(ischecked && in_work === false){
                            val = '1';
                            flag = methods._setCheckBox.apply($this, [id, i, val]);
                        } else {
                            val = '0';
                            flag = methods._setCheckBox.apply($this, [id, i, val]);
                        }

                        if (flag) {
                            methods._setDisableByUsr.apply($this, [i, id, val]);
                        }

                        if(in_work){
                            $("#" + id + i).prop('checked', false)
                        }

                        if(in_work && chk_all && chk_all_checked && chk_1){
                            if(is_show){
                                is_show = false;
                                showMsg(msg_title, msg);
                            }
                        }else if(in_work && !chk_all && chk_1){
                            if(is_show){
                                showMsg(msg_title, msg);
                            }
                        }
                    });
                }
            });
        },

        _getListDisableWhenApproveAll: function _getListDisableWhenApproveAll(id, startIndex) {

            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let rs = [];
            let list;
            if (id === 'cnkApprove1Id_') {
                list = setting.listDisableApprove1;
            } else {
                list = setting.listDisableApprove2;
            }

            for (let i = startIndex; i < list.length; i++) {
                let $checkApprove;
                if (id === 'cnkApprove1Id_') {
                    $checkApprove = $('#cnkApprove1Id_' + i);
                } else {
                    $checkApprove = $('#cnkApprove2Id_' + i);
                }
                if ($checkApprove.prop('disabled') === false) {
                    rs.push(i);
                }
            }

            methods._saveSettingData.apply($this, setting);
            return rs;
        } ,

        /**
         * Set checkbox check or uncheck
         *
         * @returns {*}
         * @private
         */
        _setCheckApprove: function _setCheckApprove() {
            return this.each(function () {
                let $this = $(this);
                let $approveAll1 = $('#cnkApprove1Id_all');
                let $approveAll2 = $('#cnkApprove2Id_all');
                let setting = methods._loadSettingData.apply($this);

                if (setting.approveLevel === 1) {
                    $("#cnkApprove2Id_all").attr("disabled", true);
                }

                if (setting.approveLevel === 2) {
                    $("#cnkApprove1Id_all").attr("disabled", true);
                }

                $approveAll1.prop('checked', true);
                $approveAll2.prop('checked', true);

                let startIndex = 0;
                if (setting.screenId === 'CR3010') {
                    startIndex = 1;
                }

                let flagDisableApprove1 = true;
                let flagDisableApprove2 = true;

                $approveAll1.prop('checked', true);
                $approveAll2.prop('checked', true);

                for (let i = startIndex; i < setting.rows.length; i++) {

                    let $checkApprove1 = $('#cnkApprove1Id_' + i);
                    let $checkApprove2 = $('#cnkApprove2Id_' + i);

                    // Set uncheck checkbox approve1 all
                    if ($checkApprove1.prop('disabled') === false) {
                        if ($checkApprove1.prop('checked') === false) {
                            $approveAll1.prop('checked', false);
                        }
                        flagDisableApprove1 = false;
                    }

                    // Set uncheck checkbox approve2 all
                    if ($checkApprove2.prop('disabled') === false) {
                        if ($checkApprove2.prop('checked') === false) {
                            $approveAll2.prop('checked', false);
                        }
                        flagDisableApprove2 = false;
                    }

                }

                if (flagDisableApprove1) {
                    $approveAll1.attr("disabled", true);
                }

                if (flagDisableApprove2) {
                    $approveAll2.attr("disabled", true);
                }

                methods._setEventCheckApprove.apply($this, ['cnkApprove1Id_', startIndex]);

                methods._setEventCheckApprove.apply($this, ['cnkApprove2Id_', startIndex]);
            });
        },

        resizeSchedule: function resizeSchedule() {
            var $this = $(this);

            $(window).on('resize', function () {
                methods._resizeWindow.apply($this);
            }).trigger('resize');

        },

        /**
         * Setting height depend on device, scale of screen
         */
        settingHeight: function settingHeight() {

            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if (window.orientation === 0) { // portrait
                    $('.jq-schedule .sc_data').css('height', '470px');
                    $('.jq-schedule .sc_main_box').css('height', '470px');
                    $('#body-data-approve').css('height', '470px');
                    $('#body-data-money').css('height', '470px');
                    $('#body-data-add').css('height', '550px');
                    $('#sidebar-menu-delete').css('height', '625px');
                } else if (window.orientation === 90 || window.orientation === -90) { // landscape
                    $('.jq-schedule .sc_data').css('height', '280px');
                    $('.jq-schedule .sc_main_box').css('height', '280px');
                    $('#body-data-approve').css('height', '280px');
                    $('#body-data-money').css('height', '280px');
                    $('#body-data-add').css('height', '360px');
                    $('#sidebar-menu-delete').css('height', '435px');
                }
            } else {
                if (window.devicePixelRatio === 1.25) {
                    $('.jq-schedule .sc_data').css('height', '350px');
                    $('.jq-schedule .sc_main_box').css('height', '350px');
                    $('#body-data-approve').css('height', '350px');
                    $('#body-data-money').css('height', '350px');
                    if (setting.screenId === "CR3020") {
                        $('#body-data-add').css('height', '405px');
                    } else {
                        $('#body-data-add').css('height', '428px');
                    }
                    $('#sidebar-menu-delete').css('height', '505px');

                } else if (window.innerHeight < 800) {
                    $('.jq-schedule .sc_data').css('height', '290px');
                    $('.jq-schedule .sc_main_box').css('height', '290px');
                    $('#body-data-approve').css('height', '287px');
                    $('#body-data-money').css('height', '287px');
                    if (setting.screenId === "CR3020") {
                        $('#body-data-add').css('height', '365px');
                    } else {
                        $('#body-data-add').css('height', '370px');
                    }
                    $('#sidebar-menu-delete').css('height', '445px');

                } else {
                    $('.jq-schedule .sc_data').css('height', '550px');
                    $('.jq-schedule .sc_main_box').css('height', '550px');
                    $('#body-data-approve').css('height', '547px');
                    $('#body-data-money').css('height', '547px');
                    if (setting.screenId === "CR3020") {
                        $('#body-data-add').css('height', '607px');
                    } else {
                        $('#body-data-add').css('height', '630px');
                    }
                    $('#sidebar-menu-delete').css('height', '705px');
                }
            }
        },
        _disableCheckboxCR3020: function _disableCheckboxCR3020(index1, index2) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let saveData = methods._loadData.apply($this);
            let indexDisable = index2;

            if (setting.modeCompare) {
                index1 = index1 * 2 + 1;
                index2 = index2 * 2 + 1;
            }

            let vesselCode1 = saveData.timeline[index1].vessel_code;
            let vesselCode2 = saveData.timeline[index2].vessel_code;

            if (vesselCode1 !== '') {
                if (vesselCode1 !== vesselCode2 && vesselCode2 !== '') {
                    $("#cnkId_" + indexDisable).attr("disabled", true);
                }

                if (!setting.disableTabAdd) {
                    setting.disableTabAdd = true;
                    methods._setTabShow.apply($this, ['tab_link_' + vesselCode1, 'tab_content_' + vesselCode1]);
                    for (let i = 0; i < setting.listTypeTask.length; i++) {
                        let vesselCodeI = setting.listTypeTask[i].vessel_code;
                        if (vesselCodeI !== vesselCode1) {
                            $('#tab_link_' + vesselCodeI).attr("disabled", true);
                        }
                    }
                }
            }

        },
        _enableCheckboxCR3020: function _enableCheckboxCR3020(index1) {
            let $this = $(this);
            let saveData = methods._loadData.apply($this);
            let vesselCode1 = saveData.timeline[index1].vessel_code;
            for (let i = 0; i < saveData.timeline.length; i++) {
                let vesselCode2 = saveData.timeline[i].vessel_code;
                if (vesselCode2) {
                    if (vesselCode1 !== vesselCode2) {
                        $("#cnkId_" + i).removeAttr("disabled");
                    }
                }
            }
            let setting = methods._loadSettingData.apply($this);
            if (setting.disableTabAdd) {
                setting.disableTabAdd = false;
                for (let i = 0; i < setting.listTypeTask.length; i++) {
                    let vesselCodeI = setting.listTypeTask[i].vessel_code;
                    $('#tab_link_' + vesselCodeI).removeAttr("disabled");
                }
            }
        },

        settingShifted: function settingShifted(isShifted) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            setting.isShifted = isShifted;
        },

        /**
         * Init checkbox choose line
         *
         * @param startIndex
         */
        initCheckBox: function initCheckBox(startIndex) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let nCheckbox = $("#schedule").timeSchedule('timelineData').length;
            if (setting.modeCompare) {
                nCheckbox = nCheckbox / 2;
            }

            for (let i = startIndex; i < nCheckbox; i++) {
                $("#cnkId_" + i).change(function() {
                    let isChecked = $(this).is(':checked');
                    if(isChecked) {
                        let turnOn = true;
                        for (let j = startIndex; j < nCheckbox; j++) {
                            if (j !== i && $("#cnkId_" + j).is(':disabled') === false) {
                                if($("#cnkId_" + j).prop('checked') === false) {
                                    turnOn = false;
                                }
                            }
                            // Screen CR3020
                            if (startIndex === 0) {
                                methods._disableCheckboxCR3020.apply($this, [i, j]);
                            }
                        }
                        if (setting.isShifted) {
                            methods.checkWhenHoldShiftKey(i, startIndex, nCheckbox);
                        }
                        if (turnOn) {
                            $("#cnkId_all").prop('checked', true);
                        }
                    } else {
                        // Screen CR3020
                        if (startIndex === 0) {
                            let turnOff = true;
                            for (let j = startIndex; j < nCheckbox; j++) {
                                if($("#cnkId_" + j).prop('checked') === true) {
                                    turnOff = false;
                                }
                            }
                            if (turnOff) {
                                methods._enableCheckboxCR3020.apply($this, [i]);
                            }
                        }
                        $("#cnkId_all").prop('checked', false);
                    }
                });
            }

            $("#cnkId_all").change(function() {
                let isChecked = $(this).is(':checked');
                if(isChecked){
                    for (let i = startIndex; i < nCheckbox; i++) {
                        if ($("#cnkId_" + i).is(':disabled') === false) {
                            $("#cnkId_" + i).prop('checked', true);
                        }
                    }
                } else {
                    for (let i = startIndex; i < nCheckbox; i++) {
                        $("#cnkId_" + i).prop('checked', false);
                    }
                }
            });
        },

        checkWhenHoldShiftKey: function checkWhenHoldShiftKey(indexCheck, startIndex, nCheckbox) {
            let flagEx = false;
            let indexCheckedBefore;
            for (let i = startIndex; i < nCheckbox; i++) {
                if (i !== indexCheck) {
                    if($("#cnkId_" + i).prop('checked') === true) {
                        indexCheckedBefore = i;
                        flagEx = true;
                        break;
                    }
                }
            }

            if (flagEx) {
                let indexFrom = indexCheckedBefore;
                let indexTo = indexCheck;
                if (indexCheckedBefore > indexCheck) {
                    indexFrom = indexCheck;
                    indexTo = indexCheckedBefore;
                }

                for (let i = indexFrom + 1; i < indexTo; i++) {
                    if ($("#cnkId_" + i).is(':disabled') === false) {
                        $("#cnkId_" + i).prop('checked', true);
                    }
                }

            }
        },

        /**
         * Show tooltip
         *
         * @param x
         * @param y
         * @param text
         * @returns {*}
         */
        setShowTooltip: function setShowTooltip(x, y, text) {
            let $this = $(this);
            let tooltip = $this.find('.tooltip_schedule');
            let spanText = $this.find('.time_task');
            if (spanText.length === 0) {
                tooltip.append(text);
                $(tooltip).css('top', (y - 45) + 'px');
                $(tooltip).css('left', x + 'px');
                $(tooltip).css('visibility', 'visible');
                $(tooltip).css('z-index', 800);
            } else {
                $('.time_task').replaceWith(text);
            }
        },

        /**
         * Hide tooltip
         *
         * @returns {*}
         */
        setHideTooltip: function setHideTooltip() {
            let $this = $(this);
            $this.find('.tooltip_schedule .time_task').remove();
            let tooltip = $this.find('.tooltip_schedule');
            $(tooltip).css('visibility', 'hidden');
        },

        /**
         * set scroll between main and approve menu
         */
        setScrollBetweenMainAndSideBarMenu: function setScrollBetweenMainAndSideBarMenu() {
            let $this = $(this);

            $(".sc_main_box").scroll(function() {
                let setting = methods._loadSettingData.apply($this);

                let approveSideBar = $("#body-data-approve");
                approveSideBar.prop("scrollTop", this.scrollTop);
                let moneySideBar = $("#body-data-money");
                moneySideBar.prop("scrollTop", this.scrollTop);

                setting.scrollTop = this.scrollTop;
                setting.scrollLeft = this.scrollLeft;
                if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                    approveSideBar.css('overflow-x', 'scroll');
                } else {
                    approveSideBar.css('overflow-x', 'hidden');
                }
                methods._saveSettingData.apply($this, setting);
            });

            $("#body-data-approve").scroll(function() {
                let setting = methods._loadSettingData.apply($this);
                let approveSideBar = $(".sc_main_box");
                approveSideBar.prop("scrollTop", this.scrollTop);
                setting.scrollTop = this.scrollTop;
                methods._saveSettingData.apply($this, setting);
            });

            $("#body-data-money").scroll(function() {
                let setting = methods._loadSettingData.apply($this);
                let $main = $(".sc_main_box");
                $main.prop("scrollTop", this.scrollTop);
                setting.scrollTop = this.scrollTop;
                methods._saveSettingData.apply($this, setting);
            });
        },

        /**
         * Create tooltip
         */
        createTooltip: function createTooltip() {
            let $this = $(this);
            let config = methods._loadSettingData.apply($this);

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            } else {
                $('#schedule').mousemove(function (event) {
                    if (config.hoverOnTask) {

                        let timeShow;
                        if (config.isResizing) {
                            timeShow = '<span class="time_task">' + config.dataResize[2] + '<br>' + config.dataResize[0] + '~' + config.dataResize[1] + '</span>';
                        } else {
                            timeShow = '<span class="time_task">' + config.dataTaskHover[2] + '<br>' + config.dataTaskHover[0] + '~' + config.dataTaskHover[1] + '</span>';
                        }

                        methods.setShowTooltip.apply($this, [event.pageX, event.pageY, timeShow]);

                    } else if (config.isResizing) {

                        let timeShow = '<span class="time_task">' + config.dataResize[2] + '<br>' + config.dataResize[0] + '~' + config.dataResize[1] + '</span>';
                        methods.setShowTooltip.apply($this, [event.pageX, event.pageY, timeShow]);

                    } else {
                        methods.setHideTooltip.apply($this);
                    }
                });
            }
        },

        /**
         * create HTML header for menu Approve
         *
         * @returns {string}
         */
        createHtmlHeaderMenuApprove: function createHtmlHeaderMenuApprove() {
            let headerApproveHTMl = '<thead><tr class="header-approve-tr-1">' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">1日<br>当たり<br>の労働<br>時間<br></th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">時間外<br>労働</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">補償<br>休日<br>労働</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">1週間<br>当たり<br>の労働<br>時間</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">補償<br>休日が<br>生じる<br>一週間</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">超過<br>時間数</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">安全<br>臨時<br>労働</th>' +
                '<th class="header-approve-th-4" colspan="1" rowspan="2">休日<br>又は<br>補償<br>休日</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">有給<br>休暇</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">休息<br>基準<br>時間<br><span class="header-approve-small">(非推奨)</span></th>' +
                '<th class="header-approve-th-2" colspan="2" rowspan="1">休息時間</th>' +
                '<th class="header-approve-th-5" colspan="1" rowspan="2">アラ<br>ート<br>件数</th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">打刻<br>締め<br><input class="header-checkbox" id="cnkApprove1Id_all" type="checkbox"></th>' +
                '<th class="header-approve-th-1" colspan="1" rowspan="2">承認<br><br><input class="header-checkbox" id="cnkApprove2Id_all" type="checkbox"></th>' +
                '</tr>' +
                '<tr class="header-approve-tr-1">' +
                '<th class="header-approve-th-4" colspan="1" rowspan="1">時間数</th>' +
                '<th class="header-approve-th-4" colspan="1" rowspan="1">長い方の<br>時間</th>' +
                '</tr></thead>';
            return headerApproveHTMl;
        },

        /**
         * create HTML header for menu Add
         *
         * @returns {string}
         */
        createHtmlHeaderMenuAdd: function createHtmlHeaderMenuAdd(screenId, listTypeTask) {
            let headerMenuAddHTML = '';
            if (screenId === 'CR3020') {
                headerMenuAddHTML = '<div class="add_tab_crew_schedule">';
                for (let i = 0; i < listTypeTask.length; i ++) {
                    let nameTab = listTypeTask[i].vessel_name;
                    let idTab = listTypeTask[i].vessel_code;
                    let tab = '<button class="add_tab_links" id="' + 'tab_link_' +idTab + '">' + nameTab + '</button>';
                    headerMenuAddHTML += tab;
                }
                headerMenuAddHTML += '</div>';
            }

            return headerMenuAddHTML;
        },

        /**
         * create HTML header for menu Money
         *
         * @returns {string}
         */
        createHtmlHeaderMenuMoney: function createHtmlHeaderMenuMoney() {
            let headerMoneyHTMl = '<thead><tr class="header-approve-tr-1">' +
                '<th class="header-approve-th-1-3" colspan="1" rowspan="2">深夜割増</th></tr>' +
                '<tr class="header-approve-tr-1"></tr></thead>';
            return headerMoneyHTMl;
        },

        /**
         * create HTML for menu Delete
         *
         * @returns {string}
         */
        getHtmlMenuDelete: function getHtmlMenuDelete() {
            let htmlMenuDelete = '<div id="sidebar-menu-delete" class="sidebar-menu-delete">' +
                '<div class="header-siderbar"><span>ゴミ箱</span></div>' +
                '<span>このエリアにドラッグア<br>ンドドロップすると削除<br>できます。</span><br>' +
                '<img id ="sidebar-trash" alt="homepage" class="sidebar-trash"/>' +
                '</div>';

            return htmlMenuDelete;
        },

        /**
         * create HTML for menu Add
         *
         * @returns {string}
         */
        getHtmlMenuAdd: function getHtmlMenuAdd(screenId, htmlHeader) {

            let menuAddHTML = '<ul id="list_type_task" class="ul-in-sidebar"></ul>';
            if (screenId === 'CR3020') {
                menuAddHTML = '';
            }

            let htmlMenuAdd = '<div id="sidebar-menu-add" class="sidebar-menu-add">' +
                '<div class="header-siderbar"><span>作業追加</span>' + htmlHeader + '</div>' +
                '<div id="body-data-add">'+ menuAddHTML +'</div>' +
                '</div>';

            return htmlMenuAdd;
        },

        /**
         * create HTML for menu Approve
         *
         * @returns {string}
         */
        getHtmlMenuApprove: function getHtmlMenuApprove(htmlHeader) {
            let htmlMenuApprove = '<div id="sidebar-menu-approve" class="sidebar-menu-approve">' +
                '<div class="header-siderbar"><span class="header-approve-text">タイムチャート詳細</span>' +
                '<input type="button" onClick="btnExcel(2)" class="header-btn-schedule btn-in-approve-menu" id="excel-btn" value="Excel(F8)">' +
                '</div>' +
                '<table class="table-approve">' + htmlHeader +
                '<tbody id="body-data-approve" class="body-data-approve" ></tbody>' +
                '</table>' +
                '</div>';
            return htmlMenuApprove;
        },

        /**
         * create HTML for menu Money
         *
         * @returns {string}
         */
        getHtmlMenuMoney: function getHtmlMenuMoney(htmlHeader) {
            let htmlMenuMoney = '<div id="sidebar-menu-money" class="sidebar-menu-money">' +
                '<div class="header-siderbar"><span class="header-money-text">給与関連</span>' +
                '<input type="button" onClick="btnExcel(4)" class="header-btn-schedule btn-in-approve-menu" id="excel-money-btn" value="Excel(F9)">' +
                '</div>' +
                '<table class="table-money">' + htmlHeader +
                '<tbody id="body-data-money" class="body-data-money" ></tbody>' +
                '</table>' +
                '</div>';
            return htmlMenuMoney;
        },

        setDataMenuMoney: function setDataMenuMoney(param, modeCompare) {

            let moneyMenu = '<tr id="money_' + param.i + '" class="" >';
            let clCss1 = "header-approve-td-3";

            if (modeCompare) {
                moneyMenu += '<td class="'+ clCss1 +'"><table>' +
                '<tr><td id="night-surcharge-time-mode-' + param.i + '">' + param.nightSurchargeCompare + '</td></tr>' +
                '<tr><td id="night-surcharge-time-' + param.i + '">' + param.nightSurcharge + '</td></tr>' +
                '</table></td></tr>';
            } else {
                moneyMenu += '<td id="night-surcharge-time-' + param.i + '" class="'+ clCss1 +'">' + param.nightSurcharge + '</td></tr>';
            }

            return moneyMenu;
        },

        setDataMenuApprove: function setDataMenuApprove(param, modeCompare, isRowTotal = false) {

            let approveMenu = '<tr id="approve_' + param.i + '" class="' + param.clsCss + '" >';
            let clCss1 = "header-approve-td-1";
            let clCss2 = "header-approve-td-4";
            let clCss3 = "header-approve-td-5";

            // In case mode compare, one record have two rows
            if (modeCompare) {
                approveMenu = approveMenu +
                    '<td class="'+ clCss1 +'"><table>' +
                    '<tr><td id="work-time-mode-' + param.i + '">' + param.workTimeCompare + '</td></tr>' +
                    '<tr><td id="work-time-' + param.i + '">' + param.workTime + '</td></tr>' +
                    '</table></td>' +
                    '<td class="' + clCss1 + '"><table>' +
                    '<tr><td id="overtime-work-mode-' + param.i + '">' + param.overtimeWorkCompare + '</td></tr>' +
                    '<tr><td id="overtime-work-' + param.i + '">' + param.overtimeWork + '</td></tr>' +
                    '</table></td>' +
                    '<td class="' + clCss1 + '"><table>' +
                    '<tr><td id="holiday-work-time-mode-' + param.i + '">' + param.comHolidayWorkCompare + '</td></tr>' +
                    '<tr><td id="holiday-work-time-' + param.i + '">' + param.comHolidayWork + '</td></tr>' +
                    '</table></td>' +
                    '<td class="' + clCss1 + '"><table>' +
                    '<tr><td id="hours-per-hour-mode-' + param.i + '">' + ((!param.isTotal && typeof param.hours_per_hour_Compare !== 'undefined') ? param.hours_per_hour_Compare : '_')  + '</td></tr>' +
                    '<tr><td id="hours-per-hour-' + param.i + '">' + ((!param.isTotal && typeof param.hours_per_hour !== 'undefined') ? param.hours_per_hour : '_')  + '</td></tr>' +
                    '</table></td>';
            } else {
                approveMenu = approveMenu + '<td id="work-time-' + param.i + '" class="'+ clCss1 +'">' + param.workTime + '</td>' +
                    '<td id="overtime-work-' + param.i + '" class="'+ clCss1 +'">' + param.overtimeWork + '</td>' +
                    '<td id="holiday-work-time-' + param.i + '" class="'+ clCss1 +'">' + param.comHolidayWork + '</td>' +
                    '<td id="hours-per-hour-' + param.i + '" class="'+ clCss1 +'">' + ((!param.isTotal && typeof param.hours_per_hour !== 'undefined') ? param.hours_per_hour : '_') + '</td>'
            }
            approveMenu = approveMenu +
                '<td id="holiday-occurs-time-' + param.i + '" class="'+ clCss1 +'">' + '_' + '</td>' +
                '<td id="over-time-' + param.i + '" class="'+ clCss1 +'">' + '_' + '</td>';

            let cmbCompensatory = '';
            let cmbHoliday = '';
            let cmbCompensatoryCmp = '';
            let cmbHolidayCmp = '';
            let restRefPicker = '-';
            let restRefPickerCmp = '-';

            if (!param.isTotal) {
                cmbCompensatory = '<select class="combobox-in-approve-menu uneditable-input" id="cmbCompensatory_' + param.i +
                    '" onchange="changeCmbCompensatory(this, ' + param.i + ')" ' + param.isDisableCombobox + '>' +
                    methods.createHTMLComboboxInApproveMenu(true, param.compensatoryTime) +
                    '</select>';

                cmbHoliday = '<select class="combobox-in-approve-menu uneditable-input" id="cmbHoliday_' + + param.i +
                    '" onchange="changeCmbHoliday(this, ' + param.i + ')" ' + param.isDisableCombobox + '>' +
                    methods.createHTMLComboboxInApproveMenu(false, param.holidayTime) +
                    '</select>';

                restRefPicker = '<input type="text" id="rest-ref-time-picker-' + param.i + '" class="rest-ref-time-picker" value="' + param.restRefTime + '" ' + param.isDisableCombobox + '>';

                if (modeCompare) {
                    cmbCompensatoryCmp = '<select class="combobox-in-approve-menu uneditable-input" ' + param.isDisableComboboxCompare + '>' +
                        methods.createHTMLComboboxInApproveMenu(true, param.compensatoryTimeCompare) +
                        '</select>';

                    cmbHolidayCmp = '<select class="combobox-in-approve-menu uneditable-input" ' + param.isDisableComboboxCompare + '>' +
                        methods.createHTMLComboboxInApproveMenu(false, param.holidayTimeCompare) +
                        '</select>';

                    restRefPickerCmp = param.restRefTimeCompare;
                }
            }

            // In case mode compare, one record have two rows
            if (modeCompare) {
                approveMenu = approveMenu +
                    '<td class="'+ clCss1 +'"><table>' +
                    '<tr><td id="safe-temp-work-mode-' + param.i + '">' + '00:00' + '</td></tr>' +
                    '<tr><td id="safe-temp-work-' + param.i + '">' + param.safeTempWork + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss2 +'"><table>' +
                    '<tr><td id="compensatory-time-mode-' + param.i + '">' + cmbCompensatoryCmp + '</td></tr>' +
                    '<tr><td id="compensatory-time-' + param.i + '">' + cmbCompensatory + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss1 +'"><table>' +
                    '<tr><td id="paid-holiday-time-mode-' + param.i + '">' + cmbHolidayCmp + '</td></tr>' +
                    '<tr><td id="paid-holiday-time-' + param.i + '">' + cmbHoliday + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss1 +'"><table>' +
                    '<tr><td id="rest-ref-time-mode-' + param.i + '">' + restRefPickerCmp + '</td></tr>' +
                    '<tr><td id="rest-ref-time-' + param.i + '">' + restRefPicker + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss2 +'"><table>' +
                    '<tr><td id="rest-time-mode-' + param.i + '">' + param.restTimeCompare + '</td></tr>' +
                    '<tr><td id="rest-time-' + param.i + '">' + param.restTime + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss2 +'"><table>' +
                    '<tr><td id="split-max-rest-time-mode-' + param.i + '">' + param.splitMaxRestTimeCompare + '</td></tr>' +
                    '<tr><td id="split-max-rest-time-' + param.i + '">' + param.splitMaxRestTime + '</td></tr>' +
                    '</table></td>' +
                    '<td class="'+ clCss3 +'"><table>' +
                    '<tr><td id="number-alert-mode-' + param.i + '">' + '_' + '</td></tr>' +
                    '<tr><td id="number-alert-' + param.i + '">' + '0件' + '</td></tr>' +
                    '</table></td>';
            } else {
                approveMenu = approveMenu + '<td id="safe-temp-work-' + param.i + '" class="'+ clCss1 +'">' + param.safeTempWork + '</td>' +
                    '<td id="compensatory-time-' + param.i + '" class="'+ clCss2 +'">' + cmbCompensatory + '</td>' +
                    '<td id="paid-holiday-time-' + param.i + '" class="'+ clCss1 +'">' + cmbHoliday + '</td>' +
                    '<td id="rest-ref-time-' + param.i + '" class="'+ clCss1 +'">' + restRefPicker + '</td>' +
                    '<td id="rest-time-' + param.i + '" class="'+ clCss2 +'">' + param.restTime + '</td>' +
                    '<td id="split-max-rest-time-' + param.i + '"class="'+ clCss2 +'">' + param.splitMaxRestTime + '</td>' +
                    '<td id="number-alert-' + param.i + '" class="'+ clCss3 +'">' + '0件' + '</td>';
            }

            let check1 = '<input class="header-checkbox" id="cnkApprove1Id_' + param.i + '" type="checkbox"' + param.checkApprove1 + param.disableApprove1 + '>';
            let check2 = '<input class="header-checkbox" id="cnkApprove2Id_' + param.i + '" type="checkbox"' + param.checkApprove2 + param.disableApprove2 + '>';

            if (isRowTotal) {
                check1 = '';
                check2 = '';
            }

            approveMenu = approveMenu +'<td class="'+ clCss1 +'">' + check1 + '</td>' + '<td class="'+ clCss1 +'">' + check2 + '</td></tr>';

            return approveMenu;
        },

        createHTMLComboboxInApproveMenu: function createHTMLComboboxInApproveMenu(flagCombobox, value) {
            let listValCombobox1 = [
                {value: '', text: ''},
                {value: '0010', text: '○'},
                {value: '0020', text: '○半'},
                {value: '0030', text: 'ホ'},
                {value: '0040', text: '陸ホ'},
            ];

            let listValCombobox2 = [
                {value: '', text: ''},
                {value: '0010', text: '○'},
            ];

            let listValCombobox;
            if (flagCombobox) {
                listValCombobox = listValCombobox1;
            } else {
                listValCombobox = listValCombobox2;
            }

            let rs = '';
            for (let i = 0; i < listValCombobox.length; i++) {
                let selected = '';
                if (value) {
                    if (listValCombobox[i].value === value.toString()) {
                        selected = 'selected';
                    }
                }
                rs += '<option value="' + listValCombobox[i].value + '" ' + selected + ' >' + listValCombobox[i].text +'</option>';
            }

            return rs;
        },

        setCssForAlert: function setCssForAlert(i, listAlert, numOfAlert) {
            // Set number of alert
            if (listAlert === null) {
                $('#number-alert-' + i).html(numOfAlert + '件');
            } else {
                if (numOfAlert > 0) {
                    $('#number-alert-' + i).html('<a id="link-number-alert-' + i + '" class="alertLinkColorRed" href="#" onclick="showInfo(' + i + ')">' + numOfAlert + '件</a>');
                } else {
                    $('#number-alert-' + i).html('0件');
                }
            }
        },

        setCssForAlertAfterChangeRestRef: function setCssForAlertAfterChangeRestRef(i, numOfAlert) {
            let $jqNumAlert = $('#number-alert-' + i);
            $jqNumAlert.html('');
            if (numOfAlert > 0) {
                $jqNumAlert.html('<a id="link-number-alert-' + i + '" class="alertLinkColorRed" href="#" onclick="showInfo(' + i + ')">' + numOfAlert + '件</a>');
            } else {
                $jqNumAlert.html('0件');
            }
        },

        setAlertToApproveMenu: function setAlertToApproveMenu(startIndex) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);
            let listDataApprove = setting.listDataApprove;
            let totalOfAlert = 0;

            for (let i = startIndex; i < listDataApprove.length; i++) {
                let listAlert = listDataApprove[i].alert;
                let numOfAlert = 0;
                if (listDataApprove[i].num_alert) {
                    numOfAlert = listDataApprove[i].num_alert;
                }
                totalOfAlert += numOfAlert;
                methods.setCssForAlert.apply($this, [i, listAlert, numOfAlert]);
            }

            if (setting.screenId === 'CR3020') {
                methods.setCssForAlert.apply($this, [listDataApprove.length, null, totalOfAlert]);
            }
        },

        /**
         * create HTML for menu sidebar
         */
        createHTMLMenuAddDeleteApprove: function createHTMLMenuAddDeleteApprove() {

            let $this = $(this);
            let config = methods._loadSettingData.apply($this);

            let headerApproveHTMl = methods.createHtmlHeaderMenuApprove();
            let headerMenuAddHTML = methods.createHtmlHeaderMenuAdd(config.screenId, config.listTypeTask);
            let headerMenuMoneyHTML = methods.createHtmlHeaderMenuMoney();

            $(".sc_wrapper").append(
                methods.getHtmlMenuDelete() +
                methods.getHtmlMenuAdd(config.screenId, headerMenuAddHTML) +
                methods.getHtmlMenuApprove(headerApproveHTMl) +
                methods.getHtmlMenuMoney(headerMenuMoneyHTML)
            );
        },

        updateRestRefTime: function updateRestRefTime(restRefTime, i) {
            let $this = $(this);
            let setting = methods._loadSettingData.apply($this);

            if (setting.onChangeRestRefPicker) {
                setting.onChangeRestRefPicker.apply($this, [restRefTime, i]);
            }
        },

        getCurrentDate: function getCurrentDate() {
            let d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('/');
        },

        changeFormatDate: function changeFormatDate(date) {
            return date.replaceAll("-","/");
        },

        formatTimeInput: function formatTimeInput(timeStr) {
            if (timeStr.length === 3 || timeStr.length === 4) {

                if (timeStr.length === 3) {
                    timeStr = '0' + timeStr;
                }

                timeStr = timeStr.substring(0, 2) + ':' + timeStr.substring(2, timeStr.length);
            }

            if (timeStr === '24:00') {
                timeStr = '00:00';
            }

            let isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/.test(timeStr);

            if (isValid) {
                return timeStr;
            }
            return '00:00';
        },

        getDataPlanMenuApprove: function getDataPlanMenuApprove(param, dataPlan) {
            let w1 = dataPlan.work_time;
            let o1 = dataPlan.overtime_work;
            let c1 = dataPlan.com_holiday_work;
            let r1 = dataPlan.rest_time;
            let s1 = dataPlan.split_max_rest_time;
            let compensatoryTimeCompare = dataPlan.compensatory_time;
            let holidayTimeCompare = dataPlan.holiday_time;

            param.workTimeCompare = methods.formatTime2(w1);
            param.overtimeWorkCompare = methods.formatTime2(o1);
            param.comHolidayWorkCompare = methods.formatTime2(c1);
            param.restRefTimeCompare = dataPlan.rest_ref_time;
            param.restTimeCompare = methods.formatTime2(r1);
            param.splitMaxRestTimeCompare = methods.formatTime2(s1);
            param.compensatoryTimeCompare = compensatoryTimeCompare;
            param.holidayTimeCompare = holidayTimeCompare;
            param.isDisableComboboxCompare = ' disabled ';
        },

        getDataPlanMenuMoney: function getDataPlanMenuApprove(param, dataPlan) {
            let nightSurchargeMinute = methods.getTimeNightSurchargeByMinute(dataPlan);
            param.nightSurchargeCompare = formatTime2(nightSurchargeMinute);
        },

        setDisableComboboxChoose: function setDisableComboboxChoose(param, dataApprove, isAlwaysEnableFlag, disableTask) {
            // setting disable combobox
            let isDisableCombobox = '';

            if (!isAlwaysEnableFlag) {
                if (disableTask) {
                    isDisableCombobox = ' disabled ';
                }
            }

            if (dataApprove.is_disable_combobox) {
                isDisableCombobox = ' disabled ';
            }

            param.isDisableCombobox = isDisableCombobox;
        },

        setDisableCheckboxApprove: function setDisableCheckboxApprove(param, approveLevel, labor_manag_app_flg, screenId,
                                                                      dateChoosen, currentDate, vesselCode, workDate) {
            // setting disable approve
            let disableApprove1 = '';
            let disableApprove2 = '';
            if (approveLevel === 1) {
                if (labor_manag_app_flg === '1') {
                    disableApprove1 = ' disabled ';
                } else {
                    if (screenId === 'CR3010') {
                        if (dateChoosen >= currentDate) {
                            disableApprove1 = ' disabled ';
                        }
                    }
                    if (screenId === 'CR3020') {
                        if (methods.changeFormatDate(workDate) >= currentDate) {
                            disableApprove1 = ' disabled ';
                        }
                    }
                }
                disableApprove2 = ' disabled ';
            } else if (approveLevel === 0) {
                disableApprove1 = ' disabled ';
                disableApprove2 = ' disabled ';
            } else if (approveLevel === 2) {
                disableApprove1 = ' disabled ';
                if (screenId === 'CR3010') {
                    if (dateChoosen >= currentDate) {
                        disableApprove2 = ' disabled ';
                    }
                }
                if (screenId === 'CR3020') {
                    if (methods.changeFormatDate(workDate) >= currentDate) {
                        disableApprove2 = ' disabled ';
                    }
                }
            }

            // At CR3020 when crew have out date at cr_alo_dat disable checkbox approve
            if (screenId === 'CR3020' && vesselCode === '') {
                // disableApprove1 = ' disabled ';
                // disableApprove2 = ' disabled ';
            }

            param.disableApprove1 = disableApprove1;
            param.disableApprove2 = disableApprove2;
        },

        getDataMenuApprove: function getDataMenuApprove(i, dataApprove, ship_bord_app_flg, labor_manag_app_flg,
                                                        approveLevel, vesselCode, screenId, disableApprove22, disableApprove11) {
            // work time, overtime, rest time get from database
            let w = dataApprove.work_time;
            let o = dataApprove.overtime_work;
            let r = dataApprove.rest_time;
            let c = dataApprove.com_holiday_work;

            // setting time in approve menu
            let workTime = methods.formatTime2(w);
            let overtimeWork = methods.formatTime2(o);
            let comHolidayWork = methods.formatTime2(c);
            let safeTempWork = methods.formatTime2(dataApprove.safe_temp_work);
            let restRefTime = dataApprove.rest_ref_time;
            let restTime = methods.formatTime2(r);
            let splitMaxRestTime = methods.formatTime2(dataApprove.split_max_rest_time);
            let compensatoryTime = dataApprove.compensatory_time;
            let holidayTime = dataApprove.holiday_time;
            let hours_per_hour = dataApprove.hours_per_hour;

            // setting check approve
            let checkApprove1 = '';
            let checkApprove2 = '';
            if (ship_bord_app_flg === '1') {
                checkApprove1 = ' checked ';
            }
            if (labor_manag_app_flg === '1') {
                checkApprove2 = ' checked ';
            }

            let clsCss = '';
            if (disableApprove22 === '1') {
                clsCss = 'mask_color_2';
            } else if (disableApprove11 === '1') {
                clsCss = 'mask_color_1';
            }

            let param = {};
            param.i = i;
            param.clsCss = clsCss;
            param.workTime = workTime;
            param.overtimeWork = overtimeWork;
            param.comHolidayWork = comHolidayWork;
            param.safeTempWork = safeTempWork;
            param.restRefTime = restRefTime;
            param.restTime = restTime;
            param.splitMaxRestTime = splitMaxRestTime;
            param.checkApprove1 = checkApprove1;
            param.checkApprove2 = checkApprove2;

            param.workTimeCompare = '00:00';
            param.overtimeWorkCompare = '00:00';
            param.comHolidayWorkCompare = '00:00';
            param.restRefTimeCompare = '00:00';
            param.restTimeCompare = '00:00';
            param.splitMaxRestTimeCompare = '00:00';
            param.compensatoryTime = compensatoryTime;
            param.holidayTime = holidayTime;
            param.isTotal = false;
            param.hours_per_hour = hours_per_hour;

            return param;
        },

        getTimeNightSurchargeByMinute: function getTimeNightSurchargeByMinute(scheduleOneDay) {
            let nightSurchargeMinute = 0;
            for (let i = 0; i < scheduleOneDay.length; i++) {
                let task = scheduleOneDay[i];
                if (task.data.late_night_extra_flag === '1') {
                    let endMinute;
                    if (task.real_end === '00:00') {
                        endMinute = methods.calcStringTimeToMinute('24:00');
                    } else {
                        endMinute = methods.calcStringTimeToMinute(task.real_end);
                    }

                    let startMinute = methods.calcStringTimeToMinute(task.real_start);

                    nightSurchargeMinute += (endMinute - startMinute);
                }
            }

            return nightSurchargeMinute;
        },

        getDataMenuMoney: function getDataMenuMoney(schedule, index) {
            let nightSurchargeMinute = methods.getTimeNightSurchargeByMinute(schedule);

            let param = {};
            param.i = index;
            param.nightSurcharge = formatTime2(nightSurchargeMinute);
            param.nightSurchargeMinute = nightSurchargeMinute;

            return param;
        },

        /**
         * initialize
         */
        init: function init(options) {
            return this.each(function () {
                var $this = $(this);
                var config = $.extend({
                    className: 'jq-schedule',
                    rows: {},
                    startTime: '07:00',
                    endTime: '19:30',
                    widthTimeX: 25,
                    // 1cell�ӂ�̕�(px)
                    widthTime: 600,
                    // ��؂莞��(�b)
                    timeLineY: 50,
                    // timeline height(px)
                    timeLineBorder: 1,
                    // timeline height border
                    timeBorder: 1,
                    // border width
                    timeLinePaddingTop: 0,
                    timeLinePaddingBottom: 0,
                    headTimeBorder: 1,
                    // time border width
                    dataWidth: 160,
                    // header title
                    headerTitle: '',
                    // data width
                    verticalScrollbar: 0,
                    // vertical scrollbar width
                    bundleMoveWidth: 1,
                    // width to move all schedules to the right of the clicked time cell
                    draggable: true,
                    resizable: true,
                    resizableLeft: false,
                    scrollTop: 0,
                    scrollLeft: 0,
                    approveLevel:null,
                    dataFocus: null,
                    screenId: null,
                    deleteMode: null,
                    approveMode: null,
                    listDisableTask: [],
                    listDisableApprove1: [],
                    listDisableApprove2: [],
                    listTypeTask: null,
                    listDataApprove: [],
                    hoverOnTask: false,
                    dataTaskHover: null,
                    isResizing: false,
                    dataResize: null,
                    disableTabAdd: false,
                    rows2: null,
                    modeCompare: false,
                    // event
                    onChange: null,
                    onClick: null,
                    onAppendSchedule: null,
                    onScheduleClick: null,
                    onScheduleDoubleClick: null,
                    onDeleteSchedule: null,
                    onAddTask: null,
                    onApproveSchedule: null,
                    onApproveAllSchedule: null,
                    onCheckApproveAll: null,
                    onUpdateDialog: null,
                    onCheckInWork: null,
                    onChangeRestRefPicker: null,
                    inWorkFlag:false,
                    msgInWork:false,
                    msgInWorkTitle:false,
                    isAlwaysEnableFlag: true,
                    currentDate: methods.getCurrentDate(),
                    dateChoosen: methods.getCurrentDate(),
                    taskTypeChoose: null,
                    scrollIndex: null,
                    isShifted: false,
                }, options);

                methods._saveSettingData.apply($this, [config]);

                if (config.rows2 !== null) {
                    config.modeCompare = true;
                }

                let tableStartTime = methods.calcStringTime(config.startTime);
                let tableEndTime = methods.calcStringTime(config.endTime);
                tableStartTime -= tableStartTime % config.widthTime;
                tableEndTime -= tableEndTime % config.widthTime;

                methods._saveData.apply($this, [{
                    tableStartTime: tableStartTime,
                    tableEndTime: tableEndTime
                }]);

                let customHTML = '';
                let topLine = '<div class="line-top-schedule"></div>';

                if (config.screenId === 'CR3010') {
                    customHTML = '<div class="sc_menu_2">' + '</div>' + '\n';
                    config.listDataApprove.push({});
                    config.listDisableApprove1.push(0);
                    config.listDisableApprove2.push(0);
                    config.listDisableTask.push(false);
                }

                let scHeaderCell = '<div class="sc_header_cell"><span>';
                let scHeader = '<div class="sc_header">';
                let scHeaderScroll = '<div class="sc_header_scroll"></div>';
                if (config.screenId === 'CR3020') {
                    scHeaderCell = '<div class="sc_header_cell_CR3020"><span class="span_title_CR3020">';
                    scHeader = '<div class="sc_header_CR3020">';
                    scHeaderScroll = '<div class="sc_header_scroll_CR3020"></div>';
                }

                let html = '' + topLine + '<div class="sc_menu">' + '\n' +
                    scHeaderCell + config.headerTitle + '</span></div>' + '\n' +
                    scHeader + '\n' +
                    scHeaderScroll + '\n' + '</div>' + '\n' + '</div>' + '\n' +
                    customHTML +
                    '<div class="sc_wrapper">' + '\n' +
                    '<div class="sc_data">' + '\n' +
                    '<div class="sc_data_scroll"></div>' + '\n' + '</div>' + '\n' +
                    '<div class="sc_main_box">' + '\n' +
                    '<div class="sc_main_scroll">' + '\n' +
                    '<div class="sc_main"></div>' + '\n' + '</div>' + '\n' + '</div>' + '\n' + '</div>' +
                    '<div class="tooltip_schedule"></div>';

                $this.append(html);
                $this.addClass(config.className);
                $this.find('.sc_main_box').on('scroll', function () {
                    $this.find('.sc_data_scroll').css('top', $(this).scrollTop() * -1);
                    $this.find('.sc_header_scroll').css('left', $(this).scrollLeft() * -1);
                    $this.find('.sc_header_scroll_2').css('left', $(this).scrollLeft() * -1);
                    $this.find('.sc_header_scroll_CR3020').css('left', $(this).scrollLeft() * -1);
                });

                methods.createHTMLMenuAddDeleteApprove.apply($this, []);

                let startIndex = 0;
                if (config.screenId === 'CR3010') {
                    startIndex = 1;
                }

                for (let i = startIndex; i < config.rows.length; i++) {
                    let dataApprove = config.rows[i].data_approve;
                    for (const property in dataApprove) {
                        if (dataApprove[property] === null || dataApprove[property] === undefined) {
                            dataApprove[property] = '0';
                        }
                    }
                    config.listDataApprove.push(dataApprove);
                }

                let totalWorkTime = 0;
                let totalOverTime = 0;
                let totalRestTime = 0;
                let totalComTime = 0;
                let totalNightSurchargeTime = 0;

                for (let i = startIndex; i < config.rows.length; i++) {

                    // setting row disable
                    let ship_bord_app_flg = config.listDataApprove[i].ship_bord_app_flg;
                    let labor_manag_app_flg = config.listDataApprove[i].labor_manag_app_flg;
                    config.listDisableApprove1.push(ship_bord_app_flg);
                    config.listDisableApprove2.push(labor_manag_app_flg);
                    config.listDisableTask.push(methods._getRowDisable(config.approveLevel, ship_bord_app_flg, labor_manag_app_flg));

                    // work time, overtime, rest time get from database
                    let w = config.listDataApprove[i].work_time;
                    let o = config.listDataApprove[i].overtime_work;
                    let r = config.listDataApprove[i].rest_time;
                    let c = config.listDataApprove[i].com_holiday_work;

                    if (config.screenId === 'CR3020') {
                        totalWorkTime += parseInt(w);
                        totalOverTime += parseInt(o);
                        totalRestTime += parseInt(r);
                        totalComTime += parseInt(c);
                    }

                    let param = methods.getDataMenuApprove(i, config.listDataApprove[i],
                        ship_bord_app_flg, labor_manag_app_flg, config.approveLevel, config.rows[i].vessel_code,
                        config.screenId, config.listDisableApprove2[i], config.listDisableApprove1[i]);

                    methods.setDisableCheckboxApprove(param, config.approveLevel, labor_manag_app_flg, config.screenId,
                        config.dateChoosen, config.currentDate, config.rows[i].vessel_code, config.rows[i].work_date);

                    methods.setDisableComboboxChoose(param, config.listDataApprove[i], config.isAlwaysEnableFlag,
                        config.listDisableTask[i]);

                    let flagModeCompare = false;
                    if (config.modeCompare) {
                        flagModeCompare = true;
                        methods.getDataPlanMenuApprove(param, config.rows2[i].approve_plan);
                    }
                    let approveData = methods.setDataMenuApprove(param, flagModeCompare);
                    $("#body-data-approve").append(approveData);

                    let paramMoney = methods.getDataMenuMoney(config.rows[i].schedule, i);
                    totalNightSurchargeTime += parseInt(paramMoney.nightSurchargeMinute);
                    if (config.modeCompare) {
                        methods.getDataPlanMenuMoney(paramMoney, config.rows2[i].schedule);
                    }

                    let moneyData = methods.setDataMenuMoney(paramMoney, flagModeCompare);
                    $("#body-data-money").append(moneyData);

                }

                // Setting checkbox at approve menu
                methods._setCheckApprove.apply($this);

                if (config.rows.length === 1) {
                    $("#body-data-approve").css('display', 'none');
                }

                // Set scroll between main and approve menu
                methods.setScrollBetweenMainAndSideBarMenu.apply($this, []);

                // Add button to menu add
                methods._addTypeTask.apply($this);

                // At screen CR3020 set event click tab at menu add
                if (config.screenId === 'CR3020') {
                    methods._setEventTabMenuAddCR3020.apply($this, []);
                }

                let beforeTime = -1;

                for (let t = tableStartTime; t < tableEndTime; t += config.widthTime) {
                    if (beforeTime < 0 || Math.floor(beforeTime / 3600) !== Math.floor(t / 3600)) {
                        html = '';
                        let h1 = '' + Math.floor(t / 36000) + Math.floor(t / 3600 % 10);
                        let h1_number = parseInt(h1);
                        html += '<div class="sc_time">' + h1_number + '</div>';
                        let $time = $(html);
                        let cn = Number(Math.min(Math.ceil((t + config.widthTime) / 3600) * 3600, tableEndTime) - t);
                        let cellNum = Math.floor(cn / config.widthTime);
                        $time.width(cellNum * config.widthTimeX);
                        if (config.screenId === 'CR3010') {
                            $this.find('.sc_header_scroll').append($time);
                        }
                        if (config.screenId === 'CR3020') {
                            $this.find('.sc_header_scroll_CR3020').append($time);
                        }
                        beforeTime = t;
                    }
                }

                // In case mode compare, connect data to display in screen
                if (config.modeCompare) {
                    let array = [];

                    for (let i = 0; i < config.rows.length; i++) {

                        if (config.rows2[i]) {
                            array.push(config.rows2[i]);
                        } else {
                            array.push({});
                        }

                        array.push(config.rows[i]);
                    }

                    config.rows = array;
                    for (let i in config.rows) {
                        methods._addRow.apply($this, [i, config.rows[i]]);
                    }

                } else {
                    for (let i in config.rows) {
                        methods._addRow.apply($this, [i, config.rows[i]]);
                    }
                }

                // At screen CR3010 setting vessel schedule at first line
                if (config.screenId === 'CR3010') {
                    if (config.modeCompare) {
                        methods._addRowVesselSchedule.apply($this, [config.rows[1]]);
                    } else {
                        methods._addRowVesselSchedule.apply($this, [config.rows[0]]);
                    }
                }

                // At screen CR3020 add row total at the end of schedule
                if (config.screenId === 'CR3020' && config.rows.length > 0) {
                    methods._addRowTotalSchedule.apply($this, []);
                    let tempTime = '00:00';
                    // setting time in row total
                    let workTime = methods.formatTime2(totalWorkTime);
                    let overtimeWork = methods.formatTime2(totalOverTime);
                    let comHolidayWork = methods.formatTime2(totalComTime);
                    let restTime = methods.formatTime2(totalRestTime);

                    let param = {};
                    param.i = config.listDataApprove.length;
                    param.clsCss = '';
                    param.workTime = workTime;
                    param.overtimeWork = overtimeWork;
                    param.comHolidayWork = comHolidayWork;
                    param.safeTempWork = tempTime;
                    param.restRefTime = '-';
                    param.restTime = restTime;
                    param.splitMaxRestTime = '-';
                    param.checkApprove1 = '';
                    param.checkApprove2 = '';
                    param.disableApprove1 = '';
                    param.disableApprove2 = '';
                    param.isTotal = true;
                    param.isDisableCombobox = '';

                    let approveDataTotal = methods.setDataMenuApprove(param, false, true);
                    $("#body-data-approve").append(approveDataTotal);

                    let paramMoney = {};
                    paramMoney.i = config.listDataApprove.length;
                    paramMoney.nightSurcharge = methods.formatTime2(totalNightSurchargeTime);
                    let moneyDataTotal = methods.setDataMenuMoney(paramMoney, false);
                    $("#body-data-money").append(moneyDataTotal);
                }

                methods.setAlertToApproveMenu.apply($this, [startIndex]);

                // Create tooltip
                methods.createTooltip.apply($this, []);

                $(window).on('resize', function () {
                    methods._resizeWindow.apply($this);
                }).trigger('resize');

                // Setting height depend on device, scale of screen
                methods.settingHeight.apply($this);

                // Init checkbox
                if (config.screenId === 'CR3010') {
                    methods.initCheckBox.apply($this,[1]);
                } else if (config.screenId === 'CR3020') {
                    methods.initCheckBox.apply($this,[0]);
                    if (config.scrollIndex) {
                        //$("#body-data-approve")[0].scrollTop = (config.scrollIndex - 1) * 80;
                    }
                }

            });
        }
    };
    /**
     *
     * @param {Object|string}
     *            method
     * @returns {jQuery|methods|*}
     */
    // eslint-disable-next-line no-param-reassign

    $.fn.timeSchedule = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // eslint-disable-next-line
                                                                                          // no-else-return
        } else if (_typeof(method) === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }

        $.error('Method ' + method + ' does not exist on jQuery.timeSchedule');
        return this;
    };
})(jQuery);

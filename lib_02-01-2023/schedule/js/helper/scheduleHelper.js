/**
 * Increase day one
 *
 * @param date
 * @param type
 * @returns {string}
 */
function increaseOrDecreaseDate(date,type) {
    let result = new Date(date);
    if(type === 1) {
        result.setDate(result.getDate() + 1);
    } else {
        result.setDate(result.getDate() - 1);
    }
    let month = (result.getMonth() + 1).toString().padStart(2, '0');
    let day = result.getDate().toString().padStart(2, '0');
    let year = result.getFullYear();
    return [year, month, day].join('/');
}

function getArrayCheckbox(length) {

    let arrayDay = [];
    for (let i = 0; i < length; i++) {
        if (GetValCnk('cnkId_' + i.toString())) {
            arrayDay.push(true);
        } else {
            arrayDay.push(false);
        }
    }

    return arrayDay;
}

function createParamChangeCmb(i, sel, data) {

    let workTimeMinute = parseInt(data[i].data_approve.com_holiday_work);
    let timeComHolidayWork = parseInt(data[i].data_approve.work_time);

    return {
        usr_code: data[i].usr_code,
        wrk_date: data[i].work_date,
        code_change: sel.value,
        alo_uid: data[i].alo_uid,
        work_time: workTimeMinute,
        com_holiday_work: timeComHolidayWork,
        index: i,
    }
}

function createDataChangeRestRefTime(i, restRefTime, data) {
    return {
        usr_code: data[i].usr_code,
        wrk_date: data[i].work_date,
        rest_ref_time: restRefTime,
        index: i,
    }
}

/**
 * Increase month one
 *
 * @param date
 * @param type
 * @returns {string}
 */
function increaseOrDecreaseMonth(date, type) {
    let result = new Date(date + "/01");
    let newMonth = result.getMonth() + 1;
    let newYear = result.getFullYear();
    if(type === 1) {
        newMonth += 1;
    } else {
        newMonth -= 1;
    }
    if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
    }
    if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
    }
    newMonth = newMonth.toString().padStart(2, '0');
    return [newYear, newMonth].join('/');
}

/**
 * Get param to display sidebar before search
 *
 * @param arrBtn
 * @param arrSidebar
 * @returns {{}}
 */
function getParamOfSideBar(arrBtn, arrSidebar) {
    let idSideBar = '';
    let idBtn = '';
    let flag = false;
    let width = '0';
    let paddingLeft = '0';
    for (let i = 0; i < arrBtn.length; i++) {
        if ($('#' + arrBtn[i]).hasClass("down")) {
            flag = true;
            idBtn = arrBtn[i];
            idSideBar = arrSidebar[i];
            width = document.getElementById(arrSidebar[i]).style.width;
            paddingLeft = document.getElementById(arrSidebar[i]).style.paddingLeft;
        }
    }

    let param = {};
    param.flag = flag;
    param.idBtn = idBtn;
    param.idSideBar = idSideBar;
    param.width = width;
    param.paddingLeft = paddingLeft;
    param.deleteMode = $("#schedule").timeSchedule('getDeleteMode');

    return param;
}

function setToggleButtonAdvance() {
    if ($('#advanced-switch-btn').hasClass("down")) {
        $('#advanced-switch-btn').toggleClass("down", false);
    } else {
        $('#advanced-switch-btn').toggleClass("down", true);
    }
}

/**
 * Set param to display sidebar, toggle button after search
 *
 * @param param
 */
function setParamToSideBar(param) {
    if (param.flag) {
        $('#' + param.idBtn).toggleClass("down", true);
        document.getElementById(param.idSideBar).style.width = param.width;
        document.getElementById(param.idSideBar).style.paddingLeft = param.paddingLeft;
        if (param.idBtn === 'delete-btn') {
            if (param.deleteMode === 1) {
                $("#schedule").timeSchedule('turnOnDeleteMode');
            } else {
                $("#schedule").timeSchedule('turnOffDeleteMode');
            }
        }
    }
}

function checkInWork(url, data){
        $.ajax({
            async: false,
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            cache: false,
            success: function(res) {
                let $schedule = $("#schedule");
                if(res.status === true){
                    $schedule.timeSchedule('setInWorkFlag', true);
                }else{
                    $schedule.timeSchedule('setInWorkFlag', false);
                }
                $schedule.timeSchedule('setMsgInWork', res.msg);
                $schedule.timeSchedule('setMsgInWorkTitle', res.msg_title);
            },
            error: function(error) {
            }
        });
}

/**
 * Draw again task in row after add, update task
 *
 * @param data
 * @param timeline
 * @param modeCompare
 * @param modeDialog
 */
function renderListTaskInLine(data, timeline, modeCompare, modeDialog) {

    if (modeCompare) {
        if (!modeDialog) {
            timeline = timeline * 2 + 1;
        }
    }
    let $schedule = $("#schedule");

    for (let i = 0; i < data.length; i++) {
        $schedule.timeSchedule('addSchedule', timeline, {
            start: data[i].start,
            end: data[i].end,
            real_start: data[i].real_start,
            real_end: data[i].real_end,
            color: data[i].color,
            background: data[i].background,
            text: data[i].text,
            data:{
                work_id: data[i].data.work_id,
                usr_code: data[i].data.usr_code,
                alo_uid: data[i].data.alo_uid,
                task_code: data[i].data.task_code,
                work_date: data[i].data.work_date,
            }
        });
    }
    let deleteMode = $schedule.timeSchedule('getDeleteMode');
    if (deleteMode === 1) {
        $schedule.timeSchedule('turnOnDeleteMode');
    } else {
        $schedule.timeSchedule('turnOffDeleteMode');
    }
}

/**
 * Reopen sidebar after search
 *
 * @param idButton
 * @param idSideBar
 * @param width
 */
function openMenu(idButton, idSideBar, width) {
    let flagDisplay = $('#' + idButton).hasClass("down");
    let $schedule = $("#schedule");
    if (!flagDisplay) {
        document.getElementById(idSideBar).style.width = width;
        document.getElementById(idSideBar).style.paddingLeft = '24px';
        document.getElementById("schedule").style.marginRight = width;
        $schedule.timeSchedule('resizeSchedule');
    } else {
        document.getElementById(idSideBar).style.width = '0';
        document.getElementById(idSideBar).style.paddingLeft = '0';
        document.getElementById("schedule").style.marginRight = '0';
        $schedule.timeSchedule('resizeSchedule');
    }

    closeOtherMenu(idButton);

    if (idButton === "delete-btn") {
        let deleteMode = $schedule.timeSchedule('getDeleteMode');
        if (deleteMode === null) {
            $schedule.timeSchedule('turnOnDeleteMode');
        } else {
            $schedule.timeSchedule('turnOffDeleteMode');
        }
    } else {
        $schedule.timeSchedule('turnOffDeleteMode');
    }
}

function disableThreeButton() {
    let $deleteBtn = $('#delete-btn');
    let $addBtn = $('#add-btn');
    let $approveBtn = $('#approve-btn');
    let $moneyBtn = $('#money-btn');
    closeAllMenu();

    if (isModeAdvance) {
        $deleteBtn.prop('disabled', true);
        $addBtn.prop('disabled', true);
        $approveBtn.prop('disabled', true);
        $moneyBtn.prop('disabled', true);
    } else {
        $deleteBtn.prop('disabled', false);
        $addBtn.prop('disabled', false);
        $approveBtn.prop('disabled', false);
        $moneyBtn.prop('disabled', false);
    }
}

function disableOtherButton() {
    let $radio0 = $('#radio-0');
    let $radio1 = $('#radio-1');
    let $reflectBtn = $('#reflected-results-btn');

    if (isModeAdvance) {
        $radio0.prop('disabled', true);
        $radio1.prop('disabled', true);
        $reflectBtn.prop('disabled', true);
    } else {
        $radio0.prop('disabled', false);
        $radio1.prop('disabled', false);
        if ($radio1.is(':checked')) {
            $reflectBtn.prop('disabled', false);
        }
    }
}

function closeAllMenu() {
    let arrBtn = ['delete-btn', 'add-btn', 'approve-btn', 'money-btn'];
    let arrSidebar = ['sidebar-menu-delete', 'sidebar-menu-add', 'sidebar-menu-approve', 'sidebar-menu-money'];
    for (let i = 0; i < arrBtn.length; i++) {
        $('#' + arrBtn[i]).toggleClass("down", false);
        document.getElementById(arrSidebar[i]).style.width = "0";
        document.getElementById(arrSidebar[i]).style.paddingLeft = "0";
        document.getElementById("schedule").style.marginRight = '0';
    }
    let $schedule = $("#schedule");
    $schedule.timeSchedule('resizeSchedule');
}

/**
 * Close sidebar menu by id of button
 *
 * @param idButton
 */
function closeOtherMenu(idButton) {
    let arrBtn = ['delete-btn', 'add-btn', 'approve-btn', 'money-btn'];
    let arrSidebar = ['sidebar-menu-delete', 'sidebar-menu-add', 'sidebar-menu-approve', 'sidebar-menu-money'];
    for (let i = 0; i < arrBtn.length; i++) {
        if (arrBtn[i] !== idButton) {
            $('#' + arrBtn[i]).toggleClass("down", false);
            document.getElementById(arrSidebar[i]).style.width = "0";
            document.getElementById(arrSidebar[i]).style.paddingLeft = '0';
        }
    }
}

function showMsgReload(title, message, callback) {
    $.confirm({
        title: title,
        content: message,
        buttons: {
            confirm: {
                text: 'はい',
                action: function () {
                    callback();
                }
            }
        }
    });
}

function createAdvanceGrid(data, idScreen) {

    let headerAdvanceHTMl = createAdvanceHeader(idScreen);

    $('#advance').append(
        '<div class="line-top-schedule"></div>' +
        '<table class="table-advance">' + headerAdvanceHTMl +
        '<tbody id="body-data-advance" class="body-data-advance" ></tbody>' +
        '</table>'
    );

    setDataAdvance(data, idScreen);
}

function createAdvanceHeader(idScreen) {
    let info = '船名／日付';
    if (idScreen === 'CR3010') {
        info = '船員名／時間';
    }

    let headerAdvanceHTMl = '<thead><tr class="header-advance-tr-1">' +
        '<th class="column-info" colspan="1" rowspan="2">' + info + '</th>' +
        '<th class="column-name" colspan="1" rowspan="2">作業種別</th>' +
        '<th colspan="2" rowspan="1">実打刻時間</th>' +
        '<th class="column-work-time" colspan="1" rowspan="2">1日当たりの<br>労働時間</th>' +
        '<th class="column-overtime-work" colspan="1" rowspan="2">時間外労働</th>' +
        '<th class="column-holiday-work-time" colspan="1" rowspan="2">補償休日労働</th>' +
        '<th class="column-hours-per-hour" colspan="1" rowspan="2">1週間当たりの<br>労働時間</th>' +
        '<th class="column-holiday-occurs-time" colspan="1" rowspan="2">補償休日が生<br>じる一時間</th>' +
        '<th class="column-over-time" colspan="1" rowspan="2">超過時間数</th>' +
        '<th class="column-safe-temp-work" colspan="1" rowspan="2">安全臨時労働</th>' +
        '<th class="column-compensatory-time" colspan="1" rowspan="2">休日又は補償休日</th>' +
        '<th class="column-paid-holiday-time" colspan="1" rowspan="2">有給休暇</th>' +
        '<th class="column-rest-ref-time" colspan="1" rowspan="2">休息基準時間<br>(非推奨)</th>' +
        '<th colspan="2" rowspan="1">休息時間</th>' +
        '<th class="column-number-alert" colspan="1" rowspan="2">アラート件数</th>' +
        '</tr>' +
        '<tr class="header-advance-tr-1">' +
        '<th class="column-start" colspan="1" rowspan="1">開始</th>' +
        '<th class="column-end" colspan="1" rowspan="1">終了</th>' +
        '<th class="column-rest-time" colspan="1" rowspan="1">時間数</th>' +
        '<th class="column-split-max-rest-time" colspan="1" rowspan="1">長い方の時間</th>' +
        '</tr></thead>';
    return headerAdvanceHTMl;
}

function setDataAdvance(data, idScreen) {

    let startIndex = 0;
    if (idScreen === "CR3010") {
        startIndex = 1;
    }

    for (let i = startIndex; i < data.length; i++) {
        let dataApprove = data[i].data_approve;
        for (const property in dataApprove) {
            if (dataApprove[property] === null || dataApprove[property] === undefined) {
                dataApprove[property] = '0';
            }
        }
    }

    let listTask = [];
    let totalWorkTime = 0;
    let totalRestTime = 0;
    let totalOverTime = 0;
    let totalComHolidayWork = 0;
    let totalAlert = 0;

    for (let i = startIndex; i < data.length; i++) {

        let dataApprove = data[i].data_approve;
        let schedule = data[i].schedule;
        let taskNameList = [];
        let taskStartTime = [];
        let taskEndTime = [];
        let usrCode = [];
        let workUid = [];
        let color = [];
        let backgroundColor = [];
        let $titleJquery = $($.parseHTML(data[i].title));
        $titleJquery.find('.header-td-checkbox').remove();
        $titleJquery.find('tr').addClass('tr-header-title');
        if (dataApprove.labor_manag_app_flg === '1') {
            $titleJquery.find('tr.tr-header-title').append('<td class="approve-label-mode-advance"><span class="advance-first-column-red">承認済</span></td>');
        } else if (dataApprove.ship_bord_app_flg === '1') {
            $titleJquery.find('tr.tr-header-title').append('<td class="approve-label-mode-advance"><span class="advance-first-column-blue">打刻締</span></td>');
        }
        $titleJquery.find('tbody').addClass('info-column-mode-advance');
        let title = $titleJquery.html().replaceAll('tbody', 'table');

        for (let j = 0; j < schedule.length; j++) {
            taskNameList.push(schedule[j].text);
            taskStartTime.push(schedule[j].real_start);
            if (schedule[j].real_end === null) {
                taskEndTime.push('');
            } else {
                taskEndTime.push(schedule[j].real_end);
            }
            usrCode.push(schedule[j].data.usr_code);
            workUid.push(schedule[j].data.work_id);
            color.push(schedule[j].color);
            backgroundColor.push(schedule[j].background);
            if (idScreen === "CR3020") {
                listTask.push({id: schedule[j].data.work_id, data: schedule[j].data, vesselCode: data[i].vessel_code});
            } else {
                listTask.push({id: schedule[j].data.work_id, data: schedule[j].data});
            }
        }

        // work time, overtime, rest time get from database
        let w = dataApprove.work_time;
        let o = dataApprove.overtime_work;
        let r = dataApprove.rest_time;
        let c = dataApprove.com_holiday_work;

        if (idScreen === "CR3020") {
            totalWorkTime += parseInt(w);
            totalOverTime += parseInt(o);
            totalRestTime += parseInt(r);
            totalComHolidayWork += parseInt(c);
            if (dataApprove.num_alert) {
                totalAlert += dataApprove.num_alert;
            }
        }

        // setting time in approve menu
        let workTime = formatTime2(w);
        let overtimeWork = formatTime2(o);
        let comHolidayWork = formatTime2(c);
        let safeTempWork = formatTime2(dataApprove.safe_temp_work);
        let restRefTime = dataApprove.rest_ref_time;
        let restTime = formatTime2(r);
        let splitMaxRestTime = formatTime2(dataApprove.split_max_rest_time);
        let compensatoryTime = dataApprove.compensatory_time;
        let holidayTime = dataApprove.holiday_time;
        let numAlert = 0;
        if (dataApprove.num_alert) {
            numAlert = dataApprove.num_alert;
        }

        let param = {};
        param.i = i;
        param.title = title;
        param.taskNameList = taskNameList;
        param.taskStartTime = taskStartTime;
        param.taskEndTime = taskEndTime;
        param.usrCode = usrCode;
        param.workUid = workUid;
        param.workTime = workTime;
        param.overtimeWork = overtimeWork;
        param.comHolidayWork = comHolidayWork;
        param.safeTempWork = safeTempWork;
        param.restRefTime = restRefTime;
        param.restTime = restTime;
        param.splitMaxRestTime = splitMaxRestTime;
        param.compensatoryTime = compensatoryTime;
        param.holidayTime = holidayTime;
        param.numAlert = numAlert;
        param.color = color;
        param.backgroundColor = backgroundColor;
        param.hours_per_hour = dataApprove.hours_per_hour;

        let advanceData = setDataBodyAdvance(param);

        $("#body-data-advance").append(advanceData);
    }

    if (idScreen === "CR3020" && data.length > 0) {
        addRowTotalCR3020(data.length, totalWorkTime, totalOverTime, totalRestTime, totalAlert, totalComHolidayWork);
    }

    let list = $("td[id^='hasTask_']");
    for (let i = 0; i < list.length; i++) {

        let workUid = $(list[i]).attr("id").replace("hasTask_", "");
        let dat = listTask.find(x => x.id.toString() === workUid).data;
        let vesselCode;
        let timeline;
        if (idScreen === "CR3020") {
            vesselCode = listTask.find(x => x.id.toString() === workUid).vesselCode;
            timeline = getTimelineByWorkDate(dat.work_date);
        } else {
            vesselCode = getSelectedIdCmb('vessel_cmb');
            timeline = getTimelineByUsrcode(dat.usr_code);
        }

        $(list[i]).dblclick(function() {
            let is_update = '1';
            let $schedule = $("#schedule");
            if (!$schedule.timeSchedule('getIsAlwaysEnableFlag')) {
                let disableFlag = $schedule.timeSchedule('getRowDisable', timeline);
                if (disableFlag) {
                    is_update = '0';
                }
            }
            if (!checkCrewIsInCompany(data, dat.work_date) && idScreen === "CR3020") {
                is_update = '2';
            }
            showUpdateDialog(dat.usr_code, dat.work_date, vesselCode, workUid, dat.alo_uid, idScreen, is_update);
        });

        $(list[i]).hover(
            function() {
                $(list[i]).css('cursor', 'pointer');
            }, function() {
                $(list[i]).css('cursor', 'default');
            }
        );
    }

    setWidthColumnTableModeAdvance();
    window.addEventListener('resize', setWidthColumnTableModeAdvance);
}

function checkCrewIsInCompany(data, workDate) {
    let title = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].work_date === workDate) {
            title = data[i].title;
        }
    }
    let pos = title.search("disabled");
    return pos === -1;
}

function setWidthColumnTableModeAdvance() {

    if (getZoom() > 180) {
        $("tbody.body-data-advance tr td[class^='td-']").css('font-size', '10px');
    } else {
        $("tbody.body-data-advance tr td[class^='td-']").css('font-size', '');
    }

    let $columnInfo = $("th.column-info");
    let $tdInfo = $("tbody.body-data-advance tr td.td-info");
    $columnInfo.css('min-width','215px');
    $tdInfo.css('min-width', '215px');
    $tdInfo.css('width', $columnInfo.first().outerWidth());

    let $columnName = $("th.column-name");
    let $tdName = $("tbody.body-data-advance tr td.td-name");
    $columnName.css('min-width','120px');
    $tdName.css('min-width', '120px');
    $tdName.css('width', $columnName.first().outerWidth());

    let $columnStart = $("th.column-start");
    let $tdStart = $("tbody.body-data-advance tr td.td-start");
    $columnStart.css('min-width','120px');
    $tdStart.css('min-width', '120px');
    $tdStart.css('width', $columnStart.first().outerWidth());

    let $columnEnd = $("th.column-end");
    let $tdEnd = $("tbody.body-data-advance tr td.td-end");
    $columnEnd.css('min-width','120px');
    $tdEnd.css('min-width', '120px');
    $tdEnd.css('width', $columnEnd.first().outerWidth());

    let $columnWorkTime = $("th.column-work-time");
    $columnWorkTime.css('min-width','32px');
    let $workTime = $("tbody.body-data-advance tr td.td-work-time");
    $workTime.css('width', $columnWorkTime.first().outerWidth() - 1);

    let $columnOvertimeWork = $("th.column-overtime-work");
    $columnOvertimeWork.css('min-width','32px');
    let $overtimeWork = $("tbody.body-data-advance tr td.td-overtime-work");
    $overtimeWork.css('width', $columnOvertimeWork.first().outerWidth() - 1);

    let $columnHolidayWorkTime = $("th.column-holiday-work-time");
    $columnHolidayWorkTime.css('min-width','32px');
    let $holidayWorkTime = $("tbody.body-data-advance tr td.td-holiday-work-time");
    $holidayWorkTime.css('width', $columnHolidayWorkTime.first().outerWidth() - 1);

    let $columnHoursPerHour = $("th.column-hours-per-hour");
    $columnHoursPerHour.css('min-width','32px');
    let $hoursPerHours = $("tbody.body-data-advance tr td.td-hours-per-hour");
    $hoursPerHours.css('width', $columnHoursPerHour.first().outerWidth() - 1);

    let $columnHolidayOccursTime = $("th.column-holiday-occurs-time");
    $columnHolidayOccursTime.css('min-width','32px');
    let $holidayOccursTime = $("tbody.body-data-advance tr td.td-holiday-occurs-time");
    $holidayOccursTime.css('width', $columnHolidayOccursTime.first().outerWidth());

    let $columnOverTime = $("th.column-over-time");
    $columnOverTime.css('min-width','32px');
    let $overTime = $("tbody.body-data-advance tr td.td-over-time");
    $overTime.css('width', $columnOverTime.first().outerWidth());

    let $columnSafeTempWork = $("th.column-safe-temp-work");
    $columnSafeTempWork.css('min-width','32px');
    let $safeTempWork = $("tbody.body-data-advance tr td.td-safe-temp-work");
    $safeTempWork.css('width', $columnSafeTempWork.first().outerWidth());

    let $columnCompensatoryTime = $("th.column-compensatory-time");
    $columnCompensatoryTime.css('min-width','32px');
    let $compensatoryTime = $("tbody.body-data-advance tr td.td-compensatory-time");
    $compensatoryTime.css('width', $columnCompensatoryTime.first().outerWidth());

    let $columnPaidHolidayTime = $("th.column-paid-holiday-time");
    $columnPaidHolidayTime.css('min-width','32px');
    let $paidHolidayTime = $("tbody.body-data-advance tr td.td-paid-holiday-time");
    $paidHolidayTime.css('width', $columnPaidHolidayTime.first().outerWidth());

    let $columnRestRefTime = $("th.column-rest-ref-time");
    $columnRestRefTime.css('min-width','32px');
    let $restRefTime = $("tbody.body-data-advance tr td.td-rest-ref-time");
    $restRefTime.css('width', $columnRestRefTime.first().outerWidth());

    let $columnRestTime = $("th.column-rest-time");
    $columnRestTime.css('min-width','32px');
    let $restTime = $("tbody.body-data-advance tr td.td-rest-time");
    $restTime.css('width', $columnRestTime.first().outerWidth());

    let $columnSplitMaxRestTime = $("th.column-split-max-rest-time");
    $columnSplitMaxRestTime.css('min-width','32px');
    let $splitMaxRestTime = $("tbody.body-data-advance tr td.td-split-max-rest-time");
    $splitMaxRestTime.css('width', $columnSplitMaxRestTime.first().outerWidth());

    $("tbody.body-data-advance tr td[id^='number-alert-']").css('width', $('.column-number-alert').first().outerWidth());
}

function getZoom() {
    return ((window.outerWidth - 10) / window.innerWidth) * 100;
}

function formatTime2(val) {
    let h = '' + Math.floor(val / 600) + Math.floor(val / 60 % 10);
    let i_number = val - (parseInt(h) * 60);
    let i;
    if (i_number < 10) {
        i = '0' + i_number;
    } else {
        i = '' + i_number;
    }
    return h + ':' + i;
}

function setDataBodyAdvance(param) {

    if (param.taskNameList.length < 3) {
        while (param.taskNameList.length < 3) {
            param.taskNameList.push('&nbsp;');
            param.taskStartTime.push('&nbsp;');
            param.taskEndTime.push('&nbsp;');
        }
    }
    let rowSpan = " rowspan=" + param.taskNameList.length;

    let approveMenu = '<tr id="advance_' + param.i + '" class="highlight-top-border">';
    approveMenu = approveMenu + '<td' + rowSpan +' class="td-info">'+ param.title + '</td>';

    if (param.taskNameList[0] === "&nbsp;") {
        approveMenu = approveMenu + '<td class="td-name">' + param.taskNameList[0] + '</td>' +
            '<td class="td-start">' + param.taskStartTime[0] + '</td>' +
            '<td class="td-end">' + param.taskEndTime[0] + '</td>';
    } else {
        approveMenu = approveMenu + '<td class="td-name" id="hasTask_' + param.workUid[0] +
            '" style="color: ' + param.color[0] + '; background-color: ' + param.backgroundColor[0] +
            ';">' + param.taskNameList[0] + '</td>' +
            '<td class="td-start" id="hasTask_' + param.workUid[0] + '">' + param.taskStartTime[0] + '</td>' +
            '<td class="td-end" id="hasTask_' + param.workUid[0] + '">' + param.taskEndTime[0] + '</td>';
    }

    let cmbCompensatory = '';
    let cmbHoliday = '';

    if (!param.isTotal) {
        cmbCompensatory = createHTMLComboboxInApproveMenu(true, param.compensatoryTime);
        cmbHoliday = createHTMLComboboxInApproveMenu(false, param.holidayTime);
    }

    approveMenu = approveMenu + '<td class="td-work-time" id="work-time-' + param.i + '"' + rowSpan + '>' + param.workTime + '</td>' +
        '<td class="td-overtime-work" id="overtime-work-' + param.i + '"' + rowSpan + '>' + param.overtimeWork + '</td>' +
        '<td class="td-holiday-work-time" id="holiday-work-time-' + param.i + '"' + rowSpan + '>' + param.comHolidayWork + '</td>' +
        '<td class="td-hours-per-hour" id="hours-per-hour-' + param.i + '"' + rowSpan + '>' + ((!param.isTotal && typeof param.hours_per_hour !== 'undefined') ? param.hours_per_hour : '_') +  '</td>' +
        '<td class="td-holiday-occurs-time" id="holiday-occurs-time-' + param.i + '"' + rowSpan + '>' + '_' + '</td>' +
        '<td class="td-over-time" id="over-time-' + param.i + '"' + rowSpan + '>' + '_' + '</td>' +
        '<td class="td-safe-temp-work" id="safe-temp-work-' + param.i + '"' + rowSpan + '>' + param.safeTempWork + '</td>' +
        '<td class="td-compensatory-time" id="compensatory-time-' + param.i + '"' + rowSpan + '>' + cmbCompensatory + '</td>' +
        '<td class="td-paid-holiday-time" id="paid-holiday-time-' + param.i + '"' + rowSpan + '>' + cmbHoliday + '</td>' +
        '<td class="td-rest-ref-time" id="rest-ref-time-' + param.i + '"' + rowSpan + '>' + param.restRefTime + '</td>' +
        '<td class="td-rest-time" id="rest-time-' + param.i + '"' + rowSpan + '>' + param.restTime + '</td>' +
        '<td class="td-split-max-rest-time" id="split-max-rest-time-' + param.i + '"' + rowSpan + '>' + param.splitMaxRestTime + '</td>';

    let htmlAlertLink = param.numAlert + '件';
    if (param.numAlert > 0 && param.title !== '合計') {
        htmlAlertLink = '<a class="alertLinkColorRed" href="#" onclick="showInfo(' + param.i + ')">' + param.numAlert + '件</a>';
    }
    approveMenu = approveMenu + '<td id="number-alert-' + param.i + '"' + rowSpan +'>'+ htmlAlertLink + '</td>';

    approveMenu = approveMenu + '</tr>';

    for (let t = 1; t < param.taskNameList.length; t ++) {
        let approveMenu1 = '<tr>';

        if (param.taskNameList[t] === "&nbsp;") {
            approveMenu1 = approveMenu1 + '<td class="td-name">' + param.taskNameList[t] + '</td>' +
                '<td class="td-start">' + param.taskStartTime[t] + '</td>' +
                '<td class="td-end">' + param.taskEndTime[t] + '</td>';
        } else {
            approveMenu1 = approveMenu1 + '<td class="td-name" id="hasTask_' + param.workUid[t] +
                '" style="color: ' + param.color[t] + '; background-color: ' + param.backgroundColor[t] +
                ';">' + param.taskNameList[t] + '</td>' +
                '<td class="td-start" id="hasTask_' + param.workUid[t] + '">' + param.taskStartTime[t] + '</td>' +
                '<td class="td-end" id="hasTask_' + param.workUid[t] + '">' + param.taskEndTime[t] + '</td>';
        }

        approveMenu1 = approveMenu1 + '</tr>';
        approveMenu += approveMenu1;
    }

    return approveMenu;
}

function createHTMLComboboxInApproveMenu(flagCombobox, value) {
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
        if (value) {
            if (listValCombobox[i].value === value.toString()) {
                rs = listValCombobox[i].text;
            }
        }
    }

    return rs;
}

function addRowTotalCR3020(i, totalWorkTime, totalOverTime, totalRestTime, totalAlert, totalComHolidayWork) {
    let param = {};
    param.i = i;
    param.title = '合計';
    param.taskNameList = [];
    param.taskStartTime = [];
    param.taskEndTime = [];
    param.workUid = '';
    param.workTime = formatTime2(totalWorkTime);
    param.overtimeWork = formatTime2(totalOverTime);
    param.comHolidayWork = formatTime2(totalComHolidayWork);
    param.safeTempWork = '00:00';
    param.restRefTime = '-';
    param.restTime = formatTime2(totalRestTime);
    param.splitMaxRestTime = '00:00';
    param.numAlert = totalAlert;
    param.isTotal = true;

    $("#body-data-advance").append(setDataBodyAdvance(param));
}

function formatTimeInput(timeStr){
    if (timeStr.length === 3 || timeStr.length === 4) {

        if (timeStr.length === 3) {
            timeStr = '0' + timeStr;
        }

        timeStr = timeStr.substring(0, 2) + ':' + timeStr.substring(2, timeStr.length);
    }

    if (timeStr === '24:00') {
        timeStr = '00:00';
    }

    return timeStr;
}

function getCurrentDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}

function checkDataApproveNotEmpty(dataApprove) {
    if (dataApprove.compensatory_time && dataApprove.compensatory_time !== '0') {
        return true;
    }

    if (dataApprove.holiday_time && dataApprove.holiday_time !== '0' ) {
        return true;
    }

    if (dataApprove.rest_ref_time && dataApprove.rest_ref_time !== '00:00') {
        return true;
    }

    return false;
}

function showMessageWhenCopyPlanToReal(titleInfo, titleConfirm, msgInfo, msgConfirm, listParamTaskPlan, listParam, numberCheckboxChecked, callback) {
    if (numberCheckboxChecked > listParam.length) {
        showMsg(titleInfo, msgInfo, function () {
            if (listParam.length > 0) {
                showMsg(titleConfirm, msgConfirm, function () {
                    callback(listParamTaskPlan, listParam);
                });
            }
        });
    } else {
        if (listParam.length > 0) {
            showMsg(titleConfirm, msgConfirm, function () {
                callback(listParamTaskPlan, listParam);
            });
        }
    }
}

function createDataCopyPlanToReal(listData, arrayCrew) {
    let listParamTaskPlan = [];
    let listParam = [];
    for (let i = 0; i < arrayCrew.length; i++) {
        if (arrayCrew[i]) {

            // Check data schedule is able to copy
            let scheduleReal = listData[i * 2 + 1].schedule;
            let schedulePlan = listData[i * 2].schedule;
            let flag = false;
            let flag1 = false;
            if (scheduleReal.length === 0) {
                flag1 = true;
                if (schedulePlan.length > 0) {
                    flag = true;
                }
            }

            // Check data approve is able to copy
            let approveReal = listData[i * 2 + 1].data_approve;
            let flag2 = false;
            if (!checkDataApproveNotEmpty(approveReal)) {
                let approvePlan = listData[i * 2].approve_plan;
                flag2 = true;
                if(checkDataApproveNotEmpty(approvePlan)) {
                    flag = true;
                }
            }

            // If data approve and schedule of real is empty
            // And data approve or schedule of plan is not empty
            // create param to copy plan to real
            if (flag1 && flag2 && flag) {
                for (let j = 0; j < schedulePlan.length; j++) {
                    let dataDelete = schedulePlan[j].data;
                    const param = {
                        usr_code: dataDelete.usr_code,
                        work_uid: dataDelete.work_id,
                        wrk_date: dataDelete.work_date
                    }
                    listParamTaskPlan.push(param);
                }
                const p = {
                    usr_code: listData[i * 2 + 1].usr_code,
                    wrk_date: listData[i * 2 + 1].work_date
                }
                listParam.push(p);
            }
        }
    }

    return {
        listParamTaskPlan: listParamTaskPlan,
        listParam: listParam
    }
}

function getCurrentDate() {

	var dateStr = new Date().toLocaleString(LOCALE, { timeZone: TIME_ZONE });
	var date = new Date(dateStr);
	var datetime = date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds());
	
	return datetime;
}

async function checkOnline() {
	if (navigator.onLine) {
		let rs = await callAPIIsAliveServer();
        if (rs) {
            return true;
        }
	}
    return false;
}

async function getNewestUpdateDateInTable(table) {

	try {

        let dataTable = await getAll(table);

        if(dataTable.length > 0) {
            let max_timestamp = Math.max.apply(Math, dataTable.map(function(obj) { return new Date(obj["UPD_DATE"]).getTime(); }))
            let max_date = new Date(max_timestamp);
            let max_upd_date = pad2(max_date.getFullYear())+"-"+pad2(max_date.getMonth()+1)+"-"+pad2(max_date.getDate())+" "+pad2(max_date.getHours())+":"+pad2(max_date.getMinutes())+":"+pad2(max_date.getSeconds());

            if(max_upd_date > getCurrentDate()) {
                return "0000-00-00 00:00:00";
            } else {
                return max_upd_date;
            }
            
        } else {
            return "0000-00-00 00:00:00";
        }
		
	} catch (error) {
		
		processError(functionName(arguments), error);

	}

}

async function getDataMasterFromServer(arr_table)
{

	try {

		let isOnline = await checkOnline();

        if(isOnline) {

            let token = getKey(SKEY.TOKEN);

            if (token == "" || token == null) {
                return false;
            }

            let arr_latest_upd = [];

            for (let i = 0; i < arr_table.length; i++) {
                let newestUpdateDate = await getNewestUpdateDateInTable(arr_table[i]);
                arr_latest_upd.push(newestUpdateDate);
            }

            let data = {
                "token" : token,
                "tbl_arr" : arr_table,
                "tbl_latest" : arr_latest_upd,
            }

            let urlGetMaster = SYS_API_ROOT_URL + "/getmaster";

            let rs = await getDataFromServer(data, urlGetMaster);

            if(rs.result === RESULT.SUCCESSFUL) {
                await fetchDataFromServerToIndexDB(arr_table, rs.data);
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

	} catch (error) {
		processError(functionName(arguments), error);
	}
	
}

async function fetchDataFromServerToIndexDB(arr_table, listData) {
    for (let i = 0; i < arr_table.length; i++) {
        await fetchDataTable(arr_table[i], listData[arr_table[i]]);
    }
}

async function fetchDataTable(tableName, data) {
    let isClearTable = await clearTable(tableName);
    if (isClearTable) {
        for(let i = 0; i < data.length; i++) {
			
			let data_row = data[i];
			
			// Encrypt password field
			if(	(tableName == CR_USER_MST['TBL_NAME'])
				|| (tableName == CR_VESSEL_MST['TBL_NAME'])
			) {
				var key = 'PASSWORD';
				let encrypPass = Enc(data_row[key]);
				data_row[key] = encrypPass;
			}
			
			await insert(tableName, data_row);
		}
    }
}

async function getDataFromServer(data, url) { 
    return $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        data: data,
        cache: false
    });
}

async function callAPIIsAliveServer() {
    return $.ajax({
        type: "GET",
        url: SYS_API_ROOT_URL + "/isaliveserver",
    });
}

function processError(functionName, error) {
	return false;
}

function functionName(arguments) {
	return arguments.callee.toString().match(/function ([^\(]+)/)[1];
}

function Enc(text)
{
	if(text == null || text =='')
	{
		return '';
	}
	
	var salt = "salt";
	const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
	  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
	  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

	  return text
	    .split("")
	    .map(textToChars)
	    .map(applySaltToChar)
	    .map(byteHex)
	    .join("");
}
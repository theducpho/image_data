async function initDB() {
	document.addEventListener('contextmenu', function(event) { event.preventDefault()});

	const databaseName = "TRANS_CREW";
	const request = indexedDB.open(databaseName, 1);

	request.onerror = function(event) {
		console.error('Database error: ' + event.target.error);
		return false;
	};

	// Initial tables
	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		
		addTable(db, CR_ACS_MST['TBL_NAME'], CR_ACS_MST_IDX);
		addTable(db, CR_PRG_MST['TBL_NAME'], CR_PRG_MST_IDX);
		addTable(db, CR_ACS_ROLE_MST['TBL_NAME'], CR_ACS_ROLE_MST_IDX);
		addTable(db, CR_ALO_DAT['TBL_NAME'], CR_ALO_DAT_IDX);
		addTable(db, CR_BMN_MST['TBL_NAME'], CR_BMN_MST_IDX);
		addTable(db, CR_CMP_MST['TBL_NAME'], CR_CMP_MST_IDX);
		addTable(db, CR_CODE_MST['TBL_NAME'], CR_CODE_MST_IDX);
		addTable(db, CR_DAY_REC_DAT['TBL_NAME'], CR_DAY_REC_DAT_IDX);
		addTable(db, CR_DAY_PLAN_DAT['TBL_NAME'], CR_DAY_PLAN_DAT_IDX);
		addTable(db, CR_EMP_FORM_MST['TBL_NAME'], CR_EMP_FORM_MST_IDX);
		addTable(db, CR_FLE_MOV_DAT['TBL_NAME'], CR_FLE_MOV_DAT_IDX);
		addTable(db, CR_HOL_EXP_DAT['TBL_NAME'], CR_HOL_EXP_DAT_IDX);
		addTable(db, CR_HOL_GRA_MST['TBL_NAME'], CR_HOL_GRA_MST_IDX);
		addTable(db, CR_HOL_REM_DAT['TBL_NAME'], CR_HOL_REM_DAT_IDX);
		addTable(db, CR_MON_REC_DAT['TBL_NAME'], CR_MON_REC_DAT_IDX);
		addTable(db, CR_PORT_MST['TBL_NAME'], CR_PORT_MST_IDX);
		addTable(db, CR_POSITION_MST['TBL_NAME'], CR_POSITION_MST_IDX);
		addTable(db, CR_TASK_ALO_MST['TBL_NAME'], CR_TASK_ALO_MST_IDX);
		addTable(db, CR_TASK_MST['TBL_NAME'], CR_TASK_MST_IDX);
		addTable(db, CR_USER_MST['TBL_NAME'], CR_USER_MST_IDX);
		addTable(db, CR_VESSEL_MST['TBL_NAME'], CR_VESSEL_MST_IDX);
		addTable(db, CR_WRK_REC_DAT['TBL_NAME'], CR_WRK_REC_DAT_IDX);
		addTable(db, CR_WRK_PLAN_DAT['TBL_NAME'], CR_WRK_PLAN_DAT_IDX);
		addTable(db, CR_MSG_MST['TBL_NAME'], CR_MSG_MST_IDX);

		return true;
	};
}

function addTable(db, tableName, indexCols) {
	
	// add table
	var store = db.createObjectStore(tableName, {
		'keyPath': 'id',
		autoIncrement: true
	});
	
	var data = [];
	for (var key in indexCols) {
		data.push(indexCols[key]);
	}
	
	var index = store.createIndex("IDX", data, {
		unique: true
	});
}

async function getAll(tableName) {

	return new Promise(function(resolve, reject) {
		let request = indexedDB.open(SYS_DB_NAME);

		request.onsuccess = e => {
		
			var db = e.target.result;
			
			var data = [];
			
			const txn = db.transaction(tableName, "readonly");
			const objectStore = txn.objectStore(tableName);
	
			objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
	
				if (cursor) {
					var contact = cursor.value;
					 
					data.push(contact);
				   
					// continue next record
					cursor.continue();
				}
				else {
					resolve(data);
				}
			};
			
			// close the database connection
			txn.oncomplete = function () {
				db.close();
			};
		}

	});

}

async function insert(tableName, data) {

	return new Promise(function(resolve, reject) {
		var request = indexedDB.open(SYS_DB_NAME);
		
		request.onsuccess = function (e){
			
			var db = e.target.result;
			// create a new transaction
			const txn = db.transaction(tableName, 'readwrite');

			// get the tableName object store
			const store = txn.objectStore(tableName);
			//
			var query = store.put(data);

			// handle success case
			query.onsuccess = function (event) {
				resolve(true);
			};

			// handle the error case
			query.onerror = function (event) {
				resolve(false);
			}

			// close the database once the
			// transaction completes
			txn.oncomplete = function () {
				db.close();
			};
		}
	});
}

async function clearTable(tableName, callback) {
	
	return new Promise(function(resolve, reject) {
		var request = indexedDB.open(SYS_DB_NAME);
	
		request.onsuccess = function (e){
			
			var db = e.target.result;
			
			const txn = db.transaction(tableName, 'readwrite');
			const store = txn.objectStore(tableName);
			
			const storeRequest = store.clear();

			storeRequest.onsuccess = function(event) {
				resolve(true);
			};

			storeRequest.onerror = function(event) {
				resolve(false);
			}

			txn.oncomplete = function () {
				db.close();
			};
		}
	});
}
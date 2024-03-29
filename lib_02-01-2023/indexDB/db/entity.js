const CR_ACS_MST 		= {
    TBL_NAME: "CR_ACS_MST"
    , ACCESS_CODE : "ACCESS_CODE"				// VARCHAR(10) NOT NULL,
    ,  ACCESS_NAME:"ACCESS_NAME"				// VARCHAR(40)  ,
    ,  APPROVE_LEVEL:"APPROVE_LEVEL" 			// DECIMAL  ,
    ,  HOLIDAY_EDIT_AUTH: "HOLIDAY_EDIT_AUTH" 	// DECIMAL  ,
    ,  HOL_GRA_EDIT_AUTH :"HOL_GRA_EDIT_AUTH" 	// DECIMAL  ,
    ,  REMARKS:"REMARKS"						// VARCHAR(255)  ,
    ,  INP_DATE:"INP_DATE" 						// DATETIME  ,
    ,  UPD_DATE:"UPD_DATE"						// DATETIME  ,
    ,  PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    ,  USR_ID:"USR_ID"							// VARCHAR(10) 
};
const CR_ACS_MST_IDX 	= {
    ACCESS_CODE: "ACCESS_CODE"					// VARCHAR(10) NOT NULL,
};


const CR_PRG_MST 	= {
    TBL_NAME: "CR_PRG_MST"
    , PRG_CODE:"PRG_CODE" 						// VARCHAR(20) NOT NULL,
    , PRG_NAME:"PRG_NAME"						// VARCHAR(40) NOT NULL,
    , SERVER_URL:"SERVER_URL"					// VARCHAR(200) NOT NULL,
    , LOCAL_URL:"LOCAL_URL"						// VARCHAR(200) NOT NULL,
    , MENU_GRP_CODE:"MENU_GRP_CODE"				// VARCHAR(10)  ,
    , DEVICE_TYPE :"DEVICE_TYPE"				// VARCHAR(10)  ,
    , SORT_KEY:"SORT_KEY"						// INT  ,
    , INP_DATE:"INP_DATE"						// DATETIME  ,
    , UPD_DATE:"UPD_DATE"						// DATETIME  ,
    , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    , USR_ID:"USR_ID"							// VARCHAR(10)   
};
const CR_PRG_MST_IDX = {
    PRG_CODE: "PRG_CODE"						// VARCHAR(20) NOT NULL,
};


const CR_ACS_ROLE_MST 	= {
    TBL_NAME: "CR_ACS_ROLE_MST"
    , ACCESS_CODE:"ACCESS_CODE"					// VARCHAR(10) NOT NULL,
    , PRG_CODE:"PRG_CODE"						// VARCHAR(20) NOT NULL,
    , EDIT_FLG:"EDIT_FLG"						// DECIMAL  ,
    , INP_DATE:"INP_DATE"						// DATETIME  ,
    , UPD_DATE:"UPD_DATE"						// DATETIME  ,
    , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    , USR_ID:"USR_ID"							// VARCHAR(10)   
};
const CR_ACS_ROLE_MST_IDX = 
{
    ACCESS_CODE: "ACCESS_CODE"					// VARCHAR(10) NOT NULL,
    , PRG_CODE: "PRG_CODE"						// VARCHAR(20) NOT NULL,
};


const CR_ALO_DAT 		= {
    TBL_NAME: "CR_ALO_DAT"
    , ALO_UID:"ALO_UID"											// INT NOT NULL,
    , USR_CODE:"USR_CODE" 										// VARCHAR(10)  ,
    , VESSEL_CODE:"VESSEL_CODE" 								// VARCHAR(10)  ,
    , STR_DATE:"STR_DATE" 										// DATETIME  ,
    , END_DATE:"END_DATE" 										// DATETIME  ,
    , EMBARKATION_POSITION_CODE:"EMBARKATION_POSITION_CODE" 	// VARCHAR(10)  ,
    , PROPER_POSITION_CODE:"PROPER_POSITION_CODE" 				// VARCHAR(10)  ,
    , INP_DATE:"INP_DATE" 										// DATETIME  ,
    , UPD_DATE:"UPD_DATE" 										// DATETIME  ,
    , PRG_ID:"PRG_ID" 											// VARCHAR(10)  ,
    , USR_ID:"USR_ID" 											// VARCHAR(10)   
};
const CR_ALO_DAT_IDX 	= {
    ALO_UID: "ALO_UID"							// INT NOT NULL,
};


const CR_BMN_MST 		= {
    TBL_NAME: "CR_BMN_MST"
    , DEP_CODE:"DEP_CODE"						// VARCHAR(10) NOT NULL,
    , DEP_NAME:"DEP_NAME"						// VARCHAR(40)  ,
    , DEP_NAME_S:"DEP_NAME_S"					// VARCHAR(20)  ,
    , DEP_NAME_K:"DEP_NAME_K"					// VARCHAR(40)  ,
    , STR_DATE:"STR_DATE"						// DATETIME  ,
    , END_DATE:"END_DATE"						// DATETIME  ,
    , INP_DATE:"INP_DATE"						// DATETIME  ,
    , UPD_DATE:"UPD_DATE"						// DATETIME  ,
    , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    , USR_ID:"USR_ID"							// VARCHAR(10)  
};
const CR_BMN_MST_IDX 	= {
    DEP_CODE: "DEP_CODE"						// VARCHAR(10) NOT NULL,
};


const CR_BOAD_DAT		= {
    TBL_NAME: "CR_BOAD_DAT"
    , CR_BOAD_UID: "CR_BOAD_UID"				// INT NOT NULL
    , CR_BOAD_STR_DATE: "CR_BOAD_STR_DATE"		// DATE
    , CR_BOAD_END_DATE: "CR_BOAD_END_DATE"		// DATE
    , CR_MESSAGE: "CR_MESSAGE"					// VARCHAR(500)
    , INP_DATE: "INP_DATE"						// DATETIME
    , UPD_DATE: "UPD_DATE"						// DATETIME
    , PRG_ID: "PRG_ID"							// VARCHAR(10)
    , USR_ID: "USR_ID"							// VARCHAR(10)
};
const CR_BOAD_DAT_IDX	= {
    CR_BOAD_UID: "CR_BOAD_UID"					// INT NOT NULL
};


const CR_CMP_MST 		= {
    TBL_NAME: "CR_CMP_MST"
    , KAI_CODE:"KAI_CODE"						// VARCHAR(10) NOT NULL,
    , KAI_NAME:"KAI_NAME"						// VARCHAR(40)  ,
    , KAI_NAME_S:"KAI_NAME_S"					// VARCHAR(20)  ,
    , ZIP:"ZIP"									// VARCHAR(10)  ,
    , JYU_KANA:"JYU_KANA"						// VARCHAR(80)  ,
    , JYU_1:"JYU_1"								// VARCHAR(50)  ,
    , JYU_2:"JYU_2"								// VARCHAR(50)  ,
    , TEL:"TEL"									// VARCHAR(12)  ,
    , FAX:"FAX"									// VARCHAR(12)  ,
    , MANAGER_NAME:"MANAGER_NAME"				// VARCHAR(20)  ,
    , INPUT_ROUND_TIME:"INPUT_ROUND_TIME"		// DECIMAL  ,
    , APROVE_FUNCTION_FLG:"APROVE_FUNCTION_FLG" // DECIMAL	,
    , APROVE_METHOD:"APROVE_METHOD"				// VARCHAR(2) NOT NULL,
    , BASE_TIME:"BASE_TIME"						// TIME NOT NULL,
    , IO_BASE_ROUND_TIME:"IO_BASE_ROUND_TIME"	// DECIMAL NOT NULL,
    , INITIAL_MONTH:"INITIAL_MONTH"				// DECIMAL NOT NULL,
    , CLOSE_DAY:"CLOSE_DAY"									// DECIMAL NOT NULL,
    , PAID_HOLIDAY_MAX_DAYS:"PAID_HOLIDAY_MAX_DAYS"			// DECIMAL NOT NULL,
    , SHIFT_PLAN_FLG:"SHIFT_PLAN_FLG"						// DECIMAL NOT NULL,
    , SHOW_TOTAL_FLG:"SHOW_TOTAL_FLG"						// DECIMAL NOT NULL,
    , INP_DATE:"INP_DATE"									// DATETIME  ,
    , UPD_DATE:"UPD_DATE"									// DATETIME  ,
    , PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
    , USR_ID:"USR_ID"										// VARCHAR(10)   
};
const CR_CMP_MST_IDX 	= {
    KAI_CODE: "KAI_CODE"									// VARCHAR(10) NOT NULL,
};


const CR_CODE_MST 		= {
    TBL_NAME: "CR_CODE_MST"
    , ITEM_CODE:"ITEM_CODE"									// VARCHAR(10) NOT NULL,
    , ITEM_NAME:"ITEM_NAME"									// VARCHAR(50)  ,
    , ITEM_SUB_CODE:"ITEM_SUB_CODE"							// VARCHAR(10) NOT NULL,
    , ITEM_SUB_NAME:"ITEM_SUB_NAME"							// VARCHAR(10)  ,
    , ITEM_SUB_NAME_S:"ITEM_SUB_NAME_S"						// VARCHAR(100)  ,
    , FORM_NAME:"FORM_NAME"									// VARCHAR(100)  ,
    , GENERIC_NUM_1:"GENERIC_NUM_1"							// DECIMAL  ,
    , GENERIC_NUM_2:"GENERIC_NUM_2"							// DECIMAL  ,
    , GENERIC_NUM_3:"GENERIC_NUM_3"							// DECIMAL  ,
    , GENERIC_ITEM_1:"GENERIC_ITEM_1"						// VARCHAR(100)  ,
    , GENERIC_ITEM_2:"GENERIC_ITEM_2"						// VARCHAR(100)  ,
    , GENERIC_ITEM_3:"GENERIC_ITEM_3"						// VARCHAR(100)  ,
    , SORT_KEY:"SORT_KEY"									// INT  ,
    , INP_DATE:"INP_DATE"									// DATETIME  ,
    , UPD_DATE:"UPD_DATE"									// DATETIME  ,
    , PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
    , USR_ID:"USR_ID"										// VARCHAR(10) 
};
const CR_CODE_MST_IDX 	= {
    ITEM_CODE: "ITEM_CODE"									// VARCHAR(10) NOT NULL,
    , ITEM_SUB_CODE: "ITEM_SUB_CODE"						// VARCHAR(10) NOT NULL,
};


const CR_DAY_REC_DAT 	= {
    TBL_NAME: "CR_DAY_REC_DAT"
    , USR_CODE:"USR_CODE"									// VARCHAR(10) NOT NULL,
    , WORK_DATE:"WORK_DATE"									// DATETIME NOT NULL,
    , VACATION_TYPE:"VACATION_TYPE"							// VARCHAR(2)  ,
    , VACATION_CLASS:"VACATION_CLASS"						// VARCHAR(2)  ,
    , VACATION_PLACE:"VACATION_PLACE"						// VARCHAR(2)  ,
    , ALO_UID:"ALO_UID"										// INT  ,
    , WORK_TIME:"WORK_TIME"									// DECIMAL  ,
    , OVERTIME_WORK:"OVERTIME_WORK"							// DECIMAL  ,
    , COM_HOLIDAY_WORK:"COM_HOLIDAY_WORK"					// DECIMAL  ,
    , SAFE_TEMP_WORK:"SAFE_TEMP_WORK"						// DECIMAL  ,
    , REST_REF_TIME:"REST_REF_TIME"							// TIME		,
    , REST_TIME:"REST_TIME"									// DECIMAL  ,
    , SPLIT_MAX_REST_TIME:"SPLIT_MAX_REST_TIME"				// DECIMAL  ,
    // , ALL_1WEEK_WORK_TIME:"ALL_1WEEK_WORK_TIME"				// DECIMAL  ,
    // , ALL_4WEEK_OVERTIME_WORK:"ALL_4WEEK_OVERTIME_WORK"		// DECIMAL  ,
    , COM_HOL_CODE: "COM_HOL_CODE"							// VARCHAR(4)	,
    , PAID_HOL_CODE: "PAID_HOL_CODE"						// VARCHAR(4)	,
    , SHIP_BORD_APP_FLG:"SHIP_BORD_APP_FLG"					// DECIMAL  ,
    , LABOR_MANAG_APP_FLG:"LABOR_MANAG_APP_FLG"				// DECIMAL  ,
    , INP_DATE:"INP_DATE"									// DATETIME  ,
    , UPD_DATE:"UPD_DATE"									// DATETIME  ,
    , PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
    , USR_ID:"USR_ID"										// VARCHAR(10)   
};

const CR_DAY_REC_DAT_IDX = {
    USR_CODE: "USR_CODE"									// VARCHAR(10) NOT NULL,
    , WORK_DATE: "WORK_DATE"								// DATETIME NOT NULL,
};

const CR_DAY_PLAN_DAT 	= {
    TBL_NAME: "CR_DAY_PLAN_DAT"
    , USR_CODE:"USR_CODE"									// VARCHAR(10) NOT NULL,
    , WORK_DATE:"WORK_DATE"									// DATETIME NOT NULL,
    , VACATION_TYPE:"VACATION_TYPE"							// VARCHAR(2)  ,
    , VACATION_CLASS:"VACATION_CLASS"						// VARCHAR(2)  ,
    , VACATION_PLACE:"VACATION_PLACE"						// VARCHAR(2)  ,
    , ALO_UID:"ALO_UID"										// INT  ,
    , WORK_TIME:"WORK_TIME"									// DECIMAL  ,
    , OVERTIME_WORK:"OVERTIME_WORK"							// DECIMAL  ,
    , COM_HOLIDAY_WORK:"COM_HOLIDAY_WORK"					// DECIMAL  ,
    , SAFE_TEMP_WORK:"SAFE_TEMP_WORK"						// DECIMAL  ,
    , REST_REF_TIME:"REST_REF_TIME"							// TIME		,
    , REST_TIME:"REST_TIME"									// DECIMAL  ,
    , SPLIT_MAX_REST_TIME:"SPLIT_MAX_REST_TIME"				// DECIMAL  ,
    // , ALL_1WEEK_WORK_TIME:"ALL_1WEEK_WORK_TIME"				// DECIMAL  ,
    // , ALL_4WEEK_OVERTIME_WORK:"ALL_4WEEK_OVERTIME_WORK"		// DECIMAL  ,
    , COM_HOL_CODE: "COM_HOL_CODE"							// VARCHAR(4)	,
    , PAID_HOL_CODE: "PAID_HOL_CODE"						// VARCHAR(4)	,
    , SHIP_BORD_APP_FLG:"SHIP_BORD_APP_FLG"					// DECIMAL  ,
    , LABOR_MANAG_APP_FLG:"LABOR_MANAG_APP_FLG"				// DECIMAL  ,
    , INP_DATE:"INP_DATE"									// DATETIME  ,
    , UPD_DATE:"UPD_DATE"									// DATETIME  ,
    , PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
    , USR_ID:"USR_ID"										// VARCHAR(10)   
};
const CR_DAY_PLAN_DAT_IDX = {
    USR_CODE: "USR_CODE"									// VARCHAR(10) NOT NULL,
    , WORK_DATE: "WORK_DATE"								// DATETIME NOT NULL,
};


const CR_EMP_FORM_MST 	= {
    TBL_NAME: "CR_EMP_FORM_MST"
     , EMP_FORM_CODE:"EMP_FORM_CODE"			// VARCHAR(10) NOT NULL,
     , EMP_FORM_NAME:"EMP_FORM_NAME"			// VARCHAR(40) NOT NULL,
     , MANN_FLG:"MANN_FLG"						// DECIMAL  ,
     , MANN_CMP_NAME:"MANN_CMP_NAME"			// VARCHAR(40)  ,
     , OVERTIME_FLG:"OVERTIME_FLG"				// DECIMAL  ,
     , COM_HOLIDAY_FLG:"COM_HOLIDAY_FLG"		// DECIMAL  ,
     , SPLIT_NUM_FLG:"SPLIT_NUM_FLG"			// DECIMAL  ,
     , SET_HOLIDAYS_FLG:"SET_HOLIDAYS_FLG"		// DECIMAL  ,
     , HOLIDAYS_NUM:"HOLIDAYS_NUM"				// DECIMAL  ,
     , ARTICLE_72_FLG:"ARTICLE_72_FLG"			// DECIMAL  ,
     , ARTICLE_72_HOL_NUM:"ARTICLE_72_HOL_NUM"	// DECIMAL  ,
     , WEEK_LIMIT_TIME:"WEEK_LIMIT_TIME"		// VARCHAR(2)  ,
     , MID_SUR_STR_TIME:"MID_SUR_STR_TIME"		// TIME  ,
     , MID_SUR_END_TIME:"MID_SUR_END_TIME"		// TIME  ,
     , START_DATE:"START_DATE"					// DATETIME NOT NULL,
     , END_DATE:"END_DATE"						// DATETIME NOT NULL,
     , INP_DATE:"INP_DATE"						// DATETIME  ,
     , UPD_DATE:"UPD_DATE"						// DATETIME  ,
     , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
     , USR_ID:"USR_ID"							// VARCHAR(10)  
};
const CR_EMP_FORM_MST_IDX = {
    EMP_FORM_CODE: "EMP_FORM_CODE"				// VARCHAR(10) NOT NULL,
};

const CR_FLE_MOV_DAT 	= {
    TBL_NAME: "CR_FLE_MOV_DAT"
    , MOV_UID:"MOV_UID"											// INT NOT NULL,
    , VESSEL_CODE:"VESSEL_CODE"									// VARCHAR(10)  ,
    , PORT_CODE:"PORT_CODE"										// VARCHAR(10)  ,
    , ARRIVAL_DATE:"ARRIVAL_DATE"								// DATETIME  ,
    , DEPARTURE_DATE:"DEPARTURE_DATE"							// DATETIME  ,
    , LANDING_PIER_DATE:"LANDING_PIER_DATE"						// DATETIME  ,
    , RIP_DATE:"RIP_DATE"										// DATETIME  ,
    , CARGO_HANDLING_START_DATE:"CARGO_HANDLING_START_DATE"		// DATETIME  ,
    , CARGO_HANDLING_END_DATE:"CARGO_HANDLING_END_DATE"			// DATETIME  ,
    , PORT_PURPOSE:"PORT_PURPOSE"								// VARCHAR(10)  ,
    , REMARKS:"REMARKS"											// VARCHAR(1000)  ,
    , INP_DATE:"INP_DATE"										// DATETIME  ,
    , UPD_DATE:"UPD_DATE"										// DATETIME  ,
    , PRG_ID:"PRG_ID"											// VARCHAR(10)  ,
    , USR_ID:"USR_ID"											// VARCHAR(10)   
};
const CR_FLE_MOV_DAT_IDX = {
    MOV_UID: "MOV_UID"				// INT NOT NULL,
};

const CR_HOL_EXP_DAT 	= {
    TBL_NAME: "CR_HOL_EXP_DAT"
    , USR_CODE:"USR_CODE"						// VARCHAR(10) NOT NULL,
    , GRANT_DATE:"GRANT_DATE"					// DATETIME NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"			// VARCHAR(10) NOT NULL,
    , GRANT_DAYS:"GRANT_DAYS"					// DECIMAL  ,
    , EXPIRASION_DATE:"EXPIRASION_DATE"			// DATETIME  ,
    , EXTINCT_DATE:"EXTINCT_DATE"				// DATETIME  ,
    , EXTINCT_DAYS:"EXTINCT_DAYS"				// DECIMAL  ,
    , REMARKS:"REMARKS"							// VARCHAR(255)  ,
    , INP_DATE:"INP_DATE"						// DATETIME  ,
    , UPD_DATE:"UPD_DATE"						// DATETIME  ,
    , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    , USR_ID:"USR_ID"							// VARCHAR(10)  
};
const CR_HOL_EXP_DAT_IDX = {
    USR_CODE: "USR_CODE"						// VARCHAR(10) NOT NULL,
    , GRANT_DATE:"GRANT_DATE"					// DATETIME NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"			// VARCHAR(10) NOT NULL,
};


const CR_HOL_GRA_MST 	= {
    TBL_NAME: "CR_HOL_GRA_MST"
    , EMP_FORM_CODE:"EMP_FORM_CODE"				// VARCHAR(10) NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"			// VARCHAR(10) NOT NULL,
    , GRANT_DIVISION:"GRANT_DIVISION"			// INT NOT NULL,
    , YEARS_AFTER:"YEARS_AFTER"					// DECIMAL NOT NULL,
    , MONTHS_AFTER:"MONTHS_AFTER"				// DECIMAL NOT NULL,
    , GRANT_DAYS:"GRANT_DAYS"					// DECIMAL  ,
    , REMARKS:"REMARKS"							// VARCHAR(255)  ,
    , INP_DATE:"INP_DATE"						// DATETIME  ,
    , UPD_DATE:"UPD_DATE"						// DATETIME  ,
    , PRG_ID:"PRG_ID"							// VARCHAR(10)  ,
    , USR_ID:"USR_ID"							// VARCHAR(10)
};
const CR_HOL_GRA_MST_IDX = {
    EMP_FORM_CODE: "EMP_FORM_CODE"				// VARCHAR(10) NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"			// VARCHAR(10) NOT NULL,
};


const CR_HOL_REM_DAT 	= {
    TBL_NAME: "CR_HOL_REM_DAT"
    , USR_CODE:"USR_CODE"								// VARCHAR(10) NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"					// VARCHAR(10) NOT NULL,
    , YEAR:"YEAR"										// DATETIME NOT NULL,
    , MONTH_DAYS_REMAINING_1:"1_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_2:"2_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_3:"3_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_4:"4_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_5:"5_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_6:"6_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_7:"7_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_8:"8_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_9:"9_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_10:"10_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_11:"11_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , MONTH_DAYS_REMAINING_12:"12_MONTH_DAYS_REMAINING"	// DECIMAL  ,
    , REMARKS:"REMARKS"									// VARCHAR(255)  ,
    , INP_DATE:"INP_DATE"								// DATETIME  ,
    , UPD_DATE:"UPD_DATE"								// DATETIME  ,
    , PRG_ID:"PRG_ID"									// VARCHAR(10)  ,
    , USR_ID:"PRG_ID"									// VARCHAR(10)    
};
const CR_HOL_REM_DAT_IDX = {
    USR_CODE: "USR_CODE"								// VARCHAR(10) NOT NULL,
    , SHIFT_ITEM_CODE:"SHIFT_ITEM_CODE"					// VARCHAR(10) NOT NULL,
    , YEAR:"YEAR"										// DATETIME NOT NULL,
};


const CR_MON_REC_DAT 	= {
    TBL_NAME: "CR_MON_REC_DAT"
    , USR_CODE:"USR_CODE"								// VARCHAR(10) NOT NULL,
    , YM:"YM"											// DATETIME NOT NULL,
    , WORK_TIME:"WORK_TIME"								// DECIMAL  ,
    , OVERTIME_WORK:"OVERTIME_WORK"						// DECIMAL  ,
    , COM_HOLIDAY_WORK:"COM_HOLIDAY_WORK"				// DECIMAL  ,
    , SAFE_TEMP_WORK:"SAFE_TEMP_WORK"					// DECIMAL  ,
    , REST_TIME:"REST_TIME"								// DECIMAL  ,
    , HOL_GRA_DAYS:"HOL_GRA_DAYS"						// DECIMAL  ,
    , COM_HOL_LAST_ZAN_DAYS:"COM_HOL_LAST_ZAN_DAYS"		// DECIMAL  ,
    , COM_HOL_GRA_DAYS:"COM_HOL_GRA_DAYS"				// DECIMAL  ,
    , COM_HOL_DIS_DAYS:"COM_HOL_DIS_DAYS"				// DECIMAL  ,
    , COM_HOL_NEXT_ZAN_DAYS:"COM_HOL_NEXT_ZAN_DAYS"		// DECIMAL  ,
    , PAID_HOL_LAST_ZAN_DAYS:"PAID_HOL_LAST_ZAN_DAYS"	// DECIMAL  ,
    , PAID_HOL_GRA_DAYS:"PAID_HOL_GRA_DAYS"				// DECIMAL  ,
    , PAID_HOL_DIS_DAYS:"PAID_HOL_DIS_DAYS"				// DECIMAL  ,
    , PAID_HOL_NEXT_ZAN_DAYS:"PAID_HOL_NEXT_ZAN_DAYS"	// DECIMAL  ,
    , REMARKS:"REMARKS"									// VARCHAR(255)  ,
    , MONTHLY_APP_FLG:"MONTHLY_APP_FLG"					// DECIMAL  ,
    , INP_DATE:"INP_DATE"								// DATETIME  ,
    , UPD_DATE:"UPD_DATE"								// DATETIME  ,
    , PRG_ID:"PRG_ID"									// VARCHAR(10)  ,
    , USR_ID:"USR_ID"									// VARCHAR(10)     
};
const CR_MON_REC_DAT_IDX = {
    USR_CODE: "USR_CODE"								// VARCHAR(10) NOT NULL,
    , YM:"YM"											// DATETIME NOT NULL,
};


const CR_PORT_MST 		= {
    TBL_NAME: "CR_PORT_MST"
    , PORT_CODE:"PORT_CODE"								// VARCHAR(10) NOT NULL,
    , PORT_NAME:"PORT_NAME"								// VARCHAR(40)  ,
    , PORT_NAME_S:"PORT_NAME_S"							// VARCHAR(20)  ,
    , PORT_NAME_K:"PORT_NAME_K"							// VARCHAR(40)  ,
    , STR_DATE:"STR_DATE"								// DATETIME  ,
    , END_DATE:"END_DATE"								// DATETIME  ,
    , INP_DATE:"INP_DATE"								// DATETIME  ,
    , UPD_DATE:"UPD_DATE"								// DATETIME  ,
    , PRG_ID:"PRG_ID"									// VARCHAR(10)  ,
    , USR_ID:"USR_ID"									// VARCHAR(10)   
};
const CR_PORT_MST_IDX = {
    PORT_CODE: "PORT_CODE"								// VARCHAR(10) NOT NULL,
    , YM:"YM"											// DATETIME NOT NULL,
};


const CR_POSITION_MST 	= {
    TBL_NAME: "CR_POSITION_MST"
    , POSITION_CODE:"POSITION_CODE"						// VARCHAR(10) NOT NULL,
    , DEP_CODE:"DEP_CODE"								// VARCHAR(10)  ,
    , POSITION_NAME:"POSITION_NAME"						// VARCHAR(40)  ,
    , POSITION_NAME_S:"POSITION_NAME_S"					// VARCHAR(20)  ,
    , POSITION_NAME_K:"POSITION_NAME_K"					// VARCHAR(40)  ,
    , CAPTAIN_FLG: "CAPTAIN_FLG"						// DECIMAL		,
    , STR_DATE:"STR_DATE"								// DATETIME  ,
    , END_DATE:"END_DATE"								// DATETIME  ,
    , SORT_KEY:"SORT_KEY"								// INT(11)		,
    , INP_DATE:"INP_DATE"								// DATETIME  ,
    , UPD_DATE:"UPD_DATE"								// DATETIME  ,
    , PRG_ID:"PRG_ID"									// VARCHAR(10)  ,
    , USR_ID:"USR_ID"									// VARCHAR(10)    
};
const CR_POSITION_MST_IDX = {
    POSITION_CODE: "POSITION_CODE"						// VARCHAR(10) NOT NULL,
};


const CR_TASK_ALO_MST 	= {
    TBL_NAME: "CR_TASK_ALO_MST"
    , VESSEL_CODE:"VESSEL_CODE"							// VARCHAR(10) NOT NULL,
    , TASK_CODE:"TASK_CODE"								// VARCHAR(10) NOT NULL,
    , SORT_KEY:"SORT_KEY"								// INT  ,
    , INP_DATE:"INP_DATE"								// DATETIME  ,
    , UPD_DATE:"UPD_DATE"								// DATETIME  ,
    , PRG_ID:"PRG_ID"									// VARCHAR(10)  ,
    , USR_ID:"USR_ID"									// VARCHAR(10)     
};
const CR_TASK_ALO_MST_IDX = {
    VESSEL_CODE: "VESSEL_CODE"							// VARCHAR(10) NOT NULL,
    , TASK_CODE: "TASK_CODE"							// VARCHAR(10) NOT NULL,
};


const CR_TASK_MST 	= {
TBL_NAME: "CR_TASK_MST"
, TASK_CODE:"TASK_CODE"									// VARCHAR(10) NOT NULL,
, TASK_NAME:"TASK_NAME"									// VARCHAR(40)  ,
, TASK_NAME_S:"TASK_NAME_S"								// VARCHAR(20)  ,
, TASK_NAME_K:"TASK_NAME_K"								// VARCHAR(40)  ,
, TASK_KBN:"TASK_KBN"									// VARCHAR(2)  ,
, WORK_TIME_EXC_FLG:"WORK_TIME_EXC_FLG"					// DECIMAL  ,
, DUTY_FLG:"DUTY_FLG"									// DECIMAL	,
, FORE_COLOR:"FORE_COLOR"								// VARCHAR(20)  ,
, BACK_COLOR:"BACK_COLOR"								// VARCHAR(20)  ,
, STR_DATE:"STR_DATE"									// DATETIME  ,
, END_DATE:"END_DATE"									// DATETIME  ,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, PRG_ID:"UPD_DATE"										// VARCHAR(10)  ,
, USR_ID:"USR_ID"										// VARCHAR(10)    
};
const CR_TASK_MST_IDX = {
TASK_CODE: "TASK_CODE"									// VARCHAR(10) NOT NULL,
};

const CR_USER_MST 	= {
TBL_NAME: "CR_USER_MST"
, USR_CODE:"USR_CODE"									// VARCHAR(10) NOT NULL,
, PASSWORD:"PASSWORD"									// VARCHAR(10)  ,
, USR_NAME:"USR_NAME"									// VARCHAR(40)  ,
, USR_NAME_S:"USR_NAME_S"								// VARCHAR(40)  ,
, USR_NAME_K:"USR_NAME_K"								// VARCHAR(40)  ,
, PWD_UPD_DATE:"PWD_UPD_DATE"							// DATETIME  ,
, EMAIL_ADDRESS:"EMAIL_ADDRESS"							// VARCHAR(200)  ,
, EMP_FORM_CODE:"EMP_FORM_CODE"							// VARCHAR(10) NOT NULL,
, ACCESS_CODE:"ACCESS_CODE"								// VARCHAR(10)  ,
, USR_KBN:"USR_KBN"										// VARCHAR(1)  ,
, QUALIFICATION_CODE:"QUALIFICATION_CODE"				// VARCHAR(10)  ,
, IN_DATE:"IN_DATE"										// DATETIME NOT NULL,
, OUT_DATE:"OUT_DATE"									// DATETIME NOT NULL,
, PAY_HOL_DAYS:"PAY_HOL_DAYS"							// DECIMAL  ,
, COM_HOL_DAYS:"COM_HOL_DAYS"							// DECIMAL	,
, STD_KBN:"STD_KBN"										// VARCHAR(1)	,
, STD_WORK_PERIOD:"STD_WORK_PERIOD"						// DECIMAL	,
, STD_START_DATE:"STD_START_DATE"						// DATETIME	,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, TOKEN: "TOKEN"										// VARCHAR(255)	,
, PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
, USR_ID:"USR_ID"										// VARCHAR(10)   
};
const CR_USER_MST_IDX = {
    USR_CODE: "USR_CODE"								// VARCHAR(10) NOT NULL,
};

const CR_VESSEL_MST = {
TBL_NAME: "CR_VESSEL_MST"
, VESSEL_CODE:"VESSEL_CODE"								// VARCHAR(10) NOT NULL,
, VESSEL_NAME:"VESSEL_NAME"								// VARCHAR(40)  ,
, PASSWORD: "PASSWORD"									// VARCHAR(10)
, VESSEL_NAME_S:"VESSEL_NAME_S"							// VARCHAR(20)  ,
, VESSEL_NAME_K:"VESSEL_NAME_K"							// VARCHAR(40)  ,
, VESSEL_ARTICLE_72_TYPE:"VESSEL_ARTICLE_72_TYPE"		// VARCHAR(1)  ,
, SPECIAL_APPLY_72_DATE:"SPECIAL_APPLY_72_DATE"			// DATETIME  ,
, SMOOTH_WATER_AREA_FLG:"SMOOTH_WATER_AREA_FLG"			// DECIMAL	,
, STR_DATE:"STR_DATE"									// DATETIME  ,
, END_DATE:"END_DATE"									// DATETIME  ,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, TOKEN:"TOKEN"											// VARCHAR(255)	,
, PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
, USR_ID:"PRG_ID"										// VARCHAR(10)   
};
const CR_VESSEL_MST_IDX = {
VESSEL_CODE: "VESSEL_CODE"								// VARCHAR(10) NOT NULL,
};

const CR_WRK_REC_DAT = {
TBL_NAME: "CR_WRK_REC_DAT"
, WORK_UID:"WORK_UID"									// INT NOT NULL,
, USR_CODE:"USR_CODE"									// VARCHAR(10) NOT NULL,
, SESSION_CODE:"SESSION_CODE"							// VARCHAR(20)
, WORK_DATE:"WORK_DATE"									// DATETIME NOT NULL,
, WORK_STR_TIME:"WORK_STR_TIME"							// DATETIME  ,
, WORK_END_TIME:"WORK_END_TIME"							// DATETIME  ,
, WORK_INP_KBN:"WORK_INP_KBN"							// VARCHAR(1)  ,
, WORK_STR_ORG_TIME:"WORK_STR_ORG_TIME"					// DATETIME  ,
, WORK_END_ORG_TIME:"WORK_END_ORG_TIME"					// DATETIME  ,
, TASK_CODE:"TASK_CODE"									// VARCHAR(10)  ,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
, USR_ID:"USR_ID"										// VARCHAR(10)   
};
const CR_WRK_REC_DAT_IDX = {
WORK_UID: "WORK_UID"									// INT NOT NULL,
};

const CR_WRK_PLAN_DAT = {
TBL_NAME: "CR_WRK_PLAN_DAT"
, WORK_UID:"WORK_UID"									// INT NOT NULL,
, USR_CODE:"USR_CODE"									// VARCHAR(10) NOT NULL,
, SESSION_CODE:"SESSION_CODE"							// VARCHAR(20)
, WORK_DATE:"WORK_DATE"									// DATETIME NOT NULL,
, WORK_STR_TIME:"WORK_STR_TIME"							// DATETIME  ,
, WORK_END_TIME:"WORK_END_TIME"							// DATETIME  ,
, WORK_INP_KBN:"WORK_INP_KBN"							// VARCHAR(1)  ,
, WORK_STR_ORG_TIME:"WORK_STR_ORG_TIME"					// DATETIME  ,
, WORK_END_ORG_TIME:"WORK_END_ORG_TIME"					// DATETIME  ,
, TASK_CODE:"TASK_CODE"									// VARCHAR(10)  ,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
, USR_ID:"USR_ID"										// VARCHAR(10)   
};

const CR_WRK_PLAN_DAT_IDX = {
WORK_UID: "WORK_UID"									// INT NOT NULL,
};

const CR_MSG_MST = 	{
TBL_NAME: "CR_MSG_MST"
, MSG_CODE:"MSG_CODE"								// VARCHAR(10) NOT NULL,
, LANGUAGE_CODE:"LANGUAGE_CODE"					// VARCHAR(10) NOT NULL,
, MSG_DIVISION:"MSG_DIVISION"						// VARCHAR(1) NOT NULL,
, MSG:"MSG"										// VARCHAR(255) NOT NULL,
, INP_DATE:"INP_DATE"									// DATETIME  ,
, UPD_DATE:"UPD_DATE"									// DATETIME  ,
, PRG_ID:"PRG_ID"										// VARCHAR(10)  ,
, USR_ID:"USR_ID"										// VARCHAR(10)  
};
const CR_MSG_MST_IDX = {
MSG_CODE:"MSG_CODE"								// VARCHAR(10) NOT NULL,
, LANGUAGE_CODE:"LANGUAGE_CODE"					// VARCHAR(10) NOT NULL,
};

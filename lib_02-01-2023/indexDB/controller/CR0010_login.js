async function login() {
    let rs = await initDB();
    await setTokenToStorage();

    let arr_table = [
        CR_CMP_MST['TBL_NAME']
        , CR_VESSEL_MST['TBL_NAME']
        , CR_POSITION_MST['TBL_NAME']
        , CR_TASK_MST['TBL_NAME']
        , CR_TASK_ALO_MST['TBL_NAME']
        , CR_ALO_DAT['TBL_NAME']				
        , CR_MSG_MST['TBL_NAME']
        , CR_PRG_MST['TBL_NAME']
        , CR_CODE_MST['TBL_NAME']
        , CR_ACS_MST['TBL_NAME']
        , CR_ACS_ROLE_MST['TBL_NAME']
        , CR_EMP_FORM_MST["TBL_NAME"]
    ];


    let r = await getDataMasterFromServer(arr_table);
    if (r) {
        alert('login');
    } else {
        alert('fail');
    }
    
}

async function setTokenToStorage() {

    let token = '';

    let company_cd = 'DKI_TEST1';
    let usr_code ='g';
    let password = 'g';

    let data = {
        "company_cd": company_cd,
        "usrcode": usr_code,
        "password": password
    };

    let urlLogin = SYS_API_ROOT_URL + "/login";

    let rs = await getDataFromServer(data, urlLogin);
    if(rs.result === RESULT.SUCCESSFUL) {
        token = rs.token;
    }
    
    setKey(SKEY.TOKEN, token);
}
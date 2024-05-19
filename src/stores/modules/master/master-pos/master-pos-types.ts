export interface PosDataResponse {
    POS_ID : string
    POS_NM : String											
    POS_CD : String											
    POS_SEQ: String											
    LINE_NM: String											
    LINE_SEQ: String											
    PREV_POS_NAME1: String											
    PREV_POS_NAME2: String											
    PREV_POS_NAME3: String											
    PREV_POS_NAME4: String											
    PREV_POS_NAME5: String											
    PREV_POS_NAME6: String											
    PREV_POS_NAME7: String											
    PREV_POS_NAME8: String											
    PREV_POS_NAME9: String											
    PREV_POS_NAME10: String											
    LSTARTFLG: String											
    INPBODYFLG: String											
    MANDATORYFLG: String											
    T_TYPE: String										
    CSOK: String											
    CREATED_DT: String											
    CREATED_BY: String											
    CHANGED_DT: String											
    CHANGED_BY: String											
}

export interface PosDataRequest {
    POS_NM : String											
    POS_CD : String											
    POS_SEQ: String											
    LINE_NM: String											
    LINE_SEQ: String											
    PREV_POS_NAME1: String											
    PREV_POS_NAME2: String											
    PREV_POS_NAME3: String											
    PREV_POS_NAME4: String											
    PREV_POS_NAME5: String											
    PREV_POS_NAME6: String											
    PREV_POS_NAME7: String											
    PREV_POS_NAME8: String											
    PREV_POS_NAME9: String											
    PREV_POS_NAME10: String											
    LSTARTFLG: String											
    INPBODYFLG: String											
    MANDATORYFLG: String											
    T_TYPE: String										
    CSOK: String											
    // CREATE_DT: String											
    CREATED_BY: String																						
}

export interface PosUpdateRequest {
    POS_ID : string
    POS_NM : String											
    POS_CD : String											
    POS_SEQ: String											
    LINE_NM: String											
    LINE_SEQ: String											
    PREV_POS_NAME1: String											
    PREV_POS_NAME2: String											
    PREV_POS_NAME3: String											
    PREV_POS_NAME4: String											
    PREV_POS_NAME5: String											
    PREV_POS_NAME6: String											
    PREV_POS_NAME7: String											
    PREV_POS_NAME8: String											
    PREV_POS_NAME9: String											
    PREV_POS_NAME10: String											
    LSTARTFLG: String											
    INPBODYFLG: String											
    MANDATORYFLG: String											
    T_TYPE: String										
    CSOK: String																					
    CHANGED_BY: String
}
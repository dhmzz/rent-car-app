export interface specDataResponse {
    STD_SPEC_ID: string											
    BC_TYPE: string											
    POS_ID: string											
    INSPJOB_ID: string											
    PART_NAME: string											
    STD_SPEC_CD: string											
    CREATED_DT: string											
    CREATED_BY: string
    CHANGED_DT: string
    CHANGED_BY: string
    SEQ: string											
}

export interface specDataRequest {
    BC_TYPE: string,
    POS_ID: string,
    INSPJOB_ID: string,
    PART_NAME: string,
    STD_SPEC_CD: string,
    CREATED_BY: string,
    SEQ: string
}
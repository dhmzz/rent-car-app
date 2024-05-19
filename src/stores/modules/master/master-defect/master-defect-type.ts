export interface defectResponse {
    POS_ID: number,
    POS_NM: string,
    POS_CD: string,
    LINE_NM: string,
    INSPJOB_ID: number,
    INSPJOB: string,
    INSPSUBJOB: string,
    STD_SPEC_ID: number,
    PART_NM: string,
    DFCT_ID: number,
    DFCTNM: string,
    BC_TYPE: string,
    DFCT_ACT_NM: string,
    CREATED_BY: string,
    CREATED_DT: string,
    CHANGED_BY: string,
    CHANGED_DT: string,
    DFCT_CTG: string
}

export interface defectAddRequest {
    POS_CD: string,
    INSPJOB_ID: number,
    POS_ID: number,
    BC_TYPE: string,
    PART_NM: string,
    DFCTNM: string,
    DFCT_CTG: string,
    CREATED_BY: string
    DFCT_ACT_ID: number
}

export interface defectEditRequest {
    DFCT_ID: number,
    POS_CD: string,
    INSPJOB_ID: number,
    BC_TYPE: string,
    PART_NM: string,
    DFCTNM: string,
    DFCT_ACT_NM: string,
    DFCT_CTG: string,
    CHANGED_BY: string,
    POS_ID: number
}

export interface defectActual{
    DFCT_ACT_NM: string,
    DFCT_ACT_ID: number,
    DFCT_ID: number,
    CREATED_BY: string,
    CREATED_DT: string,
    CHANGED_BY: string,
    CHANGED_DT: string
}

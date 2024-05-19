export interface inspectorResponse {
    INSPJOB_ID: string
    SHIFTGRPNM: string
    INSPID: string
    INSPNM: string
    POS_CD: string
    INSPJOB: string
    INSPSUBJOB: string
    CREATED_BY: string
    CREATED_DT: string
    CHANGED_BY: string
    CHANGED_DT: string
    NO_REG: string
}

export interface inspectorRequest {
    SHIFTGRPNM: string,
    INSPID: string,
    INSPNM: string,
    POS_CD: string,
    INSPJOB: string,
    INSPSUBJOB: string,
    CREATED_BY: string,
    NO_REG: string
}

export interface inspectoreUpdateRequest {
    INSPECTOR_ID: string,
    SHIFTGRPNM: string,
    INSPID: string,
    INSPNM: string,
    POS_CD: string,
    INSPJOB: string,
    INSPSUBJOB: string,
    CHANGED_BY: string,
    NO_REG: string
}
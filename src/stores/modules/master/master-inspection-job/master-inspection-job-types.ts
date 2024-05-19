export interface inspectionJobResponse {
    POS_ID: string
    INSPJOB_ID: string
    INSPJOB: string
    INSPJOB_SEQ: string
    INSPSUBJOB: string
    INSPSUBJOB_SEQ: string
    POSITION: string
    DATE_FROM: string
    DATE_TO: string
    CREATED_BY: string
    CREATED_DT: string
    CHANGED_BY: string
    CHANGED_DT: string
    POS_CD: string
    POS_NM: string
}

export interface inspectionJobAddRequest {
    POS_ID: string,
    INSPJOB: string,
    INSPJOB_SEQ: string,
    INSPSUBJOB: string,
    INSPSUBJOB_SEQ: string,
    POSITION: string,
    DATE_FROM: string,
    DATE_TO: string,
    CREATED_BY: string,
    POS_CD: string,
    POS_NM: string
}

export interface inspectionEditRequest {
    POS_ID: string,
    INSPJOB_ID: string,
    INSPJOB: string,
    INSPJOB_SEQ: string,
    INSPSUBJOB: string,
    INSPSUBJOB_SEQ: string,
    POSITION: string,
    DATE_FROM: string,
    DATE_TO: string,
    CHANGED_BY: string,
    POS_CD: string,
    POS_NM: string
}
export interface DETAIL_DEFECT_LIST{
    DEFECT: string
    DEFECT_ACTUAL: string
    DETAIL_DEFECT: string
    RPK: number
    OK: number
}

export interface vehicleInspectionList{
    IDNO: string
    SUFFIX: string
    VINNO: string
    BC_TYPE: string
    STD_SPEC_CD: string
    LETTER_SPEC_CONTENT: string,
    PART_NAME: string
}

export interface paramOpenDefect {
    BODY_NO: string,
    PART_NAME: string
}

export interface paramOpenDefectActual {
    BODY_NO: string,
    PART_NAME: string,
    DFCT_ID: string
}

export interface defectPartName {
    BC_TYPE: string
    CHANGED_BY: string
    CHANGED_DT: string
    CREATED_BY: string
    CREATED_DT: string
    DFCTNM: string
    DFCT_ACT_ID: number
    DFCT_ACT_NM: string 
    DFCT_CTG: string
    DFCT_ID: number
    INSPJOB: string
    INSPJOB_ID: number
    INSPSUBJOB: string
    LINE_NM: string 
    PART_NM: string 
    POS_CD: string 
    POS_ID: number
    POS_NM: string
    STD_SPEC_ID: number
}

export interface defectActualActual {
    DFCT_ACT_NM: string,
    DFCT_ACT_ID: number,
    DFCT_ID: number,
    CREATED_BY: string,
    CREATED_DT: string,
    CHANGED_BY: string,
    CHANGED_DT: string
}

export interface defectRequest {
    IDNO : string // MANDATORY
    BODY_NO : string | null
    VINNO : string | null
    SUFFIX : string | null
    BC_TYPE : string | null
    POS_ID : string | null
    POS_CD : string | null
    INSPJOB_ID : string | null
    INSPJOB : string | null
    STD_SPEC_ID : string | null
    PART_NAME : string | null
    STD_SPEC_NM : string | null
    DFCT_ID : string  // MANDATORY
    DFCTNM : string | null
    DFCT_ACT_ID : string | null
    DFCT_ACT_NM : string | null
    DFCT_DTL : string | null
    CREATED_BY : string | null
    RPK_FLG : string | null
    DFCT_CTG : string | null
}
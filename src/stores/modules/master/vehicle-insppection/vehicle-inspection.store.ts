import { defineStore } from "pinia";
import type { specDataResponse } from "../master-data-spec/master-data-spec-types";
import { MasterSpecStore, OptionStore } from "@/stores";
import type { defectActualActual, DETAIL_DEFECT_LIST as defectList, defectPartName, defectRequest, paramOpenDefect, paramOpenDefectActual, vehicleInspectionList } from "./vehicle-inspection-type";
import type { inspectionJobResponse } from "../master-inspection-job/master-inspection-job-types";
import ApiService from "@/core/services/ApiService";
import type { defectAddRequest } from "../master-defect/master-defect-type";
import { skeletonErrorMessage, skeletonSuccessMessage, successNotification } from "@/stores/notifications";
import type { inspectorResponse } from "../master-inspector/master-inspector-types";
import { useRoute } from 'vue-router';

export const useVehicleInspection = defineStore("vehicle-inspection", {
    state: () => ({
        vehicleInspectionList: [] as vehicleInspectionList[],
        vehicleDefectPart: [] as defectPartName[],
        vehicleDefectActual: [] as defectActualActual[],
        vehicleToRequest: [] as defectRequest[],
        //ARRAY TAMPUNGAN
        accommodatedItem: [] as vehicleInspectionList[],
        // AT INPUT DEFECT MODAL
        defectList: [] as defectList[],
        defectListSelected: [] as defectList[],
        defectInspector: [] as inspectorResponse[],

        defectRequst: [] as defectRequest[],

        isListDefect: [] as vehicleInspectionList[],
        inspectionJob: [] as inspectionJobResponse[],

        indexClick: 0,
        indexClickPage2: 0,
        totalPage: 0,
        indexToDefect: 0,

        pagination: {
            pageStart: 1
        },
        dummy: {
            DEFECT: '',
            DEFECT_ACTUAL: '',
            DETAIL_DEFECT: '',
            RPK: 0,
            OK: 0
        },
        paramRequest: {
            IDNO : '',
            BODY_NO : '',
            VINNO : '',
            SUFFIX : '',
            BC_TYPE : '',
            POS_ID : '',
            POS_CD : '',
            INSPJOB_ID : '',
            INSPJOB : '',
            STD_SPEC_ID : '',
            PART_NAME : '',
            STD_SPEC_NM : '',
            DFCT_ID : '',
            DFCTNM : '',
            DFCT_ACT_ID : '',
            DFCT_ACT_NM : '',
            DFCT_DTL : '',
            CREATED_BY : '',
            RPK_FLG : '',
            DFCT_CTG : '',
        },

        isModalDetailActive: false,
        isModalDefectActive: false,
        isDetailInserMode: false,
        isReadyToPush: true,
        isModalInputDetailActive: false,
        isModalQRactive: false,

        inputDetail: '',
        bodyNo: '',
        partName: '',
        dfctId: '',

        posURL: '',
        shiftUrl: ''
    }),

    getters: {
        totalVehicleList(state):number {
            if (state.vehicleInspectionList.length > 0) {
                const total = Math.ceil(state.totalPage / 10);    
                return total;
            }
            return 0;
        },
        STAGGING_DEFECT(state){
            const dummy = {
                DEFECT: state.dummy.DEFECT,
                DEFECT_ACTUAL: state.dummy.DEFECT_ACTUAL,
                DETAIL_DEFECT: state.dummy.DETAIL_DEFECT,
                RPK: state.dummy.RPK,
                OK: state.dummy.OK
            }
            return dummy;
        },
        paramToOpenModalDefect():paramOpenDefect{
            const param = {
                BODY_NO: this.bodyNo,
                PART_NAME: this.partName
            }
            return param;
        },
        paramToOpenModalDefectActual():paramOpenDefectActual{
            const param = {
                BODY_NO: this.bodyNo,
                PART_NAME: this.partName,
                DFCT_ID: this.dfctId
            }
            return param;
        },
        // paramRequest():defectRequest{
        //     const paramReq:defectRequest = {
        //         IDNO : 0,
        //         BODY_NO : this.bodyNo,
        //         VINNO : '',
        //         SUFFIX : '',
        //         BC_TYPE : '',
        //         POS_ID : ,
        //         POS_CD : string,
        //         INSPJOB_ID : number,
        //         INSPJOB : string,
        //         STD_SPEC_ID : number,
        //         PART_NAME : string,
        //         STD_SPEC_NM : string,
        //         DFCT_ID : string,
        //         DFCTNM : string,
        //         DFCT_ACT_ID : number,
        //         DFCT_ACT_NM : string,
        //         DFCT_DTL : string,
        //         CREATED_BY : string,
        //         RPK_FLG : string,
        //         DFCT_CTG : string
        //     }
        //     return paramReq
        // }
    },

    actions: {
        setModalDetail(isOpen: boolean){
            if(isOpen){
                this.isModalDetailActive = true;
            } else {
                this.isModalDetailActive = false;
            }
        },
        async setModalDefect(isOpen: boolean, item:vehicleInspectionList, isDefect:boolean, index:number){
            if(isOpen){
                this.indexToDefect = index; 
                this.isListDefect.push(item)

                this.partName = item.PART_NAME;

                const res = await ApiService.post('/TransactionVehicleInspection/GetVehicleInspectionDefect', this.paramToOpenModalDefect);
                this.vehicleDefectPart = res.data
                this.isModalDefectActive = true;
            } 
        },
        setModalInputDetail(isOpen: boolean, row: string){
            if(this.defectList.length && isOpen && this.defectList[this.defectList.length - 1].DEFECT === row){
                this.isModalInputDetailActive = true;
            } else {
                this.isModalInputDetailActive = false;
            }
        },
        async setTotalPage(){
            await MasterSpecStore.getDataSpec()
            const total = MasterSpecStore.specDataCount / 10;
            
            this.totalPage = total;
        },
        async setPage(i:number){
            this.pagination.pageStart = i;

            if(this.pagination.pageStart > 1){
                MasterSpecStore.paginationTable.start = this.pagination.pageStart;
            } else {
                MasterSpecStore.paginationTable.start = 1;
            }
            
            // MasterSpecStore.paginationTable.start = start;
            await MasterSpecStore.getDataSpec();
        },
        setModalQR(param){
            this.isModalQRactive = param;
        },

        async setInserDefect_1(value: string, id:number){
            const dfctId = id.toString();
            this.dfctId = dfctId;

            const res = await ApiService.post('/TransactionVehicleInspection/GetVehicleInspectionDefectActual', this.paramToOpenModalDefectActual);
            this.vehicleDefectActual = res.data;
            
            this.dummy.DEFECT = value;
            
            const isAny = this.defectList.find(item => item.DEFECT === this.dummy.DEFECT);
            if(!isAny){
                this.dummy.DEFECT_ACTUAL = '';
                this.dummy.DETAIL_DEFECT = '';

                this.defectList.push(this.STAGGING_DEFECT);
            } else {
                const unCheck = this.defectList.filter(item => item.DEFECT !== this.dummy.DEFECT);
                this.defectList = unCheck;

                this.dummy.DEFECT = this.defectList.length ? this.defectList[this.defectList.length - 1].DEFECT : '';
                this.dummy.DEFECT_ACTUAL = '';
                this.dummy.DETAIL_DEFECT = '';

                const findId = this.vehicleDefectPart.find(item => item.DFCTNM === (this.defectList.length && this.defectList[this.defectList.length - 1].DEFECT));

                if(findId){
                    this.dfctId = findId?.DFCT_ID.toString();

                    const res = await ApiService.post('/TransactionVehicleInspection/GetVehicleInspectionDefectActual', this.paramToOpenModalDefectActual);
                    this.vehicleDefectActual = res.data;
                }
            }
        },
        setInserDefect_2(){
            const defectType = this.dummy.DEFECT;
            if(this.defectList.length){
                this.defectList.pop();

                this.defectList.push(this.STAGGING_DEFECT);

            }
            this.setModalInputDetail(false, '');
        },
        setInserDefect_3(value: string){
            if(this.defectList.length && this.defectList[this.defectList.length - 1].DEFECT_ACTUAL === ''){
                this.dummy.DEFECT_ACTUAL = value;
                this.defectList.pop();

                this.defectList.push(this.STAGGING_DEFECT);

            } else if (this.defectList.length && this.defectList[this.defectList.length - 1].DEFECT_ACTUAL === value){
                this.dummy.DEFECT_ACTUAL = '';
                this.defectList.pop();

                this.defectList.push(this.STAGGING_DEFECT);
            } else if (this.defectList.length && this.defectList[this.defectList.length - 1].DEFECT_ACTUAL !== ''){
                this.dummy.DEFECT_ACTUAL = value;
                this.defectList.pop();

                this.defectList.push(this.STAGGING_DEFECT);
            }
            return;
        },

        handleDefectSelected(item:defectList){
            const isAny = this.defectListSelected.find(element => element.DEFECT === item.DEFECT)
            
            if(isAny){
                const unCheck = this.defectListSelected.filter(element => element.DEFECT !== item.DEFECT );
                this.defectListSelected = unCheck;
            } else {
                this.defectListSelected.push(item);
            }
        },
        handleRPK(){
            const setRPK = this.defectListSelected.forEach((item) => {
                item.RPK = 1;
            })

            let arrayCoreUpdated = this.defectList.map(coreItem => {
                let tempItem = this.defectListSelected.find(tempItem => tempItem.DEFECT === coreItem.DEFECT);
                if (tempItem) {
                    return { ...coreItem };
                }
                return coreItem;
            });

            this.defectList = arrayCoreUpdated;
            this.defectListSelected = [];
        },
        handleOK(){
            const setOk = this.defectListSelected.forEach((item) => {
                item.OK = 1;
            })

            let defectListFinal = this.defectList.map(coreItem => {
                let tempItem = this.defectListSelected.find(tempItem => tempItem.DEFECT === coreItem.DEFECT);
                if(tempItem){
                    return {...coreItem}
                }
                return coreItem;
            })

            this.defectList = defectListFinal;
            this.defectListSelected = [];
        },
        handleDelete(){
            let defectUpdated = this.defectList.filter(coreItem => {
                return !this.defectListSelected.some(tempItem => tempItem.DEFECT === coreItem.DEFECT);
            });
            this.defectList = defectUpdated;
        },
        handleDefectChecker(item:vehicleInspectionList):string{
            const isAny = this.isListDefect.find(element => element.PART_NAME === item.PART_NAME)

            if(isAny){
                return '';
            }
            return '';
        },
        async handleInputBodyNo(){
            const url:string = '/TransactionVehicleInspection/GetVehicleInspection';
            const bodyNo = this.bodyNo as string;

            try {
                const res = await ApiService.post(url, JSON.stringify(bodyNo));

                if(res.status === 200){
                    this.vehicleInspectionList = await res.data;
                    this.totalPage = await res.data.length;
                }   
            } catch (error) {
                console.log(error)
            }
        },

        submitModalDetail(){
            this.setInserDefect_2();
        },
        submitInputDefect(item:vehicleInspectionList){
            if(this.defectList.length){
                this.isModalDefectActive = false;
                this.addindex(this.indexToDefect, item);
            } else {
                this.isModalDefectActive = false;
                this.isListDefect.pop();
            }
            // this.defectList = [];
        },

        async submitStamp(){
            if(this.accommodatedItem.length === this.vehicleInspectionList.length){
                const url:string = '/TransactionVehicleInspection/AddTransactionDefectByJson';

                const paramToString = JSON.stringify(this.vehicleToRequest);

                const res = await ApiService.post(url, JSON.stringify(paramToString));
                if(res.status === 200){
                    skeletonSuccessMessage('Stemped successfully');
                    this.bodyNo = '';
                    this.vehicleInspectionList = [];
                    this.accommodatedItem = [];
                } else {
                    skeletonErrorMessage('Stamped Error');
                }
            } else {
                skeletonErrorMessage('Please inspec all the parts')
            }
        },

        async addindex(i:number, item:vehicleInspectionList){
            const isAnyInDefect = this.isListDefect.find(element => element.PART_NAME === item.PART_NAME);

            if(i === this.indexClick){ // ADD INDEX FROM CLICK READY ROW
                this.indexClick += 1;
                this.accommodatedItem.push(item);

                const accomodateLength:number = this.accommodatedItem.length;
                
                // FROM ACCOMODATE ARRAY
                this.paramRequest.IDNO = this.accommodatedItem[accomodateLength - 1].IDNO;
                this.paramRequest.SUFFIX = this.accommodatedItem[accomodateLength - 1].SUFFIX;
                this.paramRequest.VINNO = this.accommodatedItem[accomodateLength - 1].VINNO;
                this.paramRequest.BC_TYPE = this.accommodatedItem[accomodateLength - 1].BC_TYPE;
                this.paramRequest.PART_NAME = this.accommodatedItem[accomodateLength - 1].PART_NAME;
                this.paramRequest.STD_SPEC_NM = this.accommodatedItem[accomodateLength - 1].LETTER_SPEC_CONTENT

                await OptionStore.getOptionPos();
                const getPos = OptionStore.posOption.find(item => item.POS_CD === this.posURL);

                await OptionStore.getOptionDataSpec();
                const getSpec = OptionStore.dataSpecOption.find(item => item.STD_SPEC_CD === this.accommodatedItem[accomodateLength - 1].STD_SPEC_CD);

                // FROM SCREEN
                if(getPos && getSpec){
                    this.paramRequest.INSPJOB = this.inspectionJob[0].INSPJOB;
                    this.paramRequest.INSPJOB_ID = this.inspectionJob[0].INSPJOB_ID;
                    this.paramRequest.POS_CD = getPos.POS_CD;
                    this.paramRequest.POS_ID = getPos.POS_ID;
                    this.paramRequest.STD_SPEC_ID = getSpec.STD_SPEC_ID.toString();
                }

                if(this.defectList.length > 0){;
                    for (let i = 0; i < this.defectList.length; i++) {
                        console.log('LIST DEFECT')
                        console.table(this.defectList[i])
                        this.paramRequest.DFCTNM = this.defectList[i].DEFECT;
                        this.paramRequest.DFCT_ACT_NM = this.defectList[i].DEFECT_ACTUAL;
                        this.paramRequest.DFCT_DTL = this.defectList[i].DETAIL_DEFECT;
                        this.paramRequest.RPK_FLG = this.defectList[i].RPK === 1 ? 'T' : 'F';
                        this.paramRequest.DFCT_CTG = this.defectList[i].OK === 1 ? 'T' : 'F';
                    
                        this.vehicleToRequest.push(this.paramRequest);
                    }
                    this.defectList = [];
                } else {
                    this.vehicleToRequest.push(this.paramRequest);
                }
                console.log('API',this.vehicleToRequest)

                this.resetParamRequest();
            } else if((this.indexClick - 1) === i && !isAnyInDefect){ // REDUCE INDEX FROM CLICK ALREADY ROW
                this.indexClick -= 1;
                this.accommodatedItem.pop();
                this.vehicleToRequest.pop();
            } else if ((this.indexClick - 1) === i && isAnyInDefect){
                this.indexClick -= 1;
                const filtered = this.isListDefect.filter(element => element.PART_NAME !== item.PART_NAME);
                this.isListDefect = filtered;

                this.vehicleToRequest.pop();
                this.accommodatedItem.pop();
            }        
        },

        resetParamRequest() {
            this.paramRequest = {
                IDNO : '',
                BODY_NO : '',
                VINNO : '',
                SUFFIX : '',
                BC_TYPE : '',
                POS_ID : '',
                POS_CD : '',
                INSPJOB_ID : '',
                INSPJOB : '',
                STD_SPEC_ID : '',
                PART_NAME : '',
                STD_SPEC_NM : '',
                DFCT_ID : '',
                DFCTNM : '',
                DFCT_ACT_ID : '',
                DFCT_ACT_NM : '',
                DFCT_DTL : '',
                CREATED_BY : '',
                RPK_FLG : '',
                DFCT_CTG : '',
            };
        }
    }
});
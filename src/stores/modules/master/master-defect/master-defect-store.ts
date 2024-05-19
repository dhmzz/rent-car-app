import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification } from "@/stores/notifications";
import type { ElTable, Action } from 'element-plus';
import { ElMessageBox } from "element-plus";
import ApiService from "@/core/services/ApiService";
import type { PosDataResponse } from "../master-pos/master-pos-types";
import { OptionStore } from "@/stores";
import axios from "axios";
import type { defectActual, defectAddRequest, defectEditRequest, defectResponse } from "./master-defect-type";

export const refInspectionJobTable = ref<InstanceType<typeof ElTable>>()

export const useMasterDefect = defineStore("master-defect", {
    state: () => ({
        defectDataList: [] as defectResponse[],
        defectDataSelected: [] as defectResponse[],
        defectOrigin: [] as defectResponse[],
        defectTarget: [] as defectResponse[],
        defectActual: [] as defectActual[],

        defectDataExcelCount: 0,
        defectDataCount: 0,

        fileSelected: null,

        isAddMode: false,
        isEditMode: false,
        isFetchLoading: false,
        isModalUploadOpen: false,
        isSaveLoading: false,
        isDeleteLoading: false,
        isImportExcelLoading: false,
        isFileDenied: false,
        isImportExcelCheckerLoading: false,
        isModalDetailOpen: false,
        isDownloadTemplateLoad: false,
        isModalDetailLoading: false,
        isDetailSaveModeActive: false,

        defectDataSingle:  {
            DFCT_ID: 0,
            POS_ID: '',
            INSPJOB_ID: '',
            INSPJOB: '',											
            BC_TYPE: '',										
            POS_CD: '',											
            PART_NM: '',											
            DFCTNM: '',											
            DFCT_CTG: '',
            POS_OBJECT: null as PosDataResponse | null,							
            CREATED_BY: 'arka.admin',								
        },
        paginationTable : {
            draw: 0,
            start: 1,
            length: 10,
            search: ''
        },
        paginationTableExcel : {
            draw: 0,
            start: 1,
            length: 10,
        },
        search: {
            POS_CD: '',
            INSPJOB: '',
            BC_TYPE: '',
            PART_NM: '',
            DFCTNM: ''
        },
        modalDetail: {
            DFCT_ID: '',
            POS_CD: '',									
            INSPJOB: '',									
            BC_TYPE: '',									
            PART_NM: '',									
            DFCTNM: '',									
            DFCT_CTG: '',									
            SAFETY: '',									
            SHOP: '',
            INSPJOB_ID: 0,									
            DFCTNM_ACT_ID: '',									
            DFCTNM_ACT_NM: '',									
            CHANGED_DT: '',									
            CHANGED_BY: ''									
        },

        statusExcel: '',
        messageExcel: ''
    }),

    getters: {
        startFormatted(state):number{
            const start = state.paginationTable.start > 1 ? (state.paginationTable.start - 1) * state.paginationTable.length : 0;
            return start; 
        },
        paginationFormatted():any{
            const pagination = {
                draw: 0,
                start: this.startFormatted,
                length: this.paginationTable.length,
                search: this.search         
            };

            return pagination;
        },
        requestFormatted():defectAddRequest{
            const requestFormatted = {
                POS_CD: this.defectDataSingle.POS_CD,
                INSPJOB_ID: parseInt(this.defectDataSingle.INSPJOB_ID),
                INSPJOB: this.defectDataSingle.INSPJOB,
                POS_ID: parseInt(this.defectDataSingle.POS_ID),
                BC_TYPE: this.defectDataSingle.BC_TYPE,
                PART_NM: this.defectDataSingle.PART_NM,
                DFCTNM: this.defectDataSingle.DFCTNM,
                DFCT_CTG: this.defectDataSingle.DFCT_CTG,
                CREATED_BY: 'arka.admin',
                DFCT_ACT_ID: 1
            }
            return requestFormatted
        },
        requestEditFormatted(state):defectEditRequest{
            const request = {
                DFCT_ID: this.defectDataSingle.DFCT_ID,
                POS_CD: this.defectDataSingle.POS_CD,
                INSPJOB_ID: parseInt(this.defectDataSingle.INSPJOB_ID),
                INSPJOB: this.defectDataSingle.INSPJOB,
                BC_TYPE: this.defectDataSingle.BC_TYPE,
                PART_NM: this.defectDataSingle.PART_NM,
                DFCTNM: this.defectDataSingle.DFCTNM,
                // DFCT_ACT_NM: this.defectDataSingle..DFC,
                DFCT_ACT_NM: '',
                DFCT_CTG: this.defectDataSingle.DFCT_CTG,
                CHANGED_BY: 'arka.admin',
                POS_ID: parseInt(this.defectDataSingle.POS_ID)
            }
            return request;
        },
        // datatableExcelFormatted(state){
        //     const start = state.paginationTableExcel.start === 1 ? 0 : state.paginationTableExcel.start - 1;
        //     const end = state.paginationTableExcel.start === 1 ? state.paginationTableExcel.length : state.paginationTableExcel.length + 1;
            
        //     const dataFormatted = state.defectOrigin.slice(start, end)
        //     return dataFormatted;
        // }
    },

    actions: {
        setDate(): string{
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
            
            return `${year}-${month}-${day}`;
        },
        setFormDefault(){
            this.defectDataSingle.POS_CD = '';
            this.defectDataSingle.INSPJOB = '';
            this.defectDataSingle.INSPJOB_ID = '';
            this.defectDataSingle.BC_TYPE = '';
            this.defectDataSingle.PART_NM = '';
            this.defectDataSingle.DFCTNM = '';
            this.defectDataSingle.DFCT_CTG = '';
            this.defectDataSingle.POS_ID = '';
            this.defectDataSingle.POS_OBJECT = null; 

        },
        setAddMode(isActive: boolean): void{
            if(isActive){
                this.isAddMode = true;
                // const datePlaceholder:string = this.setDate();
                // this.inspectionJobDataSingle.CREATED_DT = datePlaceholder;
                const placeholder = {
                    POS_ID: 0,
                    POS_NM: '#ADD:MODE',
                    POS_CD: '#ADD:MODE',
                    LINE_NM: '#ADD:MODE',
                    INSPJOB_ID: 0,
                    INSPJOB: '#ADD:MODE',
                    INSPSUBJOB: '#ADD:MODE',
                    STD_SPEC_ID: 0,
                    PART_NM: '#ADD:MODE',
                    DFCT_ID: 0,
                    DFCTNM: '#ADD:MODE',
                    BC_TYPE: '#ADD:MODE',
                    DFCT_ACT_NM: '#ADD:MODE',
                    CREATED_BY: '#ADD:MODE',
                    CREATED_DT: '#ADD:MODE',
                    CHANGED_BY: '#ADD:MODE',
                    CHANGED_DT: '#ADD:MODE',
                    DFCT_CTG: '#ADD:MODE'	
                };
                this.defectDataList.push(placeholder);
            } else { 
                this.isAddMode = false;
                this.setFormDefault();
                this.defectDataList.pop();
                // refSpecTable.value!.clearSelection();
            }
        },
        async setModalDetailOpen(isOpen:boolean, item:defectResponse){
            if(isOpen){
                this.isModalDetailLoading = true;
                const paramIdDfct = this.modalDetail.DFCT_ID = item.DFCT_ID.toString();

                this.modalDetail.POS_CD = item.POS_CD;
                this.modalDetail.INSPJOB = item.INSPJOB;
                this.modalDetail.INSPJOB_ID = item.INSPJOB_ID;
                this.modalDetail.BC_TYPE = item.BC_TYPE;
                this.modalDetail.PART_NM = item.PART_NM;
                this.modalDetail.DFCTNM = item.DFCTNM;
                this.modalDetail.DFCT_CTG = item.DFCT_CTG;
                
                this.isModalDetailOpen = true;

                try {
                    const res = await ApiService.post('/MasterDataDefect/ListDefectActual', JSON.stringify(paramIdDfct))
                    if(res.status === 200){
                        this.defectActual = res.data;
                    }
                } catch (error) {
                    
                }

                this.isModalDetailLoading = false;
            } else {
                this.defectActual = [];
                this.isModalDetailOpen = false;
            }
        },
        setEditMode(isActive:boolean): void{
            if(isActive){
                this.isEditMode = isActive;

                const POS_OBJECT = OptionStore.posOption.find((key) => key.POS_CD == this.defectDataSelected[0].POS_CD);

                if(POS_OBJECT != undefined){
                    this.defectDataSingle.POS_OBJECT = POS_OBJECT;

                    this.defectDataSingle.POS_CD = POS_OBJECT.POS_CD;
                    this.defectDataSingle.POS_ID = POS_OBJECT.POS_ID;
                    this.defectDataSingle.DFCT_ID = this.defectDataSelected[0].DFCT_ID;
                    this.defectDataSingle.INSPJOB_ID = this.defectDataSelected[0].INSPJOB_ID.toString(),
                    this.defectDataSingle.BC_TYPE = this.defectDataSelected[0].BC_TYPE;
                    this.defectDataSingle.PART_NM = this.defectDataSelected[0].PART_NM;
                    this.defectDataSingle.DFCTNM = this.defectDataSelected[0].DFCTNM;
                    // this.defectDataSingle.DFCT_CTG
                }
            } 
            else {
                this.isEditMode = isActive;
                this.setFormDefault();
                this.defectDataSelected = [];
                refInspectionJobTable.value!.clearSelection();
            }
        },
        setModalUploadClose(){
            this.isModalUploadOpen = false;
            this.isFileDenied = true;
            this.defectOrigin = [];
            this.defectTarget = [];
            this.defectDataExcelCount = 0;
            const clearElement = document.getElementById('file-input') as HTMLInputElement;
            if (clearElement !== null) {
                clearElement.value = '';
            }        
        },
        setModalUploadOpen(){
            this.isModalUploadOpen = true;
        },
        setDetailSaveMode(isActive: boolean){
            if(isActive){
                this.isDetailSaveModeActive = true;
                const placeholder = {
                    DFCT_ACT_NM: 'ADD::MODE',
                    DFCT_ACT_ID: 0,
                    DFCT_ID: 0,
                    CREATED_BY: 'ADD::MODE',
                    CREATED_DT: 'ADD::MODE',
                    CHANGED_BY: 'ADD::MODE',
                    CHANGED_DT: 'ADD::MODE'
                }
                this.defectActual.push(placeholder);
            } else {
                this.defectActual.pop();
                this.isDetailSaveModeActive = false;
            }
        },

        handleELSelect(val: any){
            this.defectDataSelected = val;
            console.log(this.defectDataSelected);
            if(this.defectDataSelected.length == 0){
            }
        },
        async handleFileSelected(e){
            const file = e.target.files[0];
            this.fileSelected = file;

            try {
                this.isImportExcelCheckerLoading = true
                const url:string = import.meta.env.VITE_APP_BE_URL + `/MasterDataDefect/ImportExcelChecker`
                const formDataHeaders = {
                    'Content-Type': 'multipart/form-data',
                };
                const res = await axios.post(url, {'formFile': file}, {
                    headers : formDataHeaders
                })
    
                if (res.status == 200) {
                    if(res.data.status === 'ready'){
                        this.defectOrigin = await res.data.data.origin;
                        this.defectTarget = await res.data.data.target;
                        this.statusExcel = await res.data.status;
                        this.messageExcel = await res.data.message;
                        this.defectDataExcelCount = await res.data.data.origin.length;
                    } else {
                        const dataFormatted = this.handleCompare(await res.data.data.origin, await res.data.data.target)
                        this.defectOrigin = dataFormatted;
                        this.defectTarget = await res.data.data.target;
                        this.statusExcel = await res.data.status;
                        this.messageExcel = await res.data.message;
                        this.defectDataExcelCount = dataFormatted.length;
                    }

                    for (let index = 0; index < this.defectOrigin.length; index++) {
                        const element = this.defectOrigin[index];
                        if(element.DFCT_ID === 1){
                            this.isFileDenied = true;
                            break;
                        } else {
                            this.isFileDenied = false;
                        }
                    }
                } else {
                    invalidFformatExcelNotification();
                }
            } catch (error) {
                    this.defectOrigin = [];
                    this.defectTarget = [];
                    this.statusExcel = 'Error';
                    this.messageExcel = 'Error, please try again later';
            } finally {
                this.isImportExcelCheckerLoading = false;
            }
        },
        handleCompare(origin, target){
            let foundPosCombination = {};

            target.forEach(item => {
                const combination = `${item.POS_NM}-${item.POS_CD}-${item.INSPJOB}-${item.INSPJOB_SEQ}-${item.INSPSUBJOB}-${item.INSPSUBJOB_SEQ}`;
                foundPosCombination[combination] = true;
            });

            origin.forEach(item => {
                const combination = `${item.POS_NM}-${item.POS_CD}-${item.INSPJOB}-${item.INSPJOB_SEQ}-${item.INSPSUBJOB}-${item.INSPSUBJOB_SEQ}`;
                if (foundPosCombination[combination]) {
                    item.DFCT_ID = '1';
                }
            });

            return origin;
        },
        handlePosCdChange(){
            const POS_CD:string | undefined = this.defectDataSingle.POS_OBJECT?.POS_CD.toString();
            const POS_ID:string | undefined = this.defectDataSingle.POS_OBJECT?.POS_ID.toString();

            if(POS_CD != undefined && POS_ID != undefined){
                this.defectDataSingle.POS_CD = POS_CD;
                this.defectDataSingle.POS_ID = POS_ID;
            }
        },
        async handleDownloadTemplate(){
            try {
                this.isDownloadTemplateLoad = true;
                const url:string = '/MasterDataDefect/GetTemplate';

                const res = await axios.post(url, 0, { responseType: 'blob' });

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));

                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Master Data Defect - Template.xlsx';
                document.body.appendChild(a);
                a.click();
        
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                
            } finally {
                this.isDownloadTemplateLoad = false;
            }
        },
        async handleSearch(){
            await this.getDataDefect();
        },
        async handleClear(){
            this.search.BC_TYPE = '';
            this.search.DFCTNM = '';
            this.search.INSPJOB = '';
            this.search.PART_NM = '';
            this.search.POS_CD = '';

            await this.getDataDefect();
        },

        async getDataDefect(): Promise<void>{
            try {
                this.isFetchLoading = true;

                const url:string = '/MasterDataDefect/DataTable'; 
                const res = await ApiService.post(url, this.paginationFormatted);

                this.defectDataList = res.data.data;
                this.defectDataCount = res.data.recordsTotal;
            } catch (error) {
                this.defectDataList = [];
                this.defectDataCount = 0;
            } finally {
                this.isFetchLoading = false
            }
        },

        async submitSave():Promise<void> {
            try {
                this.isSaveLoading = true;

                if(this.isAddMode){
                    const job = OptionStore.inspectionJobOption.find(item => item.INSPJOB_ID === this.defectDataSingle.INSPJOB_ID);
                    if(job)this.defectDataSingle.INSPJOB = job.INSPJOB;

                    const paramRequest:defectAddRequest = this.requestFormatted;
                    const url:string = '/MasterDataDefect/Add';
                        
                    const res = await ApiService.post(url, paramRequest);

                    if(res.status == 200){
                        successNotification('Added');
                    } else {
                        warningNotification('Added');
                    }

                } else if (this.isEditMode){
                    const url:string = '/MasterDataDefect/Update';
                    const paramRequest:defectEditRequest = this.requestEditFormatted;
                    
                    console.log(paramRequest);
                    
                    const res = await ApiService.put(url, paramRequest);

                    if(res.status === 200){
                        successNotification('Updated');
                    } else {
                        warningNotification('Updated');
                    }
                }
            } catch (error) {
                console.error(error);
                this.isAddMode ? errorNotification('Added') : errorNotification('Updated');
            } finally {
                // this.isSaveLoading = false;
                // this.isAddMode ? this.setAddMode(false) : this.setEditMode(false);
                // await this.getDataDefect();
                // this.setFormDefault();
            }
        },
        async submitDelete():Promise<void>{
            ElMessageBox.alert(`Selected data will be deleted, Are you sure for deleting ${this.defectDataSelected.length} data?`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isDeleteLoading = true
                            const url: string = '/MasterDataDefect/Delete';

                            const paramApi = this.defectDataSelected.map((item) => ({
                                DFCT_ID: item.DFCT_ID,
                            }));
                            const paramApiJson = JSON.stringify(paramApi)
                    
                            const res = await ApiService.post(url, JSON.stringify(paramApiJson))
                    
                            if(res.status === 200){
                                successNotification('deleted')
                            } else {
                                warningNotification('delete');
                            }
                        } catch (error) {
                            errorNotification('delete')
                        } finally {
                            this.isDeleteLoading = false
                            await this.getDataDefect();
                        }
                    } else {
                        refInspectionJobTable.value!.clearSelection();
                    }
                }
            })
        },
        async submitImportExcel(){
            try {
                this.isImportExcelLoading = true;
                
                const url:string = `/MasterDataDefect/AddRange`;
                const paramReq = JSON.stringify(this.defectOrigin);
                const res = await ApiService.post(url, JSON.stringify(paramReq));

                if(res.status === 200){
                    successNotification('uploaded');
                } else {
                    warningNotification('uploaded');
                }
            } catch (error) {
                errorNotification('uploaded');
            } finally {
                this.isImportExcelLoading = false
                await this.getDataDefect();
                this.setModalUploadClose();
            }
        }
    }
});
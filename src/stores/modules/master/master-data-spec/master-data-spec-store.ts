import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification } from "@/stores/notifications";
// import { ElTable } from 'element-plus';
import {type ElTable, type Action, ElMessageBox} from 'element-plus'
import ApiService from "@/core/services/ApiService";
import Search from "@/layouts/default-layout/components/search/Search.vue";
import axios from "axios";
import type { specDataRequest, specDataResponse } from "./master-data-spec-types";

export const refSpecTable = ref<InstanceType<typeof ElTable>>()

export const useMasterSpec = defineStore("master-spec", {
    state: () => ({
        specDataList: [] as specDataResponse[],
        specDataSelected: [] as specDataResponse[],
        specDataOrigin: [] as specDataResponse[],
        specdataTarget: [] as specDataResponse[],

        specDataCount: 0,
        specDataExcelCount: 0,

        fileSelected: null,

        isAddMode: false,
        isEditMode: false,
        isFetchLoading: false,
        isModalUploadOpen: false,
        isSaveLoading: false,
        isDeleteLoading: false,
        isImportExcelLoading: false,
        isDownloadTemplateLoad: false,
        isImportExcelCheckerLoading: false,
        isFileDenied: true,

        specDataSingle: {
            STD_SPEC_ID: '',
            BC_TYPE: '',
            POS_ID: '',
            INSPJOB_ID: '',
            PART_NAME: '',
            STD_SPEC_CD: '',
            CREATED_BY: 'arka.admin',
            CREATED_DT: '',
            CHANGED_BY: '',
            CHANGED_DT: '',
            SEQ: ''											
        },
        paginationTable : {
            draw: 0,
            start: 1,
            length: 10,
            search: ''
        },
        BC_TYPEParam: '',
        POS_IDParam: '',
        INSPJOB_IDParam: '',
        STD_SPEC_CDParam: '',
        PART_NAMEParam: '',

        statusExcel: '',
        messageExcel: ''
    }),

    getters: {
        startFormatted(state):number{
            const start = state.paginationTable.start > 1 ? (state.paginationTable.start - 1) * state.paginationTable.length : 0;
            return start; 
        },
        paginationFormatted(state):any{
            const pagination = {
                draw: 0,
                start : this.startFormatted,
                length: state.paginationTable.length,
                search: {
                    BC_TYPE : state.BC_TYPEParam,
                    POS_ID : state.POS_IDParam,
                    INSPJOB_ID: state.INSPJOB_IDParam,
                    STD_SPEC_CD: state.STD_SPEC_CDParam,
                    PART_NAME: state.PART_NAMEParam
                }
            };
            return pagination;
        },
        requestFormatted():specDataRequest{
            const requestFormatted = {
                BC_TYPE: this.specDataSingle.BC_TYPE.toString(),
                POS_ID: this.specDataSingle.POS_ID.toString(),
                INSPJOB_ID: this.specDataSingle.INSPJOB_ID.toString(),
                PART_NAME: this.specDataSingle.PART_NAME.toString(),
                STD_SPEC_CD: this.specDataSingle.STD_SPEC_CD.toString(),
                CREATED_BY: this.specDataSingle.CREATED_BY.toString(),
                SEQ: this.specDataSingle.SEQ
            }
            return requestFormatted
        },
        requestEditFormatted(state){
            const request = {
                STD_SPEC_ID: state.specDataSingle.STD_SPEC_ID.toString(),
                BC_TYPE: state.specDataSingle.BC_TYPE.toString(),
                POS_ID: state.specDataSingle.POS_ID.toString(),
                INSPJOB_ID: state.specDataSingle.INSPJOB_ID.toString(),
                PART_NAME: state.specDataSingle.PART_NAME.toString(),
                STD_SPEC_CD: state.specDataSingle.STD_SPEC_CD.toString(),
                CHANGED_BY: state.specDataSingle.CHANGED_BY.toString(),
                SEQ: state.specDataSingle.SEQ.toString()
            }
            return request;
        }
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
            this.specDataSingle.BC_TYPE = '';
            this.specDataSingle.POS_ID = '';
            this.specDataSingle.SEQ = '';
            this.specDataSingle.INSPJOB_ID = '';
            this.specDataSingle.PART_NAME = '';
            this.specDataSingle.STD_SPEC_CD = '';
        },
        setAddMode(isActive: boolean): void{
            if(isActive){
                this.isAddMode = true;
                const datePlaceholder:string = this.setDate();
                this.specDataSingle.CREATED_DT = datePlaceholder;
                const placeholder = {
                    STD_SPEC_ID: '#ADD:MODE',											
                    BC_TYPE: '#ADD:MODE',											
                    POS_ID: '#ADD:MODE',											
                    INSPJOB_ID: '#ADD:MODE',											
                    PART_NAME: '#ADD:MODE',											
                    STD_SPEC_CD: '#ADD:MODE',											
                    CREATED_DT: '#ADD:MODE',											
                    CREATED_BY: '#ADD:MODE',
                    CHANGED_DT: '#ADD:MODE',
                    CHANGED_BY: '#ADD:MODE',
                    SEQ: '#ADD:MODE'	
                };
                this.specDataList.push(placeholder);
            } else { 
                this.isAddMode = false;
                this.setFormDefault();
                this.specDataList.pop();
                refSpecTable.value!.clearSelection();
            }
        },
        setEditMode(isActive:boolean): void{
            if(isActive){
                this.isEditMode = isActive;
                this.specDataSingle.STD_SPEC_ID = this.specDataSelected[0].STD_SPEC_ID;
                this.specDataSingle.BC_TYPE = this.specDataSelected[0].BC_TYPE;
                this.specDataSingle.POS_ID = this.specDataSelected[0].POS_ID;
                this.specDataSingle.SEQ = this.specDataSelected[0].SEQ;
                this.specDataSingle.INSPJOB_ID = this.specDataSelected[0].INSPJOB_ID;
                this.specDataSingle.PART_NAME = this.specDataSelected[0].PART_NAME;
                this.specDataSingle.STD_SPEC_CD = this.specDataSelected[0].STD_SPEC_CD;
                this.specDataSingle.CREATED_BY = this.specDataSelected[0].CREATED_BY;
                this.specDataSingle.CREATED_DT = this.specDataSelected[0].CREATED_DT;
            } else {
                this.setFormDefault();
                this.isEditMode = isActive;
                this.specDataSelected = [];
                refSpecTable.value!.clearSelection();
            }
        },
        setModalUploadOpen(): void{
            this.isModalUploadOpen = true;
        },
        setModalUploadClose(): void{
            this.isModalUploadOpen = false;
            this.specDataOrigin = [];
            this.specdataTarget = [];
            this.specDataExcelCount = 0;
            this.isFileDenied = true;
            const clearElement = document.getElementById('file-input') as HTMLInputElement;
            if (clearElement !== null) {
                clearElement.value = '';
            }
        },

        handleELSelect(val: any){
            this.specDataSelected = val;
            if(this.specDataSelected.length == 0){
                refSpecTable.value!.clearSelection();
                this.setEditMode(false);
            }
        },
        async handleFileSelected(e){
            const file = e.target.files[0];
            this.fileSelected = file;

            try {
                this.isImportExcelCheckerLoading = true
                const url:string = import.meta.env.VITE_APP_BE_URL + `/MasterDataSpec/ImportExcelChecker`
                const formDataHeaders = {
                    'Content-Type': 'multipart/form-data',
                };
                const res = await axios.post(url, {'formFile': file}, {
                    headers : formDataHeaders
                })
    
                if (res.status == 200) {
                    if(res.data.status === 'ready'){
                        this.specDataOrigin = await res.data.data.origin;
                        this.specdataTarget = await res.data.data.target;
                        this.statusExcel = await res.data.status;
                        this.messageExcel = await res.data.message;
                        this.specDataExcelCount = await res.data.data.origin.length;
                    } else {
                        const dataFormatted = this.handleCompare(await res.data.data.origin, await res.data.data.target)
                        this.specDataOrigin = dataFormatted;
                        this.specdataTarget = await res.data.data.target;
                        this.statusExcel = await res.data.status;
                        this.messageExcel = await res.data.message;
                        this.specDataExcelCount = dataFormatted.length;
                    }

                    for (let index = 0; index < this.specDataOrigin.length; index++) {
                        const element = this.specDataOrigin[index];
                        //FLAG -> 1 = FAIL
                        if(parseInt(element.STD_SPEC_ID) === 1){
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
                    this.specDataOrigin = [];
                    this.specdataTarget = [];
                    this.statusExcel = 'Error';
                    this.messageExcel = 'Error, please try again later';
            } finally {
                this.isImportExcelCheckerLoading = false;
            }
        },
        handleCompare(origin, target){
            let foundPosCombination = {};

            target.forEach(item => {
                const combination = `${item.POS_NM}-${item.BC_TYPE}-${item.POS_ID}-${item.INSPJOB_ID}-${item.PART_NAME}`;
                foundPosCombination[combination] = true;
            });

            origin.forEach(item => {
                const combination = `${item.POS_NM}-${item.BC_TYPE}-${item.POS_ID}-${item.INSPJOB_ID}-${item.PART_NAME}`;
                if (foundPosCombination[combination]) {
                    //FLAG -> 1 = FAIL, 0 = SUCCESS
                    item.STD_SPEC_ID = '1';
                }
            });

            return origin;
        },
        async handleDownloadTemplate(){
            try {
                this.isDownloadTemplateLoad = true;
                const url:string = '/MasterDataSpec/GetTemplate';

                const res = await axios.post(url, 0, { responseType: 'blob' });

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));

                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Master Data Specification - Template.xlsx';
                document.body.appendChild(a);
                a.click();
        
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                
            } finally {
                this.isDownloadTemplateLoad = false;
            }
        },

        async getDataSpec(){
            try {
                this.isFetchLoading = true;

                const url:string = '/MasterDataSpec/DataTable'; 
                const res = await ApiService.post(url, this.paginationFormatted);

                this.specDataList = res.data.data;
                this.specDataCount = res.data.recordsTotal;
            } catch (error) {
                this.specDataList = [];
                this.specDataCount = 0;
            } finally {
                this.isFetchLoading = false
            }
        },

        async submitSave():Promise<void> {
            console.log('submitted');
            try {
                this.isSaveLoading = true;

                if(this.isAddMode){
                    const url:string = '/MasterDataSpec/Add';
                    const paramRequest: specDataRequest = this.requestFormatted;
                    
                    const res = await ApiService.post(url, paramRequest);
                    console.log(res);
    
                    if(res.status == 200){
                        successNotification('Added');
                    } else {
                        warningNotification('Added');
                    }
                } else if (this.isEditMode){
                    const url:string = '/MasterDataSpec/Update';
                    const paramRequest:any = this.requestEditFormatted;
                    
                    const res = await ApiService.put(url, paramRequest);
                    console.log(res);
    
                    if(res.status === 200){
                        successNotification('Updated');
                    } else {
                        warningNotification('Updated');
                    }
                }
            } catch (error) {
                console.log(error);
                this.isAddMode ? errorNotification('Added') : errorNotification('Updated');
            } finally {
                this.isSaveLoading = false;
                await this.getDataSpec();
                this.setFormDefault();
                this.setEditMode(false);
                this.setAddMode(false)
            }
        },

        async submitDelete():Promise<void>{
            ElMessageBox.alert(`Selected data will be deleted, Are you sure for deleting ${this.specDataSelected.length} data?`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isDeleteLoading = true
                            const url: string = '/MasterDataSpec/Delete';

                            const paramApi = this.specDataSelected.map((item) => ({
                                STD_SPEC_ID: item.STD_SPEC_ID,
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
                            await this.getDataSpec();
                        }
                    } else {
                        refSpecTable.value!.clearSelection();
                    }
                }
            })
        },
        async submitImportExcel(){
            try {
                this.isImportExcelLoading = true;
                
                const url:string = `/MasterDataSpec/AddRange`;
                const paramReq = JSON.stringify(this.specDataOrigin);
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
                await this.getDataSpec();
                this.setModalUploadClose();
            }
        }
    }
});
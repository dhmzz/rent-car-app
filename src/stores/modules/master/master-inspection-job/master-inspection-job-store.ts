import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification, skeletonErrorMessage, notFoundDataInExcel, skeletonSuccessMessage } from "@/stores/notifications";
import type { ElTable, Action } from 'element-plus';
import { ElMessageBox } from "element-plus";
import ApiService from "@/core/services/ApiService";
import type { inspectionEditRequest, inspectionJobAddRequest, inspectionJobResponse } from "./master-inspection-job-types";
import type { PosDataResponse } from "../master-pos/master-pos-types";
import { OptionStore } from "@/stores";
import axios from "axios";
import * as XLSX from 'xlsx'

export const refInspectionJobTable = ref<InstanceType<typeof ElTable>>()

export const useMasterInspectionJob = defineStore("master-inspection-job", {
    state: () => ({
        inspectionJobDataList: [] as inspectionJobResponse[],
        inspectionJobDataSelected: [] as inspectionJobResponse[],
        inspectionJobOrigin: [] as inspectionJobResponse[],
        inspectionHobTarget: [] as inspectionJobResponse[],

        inspectionDataExcelCount: 0,
        inspectionJobDataCount: 0,

        fileSelected: null,

        isAddMode: false,
        isEditMode: false,
        isFetchLoading: false,
        isModalUploadOpen: false,
        isSaveLoading: false,
        isDeleteLoading: false,
        isImportExcelLoading: false,
        isFileDenied: true,
        isImportExcelCheckerLoading: false,
        isDownloadTemplateLoad: false,
        isCorrectFormatExcel: false,

        inspectionJobDataSingle:  {
            INSPJOB_ID: 0,
            POS_ID: '',
            POS_NM: '',										
            POS_CD: '',											
            INSPJOB: '',											
            INSPJOB_SEQ: '',											
            INSPSUBJOB: '',											
            INSPSUBJOB_SEQ: '',											
            POSITION: '',											
            PRIORITY: '',											
            SUBPRIORITY: '',											
            DATE_FROM: '',											
            DATE_TO: '',
            CREATED_DT: '',
            CREATED_BY: '',
            CHANGED_DT: '',
            CHANGED_BY: '',
            POS_OBJECT: null as PosDataResponse | null								
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
            INSPJO: '',
            INSPSUBJOB: ''
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
                start : this.startFormatted,
                length: this.paginationTable.length,
                search: this.search         
            };
            return pagination;
        },
        requestFormatted(state):inspectionJobAddRequest{
            const requestFormatted = {
                POS_ID: state.inspectionJobDataSingle.POS_ID,
                INSPJOB: state.inspectionJobDataSingle.INSPJOB,
                INSPJOB_SEQ: state.inspectionJobDataSingle.INSPJOB_SEQ,
                INSPSUBJOB: state.inspectionJobDataSingle.INSPSUBJOB,
                INSPSUBJOB_SEQ: state.inspectionJobDataSingle.INSPSUBJOB_SEQ,
                POSITION: state.inspectionJobDataSingle.POSITION,
                DATE_FROM: state.inspectionJobDataSingle.DATE_FROM,
                DATE_TO: state.inspectionJobDataSingle.DATE_TO,
                // CREATED_BY: state.inspectionJobDataSingle.CREATED_BY,
                CREATED_BY: 'arka.admin',
                POS_CD: state.inspectionJobDataSingle.POS_CD,
                POS_NM: state.inspectionJobDataSingle.POS_NM
            }
            return requestFormatted
        },
        requestEditFormatted(state):inspectionEditRequest{
            const request = {
                POS_ID: this.inspectionJobDataSingle.POS_ID.toString(),
                INSPJOB_ID: this.inspectionJobDataSingle.INSPJOB_ID.toString(),
                INSPJOB: this.inspectionJobDataSingle.INSPJOB,
                INSPJOB_SEQ: this.inspectionJobDataSingle.INSPJOB_SEQ,
                INSPSUBJOB: this.inspectionJobDataSingle.INSPSUBJOB,
                INSPSUBJOB_SEQ: this.inspectionJobDataSingle.INSPSUBJOB_SEQ,
                POSITION: this.inspectionJobDataSingle.POSITION,
                DATE_FROM: this.inspectionJobDataSingle.DATE_FROM,
                DATE_TO: this.inspectionJobDataSingle.DATE_TO,
                CHANGED_BY: this.inspectionJobDataSingle.CHANGED_BY,
                POS_CD: this.inspectionJobDataSingle.POS_CD,
                POS_NM: this.inspectionJobDataSingle.POS_NM
            }
            return request;
        },
        datatableExcelFormatted(state){
            const start = state.paginationTableExcel.start === 1 ? 0 : state.paginationTableExcel.start - 1;
            const end = state.paginationTableExcel.start === 1 ? state.paginationTableExcel.length : state.paginationTableExcel.length + 1;
            
            const dataFormatted = state.inspectionJobOrigin.slice(start, end)
            return dataFormatted;
        },
        excelFormat():{cell, key}[]{
            const objectForCheck:{cell, key}[]= [
                {cell : 'A1', key: 'POS_ID'},
                {cell : 'B1', key: 'INSPJOB_ID'},
                {cell : 'C1', key: 'INSPJOB_SEQ'},
                {cell : 'D1', key: 'INSPSUBJOB'},
                {cell : 'E1', key: 'INPSUBJOB_SEQ'},
                {cell : 'F1', key: 'POSITION'},
                {cell : 'G1', key: 'DATE_FROM'},
                {cell : 'H1', key: 'DATE_TO'},
                {cell : 'I1', key: 'POS_CD'},
                {cell : 'J1', key: 'POS_NM'},
            ];
            return objectForCheck;
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
            this.inspectionJobDataSingle.POS_NM = '';
            this.inspectionJobDataSingle.POS_OBJECT = null;
            this.inspectionJobDataSingle.INSPJOB = '';
            this.inspectionJobDataSingle.INSPJOB_SEQ = '';
            this.inspectionJobDataSingle.INSPSUBJOB = '';
            this.inspectionJobDataSingle.INSPSUBJOB_SEQ = '';
            this.inspectionJobDataSingle.POSITION = '';
        },
        setAddMode(isActive: boolean): void{
            if(isActive){
                this.isAddMode = true;
                const datePlaceholder:string = this.setDate();
                this.inspectionJobDataSingle.CREATED_DT = datePlaceholder;
                const placeholder = {
                    POS_ID: '#ADD:MODE',
                    INSPJOB_ID: '#ADD:MODE',
                    INSPJOB: '#ADD:MODE',
                    INSPJOB_SEQ: '#ADD:MODE',
                    INSPSUBJOB: '#ADD:MODE',
                    INSPSUBJOB_SEQ: '#ADD:MODE',
                    POSITION: '#ADD:MODE',
                    PRIORITY: '#ADD:MODE',
                    SUBPRIORITY: '#ADD:MODE',
                    DATE_FROM: '#ADD:MODE',
                    DATE_TO: '#ADD:MODE',
                    CREATED_BY: '#ADD:MODE',
                    CREATED_DT: '#ADD:MODE',
                    CHANGED_BY: '#ADD:MODE',
                    CHANGED_DT: '#ADD:MODE',
                    POS_CD: '#ADD:MODE',
                    POS_NM: '#ADD:MODE'	
                };
                this.inspectionJobDataList.push(placeholder);
            } else { 
                this.isAddMode = false;
                // this.setFormDefault();
                this.inspectionJobDataList.pop();
                // refSpecTable.value!.clearSelection();
            }
        },
        setEditMode(isActive:boolean): void{
            if(isActive){
                this.isEditMode = isActive;

                const POS_OBJECT = OptionStore.posOption.find((key) => key.POS_CD == this.inspectionJobDataSelected[0].POS_CD);

                if(POS_OBJECT != undefined){
                    this.inspectionJobDataSingle.POS_OBJECT = POS_OBJECT;

                    this.inspectionJobDataSingle.POS_CD = POS_OBJECT.POS_CD;
                    this.inspectionJobDataSingle.POS_NM = POS_OBJECT.POS_NM;
                    this.inspectionJobDataSingle.POS_ID = POS_OBJECT.POS_ID;
                    this.inspectionJobDataSingle.INSPJOB_ID = parseInt(this.inspectionJobDataSelected[0].INSPJOB_ID);
                    this.inspectionJobDataSingle.INSPJOB = this.inspectionJobDataSelected[0].INSPJOB;
                    this.inspectionJobDataSingle.INSPSUBJOB = this.inspectionJobDataSelected[0].INSPSUBJOB;
                    this.inspectionJobDataSingle.INSPJOB_SEQ = this.inspectionJobDataSelected[0].INSPJOB_SEQ;
                    this.inspectionJobDataSingle.INSPSUBJOB_SEQ = this.inspectionJobDataSelected[0].INSPSUBJOB_SEQ;
                    this.inspectionJobDataSingle.DATE_FROM = this.inspectionJobDataSelected[0].DATE_FROM;
                    this.inspectionJobDataSingle.DATE_TO = this.inspectionJobDataSelected[0].DATE_TO;
                    this.inspectionJobDataSingle.POSITION = this.inspectionJobDataSelected[0].POSITION;
                }
            } else {
                this.isEditMode = isActive;
                this.inspectionJobDataSelected = [];
                refInspectionJobTable.value!.clearSelection();
            }
        },
        setModalUploadClose(){
            this.isModalUploadOpen = false;
            this.inspectionJobOrigin = [];
            this.inspectionHobTarget = [];
            this.isFileDenied = true;
            this.inspectionDataExcelCount = 0;
            const clearElement = document.getElementById('file-input') as HTMLInputElement;
            if (clearElement !== null) {
                clearElement.value = '';
            }        
        },
        setModalUploadOpen(){
            this.isModalUploadOpen = true;
        },

        handleELSelect(val: any){
            this.inspectionJobDataSelected = val;
            if(this.inspectionJobDataSelected.length == 0){
            }
        },
        handlePosCdChange(){
            const POS_CD:string | undefined = this.inspectionJobDataSingle.POS_OBJECT?.POS_CD.toString();
            const POS_NM:string | undefined = this.inspectionJobDataSingle.POS_OBJECT?.POS_NM.toString();
            const POS_ID:string | undefined = this.inspectionJobDataSingle.POS_OBJECT?.POS_ID.toString();

            if(POS_CD != undefined && POS_NM != undefined && POS_ID != undefined){
                this.inspectionJobDataSingle.POS_CD = POS_CD;
                this.inspectionJobDataSingle.POS_NM = POS_NM
                this.inspectionJobDataSingle.POS_ID = POS_ID
            }
        },
        async handleFileSelected(e){
            const file = e.target.files[0];
            this.fileSelected = file;

            const reader = new FileReader()

            reader.onload = async (event) => {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                
                for (let i = 0; i < this.excelFormat.length; i++) {
                    const element = this.excelFormat[i];

                    const value = sheet[element.cell]
                    if(value && value.v !== undefined){
                        const result = this.handleRowChecker(element.key, value.v);                  
                        this.isCorrectFormatExcel = result;
                    } else {
                        this.isCorrectFormatExcel = false;
                    }
                }

                if(!this.isCorrectFormatExcel) {
                    invalidFformatExcelNotification();
                    this.fileSelected = null;
                    this.inspectionJobOrigin = [];

                    // Set default excel
                    this.inspectionDataExcelCount = 0
                    this.paginationTableExcel.start = 0;
                    
                    const clearElement = document.getElementById('file-input') as HTMLInputElement;
                    if (clearElement !== null) {
                        clearElement.value = '';
                    };
                } else if (this.isCorrectFormatExcel) {
                    try {
                        this.isImportExcelCheckerLoading = true
                        const url:string = import.meta.env.VITE_APP_BE_URL + `/MasterInspectionJob/ImportExcelChecker`
                        const formDataHeaders = {
                            'Content-Type': 'multipart/form-data',
                        };
                        const res = await axios.post(url, {'formFile': file}, {
                            headers : formDataHeaders
                        })
            
                        if (res.status == 200) {
                            if(res.data.status === 'ready' && res.data.data.origin.length >= 1){
                                this.inspectionJobOrigin = await res.data.data.origin;
                                this.inspectionHobTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.inspectionDataExcelCount = await res.data.data.origin.length;
                            } else if(res.data.status === 'ready' && !res.data.data.origin.length){
                                notFoundDataInExcel();
                                this.fileSelected = null;
                                const clearElement = document.getElementById('file-input') as HTMLInputElement;
                                if (clearElement !== null) {
                                    clearElement.value = '';
                                };
                            } else {
                                const dataFormatted = this.handleCompare(await res.data.data.origin, await res.data.data.target)
                                this.inspectionJobOrigin = dataFormatted;
                                this.inspectionHobTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.inspectionDataExcelCount = dataFormatted.length;
                            }
        
                            for (let index = 0; index < this.inspectionJobOrigin.length; index++) {
                                const element = this.inspectionJobOrigin[index];
                                if(parseInt(element.POS_ID) === 1){
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
                            this.inspectionJobOrigin = [];
                            this.inspectionHobTarget = [];
                            skeletonErrorMessage('Make sure the data format is correct');
                    } finally {
                        this.isImportExcelCheckerLoading = false;
                    }
                }
            }
            reader.readAsBinaryString(file);
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
                    item.INSPJOB_ID = '1';
                }
            });

            return origin;
        },
        async handleDownloadTemplate(){
            try {
                this.isDownloadTemplateLoad = true;
                const url:string = '/MasterInspectionJob/GetTemplate';

                const res = await axios.post(url, 0, { responseType: 'blob' });

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));

                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Master Inspection Job - Template.xlsx';
                document.body.appendChild(a);
                a.click();
        
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                
            } finally {
                this.isDownloadTemplateLoad = false;
            }
        },
        async handleSearch(){
            await this.getDataInspectionJob();
        },
        async handleClear(){
            this.search.INSPJO = '';
            this.search.INSPSUBJOB = '';
            this.search.POS_CD = '';
        
            await this.getDataInspectionJob();
        },
        handleRowChecker(expected:string, result:any):boolean{
            if (expected !== result) {
                return false;
            }
            return true;
        },

        async getDataInspectionJob(){
            try {
                this.isFetchLoading = true;

                const url:string = '/MasterInspectionJob/DataTable'; 
                const res = await ApiService.post(url, this.paginationFormatted);

                this.inspectionJobDataList = res.data.data;
                this.inspectionJobDataCount = res.data.recordsTotal;
            } catch (error) {
                this.inspectionJobDataList = [];
                this.inspectionJobDataCount = 0;
            } finally {
                this.isFetchLoading = false
            }
        },

        async submitSave():Promise<void> {
            try {
                this.isSaveLoading = true;

                if(this.isAddMode){
                    const paramRequest:inspectionJobAddRequest = this.requestFormatted;
                    const url:string = '/MasterInspectionJob/Add';
                    
                    const res = await ApiService.post(url, paramRequest);

                    if(res.status == 200){
                        skeletonSuccessMessage('Data saved successfully');
                    } else {
                        warningNotification('Added');
                    }
                } else if (this.isEditMode){
                    const url:string = '/MasterInspectionJob/Update';
                    const paramRequest:inspectionEditRequest = this.requestEditFormatted;
                    
                    console.log(paramRequest);
                    
                    const res = await ApiService.put(url, paramRequest);

                    if(res.status === 200){
                        skeletonSuccessMessage('Data saved successfully');
                    } else {
                        warningNotification('Updated');
                    }
                }
            } catch (error) {
                console.error(error);
                this.isAddMode ? errorNotification('Added') : errorNotification('Updated');
            } finally {
                this.isSaveLoading = false;
                this.isAddMode ? this.setAddMode(false) : this.setEditMode(false);
                await this.getDataInspectionJob();
                this.setFormDefault();
            }
        },
        async submitDelete():Promise<void>{
            ElMessageBox.alert(`Selected data will be deleted, Are you sure for deleting ${this.inspectionJobDataSelected.length} data?`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isDeleteLoading = true
                            const url: string = '/MasterInspectionJob/Delete';

                            const paramApi = this.inspectionJobDataSelected.map((item) => ({
                                INSPJOB_ID: item.INSPJOB_ID,
                            }));
                            const paramApiJson = JSON.stringify(paramApi)
                    
                            const res = await ApiService.post(url, JSON.stringify(paramApiJson))
                    
                            if(res.status === 200){
                                skeletonSuccessMessage('Data successfully deleted')
                            } else {
                                warningNotification('delete');
                            }
                        } catch (error) {
                            errorNotification('delete')
                        } finally {
                            this.isDeleteLoading = false
                            await this.getDataInspectionJob();
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
                
                const url:string = `/MasterInspectionJob/AddRange`;
                const paramReq = JSON.stringify(this.inspectionJobOrigin);
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
                await this.getDataInspectionJob();
                this.setModalUploadClose();
            }
        }
    }
});
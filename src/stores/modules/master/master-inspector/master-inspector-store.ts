import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification, notFoundDataInExcel, skeletonErrorMessage, skeletonSuccessMessage } from "@/stores/notifications";
import { ElMessageBox, type ElTable, type Action } from 'element-plus';
// import {type ElTable, type Action, ElMessageBox} from 'element-plus'
import ApiService from "@/core/services/ApiService";
import Search from "@/layouts/default-layout/components/search/Search.vue";
import axios from "axios";
import type { inspectorRequest, inspectorResponse, inspectoreUpdateRequest } from "./master-inspector-types";
import * as XLSX from 'xlsx'


export const refInspectoreTable = ref<InstanceType<typeof ElTable>>()

export const useMasterInspector = defineStore("master-inspector", {
    state: () => ({
        inspectorDataList: [] as inspectorResponse[],
        inspectorDataSelected: [] as inspectorResponse[],
        inspectorOrigin: [] as inspectorResponse[],
        inspectorTarget: [] as inspectorResponse[],

        inspecDataCount: 0,
        inspectorExcelCount: 0,

        fileSelected: null,

        isAddMode: false,
        isEditMode: false,
        isFetchLoading: false,
        isModalUploadOpen: false,
        isSaveLoading: false,
        isDeleteLoading: false,
        isImportExcelLoading: false,
        isImportExcelCheckerLoading: false,
        isFileDenied: true,
        isDownloadTemplateLoad: false,
        isCorrectFormatExcel: false,

        inspectorDataSingle:  {
            INSPJOB_ID: '',
            SHIFTGRPNM: '',
            INSPID: '',
            INSPNM: '',
            POS_CD: '',
            INSPJOB: '',
            INSPSUBJOB: '',
            CREATED_BY: '',
            CREATED_DT: '',
            CHANGED_BY: '',
            CHANGED_DT: '',
            NO_REG: ''
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
            SHIFTGRPNM: '',
            INSPNM: '',
            POS_CD: '',
            INSPJOB: '',
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
        datatableExcelFormatted(state){
            const start = state.paginationTableExcel.start === 1 ? 0 : state.paginationTableExcel.start - 1;
            const end = state.paginationTableExcel.start === 1 ? state.paginationTableExcel.length : state.paginationTableExcel.length + 1;
            
            const dataFormatted = state.inspectorOrigin.slice(start, end)
            return dataFormatted;
        },
        requestFormatted():any{
            const requestFormatted = {
                SHIFTGRPNM: this.inspectorDataSingle.SHIFTGRPNM.toString(),
                // INSPID: this.inspectorDataSingle.INSPID.toString(), !!!TEMPP!!!
                INSPID: '1',
                INSPNM: this.inspectorDataSingle.INSPNM.toString(),
                POS_CD: this.inspectorDataSingle.POS_CD.toString(),
                INSPJOB: this.inspectorDataSingle.INSPJOB.toString(),
                INSPSUBJOB: this.inspectorDataSingle.INSPSUBJOB.toString(),
                CREATED_BY: 'arka.admin',
                NO_REG: this.inspectorDataSingle.NO_REG.toString()
            }
            return requestFormatted
        },
        requestEditFormatted(state):inspectoreUpdateRequest{
            const request = {
                INSPECTOR_ID: state.inspectorDataSingle.INSPJOB_ID.toString(),
                SHIFTGRPNM: state.inspectorDataSingle.SHIFTGRPNM.toString(),
                INSPID: state.inspectorDataSingle.INSPID.toString(),
                INSPNM: state.inspectorDataSingle.INSPNM.toString(),
                POS_CD: state.inspectorDataSingle.POS_CD.toString(),
                INSPJOB: state.inspectorDataSingle.INSPJOB.toString(),
                INSPSUBJOB: state.inspectorDataSingle.INSPSUBJOB.toString(),
                CHANGED_BY: state.inspectorDataSingle.CHANGED_BY.toString(),
                NO_REG: state.inspectorDataSingle.NO_REG.toString()
            }
            return request;
        },
        excelFormat():{cell, key}[]{
            const objectForCheck:{cell, key}[]= [
                {cell : 'A1', key: 'SHIFTGRPNM'},
                {cell : 'B1', key: 'INPSJOB_ID'},
                {cell : 'C1', key: 'INSPNM'},
                {cell : 'D1', key: 'POS_CD'},
                {cell : 'E1', key: 'INSPJOB'},
                {cell : 'F1', key: 'INSPSUBJOB'},
                {cell : 'G1', key: 'NO_REG'},
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
            this.inspectorDataSingle.POS_CD = '';
            this.inspectorDataSingle.INSPJOB_ID = '';
            this.inspectorDataSingle.INSPSUBJOB = '';
            this.inspectorDataSingle.INSPJOB_ID = '';
            this.inspectorDataSingle.SHIFTGRPNM = '';
            this.inspectorDataSingle.NO_REG = '';
            this.inspectorDataSingle.INSPNM = '';
        },
        setAddMode(isActive: boolean): void{
            if(isActive){
                this.isAddMode = true;
                const datePlaceholder:string = this.setDate();
                this.inspectorDataSingle.CREATED_DT = datePlaceholder;
                const placeholder = {
                    INSPJOB_ID: '#ADD:MODE',
                    SHIFTGRPNM: '#ADD:MODE',
                    INSPID: '#ADD:MODE',
                    INSPNM: '#ADD:MODE',
                    POS_CD: '#ADD:MODE',
                    INSPJOB: '#ADD:MODE',
                    INSPSUBJOB: '#ADD:MODE',
                    CREATED_BY: '#ADD:MODE',
                    CREATED_DT: '#ADD:MODE',
                    CHANGED_BY: '#ADD:MODE',
                    CHANGED_DT: '#ADD:MODE',
                    NO_REG: '#ADD:MODE'	
                };
                this.inspectorDataList.push(placeholder);
            } else { 
                this.isAddMode = false;
                this.setFormDefault();
                this.inspectorDataList.pop();
                // refSpecTable.value!.clearSelection();
            }
        },
        setEditMode(isActive:boolean): void{
            if(isActive){
                this.isEditMode = isActive;
                this.inspectorDataSingle.INSPJOB_ID = this.inspectorDataSelected[0].INSPJOB_ID;
                this.inspectorDataSingle.POS_CD = this.inspectorDataSelected[0].POS_CD;
                this.inspectorDataSingle.INSPJOB = this.inspectorDataSelected[0].INSPJOB_ID;
                this.inspectorDataSingle.INSPSUBJOB = this.inspectorDataSelected[0].INSPSUBJOB;
                this.inspectorDataSingle.SHIFTGRPNM = this.inspectorDataSelected[0].SHIFTGRPNM;
                this.inspectorDataSingle.NO_REG = this.inspectorDataSelected[0].NO_REG;
                this.inspectorDataSingle.INSPNM = this.inspectorDataSelected[0].INSPNM;
                this.inspectorDataSingle.INSPID = this.inspectorDataSelected[0].INSPID;
            } else {
                this.isEditMode = isActive;
                this.setFormDefault();
                this.inspectorDataSelected = [];
                refInspectoreTable.value!.clearSelection();
            }
        },
        setModalUploadClose(): void{
            this.isModalUploadOpen = false

            this.inspectorOrigin = [];
            this.inspectorTarget = [];
            this.inspectorExcelCount = 0;
            this.isFileDenied = true;
            const clearElement = document.getElementById('file-input') as HTMLInputElement;
            if (clearElement !== null) {
                clearElement.value = '';
            }
        },
        setModalUploadOpen(): void{
            this.isModalUploadOpen = true
        },

        handleELSelect(val: any){
            this.inspectorDataSelected = val;
            if(this.inspectorDataSelected.length == 0){
                // refSpecTable.value!.clearSelection();
                this.setEditMode(false);
            }
        },
        async handleFileSelected(e){
            const file = e.target.files[0];
            this.fileSelected = file;

            const reader = new FileReader();

            reader.onload = async (event) => {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' })
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

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
                    this.inspectorOrigin = [];

                    // Set default excel
                    this.inspectorExcelCount = 0
                    this.paginationTableExcel.start = 0;
                    
                    const clearElement = document.getElementById('file-input') as HTMLInputElement;
                    if (clearElement !== null) {
                        clearElement.value = '';
                    };
                } else if (this.isCorrectFormatExcel){
                    try {
                        this.isImportExcelCheckerLoading = true
                        const url:string = import.meta.env.VITE_APP_BE_URL + `/MasterInspector/ImportExcelChecker`
                        const formDataHeaders = {
                            'Content-Type': 'multipart/form-data',
                        };
                        const res = await axios.post(url, {'formFile': file}, {
                            headers : formDataHeaders
                        })
            
                        if (res.status == 200) {
                            if(res.data.status === 'ready' && res.data.data.origin.length){
                                this.inspectorOrigin = await res.data.data.origin;
                                this.inspectorTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.inspectorExcelCount = await res.data.data.origin.length;
                            }else if(res.data.status === 'ready' && !res.data.data.origin.length){
                                notFoundDataInExcel();
                                this.fileSelected = null;
                                const clearElement = document.getElementById('file-input') as HTMLInputElement;
                                if (clearElement !== null) {
                                    clearElement.value = '';
                                };
                            } else {
                                const dataFormatted = this.handleCompare(await res.data.data.origin, await res.data.data.target)
                                this.inspectorOrigin = dataFormatted;
                                this.inspectorTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.inspectorExcelCount = dataFormatted.length;
                            }
        
                            for (let index = 0; index < this.inspectorOrigin.length; index++) {
                                const element = this.inspectorOrigin[index];
                                if(parseInt(element.INSPJOB_ID) === 1){
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
                        this.inspectorOrigin = [];
                        this.inspectorTarget = [];
                        this.statusExcel = 'Error';
                        this.messageExcel = 'Error, please try again later';
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
                const combination = `${item.POS_NM}-${item.SHIFTGRPNM}-${item.INSPNM}-${item.POS_CD}-${item.INSPJOB}`;
                foundPosCombination[combination] = true;
            });

            origin.forEach(item => {
                const combination = `${item.POS_NM}-${item.SHIFTGRPNM}-${item.INSPNM}-${item.POS_CD}-${item.INSPJOB}`;
                if (foundPosCombination[combination]) {
                    item.INSPJOB_ID = '1';
                }
            });

            return origin;
        },
        async handleDownloadTemplate(){
            try {
                this.isDownloadTemplateLoad = true;
                const url:string = '/MasterInspector/GetTemplate';

                const res = await axios.post(url, 0, { responseType: 'blob' });

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));

                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Master Inspector - Template.xlsx';
                document.body.appendChild(a);
                a.click();
        
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                
            } finally {
                this.isDownloadTemplateLoad = false;
            }
        },
        async handleSerach(){
            await this.getDataInspector();
        },
        async handleClear(){
            this.search.INSPJOB = '';
            this.search.INSPNM = '';
            this.search.INSPSUBJOB = '';
            this.search.POS_CD = '';
            this.search.SHIFTGRPNM = '';

            await this.getDataInspector();
        },
        handleRowChecker(expected:string, result:any):boolean{
            if (expected !== result) {
                return false;
            }
            return true;
        },

        async getDataInspector(){
            try {
                this.isFetchLoading = true;

                const url:string = '/MasterInspector/DataTable'; 
                const res = await ApiService.post(url, this.paginationFormatted);

                this.inspectorDataList = res.data.data;
                this.inspecDataCount = res.data.recordsTotal;
            } catch (error) {
                this.inspectorDataList = [];
                this.inspecDataCount = 0;
            } finally {
                this.isFetchLoading = false
            }
        },

        async submitSave():Promise<void> {
            try {
                this.isSaveLoading = true;

                if(this.isAddMode){
                    const url:string = '/MasterInspector/Add';
                    const paramRequest:inspectorRequest = this.requestFormatted;
                    
                    const res = await ApiService.post(url, paramRequest);

                    if(res.status == 200){
                        skeletonSuccessMessage('Data saved successfully');
                    } else {
                        warningNotification('Added');
                    }
                } else if (this.isEditMode){
                    const url:string = '/MasterInspector/Update';
                    const paramRequest:inspectoreUpdateRequest = this.requestEditFormatted;
                    
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
                await this.getDataInspector();
                this.setFormDefault();
                this.isAddMode ? this.setAddMode(false) : this.setEditMode(false);
            }
        },
        async submitDelete():Promise<void>{
            ElMessageBox.alert(`Selected data will be deleted, Are you sure for deleting ${this.inspectorDataSelected.length} data?`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isDeleteLoading = true
                            const url: string = '/MasterInspector/Delete';

                            const paramApi = this.inspectorDataSelected.map((item) => ({
                                INSPJOB_ID: item.INSPJOB_ID,
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
                            await this.getDataInspector();
                        }
                    } else {
                        refInspectoreTable.value!.clearSelection();
                    }
                }
            })
        },
        async submitImportExcel(){
            try {
                this.isImportExcelLoading = true;
                
                const url:string = `/MasterInspector/AddRange`;
                const paramReq = JSON.stringify(this.inspectorOrigin);
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
                await this.getDataInspector();
                this.setModalUploadClose();
            }
        }
    }
});
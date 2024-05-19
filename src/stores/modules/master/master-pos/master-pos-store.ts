import { defineStore } from "pinia";
import { ref } from "vue";
import type { PosDataResponse, PosDataRequest, PosUpdateRequest } from "./master-pos-types";
import { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification, notFoundDataInExcel, skeletonSuccessMessage, skeletonErrorMessage } from "@/stores/notifications";
import { ElMessage, ElMessageBox, type Action, ElTable } from 'element-plus';
import ApiService from "@/core/services/ApiService";
import Search from "@/layouts/default-layout/components/search/Search.vue";
import axios from "axios";
import Statement from "@/components/customers/cards/statments/Statement.vue";
import * as XLSX from 'xlsx'

export const refPosTable = ref<InstanceType<typeof ElTable>>()

export const useMasterPos = defineStore("master-pos", {
    state: () => ({
        posDataList: [] as PosDataResponse[],
        posDataSelected: [] as PosDataResponse[],
        posDataExcelOrigin: [] as PosDataResponse[],
        posDataExcelTarget: [] as PosDataResponse[],

        posDataCount: 0,
        posDataExcelCount: 0,

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

        posDataSingle: {
            POS_ID : 0,
            POS_NM : '',
            POS_CD: '',
            POS_SEQ: '',
            LINE_NM: '',
            LINE_SEQ: '',
            PREV_POS_NAME1: '',
            PREV_POS_NAME2: '',
            PREV_POS_NAME3: '',
            PREV_POS_NAME4: '',
            PREV_POS_NAME5: '',
            PREV_POS_NAME6: '',
            PREV_POS_NAME7: '',
            PREV_POS_NAME8: '',
            PREV_POS_NAME9: '',
            PREV_POS_NAME10: '',
            LSTARTFLG: '' || false,
            INPBODYFLG: '' || false,
            MANDATORYFLG: '' || false,
            T_TYPE: '',
            CSOK: '',
            CREATED_DT: '',
            CREATED_BY: 'arka.admin',
            CHANGED_DT: '',
            CHANGED_BY: 'arka.admin'
        },
        paginationTable : {
            draw: 0,
            start: 1,
            length: 10,
        },
        paginationTableExcel : {
            draw: 0,
            start: 1,
            length: 10,
        },

        posNameParam: '',
        posCodeParam: '',
        lineNameParam: '',
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
                search: {
                    POS_NM: this.posNameParam,
                    POS_CD: this.posCodeParam,
                    LINE_NM: this.lineNameParam
                }
            };
            return pagination;
        },
        requestDataFormatted(state):PosDataRequest{
            const paramFormatted = {
                POS_NM: state.posDataSingle.POS_NM,
                POS_CD: state.posDataSingle.POS_CD,
                POS_SEQ: state.posDataSingle.POS_SEQ,
                LINE_NM: state.posDataSingle.POS_SEQ,
                LINE_SEQ: state.posDataSingle.LINE_SEQ,
                PREV_POS_NAME1: state.posDataSingle.PREV_POS_NAME1,
                PREV_POS_NAME2: state.posDataSingle.PREV_POS_NAME2,
                PREV_POS_NAME3: state.posDataSingle.PREV_POS_NAME3,
                PREV_POS_NAME4: state.posDataSingle.PREV_POS_NAME4,
                PREV_POS_NAME5: state.posDataSingle.PREV_POS_NAME5,
                PREV_POS_NAME6: state.posDataSingle.PREV_POS_NAME6,
                PREV_POS_NAME7: state.posDataSingle.PREV_POS_NAME7,
                PREV_POS_NAME8: state.posDataSingle.PREV_POS_NAME8,
                PREV_POS_NAME9: state.posDataSingle.PREV_POS_NAME9,
                PREV_POS_NAME10: state.posDataSingle.PREV_POS_NAME10,
                LSTARTFLG: state.posDataSingle.LSTARTFLG ? 'T' : 'F',
                INPBODYFLG: state.posDataSingle.INPBODYFLG ? 'T' : 'F',
                MANDATORYFLG: state.posDataSingle.MANDATORYFLG ? 'T' : 'F',
                T_TYPE: state.posDataSingle.T_TYPE,
                CSOK: state.posDataSingle.CSOK,
                // CREATED_DT: ,
                CREATED_BY: state.posDataSingle.CREATED_BY,
            }
            return paramFormatted;
        },
        requestUpdateFormatted(state):PosUpdateRequest{
            const paramFormatted = {
                POS_ID: state.posDataSingle.POS_ID.toString(),
                POS_NM: state.posDataSingle.POS_NM,
                POS_CD: state.posDataSingle.POS_CD,
                POS_SEQ: state.posDataSingle.POS_SEQ,
                LINE_NM: state.posDataSingle.LINE_NM,
                LINE_SEQ: state.posDataSingle.LINE_SEQ,
                PREV_POS_NAME1: state.posDataSingle.PREV_POS_NAME1,
                PREV_POS_NAME2: state.posDataSingle.PREV_POS_NAME2,
                PREV_POS_NAME3: state.posDataSingle.PREV_POS_NAME3,
                PREV_POS_NAME4: state.posDataSingle.PREV_POS_NAME4,
                PREV_POS_NAME5: state.posDataSingle.PREV_POS_NAME5,
                PREV_POS_NAME6: state.posDataSingle.PREV_POS_NAME6,
                PREV_POS_NAME7: state.posDataSingle.PREV_POS_NAME7,
                PREV_POS_NAME8: state.posDataSingle.PREV_POS_NAME8,
                PREV_POS_NAME9: state.posDataSingle.PREV_POS_NAME9,
                PREV_POS_NAME10: state.posDataSingle.PREV_POS_NAME10,
                LSTARTFLG: state.posDataSingle.LSTARTFLG ? 'T' : 'F',
                INPBODYFLG: state.posDataSingle.INPBODYFLG ? 'T' : 'F',
                MANDATORYFLG: state.posDataSingle.MANDATORYFLG ? 'T' : 'F',
                T_TYPE: state.posDataSingle.T_TYPE,
                CSOK: state.posDataSingle.CSOK,
                // CREATED_DT: ,
                CHANGED_BY: state.posDataSingle.CHANGED_BY,
            }
            return paramFormatted;
        },
        datatableExcelFormatted(state){
            const start = state.paginationTableExcel.start === 1 ? 0 : state.paginationTableExcel.start - 1;
            const end = state.paginationTableExcel.start === 1 ? state.paginationTableExcel.length : state.paginationTableExcel.length + 1;
            
            const dataFormatted = state.posDataExcelOrigin.slice(start, end)
            return dataFormatted;
        },
        excelFormat():{cell, key}[]{
            const objectForCheck:{cell, key}[]= [
                {cell : 'A1', key: 'POS_NM'},
                {cell : 'B1', key: 'POS_CD'},
                {cell : 'C1', key: 'POS_SEQ'},
                {cell : 'D1', key: 'LINE_NM'},
                {cell : 'E1', key: 'LINE_SEQ'},
                {cell : 'F1', key: 'PREV_POS_NAME1'},
                {cell : 'G1', key: 'PREV_POS_NAME2'},
                {cell : 'H1', key: 'PREV_POS_NAME3'},
                {cell : 'I1', key: 'PREV_POS_NAME4'},
                {cell : 'J1', key: 'PREV_POS_NAME5'},
                {cell : 'K1', key: 'PREV_POS_NAME6'},
                {cell : 'L1', key: 'PREV_POS_NAME7'},
                {cell : 'M1', key: 'PREV_POS_NAME8'},
                {cell : 'N1', key: 'PREV_POS_NAME9'},
                {cell : 'O1', key: 'PREV_POS_NAME10'},
                {cell : 'P1', key: 'LSTARTFLG'},
                {cell : 'Q1', key: 'INPBODYFLG'},
                {cell : 'R1', key: 'MANDATORYFLG'},
                {cell : 'S1', key: 'T_TYPE'},
                {cell : 'T1', key: 'CSOK'},
            ];
            return objectForCheck;
        }
    },

    actions: {
        setAddMode(isActive: boolean): void{
            if(isActive){
                this.isAddMode = true;
                const datePlaceholder:string = this.setDate();
                this.posDataSingle.CREATED_DT = datePlaceholder;
                const placeholder = {
                    POS_ID : '0',
                    POS_NM : '#ADD:MODE',
                    POS_CD: '#ADD:MODE',
                    POS_SEQ: '#ADD:MODE',
                    LINE_NM: '#ADD:MODE',
                    LINE_SEQ: '#ADD:MODE',
                    PREV_POS_NAME1: '#ADD:MODE',
                    PREV_POS_NAME2: '#ADD:MODE',
                    PREV_POS_NAME3: '#ADD:MODE',
                    PREV_POS_NAME4: '#ADD:MODE',
                    PREV_POS_NAME5: '#ADD:MODE',
                    PREV_POS_NAME6: '#ADD:MODE',
                    PREV_POS_NAME7: '#ADD:MODE',
                    PREV_POS_NAME8: '#ADD:MODE',
                    PREV_POS_NAME9: '#ADD:MODE',
                    PREV_POS_NAME10: '#ADD:MODE',
                    LSTARTFLG: '#ADD:MODE',
                    INPBODYFLG: '#ADD:MODE',
                    MANDATORYFLG: '#ADD:MODE',
                    T_TYPE: '#ADD:MODE',
                    CSOK: '#ADD:MODE',
                    CREATED_DT: '#ADD:MODE',
                    CREATED_BY: '#ADD:MODE',
                    CHANGED_DT: '#ADD:MODE',
                    CHANGED_BY: '#ADD:MODE'
                };
                this.posDataList.push(placeholder);
            } else { 
                this.isAddMode = false;
                this.posDataList.pop();
                this.setFormDefault();
            }
        },
        setEditMode(isActive: boolean): void {
            const changedDtPlaceHolder:string = this.setDate();
            if(isActive){
                this.isEditMode = isActive;
                this.posDataSingle.POS_ID = parseInt(this.posDataSelected[0].POS_ID);
                this.posDataSingle.POS_NM = this.posDataSelected[0].POS_NM.toString();
                this.posDataSingle.POS_CD = this.posDataSelected[0].POS_CD.toString();
                this.posDataSingle.POS_SEQ = this.posDataSelected[0].POS_SEQ.toString();
                this.posDataSingle.LINE_NM = this.posDataSelected[0].LINE_NM.toString();
                this.posDataSingle.LINE_SEQ = this.posDataSelected[0].LINE_SEQ.toString();
                this.posDataSingle.PREV_POS_NAME1 = this.posDataSelected[0].PREV_POS_NAME1.toString();
                this.posDataSingle.PREV_POS_NAME2 = this.posDataSelected[0].PREV_POS_NAME2.toString();
                this.posDataSingle.PREV_POS_NAME3 = this.posDataSelected[0].PREV_POS_NAME3.toString();
                this.posDataSingle.PREV_POS_NAME4 = this.posDataSelected[0].PREV_POS_NAME4.toString();
                this.posDataSingle.PREV_POS_NAME5 = this.posDataSelected[0].PREV_POS_NAME5.toString();
                this.posDataSingle.PREV_POS_NAME6 = this.posDataSelected[0].PREV_POS_NAME6.toString();
                this.posDataSingle.PREV_POS_NAME7 = this.posDataSelected[0].PREV_POS_NAME7.toString();
                this.posDataSingle.PREV_POS_NAME8 = this.posDataSelected[0].PREV_POS_NAME8.toString();
                this.posDataSingle.PREV_POS_NAME9 = this.posDataSelected[0].PREV_POS_NAME9.toString();
                this.posDataSingle.PREV_POS_NAME10 = this.posDataSelected[0].PREV_POS_NAME10.toString();
                this.posDataSingle.LSTARTFLG = this.posDataSelected[0].LSTARTFLG.toString() === 'T' ? true : false;
                this.posDataSingle.INPBODYFLG = this.posDataSelected[0].INPBODYFLG.toString() === 'T' ? true : false;
                this.posDataSingle.MANDATORYFLG = this.posDataSelected[0].MANDATORYFLG.toString() === 'T' ? true : false;
                this.posDataSingle.T_TYPE = this.posDataSelected[0].T_TYPE.toString();
                this.posDataSingle.CSOK = this.posDataSelected[0].CSOK.toString();
                this.posDataSingle.CREATED_DT = this.posDataSelected[0].CREATED_DT.toString();
                this.posDataSingle.CREATED_BY = this.posDataSelected[0].CREATED_BY.toString();
                // this.posDataSingle.CREATED_BY = 'arka.admin';
                this.posDataSingle.CHANGED_DT = changedDtPlaceHolder;
                // this.posDataSingle.CHANGED_BY = this.posDataSelected[0].CHANGED_BY.toString();
                this.posDataSingle.CHANGED_BY = 'ark';
            } else if(isActive === false) {
                this.isEditMode = isActive;
                this.setFormDefault();
                refPosTable.value!.clearSelection();
            }
        },
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
        setFormDefault(): void{
            this.posDataSingle.POS_NM = '';
            this.posDataSingle.POS_CD = '';
            this.posDataSingle.POS_SEQ = '';
            this.posDataSingle.LINE_NM = '';
            this.posDataSingle.LINE_SEQ = '';
            this.posDataSingle.PREV_POS_NAME1 = '';
            this.posDataSingle.PREV_POS_NAME2 = '';
            this.posDataSingle.PREV_POS_NAME3 = '';
            this.posDataSingle.PREV_POS_NAME4 = '';
            this.posDataSingle.PREV_POS_NAME5 = '';
            this.posDataSingle.PREV_POS_NAME6 = '';
            this.posDataSingle.PREV_POS_NAME7 = '';
            this.posDataSingle.PREV_POS_NAME8 = '';
            this.posDataSingle.PREV_POS_NAME9 = '';
            this.posDataSingle.PREV_POS_NAME10 = '';
            this.posDataSingle.LSTARTFLG = false;
            this.posDataSingle.INPBODYFLG = false;
            this.posDataSingle.MANDATORYFLG = false;
            this.posDataSingle.T_TYPE = '';
            this.posDataSingle.CSOK = '';
        },
        setModalUploadOpen(): void{
            this.isModalUploadOpen = true
        },
        setModalUploadClose(): void{
            this.isModalUploadOpen = false;
            this.posDataExcelOrigin = [];
            this.posDataExcelTarget = [];
            this.posDataExcelCount = 0;
            this.isFileDenied = true;
            const clearElement = document.getElementById('file-input') as HTMLInputElement;
            if (clearElement !== null) {
                clearElement.value = '';
            }

        },

        async getDataPos(){
            try {
                this.isFetchLoading = true;

                const url:string = '/MasterPos/DataTable'; 
                const res = await ApiService.post(url, this.paginationFormatted);

                this.posDataList = res.data.data;
                this.posDataCount = res.data.recordsTotal;
            } catch (error) {
                this.posDataList = [];
                this.posDataCount = 0;
            } finally {
                this.isFetchLoading = false
            }
        },

        handleELSelect(val: any){
            this.posDataSelected = val;
            if(this.posDataSelected.length == 0){
                refPosTable.value!.clearSelection();
                this.setEditMode(false);
            }
        },
        async handleDelete():Promise<void>{
            ElMessageBox.alert(`Selected data will be deleted, Are you sure for deleting ${this.posDataSelected.length} data?`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isDeleteLoading = true
                            const url: string = '/MasterPos/Delete';

                            const paramApi = this.posDataSelected.map((item) => ({
                                POS_ID: item.POS_ID,
                            }));
                            const paramApiJson = JSON.stringify(paramApi)
                    
                            const res = await ApiService.post(url, JSON.stringify(paramApiJson))
                    
                            if(res.status == 200){
                                skeletonSuccessMessage('Data successfully deleted')
                            } else {
                                warningNotification('delete');
                            }
                        } catch (error) {
                            errorNotification('delete')
                        } finally {
                            this.isDeleteLoading = false
                            await this.getDataPos();
                        }
                    } else {
                        refPosTable.value!.clearSelection();
                    }
                }
            })
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
                    this.posDataExcelOrigin = [];

                    // Set default excel
                    this.posDataExcelCount = 0
                    this.paginationTableExcel.start = 0;
                    
                    const clearElement = document.getElementById('file-input') as HTMLInputElement;
                    if (clearElement !== null) {
                        clearElement.value = '';
                    };
                } else if (this.isCorrectFormatExcel) {
                    try {
                        this.isImportExcelCheckerLoading = true
                        const url:string = import.meta.env.VITE_APP_BE_URL + `/MasterPos/ImportExcelChecker`
                        const formDataHeaders = {
                            'Content-Type': 'multipart/form-data',
                        };
                        const res = await axios.post(url, {'formFile': file}, {
                            headers : formDataHeaders
                        })
            
                        if (res.status == 200) {
                            if(res.data.status === 'ready' && res.data.data.origin.length){
                                this.posDataExcelOrigin = await res.data.data.origin;
                                this.posDataExcelTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.posDataExcelCount = await res.data.data.origin.length;
                            } else if(res.data.status === 'ready' && !res.data.data.origin.length){
                                notFoundDataInExcel();
                                this.fileSelected = null;
                                const clearElement = document.getElementById('file-input') as HTMLInputElement;
                                if (clearElement !== null) {
                                    clearElement.value = '';
                                };
                            } else {
                                const dataFormatted = this.handleCompare(await res.data.data.origin, await res.data.data.target)
                                this.posDataExcelOrigin = dataFormatted;
                                this.posDataExcelTarget = await res.data.data.target;
                                this.statusExcel = await res.data.status;
                                this.messageExcel = await res.data.message;
                                this.posDataExcelCount = dataFormatted.length;
                            }
        
                            for (let index = 0; index < this.posDataExcelOrigin.length; index++) {
                                const element = this.posDataExcelOrigin[index];
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
                            this.posDataExcelOrigin = [];
                            this.posDataExcelTarget = [];
                            skeletonErrorMessage('Make sure the data format is correct');
                    } finally {
                        this.isImportExcelCheckerLoading = false;
                    }
                }
            }
            reader.readAsBinaryString(file);
        },
        async handleSearch(){
            console.log('search')
            await this.getDataPos();
        },
        async handleClear(){
            this.posNameParam = '',
            this.posCodeParam = '',
            this.lineNameParam = ''
            await this.getDataPos();
        },
        async handleDownloadTemplate(){
            try {
                this.isDownloadTemplateLoad = true;
                const url:string = '/MasterPos/GetTemplate';

                const res = await axios.post(url, 0, { responseType: 'blob' });

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));

                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Master POS - Template.xlsx';
                document.body.appendChild(a);
                a.click();
        
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                
            } finally {
                this.isDownloadTemplateLoad = false;
            }
        },
        handleCompare(origin, target){
            let foundPosCombination = {};

            target.forEach(item => {
                const combination = `${item.POS_NM}-${item.POS_CD}-${item.POS_SEQ}`;
                foundPosCombination[combination] = true;
            });

            origin.forEach(item => {
                const combination = `${item.POS_NM}-${item.POS_CD}-${item.POS_SEQ}`;
                if (foundPosCombination[combination]) {
                    item.POS_ID = 1;
                }
            });

            return origin;
        },
        handleRowChecker(expected:string, result:any):boolean{
            if (expected !== result) {
                return false;
            }
            return true;
        },

        // function naming from action and text button
        async submitSave(): Promise<void>{
            try {
                this.isSaveLoading = true
                if(this.isAddMode){
                    const url = '/MasterPos/Add'
                    const reqParam = this.requestDataFormatted;
                    const res = await ApiService.post(url, reqParam);
    
                    if(res.status == 200){
                        successNotification('Added');
                        skeletonSuccessMessage('Data saved successfully');
                        await this.getDataPos();
                    } else if(res.status !== 200){
                        const mess:string = res.statusText;
                        warningNotification('Added');
                    }
                } else if(this.isEditMode){
                    const url = '/MasterPos/Update'
                    const reqParam = this.requestUpdateFormatted;
                    const res = await ApiService.put(url, reqParam);
    
                    if(res.status == 200){
                        skeletonSuccessMessage('Data saved successfully');
                        await this.getDataPos();
                    } else if(res.status !== 200){
                        const mess:string = res.statusText;
                        warningNotification('Added');
                    }
                }
            } catch (error) {
                errorNotification('saved');
            } finally {
                this.isAddMode ? this.setAddMode(false) : this.setEditMode(false);
                this.isSaveLoading = false;
            }
        },
        async submitImportExcel(){
            try {
                this.isImportExcelLoading = true;
                
                const url:string = `/MasterPos/AddRange`;
                const paramReq = JSON.stringify(this.posDataExcelOrigin);
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
                await this.getDataPos();
                this.setModalUploadClose();
            }
        }
    }
});

export default {refPosTable};
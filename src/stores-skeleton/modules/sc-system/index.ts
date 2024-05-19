import { defineStore } from 'pinia';
import { ElMessage, ElMessageBox, type Action } from 'element-plus'
import { successNotification, warningNotification, errorNotification } from './notifications'
import ApiService from '@/core/services/ApiService';
import { getToken, saveToken } from '@/core/services/JwtService';
import axios from 'axios';

export const useSystemStore = defineStore('sc-system', {
    state: () => ({
        systemList: [] as systemDataList[],
        totalSystemList: 0,
        systemData: {
            systemCode: '',
            systemType: '',
            systemValueText: '',
            systemValueDateTime: '',
            systemValueNumber: 0,
            systemRemark: '',
            isActive: '',
            createdBy: ''
        },
        systemTypeCombobox: [] as optionCombobox [],
        systemCodeCombobox: [] as optionCombobox [],
        modalSaveTItle: '',
        isLoading: false,
        isLoadiingDelete: false,
        isLoadingTable: false,
        isModalOpen: false,
        isModalUploadOpen: false,
        selectedData: [] as selectedItem[],
        paginationTable : {
            draw: 1,
            start: 1,
            length: 10,
            search: ''
        },
        systemFilter: {
            systemType: '',
            systemCode: '',
            search: ''
        },
        selectedFile: ''
    }),

    actions: {
        setModalOpen(title: string){
            if(title == 'Edit'){
                this.systemData.systemCode = this.selectedData[0].systemCode,
                this.systemData.systemType = this.selectedData[0].systemType,
                this.systemData.systemValueText = this.selectedData[0].systemValueText,
                this.systemData.systemValueDateTime = this.selectedData[0].systemValueDateTime,
                this.systemData.systemValueNumber = this.selectedData[0].systemValueNumber | 0,
                this.systemData.systemRemark = this.selectedData[0].systemRemark,
                this.systemData.isActive = this.selectedData[0].isActive,
                this.systemData.createdBy = this.selectedData[0].createdBy
                this.modalSaveTItle = title
                this.isModalOpen = true
            } else {
                this.modalSaveTItle = title
                this.isModalOpen = true
            }
        },
        setModalClose(){
            this.isModalOpen = false
        },
        setModalUploadClose(){
            this.isModalUploadOpen = false
            this.selectedFile = ''
        },
        setFormDefault(){
            this.systemData.systemCode = ''
            this.systemData.systemType = ''
            this.systemData.systemValueText = ''
            this.systemData.systemValueNumber = 0
            this.systemData.systemValueDateTime = ''
            this.systemData.systemRemark = ''
        },
        async fetchDataSystem(){
            try {
                this.isLoadingTable = true
                const start = this.paginationTable.start > 1 ? (this.paginationTable.start - 1) * this.paginationTable.length + 1  : this.paginationTable.start 

                const url = import.meta.env.VITE_APP_BE_URL + '/MasterSystem/DataTable'
                const pagination = {
                    draw: 0,
                    start: start - 1,
                    length: this.paginationTable.length,
                    search: this.systemFilter.search
                }

                const res = await ApiService.post(url, pagination)
                const count = await res.data.recordsTotal

                this.totalSystemList = parseInt(count)
                this.systemList = res.data.data
            } catch (error) {
                this.systemList = []
            } finally {
                this.isLoadingTable = false
            }
        },
        async fetchOptionCombobox(){
            try {
                const url = import.meta.env.VITE_APP_BE_URL + '/MasterSystem'
                const res = await ApiService.get(url)
               
                const data = await res.data.map((item) => ({
                    TYPE: item.systemType,
                    CODE: item.systemCode
                }))

                const type = this.removeDuplicatesByType(data)

                this.systemTypeCombobox = type
                this.systemCodeCombobox = data
            } catch (error) {
                console.log(error)
            }
        },
        async onSaveData(){
            this.systemData.isActive = "1",
            this.systemData.createdBy = "arka.admin" //[TEMP] must be user login

            try{
                this.isLoading = true
                if(this.modalSaveTItle == 'Add'){
                    const url = import.meta.env.VITE_APP_BE_URL + `/MasterSystem/${this.modalSaveTItle}`
                    const res = await ApiService.post(url, this.systemData)
                    if(res.status == 200){
                        successNotification('inserted')
                        this.setModalClose()
                        this.selectedData = []
                    } else if(res.status != 200){
                        warningNotification('inserted')
                        this.selectedData = []
                    }
                } else if (this.modalSaveTItle == 'Edit'){
                    const url = import.meta.env.VITE_APP_BE_URL + `/MasterSystem/Update `
                    const param = {
                        systemCode: this.systemData.systemCode,
                        systemType: this.systemData.systemType,
                        systemValueText: this.systemData.systemValueText,
                        systemValueDateTime: this.systemData.systemValueDateTime,
                        systemValueNumber: this.systemData.systemValueNumber,
                        systemRemark: this.systemData.systemRemark,
                        isActive: this.systemData.isActive,
                        changedBy: this.systemData.createdBy, //[TEMP] must be user login
                    }
                    const res = await ApiService.put(url, param)

                    if(res.status == 200){
                        successNotification('updated')
                        this.setModalClose()
                        this.selectedData = []
                    } else if(res.status != 200){
                        warningNotification('updated')
                        this.setModalClose()
                    }
                }
            } catch(err) {
                errorNotification('save')
                this.setModalClose()
                console.log(err)
            } finally {
                this.setFormDefault()
                this.fetchDataSystem()
                this.isLoading = false
            }
        },
        async onDelete(){
            let paramApi: {SYSTEM_CD: string, SYSTEM_TYPE:string}[] = []; 
            ElMessageBox.alert(`Are you sure? you will delete ${this.selectedData.length} data.`, 'Delete Confirmation', {
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger',
                cancelButtonText: 'Cancel',
                callback: async (action: Action) => {
                    if(action === 'confirm'){
                        try {
                            this.isLoadiingDelete = true
                            
                            const paramApi = this.selectedData.map((item) => ({
                                SystemCode: item.systemCode,
                                SystemType: item.systemType
                            }));
                            const paramApiJson = JSON.stringify(paramApi)
                    
                            const res = await ApiService.post('http://localhost:5125/MasterSystem/Delete', JSON.stringify(paramApiJson))
                    
                            if(res.status == 200){
                                successNotification('deleted')
                                this.isLoadiingDelete = false
                                this.selectedData = []
                                this.fetchDataSystem()
                            } else if (res.status != 200){
                                warningNotification('deleted')
                                this.isLoadiingDelete = false
                                this.selectedData = []
                                this.fetchDataSystem()
                            }
                        } catch (error) {
                            console.log(error)
                            errorNotification('delete')
                        }
                    }
                }
            })
        },
        handleItemSelect(selectedItems: any) {
            const filteredData = this.systemList.filter(item => selectedItems.includes(item.systemCode));
            this.selectedData = filteredData
        },
        handleELSelect(val: any){
            this.selectedData = val
        },
        removeDuplicatesByType(data: optionCombobox[]): optionCombobox[] {
            const uniqueTypes: Record<string, boolean> = {};
            const result: optionCombobox[] = [];
        
            // Iterate through each object in the array
            data.forEach(obj => {
                // Check if the type is already in the uniqueTypes object
                // If not, add it to the object and add the object itself to the result array
                if (!uniqueTypes[obj.TYPE]) {
                    uniqueTypes[obj.TYPE] = true;
                    result.push(obj);
                }
            });
        
            return result;
        },
        async onImportDocument(){
            try {
                this.isLoading = true

                const token: string | null = 'Bearer ' + getToken()
                const file: any = this.selectedFile
                console.log(file)
                const formDataHeaders = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                };

                const url = import.meta.env.VITE_APP_BE_URL + `/MasterSystem/Upload`
                const res = await axios.post(url, {'file' : file}, {
                    headers: formDataHeaders
                })
                console.log(res)
                if(res.status == 200){
                    successNotification('uploaded')
                    this.setModalUploadClose()
                } else {
                    warningNotification('uploaded')
                }
            } catch (error) {
                errorNotification('upload') 
                this.isLoading = false                
                this.setModalUploadClose()               
            } finally {
                this.isLoading = false
            }
        }
    }
})

interface systemDataList {
    systemCode: string,
    systemType: string,
    systemValueText: string,
    systemValueDateTime: string,
    systemValueNumber: number,
    systemRemark: string,
    isActive: string,
    createdDateTime: string,
    changedDateTime: string,
    createdBy: string,
    changedBy: string
}

interface selectedItem {
    changedBy: string
    changedDateTime: string
    createdBy: string
    createdDateTime: string
    isActive: string
    systemCode: string
    systemRemark: string
    systemType: string
    systemValueDateTime: string
    systemValueNumber: number
    systemValueText: string
}
interface optionCombobox {
    TYPE: string,
    CODE: string
}
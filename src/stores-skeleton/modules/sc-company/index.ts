import { defineStore } from 'pinia';
import { ElMessage, ElMessageBox, type Action } from 'element-plus'
// import { successNotification, warningNotification, errorNotification } from './notifications'
import ApiService from '@/core/services/ApiService';
import { getToken, saveToken } from '@/core/services/JwtService';
import axios from 'axios';

export const useCompanyStore = defineStore('sc-company', {
    state: () => ({
        companyList: [] as companyDataList[],
        selectedList: [] as companyDataList[],
        totalList: 0,

        //loading
        isLoadingTable: false,

        paginationTable : {
            draw: 1,
            start: 1,
            length: 10,
            search: ''
        },

    }),

    actions: {
        async fetchData(){
            try {
                this.isLoadingTable = true
                const url = import.meta.env.VITE_APP_BE_URL + '/MasterCompany/DataTable';

                const start = this.paginationTable.start > 1 ? (this.paginationTable.start - 1) * this.paginationTable.length + 1  : this.paginationTable.start;
                const pagination = {
                    draw: 0,
                    start: start - 1,
                    length: this.paginationTable.length,
                    search: ''
                } 

                const res = await ApiService.post(url, pagination);
                const count = await res.data.recordsTotal

                this.companyList = await res.data.data
                this.totalList = count
            } catch (error) {
                
            } finally {
                this.isLoadingTable = false
            }
        },

        handleELSelect(val: any){
            this.selectedList = val
        },
    }
})

interface companyDataList {
    companyId: string | number,
    companyName: string,
    description: string,
    createdBy: string,
    createdDate: string,
    changedBy: string | null,
    changedDate: string | null
}
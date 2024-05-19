import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification, skeletonErrorMessage } from "@/stores/notifications";
import type {ElTable, Action} from 'element-plus'
import ApiService from "@/core/services/ApiService";
import Search from "@/layouts/default-layout/components/search/Search.vue";
import axios from "axios";
import type { carsResponse } from "./master-car-types";

export const refSpecTable = ref<InstanceType<typeof ElTable>>()

export const UseCarStore = defineStore("car-store", {
    state: () => ({
        carsResponseList: [] as carsResponse[],

        dataResponseCount: 0,
        dataResponseCountFiltered: 0,

        pageStartParam: 1,
        pageSizeParam: 10,
        
        brandParam: '',
        modelParam: '',
        plateNumParam: '',

        isAddMode: false,
        isEditMode: false
    }),

    getters: {
    },

    actions: {
        async getCars(){
            try {
                const url:string = `/cars?per_page=${this.pageSizeParam}&page=${this.pageStartParam}&brand=${this.brandParam}&model=${this.modelParam}&plate_number=${this.plateNumParam}`;
                const res = await ApiService.get(url);
    
                if(res.status === 200 && res.data.data.length){
                    this.carsResponseList = res.data.data;
                    this.dataResponseCount = res.data.dataCountAll
                    this.dataResponseCountFiltered = res.data.dataCountFiltered
                } else {
                    this.carsResponseList = [];
                }
            } catch (error) {
                skeletonErrorMessage('Error when get data');
                console.log(error)
            }
        },

        async handleSearch(){
            await this.getCars();
        },

        async handleClear(){
            this.brandParam = '';
            this.modelParam = '';
            this.plateNumParam = '';

            await this.getCars();
        },

        async submitSave(){
        }
    }
});
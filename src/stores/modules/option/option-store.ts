import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification } from "@/stores/notifications";
import type {ElTable, Action} from 'element-plus'
import ApiService from "@/core/services/ApiService";
import Search from "@/layouts/default-layout/components/search/Search.vue";
import axios from "axios";
import type { inspectorResponse } from "../master/master-inspector/master-inspector-types";
import type { inspectionJobResponse } from "../master/master-inspection-job/master-inspection-job-types";

export const refSpecTable = ref<InstanceType<typeof ElTable>>()

export const useOptionStore = defineStore("option", {
    state: () => ({
        posOption: [] as responsePosList[],
        inspectorOption: [] as inspectorResponse[],
        inspectionJobOption: [] as inspectionJobResponse[],
        dataSpecOption: [] as dataSpecResponse[],

        isFetchPosLoading: false,
        isFetchInspectorLoading: false,
        isFetchInspectionLoading: false,
        isFetchDataSpecLoading: false
    }),

    getters: {
        PosOptionFormatted(state){
            const PosOption = state.posOption.map((item) => ({
                POS_ID : item.POS_ID,
                POS_CD : item.POS_CD,
                POS_NM : item.POS_NM
            }));
            return PosOption;
        },

        InspectorOptionFormatted(state){
            const InspectorOption = state.inspectorOption.map((item:any) => ({
                INSPJOB_ID : item.INSPJOB_ID,
                INSPNM : item.INSPNM,
            }));
            return InspectorOption;
        },

        InpectionJobOptionFormatted(state){
            const InspectorOption = state.inspectionJobOption.map((item:any) => ({
                INSPJOB_ID : item.INSPJOB_ID,
                INSPJOB : item.INSPJOB,
            }));
            return InspectorOption;
        },
    },

    actions: {
        async getOptionPos(){
            try {
                this.isFetchPosLoading = true;
                const url = '/MasterPos/List'
                const res = await ApiService.get(url);

                if(res.status === 200){
                    this.posOption = res.data;
                }else if(res.status === 408){
                    await this.getOptionPos();
                }              
            }
            catch (error) {
                this.posOption = [];
            } finally {
                this.isFetchPosLoading = false;
            }
        },

        async getOptionInspector(){
            try {
                this.isFetchInspectorLoading = true;
                const url = '/MasterInspector/List'
                const res = await ApiService.get(url);

                if(res.status === 200){
                    this.inspectorOption = res.data;
                }else if(res.status === 408){
                    await this.getOptionInspector();
                }    
            } catch (error) {
                console.error(error);
                this.inspectorOption = [];
            } finally {
                this.isFetchInspectorLoading = false;
            }
        },

        async getOptionInspectionJob(){
            try {
                this.isFetchInspectionLoading = true;
                const url = '/MasterInspectionJob/List'
                const res = await ApiService.get(url);

                if(res.status === 200){
                    this.inspectionJobOption = res.data;
                }else if(res.status === 408){
                    await this.getOptionInspectionJob();
                }    
            } catch (error) {
                console.error(error);
                this.inspectionJobOption = [];
            } finally {
                this.isFetchInspectionLoading = false;
            }
        },

        async getOptionDataSpec(){
            try {
                this.isFetchDataSpecLoading = true;
                const url = '/MasterDataSpec/List'
                const res = await ApiService.get(url);

                if(res.status === 200){
                    this.dataSpecOption = res.data;
                }else if(res.status === 408){
                    await this.getOptionDataSpec();
                }    
            } catch (error) {
                console.error(error);
                this.dataSpecOption = [];
            } finally {
                this.isFetchDataSpecLoading = false;
            }
        }
    }
});

interface responsePosList {
    POS_ID: string,
    POS_NM: string,
    POS_CD: string,
    POS_SEQ: string,
    LINE_NM: string,
    LINE_SEQ: string,
    PREV_POS_NAME1: string,
    PREV_POS_NAME2: string,
    PREV_POS_NAME3: string,
    PREV_POS_NAME4: string,
    PREV_POS_NAME5: string,
    PREV_POS_NAME6: string,
    PREV_POS_NAME7: string,
    PREV_POS_NAME8: string,
    PREV_POS_NAME9: string,
    PREV_POS_NAME10: string,
    LSTARTFLG: string,
    INPBODYFLG: string,
    MANDATORYFLG: string,
    T_TYPE: string,
    CSOK: string,
    CREATED_DT: string,
    CREATED_BY: string,
    CHANGED_DT: string,
    CHANGED_BY: string
}

interface dataSpecResponse {
    STD_SPEC_ID: number,
    BC_TYPE: string,
    POS_ID: number,
    INSPJOB_ID: number,
    PART_NAME: string,
    STD_SPEC_CD: string,
    CREATED_BY: string,
    CREATED_DT: string,
    CHANGED_BY: string | null,
    CHANGED_DT: string | null,
    SEQ: string
}
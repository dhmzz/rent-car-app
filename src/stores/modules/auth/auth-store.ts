import { defineStore } from "pinia";
import { ref } from "vue";
import { successNotification, warningNotification, errorNotification } from "@/stores/notifications";
import type {ElTable, Action} from 'element-plus'
import ApiService from "@/core/services/ApiService";
import type { inspectorResponse } from "../master/master-inspector/master-inspector-types";
import type { inspectionJobResponse } from "../master/master-inspection-job/master-inspection-job-types";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth-store", {
    state: () => ({
        isModalShiftOpen: false,
        isModalPosOpen: false,

        paramToVehicleInspection:{
            shift: '',
            pos: '',
        }
    }),

    getters: {
    },

    actions: {
        setShift(param:boolean){
            if(!param){
                this.paramToVehicleInspection.shift = '';
            } else {
                this.isModalShiftOpen = param;
            }
        },
        setPos(param:boolean){
            this.isModalPosOpen = param;

            if(!param){
                this.paramToVehicleInspection.pos = '';
            }
        },
        setParamShift(param:string){
            if(param !== ''){
                this.paramToVehicleInspection.shift = param;
                this.setPos(true);
            }
        },
        setParamPos(param:string){
            if(param !== ''){
                this.paramToVehicleInspection.pos = param as string;
                console.log(`/vehicle-inspection/${this.paramToVehicleInspection.pos}/${this.paramToVehicleInspection.shift}`);

                const route = useRouter();
                route.push({ path: `/vehicle-inspection/${this.paramToVehicleInspection.pos}/${this.paramToVehicleInspection.shift}`});
            }
        }
    }
});
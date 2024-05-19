<template>
    <el-dialog
        v-model="VehicleInspectionStore.isModalInputDetailActive"
        title='INPUT DETAIL DEFECT'
        :width="dialogWidth"
        style="margin-top: 10vh; min-height: 70vh;"
        center
    >
        <div class="mx-2 container-modal h-100">
            <div>
                <div>
                    <hr />
                    <el-input 
                        type="textarea"
                        placeholder="Defect Description"
                        v-model="VehicleInspectionStore.dummy.DETAIL_DEFECT"
                    />
                </div>
                
                <!-- MODAL #FOOTER -->
                <div class="d-flex justify-content-center flex-wrap footer-modal mt-6">
                    <div class="footer-item" @click="VehicleInspectionStore.setModalInputDetail(false, '')">BACK</div>
                    <div class="footer-item" @click="VehicleInspectionStore.submitModalDetail()">FINISH</div>
                </div>
            </div>
        </div>

    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted, watch } from 'vue';
    import { VehicleInspectionStore } from '@/stores';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
    import masterPosStore from '@/stores/modules/master/master-pos/master-pos-store';
    import { ElPopover } from 'element-plus';
    // start::handle modal size
    const { width } = useWindowSize();

    const dialogWidth = computed((): string => {
        if(width.value <= 574){
            return '60%'
        } else if (width.value > 574 && width.value < 1024){
            return '60%'
        } else {    
            return '60%'
        }
    });
    // end::handle modal size

    const isInputted = (val:string, type: 'DEFECT' | 'ACTUAL'):string => {
        if(type === 'DEFECT'){
            const check = VehicleInspectionStore.defectList.find((item) => {
                return item.DEFECT == val;
            })
            
            if (check) {
                return 'already-selected';
            }
            return '';
        } else if(type === 'ACTUAL'){
            return 'enabled-item'
            // if(!VehicleInspectionStore.defectList.length){
            //     return 'disabled-item';
            // } else if (VehicleInspectionStore.defectList[VehicleInspectionStore.defectList.length - 1 ].DEFECT_ACTUAL != ''){
            //     return 'disabled-item';
            // } else {
            //     const check = VehicleInspectionStore.defectList.find((item) => {
            //         return item.DEFECT_ACTUAL == val;
            //     })
            //     if (check) {
            //         return 'already-selected enabled-item';
            //     }
            //     return 'already-selected';
            // }
        }
        return '';
    } 

    onMounted(() => {
      // MasterPosStore.posDataExcel = dummy;
    })
</script>

<style scoped>
    @media (max-width: 567px){
        .btn-responsive{
            width: 100%;
        }
    }

    .el-overlay-dialog{
        pointer-events: none;
    }

    .el-dialog{
        pointer-events: auto;
    }

    .warning-row {
        background-color: #f56c6c !important;
        color: white;
    }

    .warning-row:hover > td {
        background-color: #f56c6c !important;
        color: white;
    }

    #status-field:hover{
      /* background-color: #f30f0f !important; */
        transition: 1s;
        cursor: pointer;
        margin: 0px !important;
    }

    .already-selected{
        background-color: #f30f0f !important;
        color: white;
    }

    .disabled-item{
        cursor: not-allowed;
    }
    .enabled-item{
        cursor: pointer;
    }

    /* MODAL */
    .half-defect-left{
        border-top: 1px solid black;
        /* border-right: 1px solid black; */
    }
    .half-defect-right{
        border-top: 1px solid black;
        /* border-left: 2px solid black; */
    }
    .card-defect{
        font-size: 20;
        font-weight: 900;
        color: black;
        /* font-weight: bolder; */
    }
    .defect-container{
        display: grid;
        grid-template-columns: 1;
        margin-top: 10px;
    }
    .dl-1{
        border-top: 1px solid black;
    }
    .defect-list{
        height: 58px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        text-align: left;
        cursor: pointer;
    }
    .defect-actual{
        height: 58px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        text-align: left;
        background-color: #FFC700;
    }

    .th-defect-header{
        border: 1px solid black;
        background-color: #C4C4C4;
    }
    .th-defect-header > div{
        text-align: center;
        color: black;
    }
    .td-defect-body{
        border: 1px solid black;
        background-color: #ffffff;
        color: black;
        font-weight: 600;
    }
    .footer-item{
        background-color: #08B5FF;
        color: black;
        width: 100%;
        border: 1px solid white;
        width: 50%;
        height: 60px;
        font-style: italic;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer-modal{
        margin-bottom: 0px;
    }
    .container-modal{
        display: flex;
        flex-direction: column;
    }
    .body-modal{
        /* flex: 1 !important; */
    }
</style>
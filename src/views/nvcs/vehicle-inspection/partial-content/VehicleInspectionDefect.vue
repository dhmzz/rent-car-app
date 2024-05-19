<template>
    <el-dialog
        v-model="VehicleInspectionStore.isModalDefectActive"
        title='INPUT DEFECT'
        :width="dialogWidth"
        style="margin-top: 3vh; min-height: 92vh;"
        center
    >
        <div class="mx-2 container-modal">
            <div class="d-flex justify-content-center card-defect header-modal">
                <div class="half-defect-left w-100 text-center pt-5">
                    DEFECT
                    <div class="defect-container me-3">
                        <div v-for="(item, i) in VehicleInspectionStore.vehicleDefectPart" class="defect-list dl-1 d-flex justify-content-between align-items-center flex-nowrap px-3 gap-3" :class="isInputted(item.DFCTNM, 'DEFECT')">
                            <div class="flex-grow-1 enabled-item h-100 d-flex align-items-center" @click="VehicleInspectionStore.setInserDefect_1(item.DFCTNM, item.DFCT_ID)">
                                {{ item.DFCTNM }}
                            </div>
                            <div @click="VehicleInspectionStore.setModalInputDetail(true, item.DFCTNM)" v-if="VehicleInspectionStore.defectList.length && VehicleInspectionStore.defectList[VehicleInspectionStore.defectList.length - 1].DEFECT == item.DFCTNM">
                                <span class="ki-solid ki-pencil fs-1 text-dark enabled-item"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="half-defect-right w-100 text-center pt-5">
                    DEFECT ACTUAL
                    <div class="defect-container ms-3">
                        <div v-for="(item, i) in VehicleInspectionStore.vehicleDefectActual" :key="item.DFCT_ACT_ID">
                            <div class="defect-actual dl-1 d-flex justify-content-between align-items-center flex-nowrap px-3 mx-0" @click="VehicleInspectionStore.setInserDefect_3(item.DFCT_ACT_NM)" :class="isInputted(item.DFCT_ACT_NM, 'ACTUAL')">
                                {{ item.DFCT_ACT_NM }}
                            </div>
                        </div>
                        <!-- <div class="defect-actual dl-1 d-flex justify-content-between align-items-center flex-nowrap px-3" @click="VehicleInspectionStore.setInserDefect_3('BROWN')" :class="isInputted('BROWN', 'ACTUAL')">
                            BROWN
                        </div>
                        <div class="defect-actual d-flex justify-content-between align-items-center flex-nowrap px-3" @click="VehicleInspectionStore.setInserDefect_3('WHITE')" :class="isInputted('WHITE', 'ACTUAL')">
                            WHITE
                        </div>
                        <div class="defect-actual d-flex justify-content-between align-items-center flex-nowrap px-3" @click="VehicleInspectionStore.setInserDefect_3('RED')" :class="isInputted('RED', 'ACTUAL')">
                            RED
                        </div>
                        <div class="defect-actual d-flex justify-content-between align-items-center flex-nowrap px-3" @click="VehicleInspectionStore.setInserDefect_3('BLACK')" :class="isInputted('BLACK', 'ACTUAL')">
                            BLACK
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="body-modal mt-6">
                <table  class="w-100">
                <thead>
                    <tr>
                        <th class="th-defect-header"><div>NO</div></th>
                        <th class="th-defect-header"><div>DEFECT</div></th>
                        <th class="th-defect-header"><div>DEFECT ACTUAL</div></th>
                        <th class="th-defect-header"><div>DETAIL DEFECT</div></th>
                        <th class="th-defect-header"><div>RPK</div></th>
                        <th class="th-defect-header"><div>OK</div></th>
                    </tr>
                </thead>
                <tbody style="min-height: 50px !important; max-height: 50px !important; overflow-y: auto !important;">
                    <tr v-for="(item, i) in VehicleInspectionStore.defectList" :key="i" v-if="VehicleInspectionStore.defectList.length">
                        <td class="td-defect-body py-3" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)"><div class="px-1 text-center">{{ i+1 }}</div></td>
                        <td class="td-defect-body py-3" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)"><div class="px-1">{{ item.DEFECT }}</div></td>
                        <td class="td-defect-body py-3" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)"><div class="px-1">{{ item.DEFECT_ACTUAL }}</div></td>
                        <td class="td-defect-body py-3" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)"><div class="px-1">{{ item.DETAIL_DEFECT }}</div></td>
                        <td class="td-defect-body py-3 text-center" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)">
                            <div class="px-1 w-100">
                                <template v-if="item.RPK === 1">
                                    <i class="ki-solid ki-check-circle fs-2 text-primary"></i>
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </div>
                        </td>
                        <td class="td-defect-body py-3" :class="isRowSelected(item.DEFECT)" @click="VehicleInspectionStore.handleDefectSelected(item)">
                            <div class="px-1 text-center w-100">
                                <template v-if="item.OK === 1">
                                    <i class="ki-solid ki-check-circle fs-2 text-primary"></i>
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </div>
                        </td>
                    </tr>
                    <tr v-if='!VehicleInspectionStore.defectList.length'>
                        <td class="td-defect-body py-3 text-center" colspan="6">
                            NO DATA
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>

            <div class="d-flex justify-content-center flex-wrap footer-modal mt-6">
                <div class="footer-item" @click="VehicleInspectionStore.handleOK()">OK ITEM</div>
                <div class="footer-item" @click="VehicleInspectionStore.handleDelete">DELETE</div>
                <div class="footer-item" @click="VehicleInspectionStore.handleRPK()">RPK</div>
                <!-- <div class="footer-item" @click="VehicleInspectionStore.setModalDefect(false, VehicleInspectionStore.isListDefect[VehicleInspectionStore.isListDefect.length - 1], VehicleInspectionStore.defectList.length ? true : false, 0)">FINISH</div> -->
                <div class="footer-item" @click="VehicleInspectionStore.submitInputDefect(VehicleInspectionStore.isListDefect[VehicleInspectionStore.isListDefect.length - 1])">FINISH</div>
            </div>

        </div>
        <!-- MODAL #FOOTER -->
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
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '90%'
        } else {    
            return '90%'
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
            if(VehicleInspectionStore.defectList.length && VehicleInspectionStore.defectList[VehicleInspectionStore.defectList.length - 1].DEFECT_ACTUAL === val){
                return 'enabled-item already-selected'
            }
            return 'enabled-item';
        }
        return '';
    }

    const isRowSelected = (defect:string):string => {
        const isSelected = VehicleInspectionStore.defectListSelected.find(item => item.DEFECT === defect);
        
        if(isSelected){
            return 'item-selected';
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

    td.item-selected{
        background-color: #8AFF61 !important;
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
        /* cursor: pointer; */
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
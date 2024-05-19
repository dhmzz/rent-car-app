<template>
    <el-dialog
        v-model="MasterDefectStore.isModalDetailOpen"
        title='Detail Defect'
        :width="dialogWidth"
        style="margin-top: 5vh"
        :show-close="true"
    >
        <div class="mx-5">
            <hr />

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">POS Code</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-select filterable v-model="MasterDefectStore.modalDetail.POS_CD">
                            <el-option v-for="item in OptionStore.posOption" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/> 
                        </el-select>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">Inspection JOB</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-select filterable v-model="MasterDefectStore.modalDetail.INSPJOB_ID">
                            <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB_ID"/> 
                        </el-select>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">BC. Type</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-select filterable v-model="MasterDefectStore.modalDetail.BC_TYPE">
]                            <el-option v-for="item in OptionStore.dataSpecOption" :key="item.BC_TYPE" :label="item.BC_TYPE" :value="item.BC_TYPE"/> 
                        </el-select>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                        <label style="min-width: 30%;">
                            <span class="text-nowrap me-5">Part Name</span>
                        </label>
                        <div class="flex-grow-1">
                            <el-input 
                                v-model="MasterDefectStore.modalDetail.PART_NM"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">Defect Name</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-input 
                            v-model="MasterDefectStore.modalDetail.DFCTNM"
                            type="text"
                        />
                    </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col-sm-12 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">Defect Category</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-input 
                            v-model="MasterDefectStore.modalDetail.DFCT_CTG"
                            type="text"
                        />
                    </div>
                    </div>
                </div>
            </div>

            <div class="my-2">
                <button @click="MasterDefectStore.setDetailSaveMode(true)" class="btn btn-success btn-sm me-3">
                    Add
                </button>
                <button class="btn btn-danger btn-sm" :disabled="MasterDefectStore.isDetailSaveModeActive">
                    Delete
                </button>
            </div>

            <div class="card mt-5">
                <div class="card-body">
                    <el-table :data="MasterDefectStore.defectActual" style="width: 100%;" v-loading="MasterDefectStore.isModalDetailLoading" empty-text="No available data." :row-class-name="tableRowClassName" border>
                        <el-table-column type="selection" width="50" align='center' id="selectionCheck"/>
                        <el-table-column header-align="center" prop="DFCT_ACT_ID" label="NO" width="50" align="center">
                            <template #default="{ row }">
                                <div v-if="MasterDefectStore.isDetailSaveModeActive && row.DFCT_ACT_NM === 'ADD::MODE'">
                                </div>
                                <div v-else>
                                    {{ row.DFCT_ACT_ID }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" prop="DFCT_ACT_NM" label="Defect Actual ">
                            <template #default="{ row }">
                                <div v-if="MasterDefectStore.isDetailSaveModeActive && row.DFCT_ACT_NM === 'ADD::MODE'">
                                    <el-input type="text" placeholder="Defect Actual"/>
                                </div>
                                <div v-else>
                                    {{ row.DFCT_ACT_NM }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="my-5" v-if="MasterDefectStore.isDetailSaveModeActive">
                <button class="btn btn-sm btn-primary me-3">
                    Save
                </button>
                <button @click="MasterDefectStore.setDetailSaveMode(false)" class="btn btn-sm btn-secondary">
                    Cancel
                </button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted } from 'vue';
    import { MasterDefectStore, OptionStore } from '@/stores';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
    import type { inspectionJobResponse } from '@/stores/modules/master/master-inspection-job/master-inspection-job-types';
import type { defectActual } from '@/stores/modules/master/master-defect/master-defect-type';

    // start::handle modal size
    const { width } = useWindowSize();

    const dialogWidth = computed((): string => {
        if(width.value <= 574){
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '65%'
        } else {    
            return '65%'
        }
    });
// end::handle modal size

    const tableRowClassName = ({row,rowIndex}: {
        row: defectActual
        rowIndex: number
    }) => {
        if (row.DFCT_ACT_NM !== 'ADD::MODE' && MasterDefectStore.isDetailSaveModeActive) {
            return 'secondary-row';
        } 
        // else if (parseInt(row.POS_ID) != Master.posDataSingle.POS_ID && MasterPosStore.isEditMode){
        //     return 'secondary-row'
        // }
        return 'normal-row'
    }

    const infoTable = (start:number, length:number, total:number):string => {
        const from = start > 1 ? (start - 1) * length + 1 : start
        const to = from + length - 1
        return `Showing ${total !== 0 ? from : 0} - ${Math.min(to, total)} from ${total} entries`
    }

    onMounted( async() => {
        await OptionStore.getOptionPos();
        await OptionStore.getOptionInspectionJob();
    })
</script>

<style>
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
</style>
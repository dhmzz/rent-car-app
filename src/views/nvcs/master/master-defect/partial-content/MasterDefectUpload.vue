<template>
    <el-dialog
        v-model="MasterDefectStore.isModalUploadOpen"
        title='Upload Document'
        :width="dialogWidth"
        style="margin-top: 10vh"
        :show-close="false"
    >

        <div class="mt-2 d-flex justify-content-start flex-nowrap gap-2 align-items-center">
            <div class="flex-grow-1">
            <input 
                id="file-input"
                class="form-control mt-4 form-control-sm rounded-0"
                type="file"
                accept=".xlsx, xlx"
                @change="MasterDefectStore.handleFileSelected"
            />
            </div>
        </div>
        <span style="cursor: pointer;" @click="MasterDefectStore.handleDownloadTemplate()" class="link-success fs-8">{{ MasterDefectStore.isDownloadTemplateLoad ? 'Loading...' : 'Download Template'}}</span>

        <div class="mt-8 card mb-5 shadow-none" style="width: 100%; max-height: 400px;">
            <div class="mx-4 my-4">
                <el-table :data="MasterDefectStore.defectOrigin" v-loading="MasterDefectStore.isImportExcelCheckerLoading"
                    style="width: 100%;" size='small' empty-text="Please upload your documment." table-layout="fixed"
                    border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName" @selection-change="MasterDefectStore.handleELSelect"
                >
                    <el-table-column header-align="center" prop="DFCT_ID" label="STATUS" width="200" align="center">
                        <template #default="{ row }">
                            <div v-if="row.DFCT_ID === 1" id="status-field">
                                <el-popover
                                placement="right-start"
                                title="Invalid Reason"
                                :width="300"
                                trigger="hover"
                                :content="MasterDefectStore.messageExcel"
                            >

                            <template #reference>
                                <div class="w-100">
                                    {{ row.DFCT_ID === 1 ? 'INVALID' : 'VALID' }}
                                </div>
                            </template>
                        </el-popover>
                        </div>
                        <div v-if="row.DFCT_ID === 0" class="text-primary">
                            {{ row.DFCT_ID === 1 ? 'INVALID' : 'VALID' }}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="POS_CD" label="POS Code" width="200">
                        <template #default="{ row }">
                            <div>
                                {{ row.POS_CD }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="INSPJOB_ID" label="Inspection Job" width="200">
                        <template #default="{ row }">
                            <div>
                                {{ row.INSPJOB_ID }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="BC_TYPE" label="BC. Type" width="150">
                        <template #default="{ row }">
                            <div>
                                {{ row.BC_TYPE }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PART_NM" label="Part Name" width="200">
                        <template #default="{ row }">
                            <div>
                                {{ row.PART_NM }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DFCTNM" label="Defect Name" width="200">
                        <template #default="{ row }">
                            <div>
                                {{ row.DFCTNM }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DFCT_CTG" label="Defect Category" width="200">
                        <template #default="{ row }">
                            <div>
                                {{ row.DFCT_CTG }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table> 
            </div>
            <div class="mx-4 mb-6 d-flex justify-content-center mt-3 pagination w-100 align-items-center">
                <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(MasterDefectStore.paginationTableExcel.start, MasterDefectStore.paginationTableExcel.length, MasterDefectStore.defectDataExcelCount) }}
                </div>
                <div>
                    <el-pagination
                    :page-sizes="[10, 20, 50, 100]"
                    background="background"
                    layout="sizes, prev, pager, next, jumper"
                    :total=MasterDefectStore.defectDataCount
                    @current-change="handlePageChange"
                    @size-change="hangleRowPerPageChange"
                    small
                    />
                </div>
            </div>
        </div>

        <!-- MODAL #FOOTER -->
        <div class="mx-1 d-flex justify-content-end gap-2 flex-wrap">
            <div class="btn-responsive">
                <el-button @click="MasterDefectStore.setModalUploadClose()" :disabled="MasterDefectStore.isImportExcelLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="MasterDefectStore.submitImportExcel" :disabled="MasterDefectStore.isFileDenied">
                    {{ MasterDefectStore.isImportExcelLoading ? 'Please Wait...' : 'Upload' }}
                    <i v-if="MasterDefectStore.isImportExcelLoading" class="spinner-border spinner-border-sm align-middle ms-2"></i>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted } from 'vue';
    import { MasterDefectStore } from '@/stores';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
    import masterPosStore from '@/stores/modules/master/master-pos/master-pos-store';
    import { ElPopover } from 'element-plus';
import type { inspectionJobResponse } from '@/stores/modules/master/master-inspection-job/master-inspection-job-types';
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

    const hangleRowPerPageChange = async(newPageSize: number) => {
        // MasterDefectStore.paginationTableExcel.length = newPageSize
        // MasterDefectStore.datatableExcelFormatted;
    }

    const handlePageChange = async(page: number) => {
        // MasterDefectStore.paginationTableExcel.start = page
        // MasterDefectStore.datatableExcelFormatted;
    };

    const tableRowClassName = ({row}: {
    row: inspectionJobResponse
        }) => {
        if (parseInt(row.INSPJOB_ID) === 1) {
            return 'warning-row';
        }
        return 'normal-row'
    }

    const infoTable = (start:number, length:number, total:number):string => {
    const from = start > 1 ? (start - 1) * length + 1 : start
    const to = from + length - 1
    return `Showing ${total !== 0 ? from : 0} - ${Math.min(to, total)} from ${total} entries`
    }

    onMounted(() => {
    
    // MasterPosStore.posDataExcel = dummy;
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
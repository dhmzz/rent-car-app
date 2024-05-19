<template>
    <el-dialog
        v-model="MasterInspectionJobStore.isModalUploadOpen"
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
                @change="MasterInspectionJobStore.handleFileSelected"
            />
            </div>
        </div>
        <span style="cursor: pointer;" @click="MasterInspectionJobStore.handleDownloadTemplate()" class="link-success fs-8">{{ MasterInspectionJobStore.isDownloadTemplateLoad ? 'Loading...' : 'Download Template'}}</span>

        <div class="mt-8 card mb-5 shadow-none" style="width: 100%; max-height: 400px;">
            <div class="mx-4 my-4">
                <el-table :data="MasterInspectionJobStore.datatableExcelFormatted"
                    style="width: 100%;" size='small' empty-text="Please upload your document." table-layout="fixed"
                    border :hover="MasterInspectionJobStore.isAddMode ? 'false' : 'true'"  header-row-cell-name="el-table-custom"
                    :default-sort="{ prop: 'systemType', order: 'ascending' }" :row-class-name="tableRowClassName" v-loading="MasterInspectionJobStore.isImportExcelCheckerLoading"
                >
                    <!-- <el-table-column type="selection" width="50" align='center' :disabled="MasterInspectionJobStore.isAddMode"/> -->
                    <el-table-column header-align="center" prop="INSPJOB_ID" label="STATUS" width="200" align="center">
                        <template #default="{ row }">
                        <div v-if="row.INSPJOB_ID === 1" id="status-field" style="font-weight: 900 !important;">
                            <el-popover
                            placement="right-start"
                            title="Invalid Reason"
                            :width="300"
                            trigger="hover"
                            :content="MasterInspectionJobStore.messageExcel"
                            >

                            <template #reference>
                            <div class="w-100">
                                Invalid
                            </div>
                            </template>
                        </el-popover>
                        </div>
                        <div v-if="row.INSPJOB_ID === 0" class="text-primary">
                            Valid
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="POS_NM" label="POS Name" width="200">
                        <template #default="{ row }">
                        <div>
                            {{ row.POS_NM }}
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
                    <el-table-column header-align="center" prop="INSPJOB" label="Inspection Job" width="200">
                        <template #default="{ row }">
                        <div>
                            {{ row.INSPJOB }}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="INSPJOB_SEQ" label="Inspection Job Seq" width="200">
                        <template #default="{ row }">
                        <div>
                            {{ row.INSPJOB_SEQ }}
                        </div>
                        </template>
                    </el-table-column>
                    v
                    <el-table-column header-align="center" prop="INSPSUBJOB" label="Inspection Sub Job" width="200">
                        <template #default="{ row }">
                        <div>
                            {{ row.INSPSUBJOB }}
                        </div>
                        </template>
                    </el-table-column>
                    v
                    <el-table-column header-align="center" prop="POSITION" label="Position" width="100%" align="center">
                        <template #default="{ row }">
                        <div>
                            {{ row.POSITION }}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DATE_FROM" label="Date From" width="200" align="center">
                        <template #default="{ row }">
                        <div>
                            {{ row.DATE_FROM }}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DATE_TO" label="Date To" width="200" align="center">
                        <template #default="{ row }">
                        <div>
                            {{ row.DATE_TO }}
                        </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="mx-4 mb-6 d-flex justify-content-center mt-3 pagination w-100 align-items-center">
                <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(MasterInspectionJobStore.paginationTableExcel.start, MasterInspectionJobStore.paginationTableExcel.length, MasterInspectionJobStore.inspectionDataExcelCount) }}
                </div>
                <div>
                    <el-pagination
                    :page-sizes="[10, 20, 50, 100]"
                    background="background"
                    layout="sizes, prev, pager, next, jumper"
                    :total=MasterInspectionJobStore.inspectionDataExcelCount
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
                <el-button @click="MasterInspectionJobStore.setModalUploadClose()" :disabled="MasterInspectionJobStore.isImportExcelLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="MasterInspectionJobStore.submitImportExcel" :disabled="MasterInspectionJobStore.isFileDenied">
                    {{ MasterInspectionJobStore.isImportExcelLoading ? 'Please Wait...' : 'Upload' }}
                    <i v-if="MasterInspectionJobStore.isImportExcelLoading" class="spinner-border spinner-border-sm align-middle ms-2"></i>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted } from 'vue';
    import { MasterInspectionJobStore } from '@/stores';
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
        MasterInspectionJobStore.paginationTableExcel.length = newPageSize
        MasterInspectionJobStore.datatableExcelFormatted;
    }

    const handlePageChange = async(page: number) => {
        MasterInspectionJobStore.paginationTableExcel.start = page
        MasterInspectionJobStore.datatableExcelFormatted;
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
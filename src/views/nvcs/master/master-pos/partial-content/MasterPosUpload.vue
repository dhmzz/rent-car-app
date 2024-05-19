<template>
    <el-dialog
        v-model="MasterPosStore.isModalUploadOpen"
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
                @change="MasterPosStore.handleFileSelected"
            />
          </div>
        </div>
        <span style="cursor: pointer;" @click="MasterPosStore.handleDownloadTemplate()" class="link-success fs-8">{{ MasterPosStore.isDownloadTemplateLoad ? 'Loading...' : 'Download Template'}}</span>

        <div class="mt-8 card mb-5 shadow-none" style="width: 100%;">
            <div class="mx-4 my-4">
                <el-table :data="MasterPosStore.datatableExcelFormatted"
                    style="width: 100%;" size='small' empty-text="Please upload your document." table-layout="fixed"
                    border :hover="MasterPosStore.isAddMode ? 'false' : 'true'"  header-row-cell-name="el-table-custom"
                    :row-class-name="tableRowClassName" v-loading="MasterPosStore.isImportExcelCheckerLoading" max-height="200"
                  >
                    <!-- <el-table-column type="selection" width="50" align='center' :disabled="MasterPosStore.isAddMode"/> -->
                    <el-table-column header-align="center" prop="POS_ID" label="STATUS" width="200" align="center">
                      <template #default="{ row }">
                        <div v-if="row.POS_ID === 1" id="status-field">
                          <el-popover
                            placement="right-start"
                            title="Invalid Reason"
                            :width="300"
                            trigger="hover"
                            :content="MasterPosStore.messageExcel"
                          >

                          <template #reference>
                            <div class="w-100">
                              {{ row.POS_ID === 1 ? 'INVALID' : 'VALID' }}
                            </div>
                          </template>
                        </el-popover>
                        </div>
                        <div v-if="row.POS_ID === 0" class="text-primary">
                          {{ row.POS_ID === 1 ? 'INVALID' : 'VALID' }}
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
                    <el-table-column header-align="center" prop="POS_SEQ" label="POS" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.POS_SEQ }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="LINE_NM" label="Line Name" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.LINE_NM }}
                        </div>
                      </template>
                    </el-table-column>
                    v
                    <el-table-column header-align="center" prop="LINE_SEQ" label="Line SEQ" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.LINE_SEQ }}
                        </div>
                      </template>
                    </el-table-column>
                    v
                    <el-table-column header-align="center" prop="PREV_POS_NAME1" label="Prev POS Name 1" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME1 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME2" label="Prev POS Name 2" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME2 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME3" label="Prev POS Name 3" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME3 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME4" label="Prev POS Name 4" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME4 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME5" label="Prev POS Name 5" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME5 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME6" label="Prev POS Name 6" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME6 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME7" label="Prev POS Name 7" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME7 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME8" label="Prev POS Name 8" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME8 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME9" label="Prev POS Name 9" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME9 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PREV_POS_NAME10" label="Prev POS Name 10" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.PREV_POS_NAME10 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="LSTARTFLG" label="Start Flag" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.LSTARTFLG }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="INPBODYFLG" label="Input Body Flag" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.INPBODYFLG }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="MANDATORYFLG" label="Mandatory Flag" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.MANDATORYFLG }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="T_TYPE" label="TType" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.T_TYPE }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="CSOK" label="CSOK" width="200">
                      <template #default="{ row }">
                        <div>
                          {{ row.CSOK }}
                        </div>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="mx-4 mb-6 d-flex justify-content-center mt-3 pagination w-100 align-items-center">
              <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(MasterPosStore.paginationTableExcel.start, MasterPosStore.paginationTableExcel.length, MasterPosStore.posDataExcelCount) }}
              </div>
              <div>
                  <el-pagination
                    :page-sizes="[10, 20, 50, 100]"
                    background="background"
                    layout="sizes, prev, pager, next, jumper"
                    :total=MasterPosStore.posDataExcelCount
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
                <el-button @click="MasterPosStore.setModalUploadClose()" :disabled="MasterPosStore.isImportExcelLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="MasterPosStore.submitImportExcel" :disabled="MasterPosStore.isFileDenied">
                  {{ MasterPosStore.isImportExcelLoading ? 'Please Wait...' : 'Upload' }}
                  <i v-if="MasterPosStore.isImportExcelLoading" class="spinner-border spinner-border-sm align-middle ms-2"></i>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted } from 'vue';
    import { MasterPosStore } from '@/stores';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
    import MasterPos from '../MasterPos.vue';
    import masterPosStore from '@/stores/modules/master/master-pos/master-pos-store';
    import { ElPopover } from 'element-plus';
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
      MasterPosStore.paginationTableExcel.length = newPageSize
      MasterPosStore.datatableExcelFormatted;
    }

    const handlePageChange = async(page: number) => {
      MasterPosStore.paginationTableExcel.start = page
      MasterPosStore.datatableExcelFormatted;
    };

    const tableRowClassName = ({row}: {
      row: PosDataResponse
    }) => {
      if (parseInt(row.POS_ID) === 1) {
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
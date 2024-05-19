<template>
    <el-dialog
        v-model="MasterSpecStore.isModalUploadOpen"
        title='Upload Document'
        :width="dialogWidth"
        style="margin-top: 10vh"
        :show-close="false"
    >

        <div class="mt-2">
            <input 
              id="file-input"
              class="form-control"
              type="file"
              accept=".xlsx, xlx"
              @change="MasterSpecStore.handleFileSelected"
            />
        </div>
        <span style="cursor: pointer;" @click="MasterSpecStore.handleDownloadTemplate()" class="link-success fs-8">{{ MasterSpecStore.isDownloadTemplateLoad ? 'Loading...' : 'Download Template'}}</span>

        <div class="mt-2 card mb-5 shadow-none" style="width: 100%;">
            <div class="mx-4 my-4">
              <el-table :data="MasterSpecStore.specDataOrigin" ref="refTable"
                style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName"
                @selection-change="MasterSpecStore.handleELSelect" v-loading="MasterSpecStore.isFetchLoading"
              >
                <el-table-column header-align="center" prop="STD_SPEC_ID" label="STATUS" width="200" align="center">
                  <template #default="{ row }">
                    <div v-if="row.STD_SPEC_ID == 1" id="status-field">
                      <el-popover
                        placement="right-start"
                        title="Invalid Reason"
                        :width="300"
                        trigger="hover"
                        :content="MasterSpecStore.messageExcel"
                      >

                      <template #reference>
                        <div class="w-100">
                          Invalid
                        </div>
                      </template>
                    </el-popover>
                    </div>
                    <div v-else-if="row.STD_SPEC_ID === 0" class="text-primary">
                      Valid
                    </div>
                  </template>
                </el-table-column>        
                <el-table-column header-align="center" prop="BC_TYPE" label="BC. Type" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.BC_TYPE }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="POS_ID" label="POS" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.POS_ID }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="SEQ" label="Sequence No" width="150">
                  <template #default="{ row }">
                    <div>
                      {{ row.SEQ }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INSPJOB_ID" label="JOB" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.INSPJOB_ID }}
                    </div>
                  </template>  
                </el-table-column>
                <el-table-column header-align="center" prop="PART_NAME" label="Part Name" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.PART_NAME }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="STD_SPEC_CD" label="Standart Spec Code" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.STD_SPEC_CD }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>

        <!-- MODAL #FOOTER -->
        <div class="mx-1 d-flex justify-content-end gap-2 flex-wrap mt-8">
            <div class="btn-responsive">
                <el-button @click="MasterSpecStore.setModalUploadClose()" :disabled="MasterSpecStore.isImportExcelLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="MasterSpecStore.submitImportExcel" :disabled="MasterSpecStore.isFileDenied">
                    {{ MasterSpecStore.isImportExcelLoading ? 'Please Wait...' : 'Upload' }}
                    <i v-if="MasterSpecStore.isImportExcelLoading" class="spinner-border spinner-border-sm align-middle ms-2"></i>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed } from 'vue';
    import { MasterSpecStore } from '@/stores';
import type { specDataResponse } from '@/stores/modules/master/master-data-spec/master-data-spec-types';

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

    const tableRowClassName = ({row}: {
      row: specDataResponse
    }) => {
      if (parseInt(row.STD_SPEC_ID) === 1) {
        return 'warning-row';
      }
      return 'normal-row'
    }
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
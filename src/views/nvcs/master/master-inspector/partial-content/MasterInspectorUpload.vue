<template>
    <el-dialog
        v-model="MasterInspectorStore.isModalUploadOpen"
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
              @change="MasterInspectorStore.handleFileSelected"
            />
        </div>
        <span style="cursor: pointer;" @click="MasterInspectorStore.handleDownloadTemplate()" class="link-success fs-8">{{ MasterInspectorStore.isDownloadTemplateLoad ? 'Loading...' : 'Download Template'}}</span>


        <div class="mt-2 card mb-5 shadow-none mt-8" style="width: 100%;">
            <div class="mx-4 my-4">
              <el-table :data="MasterInspectorStore.datatableExcelFormatted" ref="refTable" v-loading="MasterInspectorStore.isFetchLoading"
              style="width: 100%;" size='small' empty-text="Please upload your document." table-layout="fixed"
              border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName" max-height="200"  
            >
              <el-table-column header-align="center" prop="INSPID" label="STATUS" width="200" align="center">
                <template #default="{ row }">
                  <div v-if="row.INSPID === 0" class="text-primary">
                    Valid
                  </div>
                  <div v-else class="">

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
              <el-table-column header-align="center" prop="INSPSUBJOB" label="Inspection Sub Job" width="150">
                <template #default="{ row }">
                  <div>
                    {{ row.INSPSUBJOB }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="SHIFTGRPNM" label="Shift" width="200">
                <template #default="{ row }">
                  <div>
                    {{ row.SHIFTGRPNM }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="NO_REG" label="REG No" width="200">
                <template #default="{ row }">
                  <div>
                    {{ row.NO_REG }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="INSPNM" label="Inspector" width="200">
                <template #default="{ row }">
                  <div>
                    {{ row.INSPNM }}
                  </div>
                </template>
              </el-table-column>      
            </el-table> 
            </div>
            <div class="mx-4 mb-6 d-flex justify-content-center mt-3 pagination w-100 align-items-center">
              <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(MasterInspectorStore.paginationTableExcel.start, MasterInspectorStore.paginationTableExcel.length, MasterInspectorStore.inspectorExcelCount) }}
              </div>
              <div>
                  <el-pagination
                    :page-sizes="[10, 20, 50, 100]"
                    background="background"
                    layout="sizes, prev, pager, next, jumper"
                    :total=MasterInspectorStore.inspectorExcelCount
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
                <el-button @click="MasterInspectorStore.setModalUploadClose()" :disabled="MasterInspectorStore.isImportExcelLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="MasterInspectorStore.submitImportExcel" :disabled="MasterInspectorStore.isFileDenied">
                    {{ MasterInspectorStore.isImportExcelLoading ? 'Please Wait...' : 'Upload' }}
                    <i v-if="MasterInspectorStore.isImportExcelLoading" class="spinner-border spinner-border-sm align-middle ms-2"></i>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed } from 'vue';
    import { MasterInspectorStore } from '@/stores';
import type { inspectorResponse } from '@/stores/modules/master/master-inspector/master-inspector-types';

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

    // const onFileSelected = (e: InputEvent | any): void => {
    //     const file = e.target.files[0];
    //     // if (file) {
    //     //     const reader = new FileReader();
    //     //     reader.onload = () => {
    //     //         const binaryString = reader.result as string; // Representasi biner dalam bentuk string
    //     //         console.log(binaryString);
    //     //         systemStore.selectedFile = binaryString
    //     //     };
    //     //     reader.readAsText(file); // Membaca file sebagai representasi biner
    //     // }
    //     systemStore.selectedFile = file
    //     console.log(systemStore.selectedFile)
    //     console.log('file', file);     
    // }

    const infoTable = (start:number, length:number, total:number):string => {
      const from = start > 1 ? (start - 1) * length + 1 : start
      const to = from + length - 1
      return `Showing ${total !== 0 ? from : 0} - ${Math.min(to, total)} from ${total} entries`
    }

    const hangleRowPerPageChange = async(newPageSize: number) => {
      MasterInspectorStore.paginationTableExcel.length = newPageSize
      MasterInspectorStore.datatableExcelFormatted;
    }

    const handlePageChange = async(page: number) => {
      MasterInspectorStore.paginationTableExcel.start = page
      MasterInspectorStore.datatableExcelFormatted;
    };

    const tableRowClassName = ({row}: {
      row: inspectorResponse
    }) => {
      if (parseInt(row.INSPID) === 1) {
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
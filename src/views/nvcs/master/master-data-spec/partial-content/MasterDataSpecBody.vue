<template>
    <div class="card mt-5">
      <el-form 
        @submit.prevent=""
        label-position="top"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="MasterSpecStore.specDataSingle"
      >
      <!-- <el-form> -->
        <div class="card-body mx-2" >
          <div>
              <el-table :data="MasterSpecStore.specDataList" ref="refTable"
                style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName"
                @selection-change="MasterSpecStore.handleELSelect" v-loading="MasterSpecStore.isFetchLoading"
              >
                <el-table-column type="selection" width="50" align='center'/>
                <el-table-column header-align="center" prop="BC_TYPE" label="BC. Type" width="200">
                  <template #default="{ row }">
                    <div v-if="row.BC_TYPE === '#ADD:MODE'">
                      <el-form-item required prop="BC_TYPE" class="mb-0">
                        <el-input 
                          id="BC_TYPE"
                          type="text"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.BC_TYPE"
                          placeholder="BC. Type"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="BC_TYPE" class="mb-0">
                        <el-input 
                          id="BC_TYPE"
                          type="text"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.BC_TYPE"
                          placeholder="BC. Type"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.BC_TYPE }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="POS_ID" label="POS" width="200">
                  <template #default="{ row }">
                    <div v-if="row.POS_ID === '#ADD:MODE'">
                      <el-form-item required prop="POS_ID" class="mb-0">
                        <el-select filterable placeholder="Pos" :loading="OptionStore.isFetchPosLoading" v-model="MasterSpecStore.specDataSingle.POS_ID">
                          <el-option v-for="item in OptionStore.PosOptionFormatted" 
                            :key="item.POS_ID" :label="item.POS_NM" :value="item.POS_ID" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="POS_ID" class="mb-0">
                        <el-select filterable placeholder="Pos" :loading="OptionStore.isFetchPosLoading" v-model="MasterSpecStore.specDataSingle.POS_ID">
                          <el-option v-for="item in OptionStore.PosOptionFormatted" 
                            :key="item.POS_ID" :label="item.POS_NM" :value="item.POS_ID" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.POS_CD }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="SEQ" label="Sequence No" width="150">
                  <template #default="{ row }">
                    <div v-if="row.SEQ === '#ADD:MODE'">
                      <el-form-item required prop="SEQ" class="mb-0">
                        <el-input 
                          id="SEQ"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.SEQ"
                          placeholder="SEQ"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="SEQ" class="mb-0">
                        <el-input 
                          id="SEQ"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.SEQ"
                          placeholder="SEQ"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.SEQ }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INSPJOB_ID" label="JOB" width="200">
                  <template #default="{ row }">
                    <div v-if="row.INSPJOB_ID === '#ADD:MODE'">
                      <el-form-item required prop="INSPJOB_ID" class="mb-0">
                        <el-select id="POS_ID" filterable placeholder="Job" :loading="OptionStore.isFetchInspectorLoading" v-model="MasterSpecStore.specDataSingle.INSPJOB_ID">
                          <el-option v-for="item in OptionStore.inspectionJobOption" 
                            :key="item.INSPJOB_ID" :label="item.INSPJOB" :value="item.INSPJOB_ID" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="INSPJOB_ID" class="mb-0">
                        <el-select id="POS_ID" filterable placeholder="Job" :loading="OptionStore.isFetchInspectorLoading" v-model="MasterSpecStore.specDataSingle.INSPJOB_ID">
                          <el-option v-for="item in OptionStore.inspectionJobOption" 
                            :key="item.INSPJOB_ID" :label="item.INSPJOB" :value="item.INSPJOB_ID" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.INSPJOB_ID }}
                    </div>
                  </template>  
                </el-table-column>
                <el-table-column header-align="center" prop="PART_NAME" label="Part Name" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PART_NAME === '#ADD:MODE'">
                      <el-form-item required prop="PART_NAME" class="mb-0">
                        <el-input 
                          id="PART_NAME"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.PART_NAME"
                          placeholder="Part Name"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="PART_NAME" class="mb-0">
                        <el-input 
                          id="PART_NAME"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.PART_NAME"
                          placeholder="Part Name"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PART_NAME }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="STD_SPEC_CD" label="Standart Spec Code" width="200">
                  <template #default="{ row }">
                    <div v-if="row.STD_SPEC_CD === '#ADD:MODE'">
                      <el-form-item required prop="STD_SPEC_CD" class="mb-0">
                        <el-input 
                          id="STD_SPEC_CD"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.STD_SPEC_CD"
                          placeholder="Spec Code"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterSpecStore.isEditMode && MasterSpecStore.specDataSingle.STD_SPEC_ID === row.STD_SPEC_ID">
                      <el-form-item required prop="STD_SPEC_CD" class="mb-0">
                        <el-input 
                          id="STD_SPEC_CD"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterSpecStore.specDataSingle.STD_SPEC_CD"
                          placeholder="Spec Code"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.STD_SPEC_CD }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CREATED_DT" label="Created Dt" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CREATED_DT === '#ADD:MODE'">
                      <el-date-picker 
                          v-model="MasterSpecStore.specDataSingle.CREATED_DT"  
                          format="YYYY-MM-DD"
                          value="YYYY-MM-DD"
                          type="date"
                          class="w-100"
                          disabled
                      />
                    </div>
                    <div v-else>
                      {{ row.CREATED_DT !== null ? formattedDate(row.CREATED_DT) : '' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CREATED_BY" label="Created By" width="150" align="left">
                  <template #default="{ row }">
                    <div v-if="row.CREATED_BY === '#ADD:MODE'">
                      <el-input 
                        v-model="MasterSpecStore.specDataSingle.CREATED_BY"  
                        type="text"
                        disabled
                      />
                    </div>
                    <div v-else>
                      {{ row.CREATED_BY }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CHANGED_DT" label="Changed Dt" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CHANGED_DT === '#ADD:MODE'">
                    </div>
                    <div v-else>
                      {{ row.CHANGED_DT !== null ? formattedDate(row.CHANGED_DT) : '' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CHANGED_BY" label="Changed By" width="150" align="left">
                  <template #default="{ row }">
                    <div v-if="row.CHANGED_BY === '#ADD:MODE'">
                    </div>
                    <div v-else>
                      {{ row.CHANGED_BY }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
          </div>

          <div class="d-flex justify-content-center mt-3 pagination w-100 align-items-center">
            <!-- <el-pagination
              v-model:current-page="systemStore.paginationTable.start"
              v-model:page-size="systemStore.paginationTable.length"
              :page-sizes="[5, 10, 50, 100]"
              background="background"
              layout="sizes, prev, pager, next, jumper"
              :total="systemStore.totalSystemList"
              @current-change="handlePageChange"
              @size-change="hangleRowPerPageChange"
              small
            /> -->
            <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(
                    MasterSpecStore.paginationTable.start, 
                    MasterSpecStore.paginationTable.length, 
                    MasterSpecStore.specDataCount
                  ) 
                }}
            </div>
            <div>
                <el-pagination
                  :page-sizes="[5, 10, 50, 100]"
                  background="background"
                  layout="sizes, prev, pager, next, jumper"
                  :total=MasterSpecStore.specDataCount
                  @current-change="handlePageChange"
                  @size-change="hangleRowPerPageChange"
                  :disabled="MasterSpecStore.isAddMode || MasterSpecStore.isEditMode"
                  small
                />
            </div>
          </div>
          <div class="mt-7">
              <button class="btn btn-sm btn-primary text-nowrap me-3 .min-w-btn" @click="MasterSpecStore.setAddMode(true)" v-if="!MasterSpecStore.isAddMode && !MasterSpecStore.isEditMode">
                Add Row
              </button>
              <el-button type="primary" class="text-nowrap me-1 .min-w-btn" @click="submitSave(ruleFormRef)" v-if="MasterSpecStore.isAddMode || MasterSpecStore.isEditMode" :disabled="MasterSpecStore.isSaveLoading">
                {{ MasterSpecStore.isSaveLoading ? 'Please wait...' : 'Save' }}
              </el-button>
              <el-button class="text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterSpecStore.isAddMode" :disabled="MasterSpecStore.isSaveLoading"> 
                Cancel
              </el-button>
              <el-button class="text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterSpecStore.isEditMode" :disabled="MasterSpecStore.isSaveLoading">
                Cancel
              </el-button>
          </div>
        </div>
      </el-form>
    </div>
</template>

<script setup lang="ts">
    import { MasterSpecStore, OptionStore } from '@/stores';
    import { ref, reactive, onMounted } from 'vue';
    import { type FormInstance, type FormRules, ElMessage, ElMessageBox, type Action } from 'element-plus'
    import type { specDataResponse } from '@/stores/modules/master/master-data-spec/master-data-spec-types';
    import { refSpecTable } from '@/stores/modules/master/master-data-spec/master-data-spec-store';
import MasterDataSpec from '../MasterDataSpec.vue';

    const ruleFormRef = ref<FormInstance>();
    const refTable = refSpecTable

    const submitSave = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
        await formEl.validate (async (valid, fields) => {
          if (valid) {
            MasterSpecStore.submitSave();
            formEl.clearValidate();
          } else {
            console.log('UNSUCCESS');
            let isFirstElement:boolean = false;

            if(fields){
              Object.keys(fields).forEach(key => {                
                fields[key].forEach((item, index) => {
                  if (!isFirstElement && item.field && typeof item.field === 'string' && item.field.trim() !== '') {
                    const fieldElement = document.getElementById(item.field);
                    if (fieldElement) {
                      isFirstElement = true;
                      fieldElement.focus();
                      ElMessage({
                        message: `Some mandatory fields are empty!`,
                        type: 'warning',
                      })
                    } else {
                      console.error(`Element with ID "${item.field}" not found.`);
                    }
                  }
                });
              });
            }
          }
      })
    }

    const setModeNormal = ():void => {
      if( MasterSpecStore.specDataSingle.BC_TYPE != '' || MasterSpecStore.specDataSingle.POS_ID != '' || MasterSpecStore.specDataSingle.SEQ != '' || MasterSpecStore.specDataSingle.INSPJOB_ID != '' ||
          MasterSpecStore.specDataSingle.PART_NAME != '' || MasterSpecStore.specDataSingle.STD_SPEC_CD != ''
        ){
        ElMessageBox.alert(`Unsaved data will be lost, are you sure?`, 'Warning', {
            confirmButtonText: 'Confirm',
            confirmButtonClass: 'el-button--warning',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            callback: (action: Action) => {
                if(action == 'confirm' && MasterSpecStore.isAddMode){
                  MasterSpecStore.setAddMode(false)
                  return
                } else if (action == 'confirm' && MasterSpecStore.isEditMode){
                  MasterSpecStore.setEditMode(false);
                  return
                } else {
                  return
                }
            }
        })
      } else {
        if(MasterSpecStore.isAddMode){
          MasterSpecStore.setAddMode(false);
        } else if (MasterSpecStore.isEditMode){
          MasterSpecStore.setEditMode(false);
        } 
      }
    }

    const formattedDate = (inputDate: any):string => {
      const date = new Date(inputDate);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(month).padStart(2, '0');

      return `${formattedDay}-${formattedMonth}-${year}`;
    }

    const infoTable = (start:number, length:number, total:number):string => {
      const from = start > 1 ? (start - 1) * length + 1 : start
      const to = from + length - 1
      return `Showing ${from} - ${Math.min(to, total)} from ${total} entries`
    }

    const tableRowClassName = ({row,rowIndex}: {
      row: specDataResponse
      rowIndex: number
    }) => {
      if (row.BC_TYPE !== '#ADD:MODE' && MasterSpecStore.isAddMode) {
        return 'secondary-row';
      } else if (row.STD_SPEC_ID !== MasterSpecStore.specDataSingle.STD_SPEC_ID && MasterSpecStore.isEditMode){
        return 'secondary-row'
      }
      return 'normal-row'
    }

    const handlePageChange = async(page: number) => {
      MasterSpecStore.paginationTable.start = page;
      await MasterSpecStore.getDataSpec();
    };

    const hangleRowPerPageChange = async(newPageSize: number) => {
      MasterSpecStore.paginationTable.length = newPageSize
      await MasterSpecStore.getDataSpec();
    }

    onMounted(async()=>{
      MasterSpecStore.$reset();

      await MasterSpecStore.getDataSpec();
      await OptionStore.getOptionPos();
      await OptionStore.getOptionInspector()
    });
</script>

<style>
    th{
        background-color: #17C563 !important; 
        color: white;
        /* border: none !important; */
    }

    .min-w-btn{
      min-width: 80px !important;
    }

    @media (max-width: 567px) {
        .pagination{
            overflow-y: auto;
            display: block !important;
            padding: 5px 0 5px 0;
        }
        .info-table{
            text-align: center;
            margin-bottom: 8px;
        }
        .pagination::-webkit-scrollbar {
            width: 3px; /* Lebar scrollbar */
            height: 5px;
        }

        .pagination::-webkit-scrollbar-thumb {
            background-color: #F1F1F4; /* Warna latar belakang thumb */
            opacity: 0.3 !important;
        }

        .pagination::-webkit-scrollbar-thumb:hover {
            background-color: #DBDFE9; /* Warna latar belakang thumb saat dihover */
            opacity: 0.5;
        }
    }

    .secondary-row {
      background-color: rgb(219, 219, 219) !important;
      transition: 0.5s;
    }

    .normal-row{
      transition: 0.5s;
    }

    .secondary-row:hover > td{
      background-color: rgb(219, 219, 219) !important;
    }
</style>
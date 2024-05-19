<template>
  <div class="card mt-5">
    <el-form 
      @submit.prevent=""
      label-position="top"
      ref="ruleFormRef"
      :model="MasterInspectionJobStore.inspectionJobDataSingle"
    >
    <!-- <el-form> -->
      <div class="card-body mx-2" >
        <div>
            <el-table :data="MasterInspectionJobStore.inspectionJobDataList" ref="refTable"
              style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
              border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName"
              @selection-change="MasterInspectionJobStore.handleELSelect" v-loading="MasterInspectionJobStore.isFetchLoading"
            >
              <el-table-column type="selection" width="50" align='center'/>
              <el-table-column header-align="center" prop="POS_NM" label="POS Name" width="200">
                <template #default="{ row }">
                  <div v-if="row.POS_NM === '#ADD:MODE'">
                    <el-form-item required prop="POS_NM" class="mb-0">
                      <el-select filterable placeholder="POS" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectionJobStore.inspectionJobDataSingle.POS_NM" disabled>
                        <el-option v-for="item in OptionStore.PosOptionFormatted" 
                          :key="item.POS_NM" :label="item.POS_NM" :value="item.POS_NM" 
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="POS_NM" class="mb-0">
                      <el-select filterable placeholder="POS" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectionJobStore.inspectionJobDataSingle.POS_NM" disabled>
                        <el-option v-for="item in OptionStore.PosOptionFormatted" 
                          :key="item.POS_NM" :label="item.POS_NM" :value="item.POS_NM" 
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.POS_NM }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="POS_CD" label="POS Code" width="200">
                <template #default="{ row }">
                  <div v-if="row.POS_CD === '#ADD:MODE'">
                    <el-form-item required prop="POS_CD" class="mb-0">
                      <el-select filterable placeholder="POS CODE" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectionJobStore.inspectionJobDataSingle.POS_OBJECT" value-key="POS_CD" @change="MasterInspectionJobStore.handlePosCdChange">
                        <el-option v-for="item in OptionStore.posOption" 
                          :key="item.POS_CD" :label="item.POS_CD" :value="item" 
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="POS_CD" class="mb-0">
                      <el-select filterable placeholder="POS" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectionJobStore.inspectionJobDataSingle.POS_OBJECT" value-key="POS_CD" @change="MasterInspectionJobStore.handlePosCdChange">
                        <el-option v-for="item in OptionStore.posOption" 
                          :key="item.POS_CD" :label="item.POS_CD" :value="item" 
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.POS_CD }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="INSPJOB" label="Inspection Job" width="150">
                <template #default="{ row }">
                  <div v-if="row.INSPJOB === '#ADD:MODE'">
                    <el-form-item required prop="INSPJOB" class="mb-0">
                      <el-input 
                        id="INSPJOB"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB"
                        placeholder="Inspection Job"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="INSPJOB" class="mb-0">
                      <el-input 
                        id="INSPJOB"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB"
                        placeholder="Inspection Job"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.INSPJOB }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="INSPJOB_SEQ" label="Inspection Job Seq" width="200">
                <template #default="{ row }">
                  <div v-if="row.INSPJOB_SEQ === '#ADD:MODE'">
                    <el-form-item required prop="INSPJOB_SEQ" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB"
                        type="text"
                        class="my-1"
                        maxlength="5"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_SEQ"
                        placeholder="Inspection Job Seq"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="INSPJOB_SEQ" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB"
                        type="text"
                        class="my-1"
                        maxlength="5"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_SEQ"
                        placeholder="Inspection Job Seq"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.INSPJOB_SEQ }}
                  </div>
                </template>  
              </el-table-column>
              <el-table-column header-align="center" prop="INSPSUBJOB" label="Inspection Sub Job" width="200">
                <template #default="{ row }">
                  <div v-if="row.INSPSUBJOB === '#ADD:MODE'">
                    <el-form-item required prop="INSPSUBJOB" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB"
                        placeholder="Inspection Sub Job"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="INSPSUBJOB" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB"
                        placeholder="Inspection Sub Job"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.INSPSUBJOB }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="INSPSUBJOB_SEQ" label="Inspection Sub Job Seq" width="200">
                <template #default="{ row }">
                  <div v-if="row.INSPSUBJOB_SEQ === '#ADD:MODE'">
                    <el-form-item required prop="INSPSUBJOB_SEQ" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB_SEQ"
                        type="text"
                        class="my-1"
                        maxlength="5"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB_SEQ"
                        placeholder="Inspection Sub Job Seq"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="INSPSUBJOB_SEQ" class="mb-0">
                      <el-input 
                        id="INSPSUBJOB_SEQ"
                        type="text"
                        class="my-1"
                        maxlength="5"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB_SEQ"
                        placeholder="Inspection Sub Job Seq"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.INSPSUBJOB_SEQ }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="POSITION" label="Position Printer" width="100%" align="center">
                <template #default="{ row }">
                  <div v-if="row.POSITION === '#ADD:MODE'">
                    <el-form-item required prop="POSITION" class="mb-0">
                      <el-input 
                        id="POSITION"
                        type="text"
                        class="my-1"
                        maxlength="1"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.POSITION"
                        placeholder="Position"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="POSITION" class="mb-0">
                      <el-input 
                        id="POSITION"
                        type="text"
                        class="my-1"
                        maxlength="1"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.POSITION"
                        placeholder="Position"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.POSITION }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="PRIORITY" label="Priority" width="200">
                <template #default="{ row }">
                  <div v-if="row.PRIORITY === '#ADD:MODE'">
                    <el-form-item required prop="PRIORITY" class="mb-0">
                      <el-input 
                        id="PRIORITY"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.PRIORITY"
                        placeholder="Priority"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="PRIORITY" class="mb-0">
                      <el-input 
                        id="PRIORITY"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.PRIORITY"
                        placeholder="Priority"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.PRIORITY }}
                  </div>
                </template>
              </el-table-column> 
              <el-table-column header-align="center" prop="SUBPRIORITY" label="Sub Priority" width="200">
                <template #default="{ row }">
                  <div v-if="row.SUBPRIORITY === '#ADD:MODE'">
                    <el-form-item required prop="SUBPRIORITY" class="mb-0">
                      <el-input 
                        id="SUBPRIORITY"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.SUBPRIORITY"
                        placeholder="Sub Priority"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="SUBPRIORITY" class="mb-0">
                      <el-input 
                        id="SUBPRIORITY"
                        type="text"
                        class="my-1"
                        maxlength="25"
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.SUBPRIORITY"
                        placeholder="Sub Priority"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.SUBPRIORITY }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="DATE_FROM" label="Reflect From" width="200" align="center">
                <template #default="{ row }">
                  <div v-if="row.DATE_FROM === '#ADD:MODE'">
                    <el-form-item required prop="DATE_FROM" class="mb-0">
                      <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.DATE_FROM"
                        format="YYYY-MM-DD"
                        value="YYYY-MM-DD"
                        type="date"
                        class="w-100"
                        placeholder="Reflect From"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="DATE_FROM" class="mb-0">
                      <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.DATE_FROM"
                        format="YYYY-MM-DD"
                        value="YYYY-MM-DD"
                        type="date"
                        class="w-100"
                        placeholder="Reflect From"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.DATE_FROM !== null ? formattedDate(row.DATE_FROM) : '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="DATE_TO" label="Reflect To" width="200" align="center">
                <template #default="{ row }">
                  <div v-if="row.DATE_TO === '#ADD:MODE'">
                    <el-form-item required prop="DATE_TO" class="mb-0">
                      <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.DATE_TO"
                        format="YYYY-MM-DD"
                        value="YYYY-MM-DD"
                        type="date"
                        class="w-100"
                        placeholder="Reflect To"
                      />
                    </el-form-item>
                  </div>
                  <div v-else-if="MasterInspectionJobStore.isEditMode && MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID === row.INSPJOB_ID">
                    <el-form-item required prop="DATE_TO" class="mb-0">
                      <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.DATE_TO"
                        format="YYYY-MM-DD"
                        value="YYYY-MM-DD"
                        type="date"
                        class="w-100"
                        placeholder="Reflect To"
                      />
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ row.DATE_TO !== null ? formattedDate(row.DATE_TO) : '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="CREATED_DT" label="Created Dt" width="150" align="center">
                <template #default="{ row }">
                  <div v-if="row.CREATED_DT === '#ADD:MODE'">
                    <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.CREATED_DT"  
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
              <el-table-column header-align="center" prop="CREATED_BY" label="Created By" width="150" align="center">
                <template #default="{ row }">
                  <div v-if="row.CREATED_BY === '#ADD:MODE'">
                    <el-input 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.CREATED_BY"  
                        type="text"
                        class="w-100"
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
                    <!-- <el-date-picker 
                        v-model="MasterInspectionJobStore.inspectionJobDataSingle.CHANGED_DT"  
                        format="YYYY-MM-DD"
                        value="YYYY-MM-DD"
                        type="date"
                        class="w-100"
                        disabled
                    /> -->
                  </div>
                  <div v-else>
                    {{ row.CHANGED_DT !== null ? formattedDate(row.CHANGED_DT) : '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="CHANGED_BY" label="Changed By" width="150" align="left">
                <template #default="{ row }">
                  <div v-if="row.CREATED_BY === '#ADD:MODE'">
                    <!-- <el-input 
                      v-model="MasterInspectionJobStore.inspectionJobDataSingle.CHANGED_BY"  
                      type="text"
                      disabled
                    /> -->
                  </div>
                  <div v-else>
                    {{ row.CHANGED_BY }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
        </div>

        <div class="d-flex justify-content-center mt-3 pagination w-100 align-items-center">
          <div class="text-muted flex-grow-1 info-table">
              {{ infoTable(
                  MasterInspectionJobStore.paginationTable.start, 
                  MasterInspectionJobStore.paginationTable.length, 
                  MasterInspectionJobStore.inspectionJobDataCount
                ) 
              }}
          </div>
          <div>
              <el-pagination
                :page-sizes="[5, 10, 50, 100]"
                background="background"
                layout="sizes, prev, pager, next, jumper"
                :total=MasterInspectionJobStore.inspectionJobDataCount
                :disabled="MasterInspectionJobStore.isAddMode || MasterInspectionJobStore.isEditMode"
                @current-change="handlePageChange"
                @size-change="hangleRowPerPageChange"
                small
              />
          </div>
        </div>
        <div class="mt-7">
            <button class="btn btn-sm btn-primary text-nowrap me-3 .min-w-btn" @click="MasterInspectionJobStore.setAddMode(true)" v-if="!MasterInspectionJobStore.isAddMode && !MasterInspectionJobStore.isEditMode">
              Add Row
            </button>
            <el-button type="primary" class="text-nowrap me-1 .min-w-btn" @click="submitSave(ruleFormRef)" v-if="MasterInspectionJobStore.isAddMode || MasterInspectionJobStore.isEditMode" :disabled="MasterInspectionJobStore.isSaveLoading">
              {{ MasterInspectionJobStore.isSaveLoading ? 'Please wait...' : 'Save' }}
            </el-button>
            <el-button class="text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterInspectionJobStore.isAddMode" :disabled="MasterInspectionJobStore.isSaveLoading"> 
              Cancel
            </el-button>
            <el-button class="text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterInspectionJobStore.isEditMode" :disabled="MasterInspectionJobStore.isSaveLoading">
              Cancel
            </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { OptionStore, MasterInspectionJobStore} from '@/stores';
  import { ref, reactive, onMounted } from 'vue';
  import { type FormInstance, type FormRules, ElMessage, ElMessageBox, type Action } from 'element-plus'
  import type { inspectionJobResponse } from '@/stores/modules/master/master-inspection-job/master-inspection-job-types';
  import { refInspectionJobTable } from '@/stores/modules/master/master-inspection-job/master-inspection-job-store';

  const ruleFormRef = ref<FormInstance>();
  const refTable = refInspectionJobTable

  const submitSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
      await formEl.validate (async (valid, fields) => {
        if (valid) {
          MasterInspectionJobStore.submitSave();
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
    row: inspectionJobResponse
    rowIndex: number
  }) => {
    if (row.INSPJOB_ID !== '#ADD:MODE' && MasterInspectionJobStore.isAddMode) {
      return 'secondary-row';
    } else if (parseInt(row.INSPJOB_ID) !== MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_ID && MasterInspectionJobStore.isEditMode){
      return 'secondary-row'
    }
    return 'normal-row'
  } 

  const handlePageChange = async(page: number) => {
    MasterInspectionJobStore.paginationTable.start = page;
    await MasterInspectionJobStore.getDataInspectionJob();
  };

  const hangleRowPerPageChange = async(newPageSize: number) => {
    MasterInspectionJobStore.paginationTable.length = newPageSize
    await MasterInspectionJobStore.getDataInspectionJob();
  }

  const setModeNormal = () => {
      if(MasterInspectionJobStore.inspectionJobDataSingle.POS_NM != '' || MasterInspectionJobStore.inspectionJobDataSingle.POS_OBJECT || MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB 
        || MasterInspectionJobStore.inspectionJobDataSingle.INSPJOB_SEQ != '' 
        || MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB 
        || MasterInspectionJobStore.inspectionJobDataSingle.INSPSUBJOB_SEQ != '' 
        || MasterInspectionJobStore.inspectionJobDataSingle.POSITION != ''
      ){
        ElMessageBox.alert(`Filled fields will not be saved, are you sure?`, 'Warning', {
            confirmButtonText: 'Confirm',
            confirmButtonClass: 'el-button--warning',
            cancelButtonText: 'Cancel',
            type: 'warning',
            showCancelButton: true,
            callback: (action: Action) => {
                if(action == 'confirm' && MasterInspectionJobStore.isAddMode){
                  MasterInspectionJobStore.setAddMode(false)
                  return
                } else if (action == 'confirm' && MasterInspectionJobStore.isEditMode){
                  MasterInspectionJobStore.setEditMode(false);
                  return
                } else {
                  return
                }
            }
        })
      } else {
        MasterInspectionJobStore.isAddMode ? MasterInspectionJobStore.setAddMode(false) : MasterInspectionJobStore.setEditMode(false); 
      }
    }

  onMounted(async()=>{
    MasterInspectionJobStore.$reset();

    await MasterInspectionJobStore.getDataInspectionJob();
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
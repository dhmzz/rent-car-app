<template>
    <div class="card mt-5">
      <el-form 
        @submit.prevent=""
        label-position="top"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="MasterInspectorStore.inspectorDataSingle"
      >
      <!-- <el-form> -->
        <div class="card-body mx-2" >
          <div>
            <!-- <el-table :data="MasterInspectorStore.inspectorDataList" ref="refTable"
                style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName"
                :default-sort="{ prop: 'systemType', order: 'ascending' }" @selection-change="MasterSpecStore.handleELSelect"
              > -->
              <el-table :data="MasterInspectorStore.inspectorDataList" ref="refTable" v-loading="MasterInspectorStore.isFetchLoading"
                style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName" @selection-change="MasterInspectorStore.handleELSelect"
              >
                <el-table-column type="selection" width="50" align='center'/>
                <el-table-column header-align="center" prop="POS_CD" label="POS Code" width="200">
                  <template #default="{ row }">
                    <div v-if="row.POS_CD === '#ADD:MODE'">
                      <el-form-item required prop="POS_CD" class="mb-0">
                        <el-select id="POS_CD" filterable placeholder="Pos" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectorStore.inspectorDataSingle.POS_CD" :change="onPosChange(MasterInspectorStore.inspectorDataSingle.POS_CD)">
                          <el-option v-for="item in OptionStore.PosOptionFormatted" 
                            :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="POS_CD" class="mb-0">
                        <el-select id="POS_CD" filterable placeholder="Pos" :loading="OptionStore.isFetchPosLoading" v-model="MasterInspectorStore.inspectorDataSingle.POS_CD" :change="onPosChange(MasterInspectorStore.inspectorDataSingle.POS_CD)">
                          <el-option v-for="item in OptionStore.PosOptionFormatted" 
                            :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.POS_CD }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INSPJOB" label="Inspection Job" width="200">
                  <template #default="{ row }">
                    <div v-if="row.INSPJOB === '#ADD:MODE'">
                      <el-form-item required prop="INSPJOB" class="mb-0">
                        <el-select id="INSPJOB" filterable placeholder="Job" :loading="OptionStore.isFetchInspectionLoading" v-model="MasterInspectorStore.inspectorDataSingle.INSPJOB" :change="onJobChange(MasterInspectorStore.inspectorDataSingle.INSPJOB)">
                          <el-option v-for="item in OptionStore.inspectionJobOption" 
                            :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="INSPJOB" class="mb-0">
                        <el-select id="INSPJOB" filterable placeholder="Job" :loading="OptionStore.isFetchInspectionLoading" v-model="MasterInspectorStore.inspectorDataSingle.INSPJOB" :change="onJobChange(MasterInspectorStore.inspectorDataSingle.INSPJOB)">
                          <el-option v-for="item in OptionStore.InpectionJobOptionFormatted" 
                            :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB" 
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.INSPJOB }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INSPSUBJOB" label="Inspection Sub Job" width="150">
                  <template #default="{ row }">
                    <div v-if="row.INSPSUBJOB === '#ADD:MODE'">
                      <el-form-item required prop="INSPSUBJOB" class="mb-0">
                        <el-select filterable v-model="MasterInspectorStore.inspectorDataSingle.INSPSUBJOB" placeholder="Inspection Sub Job" :change="onSubJobChange(MasterInspectorStore.inspectorDataSingle.INSPSUBJOB)">
                          <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPSUBJOB" :label="item.INSPSUBJOB" :value="item.INSPSUBJOB"/>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="INSPSUBJOB" class="mb-0">
                        <el-select filterable v-model="MasterInspectorStore.inspectorDataSingle.INSPSUBJOB" placeholder="Inspection Sub Job" :change="onSubJobChange(MasterInspectorStore.inspectorDataSingle.INSPSUBJOB)">
                          <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPSUBJOB" :label="item.INSPSUBJOB" :value="item.INSPSUBJOB"/>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.INSPSUBJOB }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="SHIFTGRPNM" label="Shift" width="200">
                  <template #default="{ row }">
                    <div v-if="row.SHIFTGRPNM === '#ADD:MODE'">
                      <el-form-item required prop="SHIFTGRPNM" class="mb-0">
                        <el-select filterable v-model="MasterInspectorStore.inspectorDataSingle.SHIFTGRPNM" placeholder="Shift">
                          <el-option label="RED" value="RED"/>
                          <el-option label="WHITE" value="WHITE"/>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="SHIFTGRPNM" class="mb-0">
                        <el-select filterable v-model="MasterInspectorStore.inspectorDataSingle.SHIFTGRPNM" placeholder="Shift">
                          <el-option label="RED" value="RED"/>
                          <el-option label="WHITE" value="WHITE"/>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.SHIFTGRPNM }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="NO_REG" label="REG No" width="200">
                  <template #default="{ row }">
                    <div v-if="row.NO_REG === '#ADD:MODE'">
                      <el-form-item required prop="NO_REG" class="mb-0">
                        <el-input 
                          id="NO_REQ"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterInspectorStore.inspectorDataSingle.NO_REG"
                          placeholder="NO REG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="NO_REG" class="mb-0">
                        <el-input 
                          id="NO_REQ"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterInspectorStore.inspectorDataSingle.NO_REG"
                          placeholder="NO REG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.NO_REG }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INSPNM" label="Inspector" width="200">
                  <template #default="{ row }">
                    <div v-if="row.INSPNM === '#ADD:MODE'">
                      <el-form-item required prop="INSPNM" class="mb-0">
                        <el-input 
                          id="INSPNM"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterInspectorStore.inspectorDataSingle.INSPNM"
                          placeholder="Inspector"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterInspectorStore.isEditMode && MasterInspectorStore.inspectorDataSingle.INSPID === row.INSPID">
                      <el-form-item required prop="INSPNM" class="mb-0">
                        <el-input 
                          id="INSPNM"
                          type="text"
                          class="my-1"
                          maxlength="25"
                          v-model="MasterInspectorStore.inspectorDataSingle.INSPNM"
                          placeholder="Inspector"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.INSPNM }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CREATED_DT" label="Created Dt" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CREATED_DT === '#ADD:MODE'">
                      <el-date-picker 
                          v-model="MasterInspectorStore.inspectorDataSingle.CREATED_DT"  
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
                        v-model="MasterInspectorStore.inspectorDataSingle.CREATED_BY"  
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

          <!-- PAGINATION::START -->
          <div class="d-flex justify-content-center mt-3 pagination w-100 align-items-center">
            <div class="text-muted flex-grow-1 info-table">
                {{ infoTable(
                    MasterInspectorStore.paginationTable.start, 
                    MasterInspectorStore.paginationTable.length, 
                    MasterInspectorStore.inspecDataCount
                  ) 
                }}
            </div>
            <div>
                <el-pagination
                  :page-sizes="[5, 10, 50, 100]"
                  background="background"
                  layout="sizes, prev, pager, next, jumper"
                  :total=MasterInspectorStore.inspecDataCount
                  @current-change="handlePageChange"
                  @size-change="hangleRowPerPageChange"
                  :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode"
                  small
                />
            </div>
          </div>
          <div class="mt-7">
              <button class="btn btn-sm btn-primary text-nowrap me-3 .min-w-btn" @click="MasterInspectorStore.setAddMode(true)" v-if="!MasterInspectorStore.isAddMode && !MasterInspectorStore.isEditMode">
                Add Row
              </button>
              <el-button type="primary" class="text-nowrap me-3 .min-w-btn" @click="submitSave(ruleFormRef)" v-if="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode" :disabled="MasterInspectorStore.isSaveLoading">
                {{ MasterInspectorStore.isSaveLoading ? 'Please Wait...' : 'Save' }}
              </el-button>
              <button class="btn btn-sm btn-secondary text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterInspectorStore.isAddMode" :disabled="MasterInspectorStore.isSaveLoading">
                Cancel
              </button>
              <button class="btn btn-sm btn-secondary text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterInspectorStore.isEditMode" :disabled="MasterInspectorStore.isSaveLoading">
                Cancel
              </button>
          </div>
          <!-- PAGINATION::END -->

        </div>
      </el-form>
    </div>
</template>

<script setup lang="ts">
    import { MasterInspectorStore, OptionStore } from '@/stores';
    import { ref, reactive, onMounted } from 'vue';
    import { ElMessage, ElMessageBox, type Action, type FormInstance, type FormRules } from 'element-plus'
    import type { inspectorResponse } from '@/stores/modules/master/master-inspector/master-inspector-types';
    import { refInspectoreTable } from '@/stores/modules/master/master-inspector/master-inspector-store';

    const refTable = refInspectoreTable;

    const ruleFormRef = ref<FormInstance>();

    const submitSave = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
        await formEl.validate (async (valid, fields) => {
          if (valid) {
            MasterInspectorStore.submitSave();
            formEl.clearValidate();
          } else {
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

    const infoTable = (start:number, length:number, total:number):string => {
      const from = start > 1 ? (start - 1) * length + 1 : start
      const to = from + length - 1
      return `Showing ${from} - ${Math.min(to, total)} from ${total} entries`
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

    const tableRowClassName = ({row,rowIndex}: {
      row: inspectorResponse
      rowIndex: number
    }) => {
      if (row.INSPID !== '#ADD:MODE' && MasterInspectorStore.isAddMode) {
        return 'secondary-row';
      } else if (row.INSPID !== MasterInspectorStore.inspectorDataSingle.INSPID && MasterInspectorStore.isEditMode){
        return 'secondary-row'
      }
      return 'normal-row'
    }

    const handlePageChange = async(page: number) => {
      MasterInspectorStore.paginationTable.start = page;
      await MasterInspectorStore.getDataInspector();
    };

    const setModeNormal = () => {
      if(MasterInspectorStore.inspectorDataSingle.POS_CD != '' || MasterInspectorStore.inspectorDataSingle.INSPJOB != '' 
        || MasterInspectorStore.inspectorDataSingle.INSPSUBJOB != '' || MasterInspectorStore.inspectorDataSingle.SHIFTGRPNM != '' 
        || MasterInspectorStore.inspectorDataSingle.NO_REG != ''
      ){
        ElMessageBox.alert(`Filled fields will not be saved, are you sure?`, 'Warning', {
            confirmButtonText: 'Confirm',
            confirmButtonClass: 'el-button--warning',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            type: 'warning',
            callback: (action: Action) => {
                if(action == 'confirm' && MasterInspectorStore.isAddMode){
                  MasterInspectorStore.setAddMode(false)
                  return
                } else if (action == 'confirm' && MasterInspectorStore.isEditMode){
                  MasterInspectorStore.setEditMode(false);
                  return
                } else {
                  return
                }
            }
        })
      } else {
        if(MasterInspectorStore.isAddMode){
          MasterInspectorStore.setAddMode(false);
        } else if (MasterInspectorStore.isEditMode){
          MasterInspectorStore.setEditMode(false);
        } 
      }
    }

    const hangleRowPerPageChange = async(newPageSize: number) => {
      MasterInspectorStore.paginationTable.length = newPageSize
      await MasterInspectorStore.getDataInspector();
    }

    const onPosChange = (posCode) => {
      const isAnyInspection = OptionStore.inspectionJobOption.find(item => item.POS_CD === posCode);

      if(isAnyInspection){
        MasterInspectorStore.inspectorDataSingle.INSPJOB = isAnyInspection.INSPJOB;
        MasterInspectorStore.inspectorDataSingle.INSPSUBJOB = isAnyInspection.INSPSUBJOB;
      }
    }

    const onJobChange = (job) => {
      const getInspection = OptionStore.inspectionJobOption.find(item => item.INSPJOB === job);

      if(getInspection){
        MasterInspectorStore.inspectorDataSingle.POS_CD = getInspection.POS_CD;
        MasterInspectorStore.inspectorDataSingle.INSPSUBJOB = getInspection.INSPSUBJOB;
      }
    }

    const onSubJobChange = (subJob) => {
      const getInspection = OptionStore.inspectionJobOption.find(item => item.INSPSUBJOB === subJob);

      if(getInspection){
        MasterInspectorStore.inspectorDataSingle.POS_CD = getInspection.POS_CD;
        MasterInspectorStore.inspectorDataSingle.INSPJOB = getInspection.INSPJOB;
      }
    }

    onMounted(async() => {
      MasterInspectorStore.$reset();

      await MasterInspectorStore.getDataInspector();
      await OptionStore.getOptionPos();
      await OptionStore.getOptionInspectionJob();
    })
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
</style>
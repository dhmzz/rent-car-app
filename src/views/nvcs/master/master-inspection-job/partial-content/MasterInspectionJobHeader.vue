<template>
    <div class="card">
      <div class="card-body border-0 pt-5">
        <!-- FORM FILTER::START -->
        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">POS Code</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectionJobStore.search.POS_CD">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.posOption" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/> 
                </el-select>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Inspection Job</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectionJobStore.search.INSPJO">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB"/> 
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Line Name</span>
              </label>
              <div class="flex-grow-1">
                <el-input 
                  placeholder="Line Name"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Inspection Sub Job</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectionJobStore.search.INSPSUBJOB">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPSUBJOB" :label="item.INSPSUBJOB" :value="item.INSPSUBJOB"/> 
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- FORM FILTER::END -->
      </div>

    </div>
    
    <div class="card mt-5">
      <div class="card-body">
        <div class="d-flex justify-content-between flex-wrap action_menu">
          <div class="d-flex gap-2 action_menu mb-2">
            <button class="btn btn-sm btn-success text-nowrap" @click="MasterInspectionJobStore.setModalUploadOpen()" :disabled="MasterInspectionJobStore.isAddMode || MasterInspectionJobStore.isEditMode">
              <i class="ki-outline ki-document fs-3" ></i>
              Upload
            </button>
            <button class="btn btn-sm btn-primary text-nowrap" @click="MasterInspectionJobStore.setEditMode(true)" :disabled="MasterInspectionJobStore.isAddMode || MasterInspectionJobStore.isEditMode || MasterInspectionJobStore.inspectionJobDataSelected.length !== 1">
              <i class="ki-outline ki-pencil fs-3"></i>
              Edit
            </button>
            <button class="btn btn-sm btn-danger text-nowrap" @click="MasterInspectionJobStore.submitDelete()" :disabled="MasterInspectionJobStore.isAddMode || MasterInspectionJobStore.isEditMode || MasterInspectionJobStore.inspectionJobDataSelected.length < 1">
              <i class="ki-outline ki-trash fs-3"></i>
              Delete
            </button>
          </div>
  
          <div class="d-flex gap-2 action_menu mb-2">
            <button class="btn btn-sm btn-primary text-nowrap" @click="MasterInspectionJobStore.handleSearch()">
              <i class="ki-outline ki-magnifier fs-3"></i>
              Search
            </button>
            <button class="btn btn-sm btn-secondary text-nowrap" @click="MasterInspectionJobStore.handleClear()">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import axios from 'axios'
  import { ref } from "vue";
  import { MasterInspectionJobStore, OptionStore } from "@/stores"

  const onChangeType = async() => {
  }

  const onSearch = async() => {
  }

  const onClear = async() => {
  }

  const onUpload = ():void => {
  }

  onMounted(async() => {
    await OptionStore.getOptionPos();
    await OptionStore.getOptionInspectionJob();
  })
</script>

<style>
@media (max-width: 567px) {
  .action_menu{
    /* width: 100% !important; */
    display: block !important;
    margin-bottom: 0px !important;
  }

  .mb-mobile-2{
    margin-bottom: 15px !important;
  }

  button{
    width: 100%;
    margin-top: 5px;
  }

  .select-w-100{
    width: 100%;
  }

  .mobile-remove-flex{
    display: block !important;
  }
}
</style>
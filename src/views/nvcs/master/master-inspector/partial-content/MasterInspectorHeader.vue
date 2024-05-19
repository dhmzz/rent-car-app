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
                <el-select filterable v-model="MasterInspectorStore.search.POS_CD">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.posOption" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/>
                </el-select>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Shift</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectorStore.search.SHIFTGRPNM">
                  <el-option label="All" value=""/>
                  <el-option label="RED" value="Red"/>
                  <el-option label="WHITE" value="White"/>
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Inspection Job</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectorStore.search.INSPJOB">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB"/>
                </el-select>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Inspector</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectorStore.search.INSPNM">
                  <el-option label="All" value=""/>
                  <el-option v-for="item in OptionStore.inspectorOption" :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB"/>
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Inspection Sub Job</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterInspectorStore.search.INSPSUBJOB">
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
            <button class="btn btn-sm btn-success text-nowrap" @click="MasterInspectorStore.setModalUploadOpen" :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode">
              <i class="ki-outline ki-document fs-3" ></i>
              Upload
            </button>
            <button @click="MasterInspectorStore.setEditMode(true)" class="btn btn-sm btn-primary text-nowrap" :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode || MasterInspectorStore.inspectorDataSelected.length !== 1">
              <i class="ki-outline ki-pencil fs-3"></i>
              Edit
            </button>
            <button class="btn btn-sm btn-danger text-nowrap" @click="MasterInspectorStore.submitDelete()" :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode || MasterInspectorStore.inspectorDataSelected.length < 1">
              <i class="ki-outline ki-trash fs-3"></i>
              Delete
            </button>
          </div>
  
          <div class="d-flex gap-2 action_menu mb-2">
            <button class="btn btn-sm btn-primary text-nowrap" @click="MasterInspectorStore.handleSerach()" :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode">
              <i class="ki-outline ki-magnifier fs-3"></i>
              Search
            </button>
            <button class="btn btn-sm btn-secondary text-nowrap" @click="MasterInspectorStore.handleClear()" :disabled="MasterInspectorStore.isAddMode || MasterInspectorStore.isEditMode">
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
  import { MasterPosStore, MasterInspectorStore, OptionStore } from "@/stores"

  const onChangeType = async() => {
  }

  const onSearch = async() => {
  }

  const onClear = async() => {
  }

  const onUpload = ():void => {
  }

  onMounted(async() => {
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
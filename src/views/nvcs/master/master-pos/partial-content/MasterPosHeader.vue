<template>
    <div class="card">
      <div class="card-body border-0 pt-5">
        <!-- FORM FILTER::START -->
        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">POS Name</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterPosStore.posNameParam">
                  <el-option label="All" value="" selected/>
                  <el-option v-for="item in OptionStore.PosOptionFormatted" :key="item.POS_NM" :label="item.POS_NM" :value="item.POS_NM"/> 
                </el-select>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">Line Name</span>
              </label>
              <div class="flex-grow-1">
                <el-input type="text" placeholder="All" v-model="MasterPosStore.lineNameParam"/>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100">
          <div class="col-sm-6 col-12">
            <div class="d-flex align-items-center flex-grow-1 mobile-remove-flex"> 
              <label style="min-width: 30%;">
                <span class="text-nowrap me-5">POS Code</span>
              </label>
              <div class="flex-grow-1">
                <el-select filterable v-model="MasterPosStore.posCodeParam">
                  <el-option label="All" value="" selected/>
                  <el-option v-for="item in OptionStore.PosOptionFormatted" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/> 
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
            <button class="btn btn-sm btn-success text-nowrap" @click="MasterPosStore.setModalUploadOpen()" :disabled="MasterPosStore.isAddMode || MasterPosStore.isEditMode">
              <i class="ki-outline ki-document fs-3" ></i>
              Upload
            </button>
            <button class="btn btn-sm btn-primary text-nowrap" :disabled="MasterPosStore.posDataSelected.length != 1 || MasterPosStore.isAddMode || MasterPosStore.isEditMode" @click="MasterPosStore.setEditMode(true)">
              <i class="ki-outline ki-pencil fs-3"></i>
              Edit
            </button>
            <button class="btn btn-sm btn-danger text-nowrap"  :disabled="MasterPosStore.posDataSelected.length < 1 || MasterPosStore.isAddMode || MasterPosStore.isEditMode || MasterPosStore.isDeleteLoading" @click="MasterPosStore.handleDelete()">
              <i class="ki-outline ki-trash fs-3" :hidden="MasterPosStore.isDeleteLoading"></i>
              <i v-if="MasterPosStore.isDeleteLoading" class="spinner-border spinner-border-sm align-middle me-2"></i>
              {{ MasterPosStore.isDeleteLoading ? 'Please wait...' : 'Delete' }}
            </button>
          </div>
  
          <div class="d-flex gap-2 action_menu mb-2">
            <button class="btn btn-sm btn-primary text-nowrap" @click="MasterPosStore.handleSearch" :disabled="MasterPosStore.isAddMode || MasterPosStore.isEditMode">
              <i class="ki-outline ki-magnifier fs-3"></i>
              Search
            </button>
            <button class="btn btn-sm btn-secondary text-nowrap" @click="MasterPosStore.handleClear" :disabled="MasterPosStore.isAddMode || MasterPosStore.isEditMode">
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
  import { MasterPosStore, OptionStore } from "@/stores"

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
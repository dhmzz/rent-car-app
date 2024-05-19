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
                        <el-select filterable v-model="MasterDefectStore.search.POS_CD">
                        <el-option label="All" value=""/>
                            <el-option v-for="item in OptionStore.PosOptionFormatted" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/> 
                        </el-select>
                    </div>
                    </div>
                </div>
                
                <div class="col-sm-6 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">Part Name</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-select filterable v-model="MasterDefectStore.search.PART_NM">
                            <el-option label="All" value=""/>
                            <el-option v-for="item in OptionStore.dataSpecOption" :key="item.PART_NAME" :label="item.PART_NAME" :value="item.PART_NAME" />
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
                        <el-select filterable v-model="MasterDefectStore.search.INSPJOB">
                            <el-option label="All" value=""/>
                            <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPJOB" :label="item.INSPJOB" :value="item.INSPJOB" />
                        </el-select>
                    </div>
                    </div>
                </div>

                <div class="col-sm-6 col-12">
                    <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                    <label style="min-width: 30%;">
                        <span class="text-nowrap me-5">Defect Name</span>
                    </label>
                    <div class="flex-grow-1">
                        <el-input 
                            placeholder="Defect"
                            v-model="MasterDefectStore.search.DFCTNM"
                            maxlength="50"
                        />
                    </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
            <div class="col-sm-6 col-12">
                <div class="d-flex align-items-center flex-grow-1 mobile-remove-flex"> 
                <label style="min-width: 30%;">
                    <span class="text-nowrap me-5">BC Type</span>
                </label>
                <div class="flex-grow-1">
                    <el-select filterable v-model="MasterDefectStore.search.BC_TYPE">
                        <el-option label="All" value=""/>
                        <el-option v-for="item in OptionStore.dataSpecOption" :key="item.BC_TYPE" :label="item.BC_TYPE" :value="item.BC_TYPE" />
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
                <button class="btn btn-sm btn-success text-nowrap" @click="MasterDefectStore.setModalUploadOpen()" :disabled="MasterDefectStore.isAddMode || MasterDefectStore.isEditMode">
                    <i class="ki-outline ki-document fs-3" ></i>
                    Upload
                </button>
                <button class="btn btn-sm btn-primary text-nowrap" @click="MasterDefectStore.setModalDetailOpen(true, MasterDefectStore.defectDataSelected[0])" :disabled="MasterDefectStore.defectDataSelected.length != 1 || MasterDefectStore.isAddMode || MasterDefectStore.isEditMode">
                    <i class="ki-outline ki-pencil fs-3"></i>
                    Edit
                </button>
                <button class="btn btn-sm btn-danger text-nowrap" @click="MasterDefectStore.submitDelete()" :disabled="MasterDefectStore.defectDataSelected.length < 1 || MasterDefectStore.isAddMode || MasterDefectStore.isEditMode">
                    <i class="ki-outline ki-trash fs-3"></i>
                    Delete
                </button>
            </div>
    
            <div class="d-flex gap-2 action_menu mb-2">
                <button class="btn btn-sm btn-primary text-nowrap" @click="MasterDefectStore.handleSearch()" :disabled="MasterDefectStore.isAddMode || MasterDefectStore.isEditMode">
                    <i class="ki-outline ki-magnifier fs-3"></i>
                    Search
                </button>
                <button class="btn btn-sm btn-secondary text-nowrap" @click="MasterDefectStore.handleClear()" :disabled="MasterDefectStore.isAddMode || MasterDefectStore.isEditMode">
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
  import { MasterDefectStore, OptionStore } from "@/stores"

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
    await OptionStore.getOptionDataSpec();
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
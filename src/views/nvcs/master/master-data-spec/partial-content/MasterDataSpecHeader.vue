<template>
    <div class="card">
        <div class="card-body border-0 pt-5">
            <!-- FORM FILTER::START -->
            <div class="row w-100">
            <div class="col-sm-6 col-12">
                <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                <label style="min-width: 30%;">
                    <span class="text-nowrap me-5">BC. Type</span>
                </label>
                <div class="flex-grow-1">
                    <el-select filterable v-model="MasterSpecStore.BC_TYPEParam">
                        <el-option label="All" value=""/>
                        <el-option v-for="item in OptionStore.dataSpecOption" :key="item.BC_TYPE" :label="item.BC_TYPE" :value="item.BC_TYPE"/> 
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
                    <el-input 
                        v-model="MasterSpecStore.PART_NAMEParam"
                        placeholder="Part Name"
                        maxLength="50"
                    /> 
                </div>
                </div>
            </div>
            </div>

            <div class="row w-100">
            <div class="col-sm-6 col-12">
                <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                <label style="min-width: 30%;">
                    <span class="text-nowrap me-5">POS</span>
                </label>
                <div class="flex-grow-1">
                    <el-select filterable v-model="MasterSpecStore.POS_IDParam">
                        <el-option label="All" value=""/>
                        <el-option v-for="item in OptionStore.posOption" :key="item.POS_NM" :label="item.POS_NM" :value="item.POS_NM"/> 
                    </el-select>
                </div>
                </div>
            </div>

            <div class="col-sm-6 col-12">
                <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                <label style="min-width: 30%;">
                    <span class="text-nowrap me-5">Standart Spec Code</span>
                </label>
                <div class="flex-grow-1">
                    <el-input 
                        placeholder="All"
                        v-model="MasterSpecStore.STD_SPEC_CDParam"
                        maxLength="50"
                    />
                </div>
                </div>
            </div>
            </div>

            <div class="row w-100">
            <div class="col-sm-6 col-12">
                <div class="d-flex align-items-center flex-grow-1 mobile-remove-flex"> 
                <label style="min-width: 30%;">
                    <span class="text-nowrap me-5">JOB</span>
                </label>
                <div class="flex-grow-1">
                    <el-select filterable v-model="MasterSpecStore.INSPJOB_IDParam">
                        <el-option label="All" value=""/>
                        <el-option v-for="item in OptionStore.inspectionJobOption" :key="item.INSPJOB_ID" :label="item.INSPJOB_ID" :value="item.INSPJOB_ID"/> 
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
                <button class="btn btn-sm btn-success text-nowrap" @click="MasterSpecStore.setModalUploadOpen()" :disabled="MasterSpecStore.isAddMode || MasterSpecStore.isEditMode">
                    <i class="ki-outline ki-document fs-3" ></i>
                    Upload
                </button>
                <button @click="MasterSpecStore.setEditMode(true)" class="btn btn-sm btn-primary text-nowrap" :disabled="MasterSpecStore.specDataSelected.length !== 1 || MasterSpecStore.isAddMode || MasterSpecStore.isEditMode">
                    <i class="ki-outline ki-pencil fs-3"></i>
                    Edit
                </button>
                <button @click="MasterSpecStore.submitDelete()" class="btn btn-sm btn-danger text-nowrap" :disabled="MasterSpecStore.specDataSelected.length < 1 || MasterSpecStore.isAddMode || MasterSpecStore.isEditMode">
                    <i class="ki-outline ki-trash fs-3"></i>
                    Delete
                </button>
            </div>
    
            <div class="d-flex gap-2 action_menu mb-2">
                <button class="btn btn-sm btn-primary text-nowrap" @click="onSearch" :disabled="MasterSpecStore.isAddMode || MasterSpecStore.isEditMode">
                    <i class="ki-outline ki-magnifier fs-3"></i>
                    Search
                </button>
                    <button class="btn btn-sm btn-secondary text-nowrap" @click="onClear" :disabled="MasterSpecStore.isAddMode || MasterSpecStore.isEditMode">
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
    import { MasterSpecStore, OptionStore } from "@/stores"

    const onChangeType = async() => {
    }

    const onSearch = async() => {
        await MasterSpecStore.getDataSpec();
    }

    const onClear = async() => {
        MasterSpecStore.BC_TYPEParam = '',
        MasterSpecStore.POS_IDParam = '',
        MasterSpecStore.INSPJOB_IDParam = '',
        MasterSpecStore.STD_SPEC_CDParam = '',
        MasterSpecStore.PART_NAMEParam = '',

        await MasterSpecStore.getDataSpec();
    }

    const onUpload = ():void => {
    }

    onMounted(async() => {
        await OptionStore.getOptionPos();
        await OptionStore.getOptionInspectionJob();
        await OptionStore.getOptionInspector();
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
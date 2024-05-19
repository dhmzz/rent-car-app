<template>
    <div class="card mt-5">
        <el-form 
            @submit.prevent=""
            label-position="top"
            require-asterisk-position="right"
            ref="ruleFormRef"
            :model="MasterDefectStore.defectDataSingle"
        >
        <!-- <el-form> -->
            <div class="card-body mx-2" >
            <div>
                <!-- <el-table :data="MasterDefectStore.inspectorDataList" ref="refTable"
                    style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                    border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName"
                    :default-sort="{ prop: 'systemType', order: 'ascending' }" @selection-change="MasterSpecStore.handleELSelect"
                > -->
                <el-table :data="MasterDefectStore.defectDataList" v-loading="MasterDefectStore.isFetchLoading"
                    style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                    border header-row-cell-name="el-table-custom" :row-class-name="tableRowClassName" @selection-change="MasterDefectStore.handleELSelect"
                >
                    <el-table-column type="selection" width="50" align='center'/>
                    <el-table-column header-align="center" prop="POS_CD" label="POS Code" width="200">
                        <template #default="{ row }">
                            <div v-if="row.POS_CD === '#ADD:MODE'">
                                <el-form-item required prop="POS_CD" class="mb-0">
                                    <el-select filterable placeholder="POS CODE" :loading="OptionStore.isFetchPosLoading" v-model="MasterDefectStore.defectDataSingle.POS_OBJECT" value-key="POS_CD" @change="MasterDefectStore.handlePosCdChange">
                                        <el-option v-for="item in OptionStore.posOption" 
                                        :key="item.POS_CD" :label="item.POS_CD" :value="item" 
                                    />
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                            <el-form-item required prop="POS_CD" class="mb-0">
                                <el-select id="POS_CD" filterable placeholder="POS Code" :loading="OptionStore.isFetchPosLoading" v-model="MasterDefectStore.defectDataSingle.POS_CD">
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
                    <el-table-column header-align="center" prop="INSPJOB_ID" label="Inspection Job" width="200">
                        <template #default="{ row }">
                            <div v-if="row.INSPJOB === '#ADD:MODE'">
                            <el-form-item required prop="INSPJOB_ID" class="mb-0">
                                <el-select id="INSPJOB_ID" filterable placeholder="Job" :loading="OptionStore.isFetchInspectionLoading" v-model="MasterDefectStore.defectDataSingle.INSPJOB_ID">
                                <el-option v-for="item in OptionStore.InpectionJobOptionFormatted" 
                                    :key="item.INSPJOB_ID" :label="item.INSPJOB" :value="item.INSPJOB_ID" 
                                />
                                </el-select>
                            </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                            <el-form-item required prop="INSPJOB_ID" class="mb-0">
                                <el-select id="INSPJOB" filterable placeholder="Job" :loading="OptionStore.isFetchInspectionLoading" v-model="MasterDefectStore.defectDataSingle.INSPJOB_ID">
                                    <el-option v-for="item in OptionStore.InpectionJobOptionFormatted" 
                                        :key="item.INSPJOB_ID" :label="item.INSPJOB" :value="item.INSPJOB_ID" 
                                    />
                                </el-select>
                            </el-form-item>
                            </div>
                            <div v-else>
                                {{ row.INSPJOB }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="BC_TYPE" label="BC. Type" width="150">
                        <template #default="{ row }">
                            <div v-if="row.BC_TYPE === '#ADD:MODE'">
                                <el-form-item required prop="BC_TYPE" class="mb-0">
                                    <el-select id="BC_TYPE" filterable placeholder="BC. Type" :loading="OptionStore.isFetchDataSpecLoading" v-model="MasterDefectStore.defectDataSingle.BC_TYPE">
                                        <el-option v-for="item in OptionStore.dataSpecOption" 
                                            :key="item.BC_TYPE" :label="item.BC_TYPE" :value="item.BC_TYPE" 
                                        />
                                    </el-select>
                                    <!-- <el-input type="text" v-model="MasterDefectStore.defectDataSingle.BC_TYPE"/>  -->
                                </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                                <el-form-item required prop="BC_TYPE" class="mb-0">
                                    <el-select id="BC_TYPE" filterable placeholder="BC. Type" :loading="OptionStore.isFetchDataSpecLoading" v-model="MasterDefectStore.defectDataSingle.BC_TYPE">
                                        <el-option v-for="item in OptionStore.dataSpecOption" 
                                            :key="item.BC_TYPE" :label="item.BC_TYPE" :value="item.BC_TYPE" 
                                        />
                                    </el-select>
                                    <!-- <el-input type="text" v-model="MasterDefectStore.defectDataSingle.BC_TYPE"/>  -->
                                </el-form-item>
                            </div>
                            <div v-else>
                                {{ row.BC_TYPE }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="PART_NM" label="Part Name" width="200">
                        <template #default="{ row }">
                            <div v-if="row.PART_NM === '#ADD:MODE'">
                                <el-form-item required prop="PART_NM" class="mb-0">
                                    <el-input 
                                        id="PART_NM"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.PART_NM"
                                        placeholder="Part Name"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                                <el-form-item required prop="PART_NM" class="mb-0">
                                    <el-input 
                                        id="PART_NM"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.PART_NM"
                                        placeholder="Part Name"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else>
                                {{ row.PART_NM }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DFCTNM" label="Defect Name" width="200">
                        <template #default="{ row }">
                            <div v-if="row.DFCTNM === '#ADD:MODE'">
                                <el-form-item required prop="DFCTNM" class="mb-0">
                                    <el-input 
                                        id="DFCTNM"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.DFCTNM"
                                        placeholder="Defect Name"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                                <el-form-item required prop="DFCTNM" class="mb-0">
                                    <el-input 
                                        id="DFCTNM"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.DFCTNM"
                                        placeholder="Defect Name"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else>
                                {{ row.DFCTNM }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="DFCT_CTG" label="Defect Category" width="200">
                        <template #default="{ row }">
                            <div v-if="row.DFCT_CTG === '#ADD:MODE'">
                                <el-form-item required prop="DFCT_CTG" class="mb-0">
                                    <el-input 
                                        id="DFCT_CTG"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.DFCT_CTG"
                                        placeholder="Defect Category"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else-if="MasterDefectStore.isEditMode && MasterDefectStore.defectDataSingle.DFCT_ID === row.DFCT_ID">
                                <el-form-item required prop="DFCT_CTG" class="mb-0">
                                    <el-input 
                                        id="DFCT_CTG"
                                        type="text"
                                        class="my-1"
                                        maxlength="50"
                                        v-model="MasterDefectStore.defectDataSingle.DFCT_CTG"
                                        placeholder="Defect Category"
                                    />
                                </el-form-item>
                            </div>
                            <div v-else>
                                {{ row.DFCT_CTG }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="CREATED_DT" label="Created Dt" width="150" align="center">
                        <template #default="{ row }">
                            <div v-if="row.CREATED_DT === '#ADD:MODE'">
                                <!-- <el-date-picker 
                                    format="YYYY-MM-DD"
                                    value="YYYY-MM-DD"
                                    type="date"
                                    class="w-100"
                                    disabled
                                /> -->
                            </div>
                            <div v-else>
                                {{ row.CREATED_DT !== null ? formattedDate(row.CREATED_DT) : '' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="CREATED_BY" label="Created By" width="150" align="left">
                        <template #default="{ row }">
                            <div v-if="row.CREATED_BY === '#ADD:MODE'">
                                <!-- <el-input 
                                    v-model="MasterDefectStore.defectDataSingle.CREATED_BY"  
                                    type="text"
                                    disabled
                                /> -->
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
                    <el-table-column header-align="center" prop="Action" label="Action" width="100" align="center">
                        <template #default="{ row }">
                            <el-button size="small" type="primary" @click="MasterDefectStore.setModalDetailOpen(true, row)">
                                <span class="ki-outline ki-eye fs-4 mx-0 my-2 text-white"></span>
                            </el-button>
                        </template>
                    </el-table-column>  
                </el-table>          
            </div>

            <!-- PAGINATION::START -->
            <div class="d-flex justify-content-center mt-3 pagination w-100 align-items-center">
                <div class="text-muted flex-grow-1 info-table">
                    {{ infoTable(
                        MasterDefectStore.paginationTable.start, 
                        MasterDefectStore.paginationTable.length, 
                        MasterDefectStore.defectDataCount
                    ) 
                    }}
                </div>
                <div>
                    <el-pagination
                    :page-sizes="[5, 10, 50, 100]"
                    background="background"
                    layout="sizes, prev, pager, next, jumper"
                    :total=MasterDefectStore.defectDataCount
                    @current-change="handlePageChange"
                    @size-change="hangleRowPerPageChange"
                    :disabled="MasterDefectStore.isAddMode || MasterDefectStore.isEditMode"
                    small
                    />
                </div>
            </div>
            <div class="mt-7">
                <button class="btn btn-sm btn-primary text-nowrap me-3 .min-w-btn" @click="MasterDefectStore.setAddMode(true)" v-if="!MasterDefectStore.isAddMode && !MasterDefectStore.isEditMode">
                    Add Row
                </button>
                <el-button type="primary" class="text-nowrap me-3 .min-w-btn" @click="submitSave(ruleFormRef)" v-if="MasterDefectStore.isAddMode || MasterDefectStore.isEditMode" :disabled="MasterDefectStore.isSaveLoading">
                    {{ MasterDefectStore.isSaveLoading ? 'Please Wait...' : 'Save' }}
                </el-button>
                <button class="btn btn-sm btn-secondary text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterDefectStore.isAddMode" :disabled="MasterDefectStore.isSaveLoading">
                    Cancel
                </button>
                <button class="btn btn-sm btn-secondary text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterDefectStore.isEditMode" :disabled="MasterDefectStore.isSaveLoading">
                    Cancel
                </button>
            </div>
            <!-- PAGINATION::END -->

            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { MasterDefectStore, OptionStore } from '@/stores';
    import { ref, reactive, onMounted } from 'vue';
    import { ElMessage, ElMessageBox, type Action, type FormInstance, type FormRules } from 'element-plus'
    import { refInspectoreTable } from '@/stores/modules/master/master-inspector/master-inspector-store';
    import type { defectResponse } from '@/stores/modules/master/master-defect/master-defect-type';

    const refTable = refInspectoreTable;

    const ruleFormRef = ref<FormInstance>();

    const submitSave = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
            await formEl.validate (async (valid, fields) => {
            if (valid) {
                console.log('SUCCESS')
                MasterDefectStore.submitSave();
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

    const setModeNormal = ():void => {
        if(
            MasterDefectStore.defectDataSingle.POS_CD != '' || MasterDefectStore.defectDataSingle.INSPJOB != '' || MasterDefectStore.defectDataSingle.BC_TYPE != '' ||
            MasterDefectStore.defectDataSingle.PART_NM != '' || MasterDefectStore.defectDataSingle.DFCTNM != '' || MasterDefectStore.defectDataSingle.DFCT_CTG != ''  
        ){
            ElMessageBox.alert(`Unsaved data will be lost, are you sure?`, 'Warning', {
                confirmButtonText: 'Confirm',
                confirmButtonClass: 'el-button--warning',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                callback: (action: Action) => {
                    if(action == 'confirm' && MasterDefectStore.isAddMode){
                        MasterDefectStore.setAddMode(false)
                        return
                    } else if (action == 'confirm' && MasterDefectStore.isEditMode){
                        MasterDefectStore.setEditMode(false);
                        return
                    } else {
                        return
                    }
                }
            })
        } else {
            if(MasterDefectStore.isAddMode){
                MasterDefectStore.setAddMode(false);
            } else if (MasterDefectStore.isEditMode){
                MasterDefectStore.setEditMode(false);
            } 
        }
    }

    const tableRowClassName = ({row,rowIndex}: {
        row: defectResponse
        rowIndex: number
    }) => {
        if (row.DFCTNM !== '#ADD:MODE' && MasterDefectStore.isAddMode) {
            return 'secondary-row';
        } else if (row.DFCTNM !== MasterDefectStore.defectDataSingle.DFCTNM && MasterDefectStore.isEditMode){
            return 'secondary-row'
        }
        return 'normal-row'
    }

    const handlePageChange = async(page: number) => {
        MasterDefectStore.paginationTable.start = page;
        await MasterDefectStore.getDataDefect();
    };

    const hangleRowPerPageChange = async(newPageSize: number) => {
        MasterDefectStore.paginationTable.length = newPageSize
        await MasterDefectStore.getDataDefect();
    }

    onMounted(async() => {
        MasterDefectStore.$reset();

        await MasterDefectStore.getDataDefect();
        await OptionStore.getOptionPos();
        await OptionStore.getOptionInspectionJob();
        await OptionStore.getOptionDataSpec();
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
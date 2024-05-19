<template>
    <el-form 
        @submit.prevent="systemStore.onSaveData()"
        label-position="top"
        require-asterisk-position="right"
        :rules="rules"
        ref="ruleFormRef"
        :model="systemStore.systemData"
    >
        <el-dialog
            v-model="systemStore.isModalOpen"
            :title=setTitleModal(systemStore.modalSaveTItle)
            :width="dialogWidth"
            style="margin-top: 10vh"
            :show-close="false"
        >

            <div class="mt-2">
                <div class="mb-4">
                    <el-form-item label="System Code" required prop="systemCode">
                        <el-input 
                            type="text"
                            autocomplete="off" clearable
                            class="w-100"
                            v-model="systemStore.systemData.systemCode"
                            :disabled="systemStore.modalSaveTItle == 'Edit'"
                            show-word-limit
                            maxlength="25"
                        />
                    </el-form-item>
                </div>

                <div class="mb-4">
                    <el-form-item label="System Type" required prop="systemType">
                        <el-input 
                            type="text"
                            class="w-100"
                            v-model="systemStore.systemData.systemType"
                            :disabled="systemStore.modalSaveTItle == 'Edit'"
                            show-word-limit
                            maxlength="25"
                        />
                    </el-form-item>
                </div>

                <div class="mb-4">
                    <el-form-item label="System Value (Text)" required prop="systemValueText">
                        <el-input 
                            type="text"
                            class="w-100"
                            v-model="systemStore.systemData.systemValueText"
                            show-word-limit
                            maxlength="255"
                        />
                    </el-form-item>
                </div>

                <div class="mb-4">
                    <el-form-item label="System Value (Number)" required prop="systemValueNumber">
                        <el-input 
                            type="number"
                            class="w-100"
                            v-model="systemStore.systemData.systemValueNumber"
                        />
                    </el-form-item>
                </div>

                <div class="mb-4">
                    <el-form-item label="System Value Date" required prop="systemValueDateTime">
                        <el-date-picker 
                            v-model="systemStore.systemData.systemValueDateTime"  
                            format="YYYY-MM-DD HH:mm:ss.SSS"
                            value="YYYY-MM-DD HH:mm:ss.SSS"
                            type="datetime"
                            class="w-100"
                            placeholder="Select Date"
                        />
                    </el-form-item>
                </div>

                <div class="mb-4">
                    <div>
                        <el-form-item label="System Remark" required prop="systemRemark">
                            <el-input 
                                type="text"
                                class="w-100"
                                v-model="systemStore.systemData.systemRemark"
                            show-word-limit
                                maxlength="1000"
                            />
                        </el-form-item>
                    </div>
                </div>  
            </div>

            <!-- MODAL #FOOTER -->
            <div class="mx-1 d-flex justify-content-end gap-2 flex-wrap">
                <div class="btn-responsive">
                    <el-button @click="systemStore.setModalClose" :disabled="systemStore.isLoading">Cancel</el-button>
                </div>
                <div class="btn-responsive">
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="systemStore.isLoading">
                        {{ systemStore.isLoading ? 'Loading...' : 'Save Changes' }}
                    </el-button>
                </div>
                <!-- <el-button type="primary" @click="systemStore.onSaveData()" :disabled="systemStore.isLoading"> -->
            </div>
            <template>
            </template>
        </el-dialog>
    </el-form>
</template>

<script setup lang="ts">   
    import { systemStore } from '@/stores-skeleton/index'
    import { onMounted, reactive, ref, watch, computed } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import { useField } from "vee-validate";
    import { useWindowSize } from '@vueuse/core';

    // start::handle modal size
    const { width } = useWindowSize();

    const dialogWidth = computed(() => {
        if(width.value <= 574){
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '75%'
        } else {
            return '45%'
        }
    });
    // end::handle modal size

    const setDate = ():string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    } 

    // VALIDATION:START
    interface RuleForm {
        systemCode: string,
        systemType: string,
        systemValueText: string,
        systemValueDateTime: string,
        systemValueNumber: number,
        systemRemark: string,
        isActive: string,
        createdBy: string
    }

    const ruleFormRef = ref<FormInstance>()

    const rules = reactive<FormRules<RuleForm>>({
        systemCode: [
            { required: true, message: "This field is required.", trigger: "change"},
        ],
        systemType: [
            { required: true, message: "This field is required.", trigger: "change"},
        ],
        systemValueText: [
            { required: true, message: "This field is required.", trigger: "change"},
        ],
        systemValueNumber: [
            { required: true, message: "This field is required.", trigger: "change"},
        ],
        systemValueDateTime: [
            { required: true, message: "This field is required.", trigger: "change"},
        ],
        systemRemark: [
            { required: true, message: "This field is required.", trigger: "change"},
        ]
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate (async (valid, fields) => {
            if (valid) {
                await systemStore.onSaveData()
                formEl.clearValidate()
            } else {
                return            
            }
        })
    }

    const setTitleModal = (title: string):string => {
        return `${title} System Data`
    }

    watch(() => systemStore.systemData.systemCode, (newVal) => {
    })

    onMounted(() => {
    })

</script>

<style scoped>
    @media (max-width: 567px){
        .btn-responsive{
            width: 100%;
        }

    }
</style>
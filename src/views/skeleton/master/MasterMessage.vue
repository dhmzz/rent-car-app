<template>
    <div class="card">
        <div class="card-header border-0 pt-5">
            <div class="d-flex w-100 justify-content-between mb-3 mt-3">
                <div class="d-flex align-items-center period-date">
                    <label>
                        <span class="text-nowrap me-5">Period</span>
                    </label>
                    <!--begin::Datepicker-->
                    <!--end::Datepicker-->
                </div>

                <!-- <div class="d-flex align-items-center flex-grow-1 ms-5">
                    <label>
                        <span class="text-nowrap me-5">Message Type</span>
                    </label>

                    <el-select v-model="messageStore.filter.messageType" placeholder="Please select a Message Type"
                        clearable filterable>
                        <el-option label="Error" value="E" />
                        <el-option label="Information" value="I" />
                        <el-option label="Warning" value="W" />
                    </el-select>
                </div> -->
            </div>

            <div class="d-flex justify-content-center w-100">
                <div class="d-flex mt-4 flex-fill">
                    <el-input v-model="messageStore.filter.input" placeholder="Input keyword here..."
                        :prefix-icon="Search" size="large" />
                </div>
            </div>
        </div>

        <div class="card-body mt-3 mx-2">
            <el-button type="primary" @click="open = true" class="mb-3">Begin Tour</el-button>
            <div class="d-flex justify-content-between filter-column">
                <div class="d-flex gap-2">
                    <el-button size="large" :icon="Plus" ref="ref1" type="success"
                        @click="messageStore.openModal('addModal', '')" plain>
                        Add
                    </el-button>
                    <el-button size="large" :icon="Edit" ref="ref2" type="primary"
                        @click="messageStore.openModal('editModal', multipleSelection[0].messageId)"
                        :disabled="multipleSelection.length !== 1" plain>
                        Edit
                    </el-button>
                    <el-button size="large" :icon="Delete" ref="ref3" type="danger" @click="deleteSelection"
                        :disabled="multipleSelection.length < 1" plain>
                        Delete
                    </el-button>
                    <!-- <button class="btn btn-light-success"
                        @click="messageStore.openModal('editModal', multipleSelection[0].messageId)"
                        :disabled="multipleSelection.length !== 1">
                        <KTIcon icon-name="pencil" icon-class="fs-3" />
                        Edit
                    </button>
                    <button class="btn btn-light-danger" @click="deleteSelection"
                        :disabled="multipleSelection.length < 1">
                        <KTIcon icon-name="trash" icon-class="fs-3" />
                        Delete
                    </button> -->
                </div>

                <el-tour v-model="open">
                    <el-tour-step :target="ref1?.$el" title="Create Message Data" :mask="{
                        style: {
                            boxShadow: 'inset 0 0 15px #333',
                        },
                        color: 'rgba(80, 255, 255, .4)',
                    }">
                        <div>This button is for create a New Message Data.</div>
                    </el-tour-step>
                    <el-tour-step :target="ref2?.$el" title="Create Message Data" :mask="{
                        style: {
                            boxShadow: 'inset 0 0 15px #fff',
                        },
                        color: 'rgba(40, 0, 255, .4)',
                    }">
                        <div>This button is for create a New Message Data.</div>
                    </el-tour-step>
                </el-tour>

                <div class="d-flex gap-2">
                    <el-button :dark="isDark()" type="primary" size="large" :icon="Search" ref="ref4"
                        @click="filterDataTable" :loading="messageStore.filter.submitBtn">
                        Search
                    </el-button>
                    <el-button :dark="isDark()" type="info" size="large" ref="ref4" @click="clearFilter()">
                        Clear
                    </el-button>
                </div>
            </div>

            <div class="d-flex mt-3 upload-column">
                <el-upload class="upload-demo" action="http://localhost:5125/MasterMessage/Upload"
                    :headers="headersUpload" method="post" :show-file-list="true" accept=".xlsx, .xls"
                    :before-upload="checkValidation">
                    <el-button color="#AA00FF" :dark="isDark()" size="large" :icon="UploadFilled" ref="ref4" type="info"
                        plain>
                        Upload
                    </el-button>
                </el-upload>
            </div>
        </div>

    </div>

    <el-dialog v-model="messageStore.messageModal.visible" :title="messageStore.messageModal.title" width="700" :show-close="false"
        :close-on-click-modal="false">
        <el-form ref="ruleFormRef" :model="messageStore.messageDataForm" :rules="rules" label-position="top" status-icon
            require-asterisk-position="right" scroll-to-error show-message>
            <el-form-item prop="messageId" :label-width="formLabelWidth" required>
                <template #label>
                    <span>Message ID</span>
                </template>
                <!-- <el-tooltip class="box-item" effect="dark" placement="top">
                    <template #content> multiple lines<br />second line </template>
                    <QuestionFilled style="width: 1em; height: 1em; margin-right: 8px" />
                </el-tooltip> -->
                <el-input v-model="messageStore.messageDataForm.messageId" type="text" placeholder="Fill Message ID"
                    :disabled="messageStore.messageModal.type !== 'addModal'" autocomplete="off" clearable
                    maxlength="30" show-word-limit />
            </el-form-item>
            <el-form-item label="Message Text" prop="messageText" :label-width="formLabelWidth" required>
                <el-input v-model="messageStore.messageDataForm.messageText" type="text" placeholder="Fill Message Text"
                    autocomplete="off" clearable maxlength="255" />
            </el-form-item>
            <el-form-item label="Message Type" prop="messageType" :label-width="formLabelWidth" required>
                <el-select v-model="messageStore.messageDataForm.messageType" placeholder="Please select a Message Type"
                    clearable filterable>
                    <el-option label="Error" value="E" />
                    <el-option label="Information" value="I" />
                    <el-option label="Warning" value="W" />
                </el-select>
            </el-form-item>
            <el-form-item label="Language Code" prop="languageCode" :label-width="formLabelWidth">
                <el-input v-model="messageStore.messageDataForm.languageCode" type="text"
                    placeholder="Fill Language Code" autocomplete="off" clearable maxlength="255" />
            </el-form-item>
            <el-form-item label="Suggested Countermeasure" prop="suggestedCountermeasure" :label-width="formLabelWidth">
                <el-input v-model="messageStore.messageDataForm.suggestedCountermeasure" type="text"
                    placeholder="Fill Suggested Countermeasure" autocomplete="off" clearable maxlength="255" />
            </el-form-item>
            <el-form-item v-if="messageStore.messageModal.type !== 'addModal'">
                <div class="text-muted text-created">
                    <span class="ms-5">Created by {{ messageStore.messageDataForm.createdBy }}
                    </span>
                </div>
            </el-form-item>
            <!-- <el-form-item label="Message Type" :label-width="formLabelWidth">
                <el-select v-model="messageStore.messageDataForm.messageType" placeholder="Please select" clearable
                    filterable>
                    <el-option v-for="item in messageStore.messageData" :key="item.messageType"
                        :label="item.messageType" :value="item.messageType"><span style="float: left">{{
                        item.messageType }}</span>
                        <span style="
                        float: right;
                        color: var(--el-text-color-secondary);
                        font-size: 13px;
                    ">{{ item.messageId }}</span></el-option>
                    <el-option label="Test Select" value="test" />
                    <template #footer>
                        <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                            Add new Message Type
                        </el-button>
                        <template v-else>
                            <el-input v-model="optionName" class="option-input" placeholder="Input Message Type"
                                size="small" />
                            <el-button type="primary" size="small" @click="onConfirm">
                                Confirm
                            </el-button>
                            <el-button size="small" @click="clear">Cancel</el-button>
                        </template>
</template>
</el-select>
</el-form-item> -->

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-if="messageStore.messageModal.type === 'addModal'" @click="resetForm(ruleFormRef)"
                    :disabled="messageStore.messageModal.resetBtn">Reset</el-button>
                <el-button type="info" @click="cancelForm(ruleFormRef)"
                    :disabled="messageStore.messageModal.cancelBtn">Cancel</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    :loading="messageStore.messageModal.submitBtn">
                    Submit
                </el-button>
            </div>
        </template>
    </el-dialog>

    <div class="card mt-5">
        <div class="card-body mx-2">
            <div class="mb-1 text-muted">
                {{ infoTable(messageStore.dataTable.currentPage, messageStore.dataTable.length,
                        messageStore.dataTable.recordsTotal) }}
            </div>
            <el-table :data="messageStore.messageData" :default-sort="{ prop: 'messageId', order: 'ascending' }"
                empty-text="No Data available" max-height="600" table-layout="fixed" border stripe style="width: 100%"
                @selection-change="handleSelectionChange" v-loading="messageStore.dataTable.loading"
                element-loading-text="Loading...">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column prop="messageId" label="MESSAGE ID" width="180" fixed sortable />
                <el-table-column prop="messageText" label="MESSAGE TEXT" width="500" />
                <el-table-column prop="messageType" label="MESSAGE TYPE" width="180" sortable
                    :filters="filtersMessageType" :filter-method="fmMessageType" />
                <el-table-column prop="createdBy" label="CREATED BY" width="180" />
                <el-table-column prop="createdDate" label="CREATED DATE" width="220" header-align="center" sortable />
                <el-table-column prop="languageCode" label="LANGUAGE CODE" width="200">
                    <template #default="message">
                        {{ message.languageCode ? message.languageCode : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="suggestedCountermeasure" label="SUGGESTED COUNTERMEASURE" width="400">
                    <template #default="message">
                        {{ message.suggestedCountermeasure ? message.suggestedCountermeasure : '-' }}
                    </template>
                </el-table-column>
                <el-table-column width="180" align="center">
                    <template #header>
                        <span>OPERATION</span>
                    </template>
                    <template #default="message">
                        <el-button size="small" type="primary"
                            @click="messageStore.openModal('viewModal', message.row.messageId)">View</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination v-model:page-size="messageStore.dataTable.length"
                    v-model:current-page="messageStore.dataTable.currentPage" class="mt-4" background
                    :page-sizes="[10, 25, 50, 100]" layout="total, sizes, prev, pager, next, jumper, ->, slot"
                    :total="messageStore.dataTable.recordsTotal" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>

    </div>
    <el-backtop :right="25" :bottom="75" />
</template>

<script setup lang="ts">
// Import Libraries etc Start
import { onMounted, ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox, ElDatePicker, ElInput, ElButton, ElBacktop, ElPagination, ElTourStep, vLoading, ElTour, ElUpload, ElFormItem, ElOption, ElSelect, ElForm, ElDialog, ElTableColumn, ElTable } from 'element-plus'
import { useMasterMessageStore } from "@/stores/modules/master/message";
import type { MessageData } from '@/stores/modules/master/message';
import { Search, QuestionFilled, Plus, Edit, Delete, UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, ButtonInstance } from 'element-plus'
import JwtService from "@/core/services/JwtService";
// Import Libraries etc End

// Import Reactive Constant Start
const messageStore = useMasterMessageStore()

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const open = ref(false)
// Import Reactive Constant End

// Data Table Function Start
const handleSizeChange = async (val: number) => {
    await messageStore.fetchData()
}

const isDark = () => {
    const theme = localStorage.getItem('kt_theme_mode_menu')

    if (theme == 'dark') {
        return true
    } else {
        return false
    }
}

const filtersMessageType = [
    {
        text: 'Error',
        value: 'E',
    },
    {
        text: 'Information',
        value: 'I',
    },
    {
        text: 'Warning',
        value: 'W',
    },
]

const fmMessageType = (value: string, row: MessageData) => {
    return row.messageType === value
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log('Remove', file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log('Preview', uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
        () => true,
        () => false
    )
}

const headersUpload: Record<string, string> = {};

const checkValidation: UploadProps['beforeUpload'] = (uploadFile) => {
    if (uploadFile.size / 1024 / 1024 > 2) {
        ElMessage.error('The file size exceeds the limit, please upload the file within 2M');
        return false;
    }
    addTokenToHeaders();
    return true;
};

const addTokenToHeaders = () => {
    const token = JwtService.getToken();
    headersUpload.Authorization = `Bearer ${token}`;
};

const infoTable = (start: number, length: number, total: number): string => {
    const from = start > 1 ? (start - 1) * length + 1 : start
    const to = from + length - 1
    return `Show ${from} - ${Math.min(to, total)} of ${total}`
}

const handleCurrentChange = async (val: number) => {
    messageStore.dataTable.currentPage = val
    messageStore.dataTable.start = (val - 1) * messageStore.dataTable.length;
    await messageStore.fetchData();
}

// Data Table Function End

const multipleSelection = ref<MessageData[]>([])

const handleSelectionChange = (val: MessageData[]) => {
    multipleSelection.value = val
}

const deleteSelection = () => {
    ElMessageBox.confirm(
        `You will deleting ${multipleSelection.value.length} data and cannot be revert. Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            messageStore.actionsData('delete', multipleSelection.value)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

const isAdding = ref(false)
const optionName = ref('')

const value = ref('')

const formLabelWidth = '140px'

const ruleFormRef = ref<FormInstance>()

// Filter Function Start
const clearFilter = () => {
    messageStore.clearFilterField()
    messageStore.dataTable.currentPage = 1
    messageStore.dataTable.start = 0
    messageStore.dataTable.search = ''
    messageStore.fetchData()
}

const filterDataTable = async () => {
    messageStore.filter.submitBtn = true
    messageStore.dataTable.search = messageStore.filter.input
    messageStore.dataTable.currentPage = 1
    messageStore.dataTable.start = 0
    await messageStore.fetchData()
    messageStore.filter.submitBtn = false
}
// Filter Function End

// Validation Form Start
interface RuleForm {
    messageId: string
    messageText: string
    messageType: string
    createdBy: string
    createdDate: Date
    changedBy: string
    changedDate: Date
    languageCode: string
    suggestedCountermeasure: string
}

const cancelForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    messageStore.messageModal.visible = false
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (messageStore.messageModal.type === 'addModal') {
                messageStore.actionsData('add', []);
            } else if (messageStore.messageModal.type === 'editModal') {
                messageStore.actionsData('update', []);
            }
            formEl.resetFields();
        } else {
            console.log('error submit!', fields)
        }
    })
}

const rules = reactive<FormRules<RuleForm>>({
    messageId: [
        {
            required: true,
            message: "Message ID are required",
            trigger: "change",
        },
    ],
    messageType: [
        {
            required: true,
            message: "Message Type are required",
            trigger: "change",
        },
    ],
    messageText: [
        {
            required: true,
            message: "Message Text are required",
            trigger: "change",
        },
    ],
});
// Validation Form End

const state = reactive({
    shortcuts: [
        {
            text: 'Today',
            value: () => {
                const end = new Date();
                const start = new Date();
                return [start, end]
            },
        },
        {
            text: 'Yesterday',
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 1)
                return [start, end]
            },
        },
        {
            text: "Last week",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
            },
        },
        {
            text: "Last month",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
            },
        },
        {
            text: "Last 3 months",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
            },
        },
        {
            text: "Last 6 months",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                return [start, end];
            },
        },
        {
            text: "Last year",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                return [start, end];
            },
        },
    ],
});

// const onAddOption = () => {
//     isAdding.value = true
// }

// const onConfirm = () => {
//     if (optionName.value) {
//         messageStore.messageData.push({
//             messageType: optionName.value,
//             messageId: optionName.value,
//             messageText: '',
//             createdBy: '',
//             createdDate: '',
//             changedBy: '',
//             changeDate: '',
//             languageCode: '',
//             suggestedCountermeasure: ''
//         })
//         clear()
//     }
// }

// const clear = () => {
//     optionName.value = ''
//     isAdding.value = false
// }

onMounted(async () => {
    await messageStore.fetchData()
})

</script>

<style scoped>
.multiselect-blue {
    --ms-font-size: 1.1rem;
    --ms-line-height: 1.5;
    --ms-bg: #f9f9f9;
    --ms-bg-disabled: #F3F4F6;
    --ms-border-color: #f9f9f9;
    --ms-border-width: 1px;
    --ms-border-color-active: #D1D5DB;
    --ms-border-width-active: 1px;
    --ms-radius: 4px;
    --ms-py: 0.5rem;
    --ms-px: 0.875rem;
    --ms-ring-width: 3px;
    --ms-ring-color: #10B98130;
    --ms-placeholder-color: #9CA3AF;
    --ms-max-height: 10rem;
    --ms-font-weight: 500;
}

.text-created {
    display: flex;
    justify-content: end;
    align-items: end;
}

@media (max-width: 567px) {
    .pagination {
        overflow-y: auto;
    }

    .period-date {
        overflow-y: auto;
        flex-wrap: wrap;
        row-gap: 7px;
    }

    .filter-column {
        row-gap: 10px;
        flex-direction: column-reverse;
        align-items: center;
    }

    .upload-column {
        align-items: center;
        justify-content: center;
    }
}

@media (min-width: 568px) and (max-width: 1023px) {
    .pagination {
        overflow-y: auto;
    }

    .period-date {
        width: 100%;
    }
}

@media (min-width: 1024px) {
    .pagination {
        display: flex;
        justify-content: end;
        overflow-y: auto;
    }

    .period-date {
        width: 50%;
    }
}
</style>

<style lang="scss">
.el-date-editor--daterange.el-input__inner {
    width: 100%;
}

.option-input {
    width: 100%;
    margin-bottom: 8px;
}
</style>
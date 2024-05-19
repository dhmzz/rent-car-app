import { ElMessage, ElMessageBox, type Action } from 'element-plus'


export const successNotification = (action: string) => {
    ElMessageBox.confirm(
        `Data successfully ${action}.`,
        'Success',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'success',
        }
    )
}

export const warningNotification = (action: string) => {
    ElMessageBox.confirm(
        `Failed to ${action} data.`,
        'Warning',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'warning',
        }
    )
}

export const errorNotification = (action: string) => {
    ElMessageBox.confirm(
        `Error to ${action} data, please try againt later!`,
        'Error',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonClass: 'el-button--danger',
            type: 'error',
        }
    )
}
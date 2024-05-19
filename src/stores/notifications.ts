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

export const invalidFformatExcelNotification = () => {
    ElMessageBox.confirm(
        `Please select a valid template!`,
        'Invalid Tempplate',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonClass: 'el-button--danger',
            type: 'error',
        }
    )
}

export const notFoundDataInExcel = () => {
    ElMessageBox.confirm(
        `Make sure excel is filled with data.`,
        'No Data Found',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'info',
        }
    )
}

export const skeletonWarningMessage = (mess:string) => {
    ElMessageBox.confirm(
        `${mess}.`,
        'Warning!',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'warning',
        }
    )
}

export const skeletonErrorMessage = (mess:string) => {
    ElMessageBox.confirm(
        `${mess}.`,
        'Error!',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'error',
        }
    )
}

export const skeletonSuccessMessage = (mess:string) => {
    ElMessageBox.confirm(
        `${mess}.`,
        'Success!',
        {
            showCancelButton: false,
            confirmButtonText: 'OK',
            type: 'success',
        }
    )
}
export default { successNotification, warningNotification, errorNotification, invalidFformatExcelNotification, skeletonErrorMessage, skeletonWarningMessage };
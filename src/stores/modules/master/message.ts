import { defineStore } from "pinia";
import { ElNotification, ElMessage } from 'element-plus'
import { API } from "@/stores/global";
import ApiService from "@/core/services/ApiService";
import { ElLoading } from 'element-plus'

export interface MessageData {
    messageId: string;
    messageText: string;
    messageType: string;
    createdBy: string;
    createdDate: string;
    changedBy: string;
    changeDate: string;
    languageCode: string;
    suggestedCountermeasure: string;
}

export const useMasterMessageStore = defineStore("master-message", {
    state: () => ({
        messageData: [] as MessageData[],

        modalVisible: false,

        messageDataForm: {
            messageId: '',
            messageText: '',
            messageType: '',
            createdBy: '',
            createdDate: '',
            changedBy: '',
            changeDate: '',
            languageCode: '',
            suggestedCountermeasure: '',
        },

        buttonAddAccess: false,
        isLoading: false,

        messageModal: {
            visible: false,
            title: '',
            type: '',
            submitBtn: false,
            cancelBtn: false,
            resetBtn: false,
            loading: false,
            formBtn: '',
        },

        dataTable: {
            draw: 1,
            start: 0,
            length: 10,
            search: '',
            recordsTotal: 0,
            loading: false,
            currentPage: 1,
        },

        filter: {
            dateRange: [],
            input: '',
            submitBtn: false,
        }
    }),

    actions: {
        async fetchData() {
            this.isLoading = true;
            this.dataTable.loading = true;
            try {
                const url = "MasterMessage/DataTable";
                const body = {
                    draw: this.dataTable.draw,
                    start: this.dataTable.start,
                    length: this.dataTable.length,
                    search: this.dataTable.search
                };

                const responseData = await API.postRequest(url, body);
                console.log('Response : ', responseData)

                if (responseData.data !== null) {
                    this.dataTable.recordsTotal = responseData.data.recordsTotal;
                    this.messageData = responseData.data.data;
                }
            } catch (error: any) {
                ElNotification({
                    title: 'Terjadi Kesalahan!',
                    message: `Gagal mengambil data Master Message dari API : ${error.message}`,
                    type: 'error',
                    duration: 6000,
                })
            } finally {
                this.isLoading = false;
                this.dataTable.loading = false;
            }
        },

        async setMessageDataNull() {
            this.messageDataForm.messageId = '';
            this.messageDataForm.messageText = '';
            this.messageDataForm.messageType = '';
            this.messageDataForm.createdBy = '';
            this.messageDataForm.createdDate = '';
            this.messageDataForm.changedBy = '';
            this.messageDataForm.changeDate = '';
            this.messageDataForm.languageCode = '';
            this.messageDataForm.suggestedCountermeasure = '';
        },

        async openModal(actions: string, id: string): Promise<void> {
            this.messageModal.type = actions;
            await this.setMessageDataNull();

            if (this.messageModal.type == 'addModal') {
                this.messageModal.title = 'Add Message';
                this.messageModal.formBtn = 'Submit';
                this.messageModal.visible = true;
            } else if (this.messageModal.type == 'editModal') {
                const loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });

                try {
                    const body = {
                        messageId: id,
                    }

                    const url = `MasterMessage/Detail`;

                    const responseData = await API.putRequest(url, body);

                    if (responseData.data !== null) {
                        this.messageModal.title = 'Edit Message';
                        this.messageModal.formBtn = 'Save';
                        this.messageDataForm = responseData.data;
                        this.messageModal.visible = true;
                    }
                } catch (error: any) {
                    ElNotification({
                        title: 'Error',
                        message: `Error : ${error}`,
                        type: 'error',
                    })
                } finally {
                    loading.close();
                }
            } else if (this.messageModal.type == 'viewModal') {
                const loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });

                try {
                    this.messageModal.title = 'View Message';

                    const body = {
                        messageId: id,
                    }

                    const url = `MasterMessage/Detail`;

                    const responseData = await API.putRequest(url, body);

                    if (responseData.data !== null) {
                        this.messageDataForm = responseData.data;
                        this.messageModal.visible = true;
                    }
                } catch (error: any) {
                    ElNotification({
                        title: 'Error',
                        message: `Error : ${error}`,
                        type: 'error',
                    })
                } finally {
                    loading.close();
                }
            }
        },

        formattedDate(date: string): Promise<string> {
            const dateNew = new Date(date);

            // Objek Intl.DateTimeFormat untuk lokal Indonesia
            const formatter = new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            });

            const formattedDate = formatter.format(dateNew);
            return Promise.resolve(formattedDate);
        },

        async clearFilterField() {
            this.filter.dateRange = [];
            this.filter.input = '';
            this.filter.submitBtn = false;
        },

        async actionsData(actions: string, id: Array<any>): Promise<void> {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });

            this.messageModal.submitBtn = true;
            this.messageModal.cancelBtn = true;
            this.messageModal.resetBtn = true;
            if (actions == 'add') {
                try {
                    const body = {
                        messageId: this.messageDataForm.messageId,
                        messageText: this.messageDataForm.messageText,
                        messageType: this.messageDataForm.messageType,
                        createdBy: "arka.aldi",
                        createdDate: new Date(),
                        changedBy: '',
                        changeDate: '',
                        languageCode: this.messageDataForm.languageCode,
                        suggestedCountermeasure: this.messageDataForm.suggestedCountermeasure,
                    }

                    const url = `MasterMessage/Add`;

                    const responseData = await API.postRequest(url, body);

                    if (responseData.data !== null) {
                        ElMessage({
                            message: 'Congrats, this is a success message.',
                            type: 'success',
                        })

                        this.messageModal.visible = false;
                    }
                } catch (error: any) {
                    ElNotification({
                        title: 'Error',
                        message: `Error : ${error}`,
                        type: 'error',
                    })
                } finally {
                    loading.close();
                    this.fetchData();
                }
            } else if (actions == 'update') {
                try {
                    const body = {
                        messageId: this.messageDataForm.messageId,
                        messageText: this.messageDataForm.messageText,
                        messageType: this.messageDataForm.messageType,
                        changedBy: 'arka.aldi',
                        changeDate: new Date(),
                        languageCode: this.messageDataForm.languageCode,
                        suggestedCountermeasure: this.messageDataForm.suggestedCountermeasure,
                    }

                    const url = `MasterMessage/Update`;

                    const responseData = await API.putRequest(url, body);

                    if (responseData.data !== null) {
                        ElMessage({
                            message: 'Data berhasil diubah.',
                            type: 'success',
                        })
                        this.messageModal.visible = false;
                    }
                } catch (error: any) {
                    ElNotification({
                        title: 'Error',
                        message: `Error : ${error}`,
                        type: 'error',
                    })
                } finally {
                    loading.close();
                    this.fetchData();
                }
            } else if (actions == 'delete') {
                let jsonString: any;

                const url = `MasterMessage/Delete`;
                if (id.length === 1) {
                    const newData = [{
                        "MessageId": `${id[0].messageId}`
                    }];
                    jsonString = JSON.stringify(newData);
                } else {
                    const messageObjects = id.map(obj => ({ MessageId: `${obj.messageId}` }));
                    jsonString = JSON.stringify(messageObjects);
                }
                try {
                    const responseData = await API.postRequest(url, JSON.stringify(jsonString));

                    if (responseData.data !== null) {
                        ElMessage({
                            message: 'Berhasil hapus.',
                            type: 'success',
                        })
                    }
                } catch (error: any) {
                    ElNotification({
                        title: 'Terjadi Kesalahan!',
                        message: `Gagal mengambil data Master Message dari API : ${error.message}`,
                        type: 'error',
                        duration: 6000,
                    })
                } finally {
                    loading.close();
                    this.fetchData();
                }
            }

            this.messageModal.submitBtn = false;
            this.messageModal.cancelBtn = false;
            this.messageModal.resetBtn = false;
        },
    }
});
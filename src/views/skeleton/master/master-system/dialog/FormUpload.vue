<template>
    <el-dialog
        v-model="systemStore.isModalUploadOpen"
        title='Import Data'
        :width="dialogWidth"
        style="margin-top: 10vh"
        :show-close="false"
    >

        <div class="mt-2">
            <!-- <el-upload
                class="upload-demo"
                accept=".xlsx"
                drag
                :auto-upload="false"
                :multiple="false"
                :limit=1            
            >
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                <div class="el-upload__tip">
                    xlsx files with a size less than 500kb
                </div>
                </template>
            </el-upload> -->
            <input 
                class="form-control my-4"
                type="file"
                accept=".xlsx, xlx"
                @change="onFileSelected"
            />
        </div>

        <!-- MODAL #FOOTER -->
        <div class="mx-1 d-flex justify-content-end gap-2 flex-wrap">
            <div class="btn-responsive">
                <el-button @click="systemStore.setModalUploadClose()" :disabled="systemStore.isLoading">Cancel</el-button>
            </div>
            <div class="btn-responsive">
                <el-button type="primary" @click="systemStore.onImportDocument()" :disabled="systemStore.isLoading">
                    {{ systemStore.isLoading ? 'Please wait...' : 'Save' }}                
                </el-button>
            </div>
        </div>

    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed } from 'vue';

    // start::handle modal size
    const { width } = useWindowSize();

    const dialogWidth = computed((): string => {
        if(width.value <= 574){
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '75%'
        } else {
            return '45%'
        }
    });
    // end::handle modal size

    const onFileSelected = (e: InputEvent | any): void => {
        const file = e.target.files[0];
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const binaryString = reader.result as string; // Representasi biner dalam bentuk string
        //         console.log(binaryString);
        //         systemStore.selectedFile = binaryString
        //     };
        //     reader.readAsText(file); // Membaca file sebagai representasi biner
        // }
        systemStore.selectedFile = file
        console.log(systemStore.selectedFile)
        console.log('file', file);     
    }

</script>

<style scoped>
    @media (max-width: 567px){
        .btn-responsive{
            width: 100%;
        }

    }
</style>
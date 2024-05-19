<template>
    <el-dialog
        v-model="VehicleInspectionStore.isModalQRactive"
        title='Scan BODY NO.'
        :width="dialogWidth"
        style="margin-top: 3vh; min-height: 92vh;"
        @close="handleClose"
        center
    >
        <div class="mx-10 container-modal">
        <VehicleInspectionQRCapture />
        <p class="text-warning mt-2">
            <i>
                <strong>*Notes : Focus the camera on the QR Code until it is processed.</strong>        
            </i>
        </p>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { systemStore } from '@/stores-skeleton';
    import { useWindowSize } from '@vueuse/core';
    import { computed, onMounted } from 'vue';
    import { VehicleInspectionStore } from '@/stores';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
    import masterPosStore from '@/stores/modules/master/master-pos/master-pos-store';
    import { ElPopover } from 'element-plus';
    import VehicleInspectionQRCapture from './VehicleInspectionQRCapture.vue'


    // start::handle modal size
    const { width } = useWindowSize();

    const handleClose = ():void => {
        console.log('CLOSE')
        VehicleInspectionStore.setModalQR(false);
    }

    const dialogWidth = computed((): string => {
        if(width.value <= 574){
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '90%'
        } else {    
            return '90%'
        }
    });
    // end::handle modal size

    onMounted(() => {
      // MasterPosStore.posDataExcel = dummy;
    })
</script>

<style scoped>
    @media (max-width: 567px){
        .btn-responsive{
            width: 100%;
        }
    }

    .el-overlay-dialog{
        pointer-events: none;
    }

    .el-dialog{
        pointer-events: auto;
    }

    .warning-row {
        background-color: #f56c6c !important;
        color: white;
    }

    .warning-row:hover > td {
        background-color: #f56c6c !important;
        color: white;
    }

    #status-field:hover{
      /* background-color: #f30f0f !important; */
        transition: 1s;
        cursor: pointer;
        margin: 0px !important;
    }

    /* MODAL */
    .item-detail{
        font-size: 16px;
        font-style: italic;
        font-weight: 600;
    }
</style>
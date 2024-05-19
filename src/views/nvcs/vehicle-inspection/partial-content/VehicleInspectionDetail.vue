<template>
    <el-dialog
        v-model="VehicleInspectionStore.isModalDetailActive"
        title='DETAIL INFORMATION   '
        :width="dialogWidth"
        style="margin-top: 3vh; min-height: 92vh;"
        center
    >
        <div class="mx-10 container-modal">
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        KEY
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Sequence
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Time
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Shift
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Date
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Body No
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Model Code
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        Suffix
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        MI Code
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <hr/>
                <div class="d-flex justify-content-center gap-4 item-detail">
                    <div style="min-width: 49%;" class="flex-grow-1">
                        VINNO
                    </div>
                    <div>:</div>
                    <div style="min-width: 49%;">1178</div>
                </div>
            </div>
            <div>
                <button>
                    
                </button>
            </div>
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
    // start::handle modal size
    const { width } = useWindowSize();

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
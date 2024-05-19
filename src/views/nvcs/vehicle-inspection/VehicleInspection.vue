<template>
    <div>
        <div class="header-inspection">
            <div class="header-navigation flex-grow-1">
                <button class="w-100 action">
                    < PREV
                </button>
            </div>
            <div class="header-navigation flex-grow-1">
                <button class="action" @click="VehicleInspectionStore.setModalDetail(true)">
                    BODY NO.
                </button>
            </div>
            <div class="header-navigation flex-grow-1"> 
                <input @keyup.enter="VehicleInspectionStore.handleInputBodyNo()" type="text" maxlength="5" class="info input px-2" placeholder="INPUT BODY NO. IN HERE" v-model="VehicleInspectionStore.bodyNo"/>
            </div>
            <div class="header-navigation">
                <button class="action" @click="VehicleInspectionStore.setModalQR(true)">
                    <i class="ki-solid ki-scan-barcode fs-1 text-white"></i>
                </button>
            </div>
            <div class="header-navigation flex-grow-1">
                <button class="action">    
                    LAST >>
                </button>
            </div>
            <div class="header-navigation flex-grow-1 tab-remove-fg">
                <select class="info" v-for="item in VehicleInspectionStore.defectInspector" v-if="VehicleInspectionStore.defectInspector.length">
                    <option>-</option>
                    <option>{{ item.INSPNM }}</option>
                </select>
                <select class="info" v-else>
                    <option>-</option>
                    </select>
            </div>
            <div class="header-navigation flex-grow-1 tab-remove-fg">
                <button class="info">
                    C - MPV
                </button>
            </div>
            <div class="header-navigation flex-grow-1 tab-remove-fg">
                <button class="info">
                    DOM
                </button>
            </div>
        </div>

        <div class="header-pagination mt-3">
            <div class="pagination-number">
                <div class="d-flex gap-1">
                    <template v-if="VehicleInspectionStore.totalVehicleList > 0">
                        <button 
                            @click="VehicleInspectionStore.setPage(i)" 
                            v-for="i in VehicleInspectionStore.totalVehicleList" 
                            class="pagination-btn" 
                            :class="isActive(i)"
                        >
                            {{ i }}
                        </button>
                    </template>
                    <template v-else>
                        <button class="pagination-btn">
                            -
                        </button>
                    </template>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2">
                <div v-for="item in VehicleInspectionStore.inspectionJob" :key="item.INSPJOB_ID">
                    <button class="action isActive engine-room-info">
                        {{ item.INSPJOB }}
                    </button>
                </div>
            </div>
        </div>

        <div class="body-inspection">
            <table class="w-100 mt-3">
                <thead>
                    <tr>
                        <th class="th-header"><div>NO</div></th>
                        <th class="th-header"><div>PART NAME</div></th>
                        <th class="th-header"><div>STANDART SPEC</div></th>
                        <th class="th-header"><div>DEFECT</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in VehicleInspectionStore.vehicleInspectionList" :key="item.PART_NAME">
                        <td class="th-data text-center" @click="VehicleInspectionStore.addindex(indexHelper(i), item)" :class="isIndex(indexHelper(i), item)">
                            <!-- <div>{{ formattedSeq(i) }}</div> -->
                        </td>
                        <td class="th-data" @click="VehicleInspectionStore.addindex(indexHelper(i) , item)" :class="isIndex(indexHelper(i), item)">
                            <div>
                                {{ item.PART_NAME }}
                            </div>
                        </td>
                        <td class="th-data " @click="VehicleInspectionStore.addindex(indexHelper(i) , item)" :class="isIndex(indexHelper(i), item)">
                            <div>
                                {{ item.LETTER_SPEC_CONTENT }}
                            </div>
                        </td>
                        <td class="th-data" :class="isIndex(i, item)" style="cursor: default !important;">
                            <div class='d-flex justify-content-center'>
                                <button 
                                    class='btn btn-defect' 
                                    :disabled="indexHelper(i) !== VehicleInspectionStore.indexClick" 
                                    @click="VehicleInspectionStore.setModalDefect(true, item, false, VehicleInspectionStore.pagination.pageStart > 1 ? (i + 10) : i)"
                                >
                                    <span class="ki-solid ki-plus fs-1 text-white"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="btn-footer" colspan=2>
                            <div style="cursor: pointer;" @click="VehicleInspectionStore.setPage(VehicleInspectionStore.pagination.pageStart === 1 ? VehicleInspectionStore.pagination.pageStart : VehicleInspectionStore.pagination.pageStart - 1)">
                                PREVIOUS PAGE
                            </div>
                        </td>
                        <td class="btn-footer">
                            <div style="cursor: pointer;" @click="VehicleInspectionStore.setPage(VehicleInspectionStore.pagination.pageStart === VehicleInspectionStore.totalPage ? VehicleInspectionStore.pagination.pageStart : VehicleInspectionStore.pagination.pageStart + 1)">
                                NEXT PAGE
                            </div>
                        </td>
                        <td class="btn-footer">
                            <div style="cursor: pointer;" @click="VehicleInspectionStore.submitStamp()">
                                STAMP
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <VehicleInspectionDefect />
    <VehicleInspectionDetail />
    <VehicleInspectionInputDefect />
    <template v-if="VehicleInspectionStore.isModalQRactive">
        <VehicleInspectionQrModal />
    </template>
</template>

<script setup lang="ts">
    import { MasterDefectStore, MasterSpecStore, VehicleInspectionStore } from '@/stores';
    import { onMounted, watch,ref } from 'vue';
    import VehicleInspectionDefect from './partial-content/VehicleInspectionDefect.vue';
    import VehicleInspectionDetail from './partial-content/VehicleInspectionDetail.vue';
    import VehicleInspectionInputDefect from './partial-content/VehicleInspectionInputDefect.vue';
    import type { specDataResponse } from '@/stores/modules/master/master-data-spec/master-data-spec-types';
    import { QrStream, QrCapture, QrDropzone } from 'vue3-qr-reader';
    // import VehicleInspectionQrCapture from './partial-content/VehicleInspectionQrCapture.vue';
    import VehicleInspectionQrModal from './partial-content/VehicleInspectionQRModal.vue';
    import { useRoute } from 'vue-router';
    import ApiService from '@/core/services/ApiService';
    import type { vehicleInspectionList } from '@/stores/modules/master/vehicle-insppection/vehicle-inspection-type';

    const route = useRoute();

    const indexHelper = (indexOnScreen:number):number => {
        const indexStore = VehicleInspectionStore.pagination.pageStart;
        if(indexStore > 1){
            return (indexOnScreen + (10 * (indexStore - 1)));
        } 
        return indexOnScreen;
    }

    const formattedSeq = (i: number): string => {
        const seqNumber = (MasterSpecStore.paginationTable.start - 1) * 10 + (i + 1);
        return `${seqNumber}`;
    }

    const isIndex = (i: number, item:vehicleInspectionList):string => {
        const isChecked = VehicleInspectionStore.accommodatedItem.some(accommodatedItem => accommodatedItem.PART_NAME === item.PART_NAME);
        
        let commonArray = VehicleInspectionStore.accommodatedItem.filter(coreItem =>
            VehicleInspectionStore.isListDefect.some(tempItem => tempItem.PART_NAME === coreItem.PART_NAME)
        );

        if (commonArray.length && commonArray.some(coreItem => coreItem.PART_NAME === item.PART_NAME)) {
            return 'isDefect';
        } else if(isChecked){
            return 'already-clicked';
        } else if((VehicleInspectionStore.indexClick) === i){
            return 'ready-on-click';
        }
        return '';
    }

    const isActive = (i:number):string => {
        if(i === VehicleInspectionStore.pagination.pageStart){
            return 'isActive';
        } else if(i < VehicleInspectionStore.pagination.pageStart && (i * 10) <= VehicleInspectionStore.accommodatedItem.length ){
            return 'isDone';
        }
        return '';
    }

    const getInitInspector = async() => {
        const posCode:string = route.params.pos as string
        const shiftParam:string = route.params.shift as string

        const shiftFormatted:string = shiftParam.charAt(0).toUpperCase() + shiftParam.slice(1).toLowerCase();

        const pagination = {
            draw: 0,
            start : 0,
            length: 100,
            search: {
                SHIFTGRPNM: shiftFormatted,
                INSPNM: '',
                POS_CD: posCode,
                INSPJOB: '',
                INSPSUBJOB: ''
            },
        };

        const res = await ApiService.post('/MasterInspector/DataTable', pagination);
        VehicleInspectionStore.defectInspector = await res.data.data;
    }

    onMounted(async() => {
        await MasterSpecStore.getDataSpec();
        await VehicleInspectionStore.setTotalPage();

        const posCode:string = route.params.pos as string
        VehicleInspectionStore.posURL = posCode;

        const pagination = {
            draw: 0,
            start : 0,
            length: 10,
            search: {
                POS_CD: posCode,
                INSPJO: '',
                INSPSUBJOB: ''
            },           
        };

        const res = await ApiService.post('/MasterInspectionJob/DataTable',pagination);
        VehicleInspectionStore.inspectionJob = await res.data.data;

        getInitInspector();
    })
</script>

<style>
    /* 
        AT HEADER SCREEN:START
        all classes on the header, logic or style    
    */
    .header-inspection{
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
    }
    .header-navigation{
        min-width: 100px;
    }
    .header-pagination{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 5px 0 5px;
    }
    .body-inspection{
    }
    .isActive{
        background-color: #27AE60 !important;
    }
    .action{ /* BUTTON AT HEADER */
        background-color: #5D5D5D;
        font-size: 16px;
        color: white;
        width: 100%;
        border-width: 1px;
        height: 44px;
        text-wrap: nowrap;
        font-weight: 600;
    }
    .pagination-btn{
        font-size: 20px;
        font-weight: 800;
        width: 44px !important;
        height: 44px;
        background-color: #C4C4C4;
        color: white;
    }
    .engine-room-info{
        max-width: 150%;
        font-size: 20px;
        font-weight: 600;
    }
    .info{
        background-color: #FFFFFF;
        font-size: 16px;
        color: black;
        width: 100%;
        border-width: 1px;   
        height: 44px; 
    }
    .input:focus {
        outline: none;
        box-shadow: none;
    }
    .isDone{
        background-color: #FF0000 !important;
    }
    /* AT HEADER SCREEN:END */


    /* 
        AT BODY / TABLE  
        all classes on the body, logic or style
    */
    td.isDefect{
        background-color: #FF0000 !important;
    } 
    .table{
        margin-top: 50px;
    }
    .table-header{
        background-color: #5D5D5D;
        color: white;
        height: 30px;
        text-align: center;
        font-weight: 800;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .th-header{
        background-color: #C5C5C5 !important;
        border-color: black !important;
        border-width: 1px !important;
        height: 52px
    }
    .th-header > div {
        font-weight: 800;
        font-size: 16px;
        text-align: center;
    }
    .th-data{
        background-color: #FFFFFF !important;
        border-color: black !important;
        border-width: 1px !important;
        height: 52px
    }
    .th-data > div {
        font-weight: 800;
        font-size: 16px;
        padding: 0 0 0 3px;
    }
    .th-data > tr {
        border-bottom: 1px solid black !important;
    }
    .th-data > div {
        font-weight: 800;
        font-size: 16px;
        padding: 0 0 0 3px;
    }
    .ready-on-click:hover{
        cursor: pointer;
    }
    td.already-clicked{
        background-color: #8AFF61 !important;
    }
    .ready-to-reduce{
        cursor: pointer;
    }
    .btn-defect{
        background-color: #5D5D5D;
        width: 80%;
        margin: 7px 0 7px 0;
    }
    .btn-defect:hover{
        background-color: #343434 !important;
    }
    .btn-defect:disabled{
        background-color: #000000 !important;
    }
    /* AT BODY SCREEN:END */


    /* 
        AT FOOTER / TABLE  
        all classes on the body, logic or style
    */
    .btn-footer{
        background-color: #5D5D5D !important;
        color: #FFFFFF;
        border-color: black !important;
        border-width: 1px !important;
        height: 52px
    }
    .btn-footer > div {
        font-weight: 800;
        font-size: 16px;
        text-align: center;
    }
    /* AT FOOTER SCREEN:END */

    @media (max-width: 812px) {
        .tab-remove-fg{
            flex-grow: 0 !important;
        }
    }
</style>
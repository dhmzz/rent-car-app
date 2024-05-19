<template>
    <div>
        <div class="card">
            <div class="card-body">
                <el-table style="width: 100%" :data="CarStore.carsResponseList">
                    <el-table-column prop="brand" label="Brand" width="180" />
                    <el-table-column prop="model" label="Model" width="180" />
                    <el-table-column prop="plate_number" label="Number" />
                    <el-table-column prop="rental_rate_per_day" label="Rent ($) per day " />
                    <el-table-column prop="available" label="Available" align="center">
                        <template #default="{ row }">
                            <div v-if="row.available === 1">
                                <h5 class="text-primary">Available</h5>
                            </div>
                            <div v-else>
                                <h5  class="text-danger">Not Available</h5>
                            </div>
                        </template>
                    </el-table-column>  
                </el-table>
                <div class="mt-5 d-flex justify-content-end">
                    <el-pagination background layout="sizes, jumper, prev, pager, next" :page-sizes="[1, 5, 10, 50, 100]" @size-change="handleChangeSize" @current-change="handleChange" :total="CarStore.dataResponseCount" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ApiService from '@/core/services/ApiService';
    import { CarStore } from '@/stores/module-rent-car';
    import { onMounted } from 'vue';

    const handleChangeSize = async(val:number) => {
        CarStore.pageSizeParam = val;
        await CarStore.getCars();
    }

    const handleChange = async(val:number) => {
        CarStore.pageStartParam = val;
        await CarStore.getCars();
    }

    onMounted(async() => {
        await CarStore.getCars();
    })
</script>   
<template>
    <div>
        <div class="card mb-5">
            <div class="card-body">
                <div class="row w-100">
                    <div class="col-sm-6 col-12">
                        <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                            <label style="min-width: 30%;">
                                <span class="text-nowrap me-5">Brand</span>
                            </label>
                            <div class="flex-grow-1">
                                <el-input placeholder="Toyota" v-model="CarStore.brandParam"/>
                            </div>
                        </div>
                    </div>
                
                    <div class="col-sm-6 col-12">
                        <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                            <label style="min-width: 30%;">
                                <span class="text-nowrap me-5">Model</span>
                            </label>
                            <div class="flex-grow-1">
                                <el-input placeholder="Avanza Racing" v-model="CarStore.modelParam"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100">
                    <div class="col-sm-6 col-12">
                        <div class="d-flex align-items-center flex-grow-1 mb-5 mobile-remove-flex"> 
                            <label style="min-width: 30%;">
                                <span class="text-nowrap me-5">Plat Number</span>
                            </label>
                            <div class="flex-grow-1">
                                <el-input placeholder="D123AN" v-model="CarStore.plateNumParam" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between gap-3">
                    <div>
                        <button class="btn btn-sm btn-primary me-2" @click="CarStore.handleSearch()">
                            Add
                        </button>
                        <button class="btn btn-sm btn-success me-2" @click="CarStore.handleClear()"> 
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger" @click="CarStore.handleClear()"> 
                            Delete
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-success me-2" @click="CarStore.handleSearch()">
                            Search
                        </button>
                        <button class="btn btn-sm btn-secondary" @click="CarStore.handleClear()"> 
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { CarStore } from '@/stores/module-rent-car';
</script>
<template>
    <div class="card">
        <div class="card-header border-0 pt-5">
          <div class="d-flex justify-content-between w-100 flex-wrap gap-3 action_menu">
            <div class="d-flex align-items-center flex-grow-1 action_menu mb-mobile-2"> 
                <label>
                  <span class="text-nowrap me-5">System Type</span>
                </label>
                <div class="flex-grow-1">
                  <el-select filterable v-model="systemStore.systemFilter.systemType" @change="onChangeType" class="select-w-100">
                    <el-option label="All" value=""/>
                    <el-option 
                      v-for="(item) in systemStore.systemTypeCombobox"
                      :label="item.TYPE" 
                      :value="item.TYPE"
                    />                  
                  </el-select>
                </div>
            </div>

            <div class="d-flex align-items-center flex-grow-1 action_menu"> 
                <label>
                  <span class="text-nowrap me-5">System Code</span>
                </label>
                <div class="flex-grow-1">
                  <el-select filterable v-model="systemStore.systemFilter.systemCode">
                    <el-option label="All" value=""/>
                    <el-option 
                      v-for="(item) in systemStore.systemCodeCombobox"
                      :label="item.CODE" 
                      :value="item.CODE"
                    />
                  </el-select>
                </div>
            </div>
          </div>
        </div>
        <div class="card-body mt-3 mx-2">
          <div class="d-flex justify-content-between flex-wrap action_menu">
            <div class="d-flex gap-2 action_menu mb-2">
              <button 
                class="btn btn-light-primary text-nowrap" 
                
                @click="systemStore.setModalOpen('Add')"
              >
                <KTIcon icon-name="plus" icon-class="fs-3" />
                Add
              </button>
              <button class="btn btn-light-success text-nowrap" @click="systemStore.setModalOpen('Edit')" :disabled="systemStore.selectedData?.length != 1">
                <KTIcon icon-name="pencil" icon-class="fs-3"/>
                Edit
              </button>
              <button class="btn btn-light-danger text-nowrap" @click="systemStore.onDelete()" :disabled="systemStore.selectedData?.length < 1">
                <KTIcon icon-name="trash" icon-class="fs-3"/>
                Delete
              </button>
              <button class="btn btn-light-info text-nowrap" @click="onUpload">
                <KTIcon icon-name="folder-down" icon-class="fs-3"/>
                Import
              </button>
            </div>

            <div class="d-flex gap-2 action_menu mb-2">
              <button class="btn btn-light-success text-nowrap" @click="onSearch">
                Search
              </button>
              <button class="btn btn-light-secondary text-nowrap" @click="onClear">
                Clear
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import axios from 'axios'
  import { ref } from "vue";
  import { systemStore } from '@/stores-skeleton/'

  const onChangeType = async() => {
    systemStore.systemFilter.systemCode = ''
    await systemStore.fetchOptionCombobox()
    const filteredCode = systemStore.systemCodeCombobox.filter((item, i) => systemStore.systemCodeCombobox[i].TYPE == systemStore.systemFilter.systemType);
    systemStore.systemCodeCombobox = filteredCode
  }

  const onSearch = async() => {
    if(systemStore.systemFilter.systemCode != ''){
      systemStore.systemFilter.search = systemStore.systemFilter.systemCode
    } else {
      systemStore.systemFilter.search = systemStore.systemFilter.systemType
    }
    await systemStore.fetchDataSystem()
  }

  const onClear = async() => {
    systemStore.systemFilter.systemCode = ''
    systemStore.systemFilter.systemType = ''
    systemStore.systemFilter.search = ''

    await systemStore.fetchDataSystem()
    await systemStore.fetchOptionCombobox()
  }

  const onUpload = ():void => {
    systemStore.isModalUploadOpen = true
  }

  onMounted(async() => {
    await systemStore.fetchOptionCombobox()
  })
</script>

<style>
@media (max-width: 567px) {
  .action_menu{
    /* width: 100% !important; */
    display: block !important;
    margin-bottom: 0px !important;
  }

  .mb-mobile-2{
    margin-bottom: 15px !important;
  }

  button{
    width: 100%;
    margin-top: 5px;
  }

  .select-w-100{
    width: 100%;
  }
}
</style>
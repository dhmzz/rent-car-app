<template>
    <div class="card mt-5">
        <div class="card-body mx-2" >
          <div class="mb-1 text-muted">
            <!-- INFO TABLE -->
            {{ infoTable(companyStore.paginationTable.start, companyStore.paginationTable.length, companyStore.totalList) }}
            <!-- <span class="text-muted fw-bold fs-8">{{ infoTable(systemStore.paginationTable.start, systemStore.paginationTable.length, systemStore.totalSystemList) }}</span> -->
          </div>
          <div>
            <el-table :data="companyStore.companyList" 
              style="width: 100%;" size='large' empty-text="No available data." table-layout="fixed" v-loading="companyStore.isLoadingTable"
              border hover  header-row-cell-name="el-table-custom" 
              :default-sort="{ prop: 'systemType', order: 'ascending' }"	
            >
              <el-table-column type="selection" width="50" align='center'/>
              <el-table-column header-align="center" prop="companyId" label="Company ID" width="150"/>
              <el-table-column header-align="center" prop="companyName" label="Company Name" width="400" />
              <el-table-column header-align="center" prop="companyDescription" label="Company Desc" width="200" />
              <el-table-column header-align="center" prop="createdBy" label="Created By" width="200"/>
              <el-table-column header-align="center" prop="createdDate" label="Created Date" width="150" align='center'>
                <template #default="data">
                  <div>
                    {{ data.row.createdDate ? formatDate(data.row.createdDate) : '' }}
                  </div>
                </template>  
              </el-table-column>
              <el-table-column header-align="center" prop="changedBy" label="Changed By" width="200"/>
              <el-table-column header-align="center" prop="changedDate" label="Changed Date" width="150" align='center'>
                <template #default="data">
                  <div>
                    {{ data.row.changedDate ? formatDate(data.row.changedDate) : '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="changedBy" label="Changed By" width="150" />
            </el-table>
          </div>

          <div class="d-flex justify-content-end mt-3 pagination w-100">
            <el-pagination
              v-model:current-page="companyStore.paginationTable.start"
              v-model:page-size="companyStore.paginationTable.length"
              :page-sizes="[5, 10, 50, 100]"
              background="background"
              layout="sizes, prev, pager, next, jumper"
              :total="companyStore.totalList"
              @current-change="handlePageChange"
              @size-change="hangleRowPerPageChange"
              small
            />
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { ref } from "vue";
  // import { systemStore } from '@/stores-skeleton/';
  import { companyStore } from '@/stores-skeleton/';

  const header = ref([
    { columnName: "System Type", columnLabel: "system_type", columnWidth: 150},
    { columnName: "System Code", columnLabel: "system_cd", columnWidth: 150},
    { columnName: "System Value (Text)", columnLabel: "system_val", columnWidth: 200},
    { columnName: "System Value (Number)", columnLabel: "system_valNum", columnWidth: 200},
    { columnName: "Remarks", columnLabel: "remarks", columnWidth: 200},
    { columnName: "Created Date", columnLabel: "created_dt", columnWidth: 150},
    { columnName: "Created By", columnLabel: "created_by", columnWidth: 150},
    { columnName: "Changed Date", columnLabel: "changed_dt", columnWidth: 150},
    { columnName: "Changed By", columnLabel: "changed_by", columnWidth: 150},
  ]);

  const currentPage = ref(1);
  const totalCount = ref(companyStore.totalList)

  const infoTable = (start:number, length:number, total:number):string => {
    const from = start > 1 ? (start - 1) * length + 1 : start
    const to = from + length - 1
    return `Show ${from} - ${Math.min(to, total)} of ${total}`
  }

  const formatDate = (inputDate: any):string => {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}-${formattedMonth}-${year}`;
}

  const handlePageChange = (page: number) => {
    companyStore.paginationTable.start = page
    companyStore.fetchData();
  };

  const hangleRowPerPageChange = (newPageSize: number) => {
    companyStore.paginationTable.length = newPageSize
    companyStore.fetchData();
  }

  onMounted( async() => {
    await companyStore.fetchData();

    // const config = {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // };

    // const url = process.env.VITE_APP_BE_URL + '/MasterCompany'
    // const res = await axios.get(url, config)

    // console.log('RES', await res)

  })
</script>

<style>
  .el-overlay-dialog{
    pointer-events: none;
  }

  .el-dialog{
    pointer-events: auto;
  }

  .el-table-custom{
    background-color: black !important;
  }

  th{
    background-color: #F9F9F9 !important; 
    /* font-weight: 900 !important; */
    height: 50px;
    text-wrap: nowrap;
  }
</style>

<style scoped>
  @media (max-width: 567px) {
  .pagination{
    overflow-y: auto;
    display: block !important;
    padding: 5px 0 5px 0;
  }
}
</style>
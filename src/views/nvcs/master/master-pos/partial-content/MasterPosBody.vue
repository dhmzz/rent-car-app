<template>
    <div class="card mt-5">
      <el-form 
        @submit.prevent=""
        label-position="top"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="MasterPosStore.posDataSingle"
        :rules="rules"
      >
        <div class="card-body mx-2" >
          <div>
              <el-table ref="refTable" :data="MasterPosStore.posDataList" class="text-dark"
                style="width: 100%;" size='small' empty-text="No available data." table-layout="fixed"
                border header-row-cell-name="el-table-custom" :default-sort="{ prop: 'systemType', order: 'ascending' }" 
                @selection-change="MasterPosStore.handleELSelect" v-loading="MasterPosStore.isFetchLoading" :row-class-name="tableRowClassName"
              >
                <el-table-column type="selection" width="50" align='center' id="selectionCheck"/>
                <el-table-column header-align="center" prop="POS_NAME" label="POS Name" width="200">
                  <template #default="{ row }">
                    <div v-if="row.POS_NM === '#ADD:MODE'">
                      <el-form-item required prop="POS_NM" class="mb-0">
                        <el-input 
                          id="POS_NM"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.POS_NM"
                          placeholder="Name"
                          style="color: red !important;"
                          :change="refreshPosCode()"
                        />
                      </el-form-item>
                    </div>
                    <!-- SEMENTARA PAKAI NM, NANTI PAKAI ID -->
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="POS_NM" class="mb-0">
                        <el-input 
                          id="POS_NM"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.POS_NM"
                          placeholder="Name"
                          :change="refreshPosCode()"
                        />
                      </el-form-item>
                    </div>
                    <!-- END -->
                    <div v-else id="POS_NM_TARGET" tabindex="0">
                      {{ row.POS_NM }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="POS_CODE" label="POS Code" width="150">
                  <template #default="{ row }">
                    <div v-if="row.POS_CD === '#ADD:MODE'">
                      <el-form-item required prop="POS_CD" class="mb-0">
                        <el-select id="POS_CD" filterable placeholder="POS Code"  v-model="MasterPosStore.posDataSingle.POS_CD">
                          <el-option :label='handleLabel("L")' :value='handleLabel("L")' />
                          <el-option :label='handleLabel("R")' :value='handleLabel("R")' />
                          <el-option :label='handleLabel("A")' :value='handleLabel("A")' />
                          <el-option :label='handleLabel("U")' :value='handleLabel("U")' />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="POS_CD" class="mb-0">
                        <el-select id="POS_CD" filterable placeholder="POS Code"  v-model="MasterPosStore.posDataSingle.POS_CD">
                          <el-option :label='handleLabel("L")' :value='handleLabel("L")' />
                          <el-option :label='handleLabel("R")' :value='handleLabel("R")' />
                          <el-option :label='handleLabel("A")' :value='handleLabel("A")' />
                          <el-option :label='handleLabel("U")' :value='handleLabel("U")' />
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.POS_CD }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="POS" label="POS" width="80" align="center">
                  <template #default="{ row }">
                    <div v-if="row.POS_SEQ === '#ADD:MODE'">
                      <el-form-item required prop="POS_SEQ" class="mb-0">
                        <el-input 
                          id="POS_SEQ"
                          type="text"
                          class="my-1"
                          maxlength="5"
                          v-model="MasterPosStore.posDataSingle.POS_SEQ"
                          placeholder="POS"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="POS_SEQ" class="mb-0">
                        <el-input 
                          id="POS_SEQ"
                          type="text"
                          maxlength="5"
                          v-model="MasterPosStore.posDataSingle.POS_SEQ"
                          placeholder="POS"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.POS_SEQ }}
                    </div>
                  </template>  
                </el-table-column>
                <!-- TEMPP CASE -->
                <el-table-column header-align="center" prop="LINE_NAME" label="Line Name" width="200">
                  <template #default="{ row }">
                    <div v-if="row.LINE_NM === '#ADD:MODE'">
                      <el-form-item required prop="POS_SEQ" class="mb-0">
                        <el-input 
                          id="LINE_NAME"
                          type="text"
                          class="my-1"
                          maxlength="50"
                          v-model="MasterPosStore.posDataSingle.POS_SEQ"
                          placeholder="Line"
                          disabled
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="POS_SEQ" class="mb-0">
                        <el-input 
                          id="LINE_NM"
                          type="text"
                          maxlength="50"
                          v-model="MasterPosStore.posDataSingle.POS_SEQ"
                          placeholder="Code"
                          style="color: red !important;"
                          disabled
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.LINE_NM }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="LINE_SEQ" label="Line SEQ" width="150" align="right">
                  <template #default="{ row }">
                    <div v-if="row.LINE_SEQ === '#ADD:MODE'">
                      <el-form-item required prop="LINE_SEQ" class="mb-0">
                        <el-input 
                          id="LINE_SEQ"
                          type="text"
                          class="my-1"
                          maxlength="5"
                          v-model="MasterPosStore.posDataSingle.LINE_SEQ"
                          placeholder="Line SEQ"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="LINE_SEQ" class="mb-0">
                        <el-input 
                          id="LINE_SEQ"
                          type="text"
                          maxlength="5"
                          v-model="MasterPosStore.posDataSingle.LINE_SEQ"
                          placeholder="Line SEQ"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.LINE_SEQ }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PrevPosName1" label="Prev POS Name 1" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME1 === '#ADD:MODE'">
                      <el-form-item required prop="PREV_POS_NAME1" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME1"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME1"
                          placeholder="Prev POS 1"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="PREV_POS_NAME1" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME1"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME1"
                          placeholder="Prev Pos 1"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME1 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME2" label="Prev POS Name 2" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME2 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME2" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME2"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME2"
                          placeholder="Prev POS 2"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME2" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME2"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME2"
                          placeholder="Prev Pos 2"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME2 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME3" label="Prev POS Name 3" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME3 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME3" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME3"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME3"
                          placeholder="Prev POS 3"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME3" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME3"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME3"
                          placeholder="Prev Pos 3"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME3 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME4" label="Prev POS Name 4" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME4 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME4" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME4"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME4"
                          placeholder="Prev POS 4"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME4" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME4"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME4"
                          placeholder="Prev Pos 4"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME4 }}
                    </div>
                  </template>
                </el-table-column>>
                <el-table-column header-align="center" prop="PREV_POS_NAME5" label="Prev POS Name 5" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME5 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME5" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME5"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME5"
                          placeholder="Prev POS 5"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME5" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME5"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME5"
                          placeholder="Prev Pos 5"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME5 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME6" label="Prev POS Name 6" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME6 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME6" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME6"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME6"
                          placeholder="Prev POS 6"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME6" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME6"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME6"
                          placeholder="Prev Pos 6"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME6 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME7" label="Prev POS Name 7" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME7 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME7" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME7"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME7"
                          placeholder="Prev POS 7"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME7" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME7"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME7"
                          placeholder="Prev Pos 7"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME7 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME8" label="Prev POS Name 8" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME8 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME8" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME8"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME8"
                          placeholder="Prev POS 8"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME8" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME8"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME8"
                          placeholder="Prev Pos 8"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME8 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME9" label="Prev POS Name 9" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME9 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME9" class="mb-0">
                        <el-input
                          id="PREV_POS_NAME9" 
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME9"
                          placeholder="Prev POS 9"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME9" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME9"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME9"
                          placeholder="Prev Pos 9"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME9 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="PREV_POS_NAME10" label="Prev POS Name 10" width="200">
                  <template #default="{ row }">
                    <div v-if="row.PREV_POS_NAME10 === '#ADD:MODE'">
                      <el-form-item prop="PREV_POS_NAME10" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME10"
                          type="text"
                          class="my-1"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME10"
                          placeholder="Prev POS 10"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item prop="PREV_POS_NAME10" class="mb-0">
                        <el-input 
                          id="PREV_POS_NAME10"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.PREV_POS_NAME10"
                          placeholder="Prev Pos 10"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.PREV_POS_NAME10 }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="LSTARTFLG" label="Start Flag" width="150">
                  <template #default="{ row }">
                    <div v-if="row.LSTARTFLG === '#ADD:MODE'">
                      <el-form-item prop="LSTARTFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          class="mx-50"  
                          style="margin-left: 50% !important;"
                          v-model="MasterPosStore.posDataSingle.LSTARTFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="LSTARTFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          class="mx-50"  
                          style="margin-left: 50% !important;"
                          v-model="MasterPosStore.posDataSingle.LSTARTFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      <div v-if="row.LSTARTFLG === 'T'" class="text-center">
                        <i class="ki-solid ki-check text-primary fs-3"></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="INPBODYFLG" label="Input Body Flag" width="150">
                  <template #default="{ row }">
                    <div v-if="row.INPBODYFLG === '#ADD:MODE'">
                      <el-form-item prop="INPBODYFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          size="large"
                          style="margin-left: 50% !important;"  
                          v-model="MasterPosStore.posDataSingle.INPBODYFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="INPBODYFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          size="large"
                          style="margin-left: 50% !important;"  
                          v-model="MasterPosStore.posDataSingle.INPBODYFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      <div v-if="row.INPBODYFLG === 'T'" class="text-center">
                        <i class="ki-solid ki-check text-primary fs-3"></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="MANDATORYFLG" label="Mandatory Flag" width="150">
                  <template #default="{ row }">
                    <div v-if="row.MANDATORYFLG === '#ADD:MODE'">
                      <el-form-item prop="MANDATORYFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          size="large"
                          style="margin-left: 50% !important;"
                          v-model="MasterPosStore.posDataSingle.MANDATORYFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="MANDATORYFLG" class="mb-0">
                        <el-checkbox  
                          label="" 
                          size="large"
                          style="margin-left: 50% !important;"  
                          v-model="MasterPosStore.posDataSingle.MANDATORYFLG"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      <div v-if="row.MANDATORYFLG === 'T'" class="text-center">
                        <i class="ki-solid ki-check text-primary fs-3"></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="T_TYPE" label="T Type" width="150">
                  <template #default="{ row }">
                    <div v-if="row.T_TYPE === '#ADD:MODE'">
                      <el-form-item required prop="T_TYPE" class="mb-0">
                        <el-input 
                          id="T_TYPE"
                          type="text"
                          class="my-1"
                          maxlength="5"
                          v-model="MasterPosStore.posDataSingle.T_TYPE"
                          placeholder="T Type"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="T_TYPE" class="mb-0">
                        <el-input 
                          id="T_TYPE"
                          type="text"
                          maxlength="20"
                          v-model="MasterPosStore.posDataSingle.T_TYPE"
                          placeholder="T Type"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.T_TYPE }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CSOK" label="CSOK" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CSOK === '#ADD:MODE'">
                      <el-form-item required prop="CSOK" class="mb-0">
                        <el-input 
                          id="CSOK"
                          type="text"
                          class="my-1"
                          maxlength="1"
                          v-model="MasterPosStore.posDataSingle.CSOK"
                          placeholder="CSOK"
                        />
                      </el-form-item>
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="CSOK" class="mb-0">
                        <el-input 
                          id="CSOK"
                          type="text"
                          class="my-1"
                          maxlength="1"
                          v-model="MasterPosStore.posDataSingle.CSOK"
                          placeholder="CSOK"
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.CSOK }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CREATED_DT" label="Created At" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CREATED_DT === '#ADD:MODE'">
                      <el-date-picker 
                          v-model="MasterPosStore.posDataSingle.CREATED_DT"  
                          format="YYYY-MM-DD"
                          value="YYYY-MM-DD"
                          type="date"
                          class="w-100"
                          disabled
                      />
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="CSOK" class="mb-0">
                        <el-date-picker 
                          v-model="MasterPosStore.posDataSingle.CREATED_DT"  
                          format="YYYY-MM-DD"
                          value="YYYY-MM-DD"
                          type="date"
                          class="w-100"
                          disabled
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.CREATED_DT != null ? formattedDate(row.CREATED_DT) : '' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CREATED_BY" label="Created By" width="150" align="left">
                  <template #default="{ row }">
                    <div v-if="row.CREATED_BY === '#ADD:MODE'">
                      <el-input 
                        v-model="MasterPosStore.posDataSingle.CREATED_BY"  
                        type="text"
                        disabled
                      />
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-input 
                        v-model="MasterPosStore.posDataSingle.CREATED_BY"  
                        type="text"
                        disabled
                      />
                    </div>
                    <div v-else>
                      {{ row.CREATED_BY }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CHANGED_DT" label="Changed At" width="150" align="center">
                  <template #default="{ row }">
                    <div v-if="row.CHANGED_DT === '#ADD:MODE'">
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-form-item required prop="CHANGED_DT" class="mb-0">
                        <el-date-picker 
                          v-model="MasterPosStore.posDataSingle.CHANGED_DT"  
                          format="YYYY-MM-DD"
                          value="YYYY-MM-DD"
                          type="date"
                          class="w-100"
                          disabled
                        />
                      </el-form-item>
                    </div>
                    <div v-else>
                      {{ row.CHANGED_DT != null ? formattedDate(row.CHANGED_DT) : '' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" prop="CHANGED_BY" label="Changed By" width="150" align="left">
                  <template #default="{ row }">
                    <div v-if="row.CHANGED_BY === '#ADD:MODE'">
                    </div>
                    <div v-else-if="MasterPosStore.isEditMode && row.POS_ID == MasterPosStore.posDataSingle.POS_ID">
                      <el-input 
                        v-model="MasterPosStore.posDataSingle.CREATED_BY"  
                        type="text"
                        disabled
                      />
                    </div>
                    <div v-else>
                      {{ row.CHANGED_BY }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
          </div>

          <div class="d-flex justify-content-center mt-3 pagination w-100 align-items-center">
            <div class="text-muted flex-grow-1 info-table">
              {{ infoTable(MasterPosStore.paginationTable.start, MasterPosStore.paginationTable.length, MasterPosStore.posDataCount) }}
            </div>
            <div>
                <el-pagination
                  :page-sizes="[1, 5, 10, 50, 100]"
                  background="background"
                  layout="sizes, prev, pager, next, jumper"
                  :total=MasterPosStore.posDataCount
                  :disabled="MasterPosStore.isAddMode || MasterPosStore.isEditMode"
                  @current-change="handlePageChange"
                  @size-change="hangleRowPerPageChange"
                  small
                />
            </div>
          </div>
          <div class="mt-7">
              <button class="btn btn-sm btn-primary text-nowrap me-3 .min-w-btn" @click="MasterPosStore.setAddMode(true)" v-if="!MasterPosStore.isAddMode && !MasterPosStore.isEditMode">
                Add Row
              </button>
              <el-button type="primary" class="text-nowrap me-1 .min-w-btn" @click="submitSave(ruleFormRef)" v-if="MasterPosStore.isAddMode || MasterPosStore.isEditMode" :disabled="MasterPosStore.isSaveLoading">
                {{ MasterPosStore.isSaveLoading ? 'Please wait...' : 'Save' }}
              </el-button>
              <button class="btn btn-secondary btn-sm text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterPosStore.isAddMode" :disabled="MasterPosStore.isSaveLoading"> 
                Cancel
              </button>
              <button class="btn btn-secondary btn-sm text-nowrap me-3 .min-w-btn" @click="setModeNormal()" v-if="MasterPosStore.isEditMode" :disabled="MasterPosStore.isSaveLoading">
                Cancel
              </button>
          </div>
        </div>
      </el-form>
    </div>
</template>

<script setup lang="ts">
    import { MasterPosStore, OptionStore } from '@/stores';
    import { ref, reactive, watch, onMounted } from 'vue';
    import { ElMessage, ElMessageBox, type Action, type FormInstance, type FormRules } from 'element-plus'
    import { refPosTable } from '@/stores/modules/master/master-pos/master-pos-store';
    import type { PosDataResponse } from '@/stores/modules/master/master-pos/master-pos-types';
import MasterPos from '../MasterPos.vue';

    const refTable = refPosTable;

    interface RuleForm {
      POS_NAME : string,
      POS_CODE: string,
      POS: string,
      LINE_NAME: string,
      LINE_SEQ: string,
      PREV_POS_NAME1: string,
      PREV_POS_NAME2: string,
      PREV_POS_NAME3: string,
      PREV_POS_NAME4: string,
      PREV_POS_NAME5: string,
      PREV_POS_NAME6: string,
      PREV_POS_NAME7: string,
      PREV_POS_NAME8: string,
      PREV_POS_NAME9: string,
      PREV_POS_NAME10: string,
      LSTARTFLG: string,
      INPBODYFLG: string,
      MANDATORYFLG: string,
      T_TYPE: string,
      CSOK: string,
      CREATE_DT: string,
      CREATE_BY: string,
      CHANGED_DT: string,
      CHANGED_BY: string
    }

    const ruleFormRef = ref<FormInstance>();

    const rules = reactive<FormRules<RuleForm>>({
        POS_NAME: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
        POS_CODE: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
        POS: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
        LINE_NAME: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
        LINE_SEQ: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
        PREV_POS_NAME1: [
          { required: true, message: "This field is required.", trigger: "change"},
        ],
    });

    const submitSave = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
        await formEl.validate (async (valid, fields) => {
          if (valid) {
            await MasterPosStore.submitSave();
            formEl.clearValidate();

            // const selectionCheck = document.querySelector('POS_NM_TARGET');
            // if(selectionCheck){
            //   selectionCheck.focus();
            // }

          } else {
            let isFirstElement: boolean = false
            if(fields){
              Object.keys(fields).forEach(key => {                
                // Iterasi melalui setiap objek dalam array properti tersebut
                fields[key].forEach((item, index) => {
                  if (!isFirstElement && item.field && typeof item.field === 'string' && item.field.trim() !== '') {
                    const fieldElement = document.getElementById(item.field);
                    if (fieldElement) {
                      fieldElement.focus();
                      isFirstElement = true;
                      ElMessage({
                        message: `Some mandatory fields are empty!`,
                        type: 'warning',
                      })
                    } else {
                      console.error(`Element with ID "${item.field}" not found.`);
                    }
                  }
                });
              });
            }
          }
      })
    }

    const setModeNormal = ():void => {
      if(MasterPosStore.posDataSingle.POS_NM !== '' || MasterPosStore.posDataSingle.POS_CD !== '' || MasterPosStore.posDataSingle.POS_SEQ !== '' || MasterPosStore.posDataSingle.LINE_NM !== '' || MasterPosStore.posDataSingle.LINE_SEQ !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME1 !== ''
        || MasterPosStore.posDataSingle.PREV_POS_NAME2 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME3 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME4 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME5 !== ''|| MasterPosStore.posDataSingle.PREV_POS_NAME6 !== ''|| MasterPosStore.posDataSingle.PREV_POS_NAME7 !== ''
        || MasterPosStore.posDataSingle.PREV_POS_NAME8 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME8 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME9 !== '' || MasterPosStore.posDataSingle.PREV_POS_NAME10 !== '' || MasterPosStore.posDataSingle.T_TYPE !== ''|| MasterPosStore.posDataSingle.CSOK !== ''
      ){
        ElMessageBox.alert(`Filled fields will not be saved, are you sure?`, 'Warning', {
            confirmButtonText: 'Confirm',
            confirmButtonClass: 'el-button--warning',
            cancelButtonText: 'Cancel',
            type: 'warning',
            showCancelButton: true,
            callback: (action: Action) => {
                if(action == 'confirm' && MasterPosStore.isAddMode){
                  MasterPosStore.setAddMode(false)
                  return
                } else if (action == 'confirm' && MasterPosStore.isEditMode){
                  MasterPosStore.setEditMode(false);
                  return
                } else {
                  return
                }
            }
        })
      } else {
        if(MasterPosStore.isAddMode){
          MasterPosStore.setAddMode(false);
        } else if (MasterPosStore.isEditMode){
          MasterPosStore.setEditMode(false);
        } 
      }
    }

    const infoTable = (start:number, length:number, total:number):string => {
      const from = start > 1 ? (start - 1) * length + 1 : start
      const to = from + length - 1
      return `Showing ${total !== 0 ? from : 0} - ${Math.min(to, total)} from ${total} entries`
    }

    const handleLabel = (position:string):string => {
      return `${MasterPosStore.posDataSingle.POS_NM}${position}`;
    }

    const refreshPosCode = ():void => {
      // MasterPosStore.posDataSingle.POS_CD = '';
    }

    const hangleRowPerPageChange = async(newPageSize: number) => {
      MasterPosStore.paginationTable.length = newPageSize
      await MasterPosStore.getDataPos();
    }

    const handlePageChange = async(page: number) => {
      MasterPosStore.paginationTable.start = page
      await MasterPosStore.getDataPos();
    };

    const formattedDate = (inputDate: any):string => {
      const date = new Date(inputDate);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(month).padStart(2, '0');

      return `${formattedDay}-${formattedMonth}-${year}`;
    }

    const tableRowClassName = ({row,rowIndex}: {
      row: PosDataResponse
      rowIndex: number
    }) => {
      if (row.POS_NM !== '#ADD:MODE' && MasterPosStore.isAddMode) {
        return 'secondary-row';
      } else if (parseInt(row.POS_ID) != MasterPosStore.posDataSingle.POS_ID && MasterPosStore.isEditMode){
        return 'secondary-row'
      }
      return 'normal-row'
    }

    onMounted(async () => {
      MasterPosStore.$reset();

      await MasterPosStore.getDataPos();
      await OptionStore.getOptionPos();
    })
</script>

<style>
    th{
        background-color: #17C563 !important; 
        color: white;
        /* border: none !important; */
    }

    .min-w-btn{
      min-width: 80px !important;
    }

    @media (max-width: 567px) {
        .pagination{
            overflow-y: auto;
            display: block !important;
            padding: 5px 0 5px 0;
        }
        .info-table{
            text-align: center;
            margin-bottom: 8px;
        }
        .pagination::-webkit-scrollbar {
            width: 3px; /* Lebar scrollbar */
            height: 5px;
        }

        .pagination::-webkit-scrollbar-thumb {
            background-color: #F1F1F4; /* Warna latar belakang thumb */
            opacity: 0.3 !important;
        }

        .pagination::-webkit-scrollbar-thumb:hover {
            background-color: #DBDFE9; /* Warna latar belakang thumb saat dihover */
            opacity: 0.5;
        }
    }

    .secondary-row {
      background-color: rgb(219, 219, 219) !important;
      transition: 0.5s;
    }

    .normal-row{
      transition: 0.5s;
    }

    .secondary-row:hover > td{
      background-color: rgb(219, 219, 219) !important;
    }
</style>
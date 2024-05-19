<template>
  <!--begin::Wrapper-->
  <div class="card shadow">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id=""
      @submit="onSubmitLogin"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10 bg bg-primary py-5">
        <!--begin::Title-->
        <h1 class="text-light mb-3 fs-1">Rental Mobil</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-light fw-semibold fs-5 text-mute">
          Dhimaz Nur Ramadhan
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!-- <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Use account <strong>admin@demo.com</strong> and password
          <strong>demo</strong> to continue.
        </div>
      </div> -->

      <!--begin::Input group-->
      <div class="fv-row mb-10 mx-6">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-muted">Username</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5 mx-6">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-muted fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <!-- <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link> -->
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center mx-6">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          class="btn btn-sm btn-primary w-100 mb-3"
        >
        <span class="indicator-label">
          Sign In
        </span>
          <!-- <span class="indicator-label"> 
            {{ authStore.isLoadingBtn ? 'Please wait...' : 'Sign In' }}
            <span v-if="authStore.isLoadingBtn"
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span> -->
        </button>
        <!--end::Submit button-->
        <hr />
        <div class="mb-5">
          <!-- <span 
            active-class="active"
            to="/master/inspection-job"
            class="menu-link py-3"
          >
          <span class="menu-icon">
            <i class="bi fs-3"></i>
            <KTIcon
              icon-name="element-2"
              icon-class="fs-4"
            />
          </span>
          <span class="menu-title">Vehicle Inspection</span>
          </span> -->
        </div>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <div class="d-flex justify-content-center fs-8 mt-3">
    <span class="text-muted">Copyright © 2024 PT. Toyota Motor Manufacturing Indonesia</span>
  </div>
  <!--end::Wrapper-->

  <el-dialog
        v-model="AuthStore.isModalShiftOpen"
        title='SHIFT'
        :width="dialogWidth"
        style="margin-top: 40vh"
        :show-close="true"
        @close="AuthStore.setShift(false)"
        center
    >
        <div class="mx-5">
          <hr />
          <div class="w100 my-9">
            <div>
              <div class="btn-group w-100" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-shift border border-primary" :class="classShift('RED')" @click="AuthStore.setParamShift('RED')">RED</button>
                <button type="button" class="btn btn-shift border border-primary" :class="classShift('WHITE')" @click="AuthStore.setParamShift('WHITE')">WHITE</button>
              </div>
            </div>
          </div>
        </div>
  </el-dialog>

  <el-dialog
        v-model="AuthStore.isModalPosOpen"
        title='POS'
        :width="dialogWidth"
        style="margin-top: 40vh"
        :show-close="true"
        @close="AuthStore.setPos(false)"
        center
    >
        <div class="mx-5">
          <hr />
          <div class="w100 my-9">
            <div>
              <div class="btn-group w-100 my-1" role="group" aria-label="Basic example">
                <el-select v-model="AuthStore.paramToVehicleInspection.pos" placeholder="Select Pos Code" :change="AuthStore.setParamPos(AuthStore.paramToVehicleInspection.pos)" filterable size="large">
                  <el-option v-for="item in OptionStore.posOption" :key="item.POS_CD" :label="item.POS_CD" :value="item.POS_CD"/>
                </el-select>
              </div>
            </div>
          </div>
        </div>
  </el-dialog>

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref,  computed, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { useWindowSize } from '@vueuse/core';
import ApiService from "@/core/services/ApiService";
import { AuthStore, OptionStore } from "@/stores";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const shift = ref('');
    const pos = ref('');
    const { width } = useWindowSize();

    const dialogWidth = computed((): string => {
        if(width.value <= 574){
            return '90%'
        } else if (width.value > 574 && width.value < 1024){
            return '65%'
        } else {    
            return '65%'
        }
    });

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      // email: Yup.string().email().required().label("Email"),
      email: Yup.string().min(1).required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    const setShift = (val:string) => {
      shift.value = val;
    }

    const classShift = (val) => {
      if(AuthStore.paramToVehicleInspection.shift === val){
        return 'btn-primary'
      }
      return 'btn-outline-primary'
    }

    const toGoPos = async() => {
      // const pos = '1FT04A';
      AuthStore.setShift(true);
    } 

    //Form submit function
    const onSubmitLogin = async () => {
      // await authStore.onLogin((status: number, token:string, error:string) => {
      //   if(status == 200 && token){
      //     saveToken(`${token}`)
      //     Swal.fire({
      //       text: "You have successfully logged in!",
      //       icon: "success",
      //       buttonsStyling: false,
      //       confirmButtonText: "Ok, got it!",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn fw-semibold btn-light-primary",
      //       },
      //     }).then(() => {
      //       router.push({ name: "master-pos" });
      //     });

      //   } else {
      //     Swal.fire({
      //       text: error as string,
      //       icon: "error",
      //       buttonsStyling: false,
      //       confirmButtonText: "Try again!",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn fw-semibold btn-light-danger",
      //       },
      //     })
      //   }
      // })
    };

    onMounted(async() => {
      OptionStore.getOptionPos();
    })

    return {
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
      toGoPos,
      classShift,
      setShift,
      AuthStore,
      dialogWidth,
      OptionStore 
    };
  },
});
</script>

<style>
  .btn-shift:hover{
    color: white  ;
  }
</style>

<template>
    <div
        v-if="asideSecondaryDisplay"
        class="aside-secondary d-flex flex-row-fluid"
    >
        <div class="aside-workspace my-5 p-5" id="kt_aside_wordspace">
        <div class="d-flex h-100 flex-column">
            <div
            class="flex-column-fluid hover-scroll-y"
            data-kt-scroll="true"
            data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_aside_wordspace"
            data-kt-scroll-dependencies="#kt_aside_secondary_footer"
            data-kt-scroll-offset="0px"
            >
            <div class="tab-content">

                <div class="card-body border-0 ms-4">
                <h3 class="card-title fw-bold text-gray-900">Car Rent</h3>
                <span class="text-muted mt-1 fw-semibold fs-7">A Website For Car Rentals</span>
                </div>
    
                <div class="card-body pt-2">
                    <div class="menu-item pt-8">
                        <router-link 
                            active-class="active"
                            to="/dashboard"
                            class="menu-link py-3"
                        >
                            <span class="menu-icon">
                                <i class="bi fs-3"></i>
                                <KTIcon
                                    icon-name="home"
                                    icon-class="fs-2"
                                />
                            </span>
                            <span class="menu-title">Dashboard</span>
                        </router-link>
                    </div>

                    <!--begin::Menu-->
                    <div class="menu menu-rounded menu-column menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 menu-arrow-gray-500 menu-state-bg fw-semibold pt-2" data-kt-menu="true">
                        <!--begin::Menu item-->
                        <div class="menu-item menu-sub-indention menu-accordion" data-kt-menu-trigger="click">
                            <!--begin::Menu link-->
                            <a href="#" class="menu-link py-3">
                                <span class="menu-icon">
                                    <i class="bi fs-3"></i>
                                    <KTIcon
                                        icon-name="abstract-26"
                                        icon-class="fs-2"
                                    />
                                </span>
                                <span class="menu-title">Master</span>
                                <span class="menu-arrow"></span>
                            </a>
                            <!--end::Menu link-->

                            <!--begin::Menu sub-->
                            <div class="menu-sub menu-sub-accordion pt-3">
                                <!--begin::Menu item-->
                                <div class="menu-item">
                                    <router-link 
                                        active-class="active"
                                        to="/master/cars"
                                        class="menu-link py-3"
                                    >
                                        <span class="menu-icon">
                                            <i class="bi fs-3"></i>
                                            <!-- <KTIcon icon-name="home-3"/> -->
                                            <span
                                            class="bullet bullet-dot h-6px w-6px"
                                            ></span>
                                        </span>
                                        <span class="menu-title">Master Cars</span>
                                    </router-link>
                                </div>
                                <!--end::Menu item-->
                            </div>
                            <!--end::Menu sub-->
                        </div>
                        <!--end::Menu item-->
                    </div>
                    <!--end::Menu-->

                    <!--begin::Menu-->
                    <!-- HIDDEN -->
                    <div class="menu menu-rounded menu-column menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 menu-arrow-gray-500 menu-state-bg fw-semibold pt-2" data-kt-menu="true" style="display: none;">
                        <!--begin::Menu item-->
                        <div class="menu-item menu-sub-indention menu-accordion" data-kt-menu-trigger="click">
                            <!--begin::Menu link-->
                            <a href="#" class="menu-link py-3">
                                <span class="menu-icon">
                                    <i class="bi fs-3"></i>
                                    <KTIcon
                                        icon-name="profile-user"
                                        icon-class="fs-2"
                                    />
                                </span>
                                <span class="menu-title">User Management</span>
                                <span class="menu-arrow"></span>
                            </a>
                            <!--end::Menu link-->

                            <!--begin::Menu sub-->
                            <div class="menu-sub menu-sub-accordion pt-3">
                                <!--begin::Menu item-->
                                <div class="menu-item">
                                    <router-link 
                                        active-class="active"
                                        to="..."
                                        class="menu-link py-3"
                                    >
                                    <span class="menu-icon">
                                        <i class="bi fs-3"></i>
                                        <KTIcon
                                            icon-name="abstract-29"
                                            icon-class="fs-4"
                                        />
                                    </span>
                                        <span class="menu-title">Application List</span>
                                    </router-link>
                                </div>
                                <!--end::Menu item-->
                            </div>
                            <!--end::Menu sub-->

                            <!--begin::Menu sub-->
                            <div class="menu-sub menu-sub-accordion">
                                <!--begin::Menu item-->
                                <div class="menu-item">
                                    <router-link 
                                        active-class="active"
                                        to="..."
                                        class="menu-link py-3"
                                    >
                                        <span class="menu-icon">
                                            <i class="bi fs-3"></i>
                                        </span>
                                        <span class="menu-title">Menu Master</span>
                                    </router-link>
                                </div>
                                <!--end::Menu item-->
                            </div>
                            <!--end::Menu sub-->
                        </div>
                        <!--end::Menu item-->
                    </div>
                    <!--end::Menu-->

                    <!--begin::Menu item-->
                    <!-- <div class="menu-item">
                        <span 
                            active-class="active"
                            to="https://www.deepl.com/en/translator"
                            class="menu-link py-3"
                        >
                            <span class="menu-icon">
                                <i class="bi fs-3"></i>
                                <KTIcon
                                    icon-name="chart-simple-2"
                                    icon-class="fs-2"
                                />
                            </span>
                            <span class="menu-title">Log Monitoring</span>
                        </span>
                    </div> -->
                    <!--end::Menu item-->
                </div>
                <!-- NVCS::START -->

            </div>
            </div>

            <div class="flex-column-auto pt-10 px-5" id="kt_aside_secondary_footer">
            <a
                href="https://preview.keenthemes.com/metronic8/vue/docs/index"
                class="btn btn-bg-light btn-color-gray-600 btn-flex btn-active-color-primary flex-center w-100"
                data-bs-toggle="tooltip"
                data-bs-custom-class="tooltip-dark"
                data-bs-trigger="hover"
                data-bs-offset="0,5"
                data-bs-dismiss-="click"
            >
                <span class="btn-label">{{ t("docsAndComponents") }}</span>
                <KTIcon icon-name="document" icon-class="btn-icon fs-4 ms-2" />
            </a>
            </div>
        </div>
        </div>
    </div>

    <button
        v-if="asideSecondaryDisplay && minimizationEnabled"
        :class="{ active: minimizedAsideSecondary }"
        class="btn btn-sm btn-icon bg-body btn-color-gray-700 btn-active-primary position-absolute translate-middle start-100 end-0 bottom-0 shadow-sm d-none d-lg-flex mb-5"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
        style="margin-bottom: 1.35rem"
    >
        <KTIcon icon-name="arrow-left" icon-class="fs-2 rotate-180" />
    </button>
</template>

<script lang="ts">
import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import SecurityCenter from "./tabs/SecurityCenter.vue";
import Application from "./tabs/Application.vue";
import {
  asideSecondaryDisplay,
  minimizationEnabled,
  minimizedAsideSecondary,
} from "@/layouts/default-layout/config/helper";

export default defineComponent({
  name: "kt-aside-secondary",
  components: {
    SecurityCenter,
    Application
  },
  setup() {
    const { t } = useI18n();

    return {
      minimizedAsideSecondary,
      asideSecondaryDisplay,
      minimizationEnabled,
      getIllustrationsPath,
      t,
      getAssetPath,
    };
  },
});
</script>

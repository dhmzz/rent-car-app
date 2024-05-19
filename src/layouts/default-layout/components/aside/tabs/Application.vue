<template>
    <div class="card-header border-0">
      <h3 class="card-title fw-bold text-gray-900">Application Skeleton</h3>
      <span class="text-muted mt-1 fw-semibold fs-7">Vue 3 Metronic Skeleton - TMMIN</span>
    </div>
  
    <div class="card-body pt-2">
        <div class="menu-item pt-8">
            <!-- change tag span with <router-link> to use -->
            <span 
                active-class="active"
                to="..."
                class="menu-link py-3"
            >
                <span class="menu-icon">
                    <i class="bi fs-3"></i>
                    <KTIcon
                        icon-name="home"
                        icon-class="fs-2"
                    />
                </span>
                <span class="menu-title">Home</span>
            </span>
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
                            icon-name="tablet-text-down"
                            icon-class="fs-2"
                        />
                    </span>
                    <span class="menu-title">Transactions</span>
                    <span class="menu-arrow"></span>
                </a>
                <!--end::Menu link-->

                <!--begin::Menu sub-->
                <div class="menu-sub menu-sub-accordion pt-3">
                    <!--begin::Menu item-->
                    <div class="menu-item">
                        <router-link 
                            active-class="active"
                            to="/skeleton/master/system"
                            class="menu-link py-3"
                        >
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Example Tab</span>
                        </router-link>
                    </div>
                    <!--end::Menu item-->

                    <!--begin::Menu item-->
                    <div class="menu-item">
                        <span 
                            active-class="active"
                            to="/skeleton/master/system"
                            class="menu-link py-3"
                        >
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Example Tab</span>
                        </span>
                    </div>
                    <!--end::Menu item-->
                </div>
                <!--end::Menu sub-->
            </div>
            <!--end::Menu item-->
        </div>
        <!--end::Menu-->

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
                            to="/skeleton/master/system"
                            class="menu-link py-3"
                        >
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Master System</span>
                        </router-link>
                    </div>
                    <!--end::Menu item-->

                    <!--begin::Menu item-->
                    <div class="menu-item">
                        <span 
                            active-class="active"
                            to="/skeleton/master/system"
                            class="menu-link py-3"
                        >
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Master User</span>
                        </span>
                    </div>
                    <!--end::Menu item-->

                    <!--begin::Menu item-->
                    <div class="menu-item">
                        <router-link 
                            active-class="active"
                            to="/skeleton/master/message"
                            class="menu-link py-3"
                        >
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Master Message</span>
                        </router-link>
                    </div>
                    <!--end::Menu item-->

                    <!--begin::Menu item-->
                    <!-- EXAMPLE SUB MENU THAT HAS SUB MENU   -->

                    <!-- <div class="menu-item menu-accordion" data-kt-menu-trigger="click">
                        <a href="#" class="menu-link py-3">
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Example Link</span>
                            <span class="menu-arrow"></span>
                        </a>

                        <div class="menu-sub menu-sub-accordion pt-3">
                            <div class="menu-item">
                                <a href="#" class="menu-link py-3">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Example Link</span>
                                </a>
                            </div>

                            <div class="menu-item">
                                <a href="#" class="menu-link py-3">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Example Link</span>
                                </a>
                            </div>

                            <div class="menu-item">
                                <a href="#" class="menu-link py-3">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Example Link</span>
                                </a>
                            </div>
                        </div>
                    </div> -->

                    <!--end::Menu item-->
                </div>
                <!--end::Menu sub-->
            </div>
            <!--end::Menu item-->
        </div>
        <!--end::Menu-->

        <!--begin::Menu-->
        <div class="menu menu-rounded menu-column menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 menu-arrow-gray-500 menu-state-bg fw-semibold pt-2" data-kt-menu="true">
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
                                <KTIcon
                                    icon-name="abstract-14"
                                    icon-class="fs-4"
                                />
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

        <!-- Added by aldi.faisal@arkamaya.co.id -->
        <!--begin::Menu-->
        <div class="menu menu-rounded menu-column menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 menu-arrow-gray-500 menu-state-bg fw-semibold pt-2" data-kt-menu="true">
            <!--begin::Menu item-->
            <div class="menu-item menu-sub-indention menu-accordion" data-kt-menu-trigger="click">
                <router-link 
                    active-class="active"
                    to="/skeleton/log-monitoring"
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
                </router-link>
            </div>
            <!--end::Menu item-->
        </div>
        <!--end::Menu-->
    </div>
    
  </template>
  
  <script setup lang="ts">

  </script>
  
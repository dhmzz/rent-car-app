<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex flex-shrink-0">

    <div class="d-flex ms-3">
      <div class="cursor-pointer symbol symbol-40px" data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-overflow="true" data-kt-menu-placement="top-end" data-kt-menu-offset="200,10"
        data-kt-menu-flip="left-end" data-bs-toggle="true" data-bs-placement="right" data-bs-dismiss="click"
        title="User profile">
        <img :src="getAssetPath('media/avatars/300-1.jpg')" alt="metronic" />
      </div>
      <UserMenu></UserMenu>
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import UserMenu from "@/layouts/default-layout/components/menus/UserAccountMenu.vue";

export default defineComponent({
  name: "layout-topbar",
  components: {
    UserMenu,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
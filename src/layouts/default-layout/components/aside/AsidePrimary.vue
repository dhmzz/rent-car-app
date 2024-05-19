<template>
  
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTQuickLinksMenu from "@/layouts/default-layout/components/menus/QuickLinksMenu.vue";
import KTNotificationsMenu from "@/layouts/default-layout/components/menus/NotificationsMenu.vue";
import KTUserMenu from "@/layouts/default-layout/components/menus/UserAccountMenu.vue";

export default defineComponent({
  name: "kt-aside-primary",
  components: {
    KTQuickLinksMenu,
    KTNotificationsMenu,
    KTUserMenu,
  },
  setup() {
    const enableSecondarySidebar = () => {
      document.body.setAttribute("data-kt-aside-minimize", "off");
    };

    return {
      getAssetPath,
      enableSecondarySidebar,
    };
  },
});
</script>

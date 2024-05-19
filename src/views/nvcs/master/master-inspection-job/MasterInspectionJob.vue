<template>
    <MasterInspectionHeader />
    <MasterInspectionBody />
    <MasterInspectionJobUpload />
</template>

<script setup lang="ts">
    import MasterInspectionHeader from './partial-content/MasterInspectionJobHeader.vue';
    import MasterInspectionBody from './partial-content/MasterInspectionJobBody.vue';
    import MasterInspectionJobUpload from './partial-content/MasterInspectionJobUpload.vue';
</script>
<template>
    <ContentHeader />
    <ContentBody />
    <Form />
    <FormUpload />
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import ContentBody from "./screen-content/ContentBody.vue"
    import ContentHeader from "./screen-content/ContentHeader.vue"
    import Form from './dialog/Form.vue';
    import FormUpload from './dialog/FormUpload.vue';
</script>
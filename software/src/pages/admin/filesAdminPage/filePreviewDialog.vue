<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';

const showDialog = defineModel("showDialog")

defineProps({
  url: String
})
</script>

<template>
  <action-dialog v-model="showDialog" max-width="500">
    <v-img :src="url" max-height="400" />
  </action-dialog>
</template>
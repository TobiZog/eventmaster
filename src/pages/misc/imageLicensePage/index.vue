<script setup lang="ts">
import { useFilesStore } from '@/stores/files.store';


const filesStore = useFilesStore()

filesStore.getStaticFiles()
</script>

<template>
  <v-img v-for="image of filesStore.staticFiles" :src="image.url"/>
</template>
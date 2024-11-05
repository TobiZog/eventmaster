<script setup lang="ts">
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import { usePreferencesStore } from '@/stores/preferences.store';
import filePreviewDialog from './filePreviewDialog.vue';
import { ref } from 'vue';

const preferencesStore = usePreferencesStore()
const showDialog = ref(false)
const previewFile = ref("")

preferencesStore.getStaticFiles()
</script>

<template>
  <admin-data-layout
    :add-button-string="$t('misc.uploadFile')"
    :fetch-in-progress="preferencesStore.fetchInProgress"
    :on-add-click="() => { /** todo */ }"
  >
    <v-row>
      <v-col
        v-for="folder of preferencesStore.staticFiles"
        cols="12"
        md="3"
        sm="6"
      >
        <v-list>
          <v-list-subheader>{{ folder.folder }}/</v-list-subheader>
          <v-list-item 
            v-for="file of folder.files"
            :title="file.name"
            :subtitle="Math.round(file.size / 1024) + ' KB'"
            @click="() => { previewFile = file.url; showDialog = true }"
          />
        </v-list>
      </v-col>
    </v-row>
  </admin-data-layout>

  <file-preview-dialog
    v-model:show-dialog="showDialog"
    :url="previewFile"
  />
</template>
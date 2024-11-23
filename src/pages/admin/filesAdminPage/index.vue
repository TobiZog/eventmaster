<script setup lang="ts">
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import { ref } from 'vue';
import FileUploadDialog from './fileUploadDialog.vue';
import { useFilesStore } from '@/stores/files.store';

const filesStore = useFilesStore()
const showPreviewDialog = ref(false)
const previewFile = ref("")

filesStore.getStaticFolders()
</script>

<template>
  <admin-data-layout
    :add-button-string="$t('misc.uploadFile')"
    :fetch-in-progress="filesStore.fetchInProgress"
    :on-add-click="() => { filesStore.showFileUploadDialog = true }"
    :hide-add-button="true" 
  >
    <v-row >
      <v-col cols="2" class="border">
        <v-list>
          <v-list-item
            v-for="folder of filesStore.staticFolders"
            :key="folder.name"
            :value="folder"
            :title="folder.name + '/'"
            @click="filesStore.selectedFolder = folder; filesStore.getStaticFiles()"
          />
        </v-list>
      </v-col>

      <v-col cols="4" class="border">
        <v-skeleton-loader
          :loading="filesStore.fetchInProgress"
          type="list-item-two-line"
        >
          <v-list max-height="800" class="w-100">
            <v-list-item
              v-for="file of filesStore.staticFiles"
              :title="file.name"
              :value="file.name"
              :subtitle="Math.round(file.size / 1024) + ' KB'"
              @click="() => { filesStore.selectedFile = file }"
            />
          </v-list>
        </v-skeleton-loader>
      </v-col>

      <v-col class="border">
        <v-row>
          <v-col v-if="filesStore.selectedFile != undefined">
            {{ filesStore.selectedFile.url }}
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-if="filesStore.selectedFile != undefined && filesStore.selectedFile.name.endsWith('html')"
              :model-value="filesStore.selectedFile.content"
              variant="outlined"
              label="Content"
              height="300"
              rows="30"
            />
            <v-img
              v-else-if="filesStore.selectedFile != undefined"
              :src="filesStore.selectedFile.url" max-height="400"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </admin-data-layout>

  <file-preview-dialog
    v-model:show-dialog="showPreviewDialog"
    :url="previewFile"
  />

  <file-upload-dialog />
</template>
<script setup lang="ts">
import dataLayout from '@/layouts/dataLayout.vue';
import { ref } from 'vue';
import FileUploadDialog from './fileUploadDialog.vue';
import { useFilesStore } from '@/stores/files.store';

const filesStore = useFilesStore()
const showPreviewDialog = ref(false)
const previewFile = ref("")

filesStore.getStaticFolders()
</script>

<template>
  <data-layout
    :add-button-string="$t('misc.uploadFile')"
    :fetch-in-progress="filesStore.fetchInProgress"
    :on-add-click="() => { filesStore.showFileUploadDialog = true }"
    :hide-add-button="true" 
  >
    <v-row >
      <!-- Column folder -->
      <v-col cols="2" class="border">
        <v-list>
          <v-list-item
            v-for="folder of filesStore.staticFolders"
            :key="folder.name"
            :value="folder"
            :title="folder.name + '/'"
            @click="filesStore.selectedFolder = folder; filesStore.getStaticFiles()"
            prepend-icon="mdi-folder"
          />
        </v-list>
      </v-col>


      <!-- Column files in folder -->
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
              @click="() => { filesStore.selectedFile = file }"
            >
              <template #prepend>
                <v-icon
                  :icon="file.name.endsWith('js') ? 'mdi-file' : 'mdi-image'"
                  :color="file.copyright != undefined ? 'grey' : 'red'"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-skeleton-loader>
      </v-col>


      <!-- File detail viewer -->
      <v-col class="border">
        <v-row>
          <v-col v-if="filesStore.selectedFile != undefined">
            <v-textarea
              v-if="filesStore.selectedFile != undefined && filesStore.selectedFile.name.endsWith('js')"
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

        <!-- File details -->
        <v-row>
          <v-col v-if="filesStore.selectedFile != undefined">
            <v-list>
              <v-list-item prepend-icon="mdi-server">
                {{ filesStore.selectedFile.url }}
              </v-list-item>

              <v-list-item prepend-icon="mdi-package">
                {{ Math.round(filesStore.selectedFile.size / 1024) + ' KB' }}
              </v-list-item>

              <template v-if="filesStore.selectedFile['copyright'] != undefined">
                <v-list-item prepend-icon="mdi-copyright">
                  {{ filesStore.selectedFile.copyright.license }}
                </v-list-item>

                <v-list-item prepend-icon="mdi-account">
                  {{ filesStore.selectedFile.copyright.creator }}
                </v-list-item>

                <v-list-item
                  prepend-icon="mdi-web"
                  v-if="filesStore.selectedFile.copyright.url.length > 0"
                >
                  <a :href="filesStore.selectedFile.copyright.url" target="_blank" >Quelle</a>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </data-layout>

  <file-preview-dialog
    v-model:show-dialog="showPreviewDialog"
    :url="previewFile"
  />

  <file-upload-dialog />
</template>
<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useFilesStore } from '@/stores/files.store';
import { ref } from 'vue';

const filesStore = useFilesStore()

const test = ref()
</script>

<template>
  <action-dialog
    v-model="filesStore.showFileUploadDialog"
    :title="$t('misc.uploadFile')"
    icon="mdi-file"
    max-width="800"
  >
    <v-form :model-value="test">
      <v-container>
        <v-row>
          <v-col>
            <v-file-input
              v-model="filesStore.fileUpload"
              clearable
              :label="$t('misc.chooseFile')"
              :disabled="filesStore.fetchInProgress"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-radio-group
              v-model="filesStore.fileUploadDir"
              :label="$t('misc.chooseDestinationFolder')"
              :disabled="filesStore.fetchInProgress"
            >
              <v-radio
                v-for="folder of filesStore.staticFolders"
                :label="folder.name + '/'"
                :value="folder.name"
              />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>

      <v-btn type="submit">Submit</v-btn>
    </v-form>

    <template #actions>
      <outlined-button
        @click="filesStore.uploadFile"
        prepend-icon="mdi-file-upload"
        color="green"
        :disabled="filesStore.fileUploadDir.length == 0 || filesStore.fileUpload == undefined"
        :loading="filesStore.fetchInProgress"
      >
        {{ $t('misc.upload') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
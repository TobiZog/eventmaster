<script setup lang="ts">
import { ModelRef } from 'vue';
import actionDialog from './actionDialog.vue';

const showDialog: ModelRef<boolean> = defineModel()

const props = defineProps({
  title: String,
  description: String,
  onConfirm: Function
})

function confirmPressed() {
  props.onConfirm()
  showDialog.value = false
}
</script>

<template>
  <action-dialog 
    :title="title"
    max-width="400"
    v-model="showDialog"
  >
    <v-container>
      <v-row>
        <v-col>
          {{ description }}
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-btn
        @click="showDialog = false" 
        color="green"
        variant="outlined"
      >
        {{ $t("dialog.cancel") }}
      </v-btn>

      <v-btn
        @click="confirmPressed"
        color="red"
        variant="outlined"
      >
        {{ $t("dialog.confirm") }}
      </v-btn>
    </template>
  </action-dialog>
</template>
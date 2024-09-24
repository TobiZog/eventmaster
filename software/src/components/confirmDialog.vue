<script setup lang="ts">
import { ModelRef } from 'vue';
import actionDialog from './actionDialog.vue';
import outlinedButton from './outlinedButton.vue';

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
    <v-row>
      <v-col>
        {{ description }}
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button
        @click="showDialog = false" 
        color="green"
      >
        {{ $t("dialog.cancel") }}
      </outlined-button>

      <outlined-button
        @click="confirmPressed"
        color="red"
      >
        {{ $t("dialog.confirm") }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
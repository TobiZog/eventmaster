<script setup lang="ts">
import { ModelRef } from 'vue';
import actionDialog from './../basics/actionDialog.vue';
import outlinedButton from './../basics/outlinedButton.vue';

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
    {{ description }}

    <template #actions>
      <outlined-button
        @click="showDialog = false" 
        prepend-icon="mdi-close"
        color="orange"
      >
        {{ $t("dialog.cancel") }}
      </outlined-button>

      <outlined-button
        @click="confirmPressed"
        prepend-icon="mdi-check"
        color="red"
      >
        {{ $t("dialog.confirm") }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
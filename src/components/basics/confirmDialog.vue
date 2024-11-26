<script setup lang="ts">
import { ModelRef } from 'vue';
import actionDialog from './../basics/actionDialog.vue';
import outlinedButton from './../basics/outlinedButton.vue';

const showDialog: ModelRef<boolean> = defineModel()

const props = defineProps({
  title: String,
  description: String,
  onConfirm: Function,
  loading: Boolean
})

function confirmPressed() {
  props.onConfirm()
}
</script>

<template>
  <action-dialog 
    :title="title"
    max-width="500"
    v-model="showDialog"
    persistent
  >
    <v-container>
      <v-row>
        <v-col>
          {{ description }}
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <outlined-button
        @click="showDialog = false" 
        prepend-icon="mdi-close"
        color="warning"
        :loading="loading"
      >
        {{ $t("misc.actions.cancel") }}
      </outlined-button>

      <outlined-button
        @click="confirmPressed"
        prepend-icon="mdi-check"
        color="error"
        :loading="loading"
      >
        {{ $t("misc.actions.confirm") }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
<script setup lang="ts">
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useRouter } from 'vue-router';

const fetchInProgress = defineModel("fetchInProgress", { default: false })
const router = useRouter()

defineProps({
  addButtonString: String,
  onAddClick: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <outlined-button
          prepend-icon="mdi-arrow-left"
          @click="router.go(-1)"
        >
          {{ $t('misc.onePageBack') }}
        </outlined-button>
      </v-col>

      <v-col class="text-end">
        <outlined-button
          prepend-icon="mdi-plus"
          color="green"
          :disabled="fetchInProgress"
          @click="onAddClick()"
        >
          {{ addButtonString }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
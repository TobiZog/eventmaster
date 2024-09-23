<script setup lang="ts">
import actionDialog from '@/components/actionDialog.vue';
import { useBasketStore } from '@/data/stores/basketStore';
import outlinedButton from '@/components/outlinedButton.vue';

const basketStore = useBasketStore()

function doOrder() {
  basketStore.takeOrder()
}
</script>

<template>
  <action-dialog
    :title="$t('ordering.ordering')"
  >
    <template #actions>
      <outlined-button
        @click="doOrder"
      >
        {{ $t('ordering.takeOrder') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
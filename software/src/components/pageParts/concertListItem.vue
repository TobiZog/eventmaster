<script setup lang="ts">
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';

defineProps({
  concert: ConcertModel,
  date: String,
  title: String,
  description: String,
  eventName: String,
  price: Number,
  loading: Boolean
})
</script>

<template>
  <card-view-horizontal v-if="!loading">
    <template #prepend>
      <div>
        <div class="text-h4">
          {{ String(new Date(date).getDate()).padStart(2, "0") }}
        </div>

        <div class="text-h6">
          {{ new Date(date).toLocaleString('default', { month: 'long' }) }}
        </div>

        <div class="text-h6">
          {{ new Date(date).getFullYear() }}
        </div>
      </div>
    </template>

    <template #content>
      <div>
        <div class="text-h4 font-weight-black pt-2 h-100">
          {{ title }}
        </div>

        <div class="text-disabled">
          <slot name="description" />
        </div>
      </div>
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-body-1 pb-1">
          {{ $t('from') + ' ' + price.toFixed(2) + ' €' }}
        </div>

        <div>
          <v-btn variant="flat" color="secondary">
            {{ $t('goToTheConcert') }}
          </v-btn>
        </div>
      </div>
    </template>
  </card-view-horizontal>

  <card-view-horizontal 
    v-else
    :loading="loading"
  >
    <v-skeleton-loader
      type="text" />
  </card-view-horizontal>
</template>
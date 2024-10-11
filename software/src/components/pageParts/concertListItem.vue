<script setup lang="ts">
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';

defineProps({
  /** Concert to display */
  concert: {
    type: ConcertModel,
    required: true
  },

  /** Card title */
  title: String,

  /** Display text parts as skeleton */
  loading: Boolean,

  /** Show or hide the button on the right side */
  showButton: {
    type: Boolean,
    default: true
  },

  /** Behaviour if user clicks on button or card */
  onClick: Function
})
</script>

<template>
  <card-view-horizontal
    :title="title"
    v-if="!loading"
    :link="showButton && concert.inStock > 0"
    @click="showButton && concert.inStock > 0 ? onClick() : () => {}"
  >
    <template #prepend>
      <div>
        <div class="text-h4">
          {{ String(new Date(concert.date).getDate()).padStart(2, "0") }}
        </div>

        <div class="text-h6">
          {{ new Date(concert.date).toLocaleString('default', { month: 'long' }) }}
        </div>

        <div class="text-h6">
          {{ new Date(concert.date).getFullYear() }}
        </div>
      </div>
    </template>

    <template #content>
      <slot name="description" />
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-h6 pb-1">
          {{ $t('from') + ' ' + concert.price.toFixed(2) + ' €' }}
        </div>

        <div v-if="concert.inStock == 0 && showButton" class="text-h6">
          {{ $t('soldOut') }}
        </div>

        <div v-else-if="showButton">
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
<script setup lang="ts">
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';

defineProps({
  /** Date of the concert */
  date: String,

  /** Card title */
  title: String,

  /** Name of the event */
  eventName: String,

  /** Price of the cheapest ticket option */
  price: Number,

  /** Number of available tickets, important to mark a concert as "sold out" */
  inStock: Number,

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
    :link="showButton && inStock > 0"
    @click="showButton && inStock > 0 ? onClick() : () => {}"
  >
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
      <slot name="description" />
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-h6 pb-1">
          {{ $t('from') + ' ' + price.toFixed(2) + ' €' }}
        </div>

        <div v-if="inStock == 0 && showButton" class="text-h6">
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
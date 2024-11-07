<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';

const router = useRouter()

defineProps({
  title: String,
  icon: String,
  firstLine: String,
  secondLine: String,
  buttonRoute: String,
  loading: Boolean
})
</script>

<template>
  <v-col cols="12" md="6" lg="4">
    <card-view
      :title="title"
      :icon="icon"
    >
      <div class="text-h4 text-center">
        {{ firstLine }}
      </div>

      <div class="text-h6 text-center text-disabled">
        {{ secondLine }}
      </div>

      <template #actions>
        <outlined-button
          @click="router.push(buttonRoute)"
          :loading="loading"
        >
          {{ $t('misc.actions.more') }}
        </outlined-button>
      </template>
    </card-view>
  </v-col>
</template>
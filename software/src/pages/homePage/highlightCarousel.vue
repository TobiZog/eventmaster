<script setup lang="ts">
import OutlinedButton from '@/components/outlinedButton.vue';
import { useConcertStore } from '@/data/stores/concertStore';
import { useRouter } from 'vue-router';

const concertStore = useConcertStore()
const router = useRouter()
</script>

<template>
  <v-carousel
    hide-delimiters
    hide-delimiter-background
    height="700"
    show-arrows
  >
    <template #prev="{ props }">
      <v-btn
        variant="text"
        @click="props.onClick"
        icon="mdi-chevron-left"
      />
    </template>

    <template #next="{ props }">
      <v-btn
        variant="text"
        @click="props.onClick"
        icon="mdi-chevron-right"
      />
    </template>

    <v-carousel-item
      v-for="band in concertStore.bands"
      :src="'http://localhost:3000/static/bands/' + band.imageMembers" 
      cover
    >
      <v-card
        class="position-absolute bottom-0"
        :title="band.name"
        width="100%"
        :rounded="false"
        background-opacity="50%"
      >
        <v-card-text>
          <div>
            {{ band.descriptionDe }}
          </div>

          <outlined-button
            append-icon="mdi-arrow-right"
            class="mt-2"
            color="primary"
            @click="router.push('bands/' + band.name.replaceAll(' ', '-').toLowerCase())"
          >
            {{ $t('tickets', 2) }}
          </outlined-button>
        </v-card-text>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
.v-card {
  background: rgba(255, 255, 255, .7);
  color: black;
}

.v-card-text {
  font-weight: bold;
}
</style>
<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';

const router = useRouter()
const bandStore = useBandStore()

bandStore.getBands()
</script>

<template>
  <v-carousel
    v-if="bandStore.bands.length > 0"
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
      
      v-for="band in bandStore.bands"
      :src="'http://localhost:3000/static/' + band.imageMembers" 
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
            @click="router.push('bands/details/' + band.name.replaceAll(' ', '-').toLowerCase())"
          >
            {{ $t('ticket.tickets', 2) }}
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
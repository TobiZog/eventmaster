<script setup lang="ts">
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useRouter } from 'vue-router';

const shoppingStore = useShoppingStore()
const router = useRouter()

shoppingStore.getEvents()
</script>

<template>
  <!-- <v-carousel
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
    </template> -->

    <!-- <v-carousel-item
      v-for="event in shoppingStore.concerts"
      :src="'http://localhost:3000/static/' + event.band.imageMembers" 
      cover
    >
      <v-card
        class="position-absolute bottom-0"
        :title="event.name"
        width="100%"
        :rounded="false"
        background-opacity="50%"
      >
        <v-card-text>
          <div>
            {{ event.band.descriptionDe }}
          </div>

          <outlined-button
            append-icon="mdi-arrow-right"
            class="mt-2"
            color="primary"
            @click="router.push('bands/' + event.name.replaceAll(' ', '-').toLowerCase())"
          >
            {{ $t('tickets', 2) }}
          </outlined-button>
        </v-card-text>
      </v-card>
    </v-carousel-item>
  </v-carousel> -->
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
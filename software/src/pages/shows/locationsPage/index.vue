<script setup lang="ts">
import sectionDivider from '@/components/sectionDivider.vue';
import { useShowStore } from '@/data/stores/showStore';
import cardWithTopImage from '@/components/cardWithTopImage.vue';

const showStore = useShowStore()
</script>

<template>
  <v-container>
    <div v-for="city in showStore.cities">
      <v-row>
        <v-col>
          <section-divider 
            :title="city.name"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="location in city.locations" cols="3">
          <card-with-top-image
            :image="'locations/' + location.image"
            :title="location.name"
          >
            {{ location.address }}
          </card-with-top-image>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
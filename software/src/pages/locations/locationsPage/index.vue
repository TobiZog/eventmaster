<script setup lang="ts">
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import { useRouter } from 'vue-router';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()
const router = useRouter()

shoppingStore.getCities()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <!-- During fetching -->
        <div v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 2">
          <v-row>
            <v-col>
              <section-divider :loading="true" />
            </v-col>
          </v-row>

          <v-row >
            <v-col class="text-center" v-for="i in 4" cols="3">
              <card-with-top-image :loading="true" />
            </v-col>
          </v-row>
        </div>

        <!-- When all data are downloaded -->
        <div
          v-else
          v-for="city in shoppingStore.cities"
        >
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
                :image="location.imageOutdoor"
                :title="location.name"
                @click="router.push('locations/' + location.name.replaceAll(' ', '-').toLowerCase())"
              >
                <div>
                  {{ location.nrOfConcerts }} {{ $t('concert', location.nrOfConcerts) }}
                </div>
              </card-with-top-image>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-spacer />
    </v-row>


    
  </v-container>
</template>
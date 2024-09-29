<script setup lang="ts">
import sectionDivider from '@/components/sectionDivider.vue';
import { useConcertStore } from '@/data/stores/concertStore';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import { useRouter } from 'vue-router';

const concertStore = useConcertStore()
const router = useRouter()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <div v-for="city in concertStore.cities">
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
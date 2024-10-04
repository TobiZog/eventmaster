<script setup lang="ts">
import { useConcertStore } from '@/data/stores/concertStore';
import { BandModel } from '@/data/models/acts/bandModel';
import { useRouter } from 'vue-router';
import ratingSection from './ratingSection.vue';
import bandMemberSection from './bandMemberSection.vue';
import gallerySection from './gallerySection.vue';
import concertSection from './concertSection.vue';
import heroImage from '@/components/pageParts/heroImage.vue';
import sectionDivider from '@/components/sectionDivider.vue';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { ref } from 'vue';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { getBand } from '@/data/api/bandApi';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import { ConcertModel } from '@/data/models/acts/concertModel';

const router = useRouter()
const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()
const band = ref<BandModel>(new BandModel())

feedbackStore.fetchDataFromServerInProgress = true

getBand(String(router.currentRoute.value.params.bandName).replaceAll('-', ' '))
  .then(result => {
    band.value = result.data
    feedbackStore.fetchDataFromServerInProgress = false
  })
</script>

<template>
  <hero-image
    :image="band.imageMembers"
    :logo="band.logo"
    :title="band.name"
    :chips="band.genres.map(genre => genre.name)"
    :description="band.descriptionDe"
    :loading="feedbackStore.fetchDataFromServerInProgress"
  />

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('concert', 2)" />
          </v-col>
        </v-row>

        <v-row v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 3">
          <v-col>
            <concert-list-item :loading="true" />
          </v-col>
        </v-row>

        <v-row v-else v-for="concert of band.events[0].concerts">
          <v-col>
            <concert-list-item
              :title="dateStringToHumanReadableString(concert.date)"
              :image="concert.location.image"
              @click="router.push('/concert/' + concert.id)"
            >
              <template #description>
                <v-row>
                  <v-col cols="auto" class="d-flex justify-center align-center px-0">
                    <v-btn
                      icon="mdi-map"
                      variant="text"
                      size="x-large"
                      @click="router.push('/locations/' + concert.location.name.replaceAll(' ', '-').toLowerCase())"
                    />
                  </v-col>

                  <v-col>
                    <div class="text-h6">
                      {{ concert.location.name }}
                    </div>

                    <div class="text-h6">
                      {{ concert.location.city.name }}
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template #append-text>
                <div class="pb-3" v-if="concert.inStock > 0">
                  {{ concert.price.toFixed(2) }} €
                </div>

                <div v-else>
                  {{ $t('soldOut') }}
                </div>
              </template>
            </concert-list-item>
          </v-col>
        </v-row>


        
        <v-row>
          <v-col>
            <section-divider :title="$t('bandMember')" />
          </v-col>
        </v-row>

        <band-member-section :band="band" />
        

        <v-row>
          <v-col>
            <section-divider :title="$t('rating', 2)" />
          </v-col>
        </v-row>

        <rating-section :band="band" />


        <v-row>
          <v-col>
            <section-divider :title="$t('image', 2)" />
          </v-col>
        </v-row>

        <gallery-section :band="band" />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>
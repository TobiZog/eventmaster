<script setup lang="ts">
import { useRouter } from 'vue-router';
import ratingSection from './ratingSection.vue';
import bandMemberSection from './bandMemberSection.vue';
import gallerySection from './gallerySection.vue';
import concertSection from './concertSection.vue';
import heroImage from '@/components/pageParts/heroImage.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { ref } from 'vue';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { getBand } from '@/data/api/bandApi';
import { BandApiModel } from '@/data/models/acts/bandApiModel';
import { genre } from 'backend/routes/genre.routes';

const router = useRouter()
const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()
const band = ref<BandApiModel>(new BandApiModel())

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

        <concert-section
          :band="band"
          :events="band.events"
        />

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

        <rating-section :ratings="band.ratings" />


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
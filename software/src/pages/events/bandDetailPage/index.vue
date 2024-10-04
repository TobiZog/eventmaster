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

const router = useRouter()
const shoppingStore = useShoppingStore()
const band = ref<BandModel>(new BandModel())

</script>

<template>
  <hero-image
    :image="band.imageMembers"
    :logo="band.logo"
    :title="band.name"
    :chips="band.genres.map(genre => genre.name)"
    :description="band.descriptionDe"
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
        
        <concert-section :band="band" />

        <!-- band-member-section :band="band" />

        <rating-section :band="band" />

        <gallery-section :band="band" /> -->
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>
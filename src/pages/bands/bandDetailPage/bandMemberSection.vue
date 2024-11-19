<script setup lang="ts">
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useBandStore } from '@/stores/band.store';

const bandStore = useBandStore()
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('band.bandMember')" />
    </v-col>
  </v-row>

  <v-row v-if="bandStore.fetchInProgress" >
    <v-col cols="6" md="3" v-for="i in 4">
      <card-with-top-image :loading="true" />
    </v-col>
  </v-row>

  <v-row>
    <v-spacer />

    <v-col v-for="member of bandStore.band.members" cols="6" md="3">
      <card-with-top-image
        :title="member.name"
        :image=" member.image"
        :link="false"
      />
    </v-col>

    <v-spacer />
  </v-row>
</template>
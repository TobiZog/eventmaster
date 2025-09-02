<script setup lang="ts">
import pageSetupSection from '../components/organisms/pageSetupSection.vue';
import systemSetupSection from '../components/organisms/systemSetupSection.vue';
import aboutSection from '../components/organisms/aboutSection.vue';
import exerciseSection from '../components/organisms/exerciseSection.vue';
</script>

<template>
  <v-container max-width="800">
    <!-- <v-row>
      <v-col>
        <import-export-section />
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <page-setup-section />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <exercise-section />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <system-setup-section />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <about-section />
      </v-col>
    </v-row>
  </v-container>
</template>
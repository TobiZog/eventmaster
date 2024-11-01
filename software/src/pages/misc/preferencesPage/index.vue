<script setup lang="ts">
import pageSetup from './pageSetup.vue';
import systemSetup from './systemSetup.vue';
import aboutSection from './aboutSection.vue';
</script>

<template>
  <v-container max-width="800">
    <v-row>
      <v-col>
        <page-setup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <system-setup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <about-section />
      </v-col>
    </v-row>
  </v-container>
</template>
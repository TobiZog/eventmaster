<script setup lang="ts">
import pageSetup from './pageSetupSection.vue';
import systemSetup from './systemSetupSection.vue';
import aboutSection from './aboutSection.vue';
import exerciseSection from './exerciseConfig/exerciseSection.vue';
import importExportSection from './importExportSection.vue';
</script>

<template>
  <v-container max-width="800">
    <v-row>
      <v-col>
        <import-export-section />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <page-setup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <exercise-section />
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
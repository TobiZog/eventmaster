<script setup lang="ts">
import pageSetup from './pageSetupSection.vue';
import systemSetup from './systemSetupSection.vue';
import aboutSection from './aboutSection.vue';
import userSection from './userSection.vue';
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
        <user-section />
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
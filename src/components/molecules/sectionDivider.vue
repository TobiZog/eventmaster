<script setup lang="ts">
import horizontalLine from "../atoms/horizontalLine.vue";
import headerText from "../atoms/headerText.vue";

defineProps({
  // Title text
  title: String,

  // Activate loading state
  loading: Boolean,
});
</script>

<template>
  <!-- Layout for displays >=md -->
  <v-row class="pt-3 d-none d-md-flex">
    <!-- Left line -->
    <v-col class="d-flex justify-center align-center">
      <horizontal-line />
    </v-col>

    <!-- Title -->
    <v-col class="v-col-auto">
      <header-text :loading="loading" :title="title" />
    </v-col>

    <!-- Right line -->
    <v-col class="d-flex justify-center align-center">
      <horizontal-line />
    </v-col>
  </v-row>

  <!-- Layout for display <md -->

  <v-row class="d-md-none">
    <v-col>
      <header-text :loading="loading" :title="title" />
    </v-col>
  </v-row>

  <v-row class="d-md-none">
    <v-col class="d-flex justify-center align-center">
      <horizontal-line />
    </v-col>
  </v-row>
</template>

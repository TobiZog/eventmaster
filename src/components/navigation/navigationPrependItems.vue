<script setup lang="ts">
</script>

<template>
  <v-card
    :link="true"
    rounded="0"
    elevation="0"
    class="mr-5"
    to="/"
  >
    <v-img src="logo.png" width="80" />
  </v-card>
  
  <div class="d-md-none">

  <v-menu>
    <template #activator="{ props }">
      <v-btn
        icon="mdi-menu"
        v-bind="props"
      />
    </template>

    <v-list>
      <v-list-item
        to="/bands"
        prepend-icon="mdi-guitar-electric"
      >
        {{ $t('band.allBands', 2) }}
      </v-list-item>

      <v-list-item
        to="/concerts"
        prepend-icon="mdi-ticket"
      >
        {{ $t('concert.allConcerts', 2) }}
      </v-list-item>

      <v-list-item
        to="/locations"
        prepend-icon="mdi-city"
      >
        {{ $t('location.allLocations', 2) }}
      </v-list-item>
    </v-list>
  </v-menu>
  </div>

  

  <v-divider vertical class="d-none d-md-flex" />

  <v-btn
    to="/bands"
    prepend-icon="mdi-guitar-electric"
    height="100%"
    :rounded="false"
    class="d-none d-md-flex"
  >
    {{ $t('band.allBands', 2) }}
  </v-btn>

  <v-divider vertical class="d-none d-md-flex" />

  <v-btn
    to="/concerts"
    prepend-icon="mdi-ticket"
    height="100%"
    :rounded="false"
    class="d-none d-md-flex"
  >
    {{ $t('concert.allConcerts', 2) }}
  </v-btn>

  <v-divider vertical class="d-none d-lg-flex" />


  <v-btn
    to="/locations"
    prepend-icon="mdi-city"
    height="100%"
    :rounded="false"
    class="d-none d-md-flex"
  >
    {{ $t('location.allLocations', 2) }}
  </v-btn>

  <v-divider vertical class="d-none d-md-flex" />
</template>
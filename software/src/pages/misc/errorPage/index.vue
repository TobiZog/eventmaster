<script setup lang="ts">
console.log("Error Page")
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-empty-state
          :headline="$t('misc.404.headline')"
          :title="$t('misc.404.title')"
          icon="mdi-robot-dead"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
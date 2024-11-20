<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const path = ref("https://www.eventmaster.com" + router.currentRoute.value.fullPath)

function navigate() {
  let newPath = path.value.substring(path.value.indexOf('.com') + 4)
  router.push(newPath)
}

watch(() => router.currentRoute.value.fullPath, () => {
  path.value = "https://www.eventmaster.com" + router.currentRoute.value.fullPath
})
</script>

<template>
  <v-app-bar
    elevation="0"
    height="50"
  >
    <v-row no-gutters>
      <v-spacer />
      <v-col
        cols="2"
        class="d-flex justify-end align-center pr-1"
      >
        <v-btn
          density="comfortable"
          icon="mdi-arrow-left"
          @click="router.go(-1)"
        />
        <v-btn
          density="comfortable"
          icon="mdi-arrow-right"
          @click="router.go(1)"
        />
        
      </v-col>

      <v-col cols="8">
        <v-text-field
          variant="outlined"
          density="compact"
          hide-details
          @keyup.enter="navigate"
          v-model="path"
        />
      </v-col>

      <v-col
        cols="2"
        class="d-flex justify-start align-center pl-1"
      >
        <v-btn
          density="comfortable"
          icon="mdi-arrow-right"
          @click="navigate"
        />
        <v-btn
          density="comfortable"
          icon="mdi-refresh"
          @click="router.replace({ path: router.currentRoute.value.fullPath })"
        />
      </v-col>

    </v-row>
  </v-app-bar>
</template>
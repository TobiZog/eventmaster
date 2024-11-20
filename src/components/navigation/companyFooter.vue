<script setup lang="ts">
import { useExerciseStore } from '@/stores/exercise.store';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const routeItems = ref(route.path.split('/'))
const exerciseStore = useExerciseStore()

watch(() => route.path, () => {
  routeItems.value = route.path.split("/")
  routeItems.value = routeItems.value.filter(value => value != "")
  
  for (let item in routeItems.value) {
    item.charAt(0).toUpperCase() + item.slice(1)
  }
})
</script>

<template>
  <v-footer
    color="primary"
    absolute
    inset
    app
  >
    <v-container>
      <!-- Current location -->
      <v-row class="w-100">
        <v-col class="d-flex justify-center">
          <v-breadcrumbs
            :items="routeItems"
            v-if="routeItems.length != 0 && routeItems[0] != ''"
          >
            <template v-slot:title="{ item }">
              <v-card variant="outlined" class="pa-2" rounded="0">
                {{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }}
              </v-card>
            </template>

            <template v-slot:divider>
              <v-icon icon="mdi-forward"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>

      <!-- Attributes -->
      <v-row>
        <v-col class="d-flex justify-center">
          <div v-for="query in route.query" v-html="query" />

          <!-- Logic to check, if exercise 3.1 is solved -->
          <div v-for="query in route.query">
            <span v-if="String(query).startsWith('<img src=1 onerror=alert(')">
              {{ exerciseStore.solveExercise(3, 1) }}
            </span>

            <span v-if="String(query).startsWith('<img src=1 onerror=import(')">
              {{ exerciseStore.solveExercise(3, 2) }}
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
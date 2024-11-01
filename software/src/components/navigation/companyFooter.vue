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
    <v-container class="pa-0 ma-0">
      <v-row class="mb-0 pa-0">
        <v-spacer />

        <v-col>
          <!-- todo: Make more beautiful -->
          <v-breadcrumbs :items="routeItems">
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

        <v-col>
          Filter:
          <div v-for="query in route.query" v-html="query" />

          <!-- Logic to check, if exercise 3.1 is solved -->
          <div v-for="query in route.query">
            <span v-if="String(query).startsWith('<iframe')">
              {{ exerciseStore.solveExercise(3, 1) }}
            </span>
          </div>
        </v-col>

        <v-spacer />      
      </v-row>

      <v-row class="pa-0 ma-0">
        <v-col class="text-center">
          {{ new Date().getFullYear() }} — <strong>Tobias Zoghaib</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
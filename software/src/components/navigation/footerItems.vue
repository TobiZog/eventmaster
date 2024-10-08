<script setup lang="ts">
import { getAllExerciseGroups, updateExercise } from '@/data/api/exerciseApi';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const routeItems = ref(route.path.split('/'))

function solveExerciseXssInUrl() {
  updateExercise(3, 1, true)
}

watch(() => route.path, () => {
  routeItems.value = route.path.split("/")
  routeItems.value = routeItems.value.filter(value => value != "")
  
  for (let item in routeItems.value) {
    item.charAt(0).toUpperCase() + item.slice(1)
  }
})
</script>

<template>
    <v-row>
      <v-spacer />

      <v-col>
        {{ $t('youAreHere') }}
        <v-breadcrumbs :items="routeItems">
          <template v-slot:title="{ item }">
            {{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }}
          </template>

          <template v-slot:divider>
            <v-icon icon="mdi-forward"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>

      <v-col>
        Filter:
        <div v-for="query in route.query" v-html="query" />

        <div v-for="query in route.query">
          <span v-if="String(query).startsWith('<iframe')">
            {{ solveExerciseXssInUrl() }}
          </span>
        </div>
      </v-col>

      <v-spacer />
    </v-row>
</template>
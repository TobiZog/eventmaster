<script setup lang="ts">
defineProps({
  /** Displayed smaller text on the left side */
  descriptionText: {
    type: String,
    default: ""
  },

  /** Displayed bigger text on the right side */
  valueText: [ String, Number ]
})
</script>

<template>
  <v-card variant="outlined" class="my-1 px-2">
    <v-row class="d-flex justify-center align-center">
      <v-col class="text-caption text-left" v-if="descriptionText.length > 0">
        {{ descriptionText }}
      </v-col>

      <v-col class="text-h5 font-weight-bold text-right">
        {{ valueText }}
      </v-col>
    </v-row>
  </v-card>
</template>
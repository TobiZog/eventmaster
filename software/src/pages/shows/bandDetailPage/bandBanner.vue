<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <div class="position-relative top-0 left-0">
    <v-img
      :src="'http://localhost:3000/static/bands/' + band.imageMembers"
      height="600"
      gradient="to top, rgba(0, 0, 0, .9), rgba(255, 255, 255, 0.1)"
      cover
    >
      <div class="position-absolute bottom-0 pa-5">
        <v-row>
          <v-col cols="2">
            <v-card>
              <v-img
                :src="'http://localhost:3000/static/bands/' + band.logo"
                height="200"
                aspect-ratio="1"
                cover
              />
            </v-card>
          </v-col>

          <v-col>
            <p class="text-h3">{{ band.name }}</p>
            <p class="text-h6">{{ band.descriptionDe }}</p>
          </v-col>
        </v-row>
        
      </div>
    </v-img>
  </div>
</template>
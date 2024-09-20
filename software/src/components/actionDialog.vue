<script setup lang="ts">
import { ModelRef } from 'vue';

const showDialog: ModelRef<boolean> = defineModel()

defineProps({
  title: String,
  subtitle: String,
  imageUrl: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <v-dialog max-width="1000" v-model="showDialog">
    <v-card :title="title" :subtitle="subtitle" >
      <v-container>
        <v-row>
          <v-col>
            <v-img v-if="imageUrl != ''" :src="imageUrl" max-height="600" />
          </v-col>

          <v-col>
            <v-card-text>
              <slot name="content"></slot>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
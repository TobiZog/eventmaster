<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';

const props = defineProps({
  exerciseGroup: String,
  progress: Number,
  totalSteps: Number,
  stepNames: Array<String>
})

function getDotColor(step: number) {
  if (props.progress >= step) {
    return "green"
  } else {
    return "grey"
  }
}

function getIcon(step: number) {
  if (props.progress >= step) {
    return "mdi-check"
  } else {
    return "mdi-pencil"
  }
}
</script>

<template>
  <card-view :title="exerciseGroup" >
    <v-timeline
      direction="horizontal"
      side="end"
      class="pb-3"
    >
      <v-timeline-item
        v-for="step in totalSteps"
        :dot-color="getDotColor(step)"
        :icon="getIcon(step)"
      >
        {{ stepNames[step - 1] }}

        <template #opposite>
          {{ $t('scoreBoard.exercise', [step]) }}
        </template>
        
      </v-timeline-item>
    </v-timeline>
  </card-view>
</template>
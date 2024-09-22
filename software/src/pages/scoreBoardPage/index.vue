<script setup lang="ts">
import scoreCard from './scoreCard.vue';
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <score-card
          :title="$t('scoreBoard.exerciseGroup0')"
          :progress="2"
          :total-steps="2"
          :step-names="['Registrieren', 'Bestellung ausführen']"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <score-card
          :title="$t('scoreBoard.exerciseGroup1')"
          :progress="1"
          :total-steps="4"
          :step-names="['', '']"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <score-card
          :title="$t('scoreBoard.exerciseGroup2')"
          :progress="1"
          :total-steps="4"
          :step-names="['', '']"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <score-card
          :title="$t('scoreBoard.exerciseGroup3')"
          :progress="0"
          :total-steps="3"
          :step-names="['', '', '']"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
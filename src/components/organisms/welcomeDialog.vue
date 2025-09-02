<script setup lang="ts">
import actionDialog from '@/components/organisms/actionDialog.vue';
import outlinedButton from '@/components/atoms/outlinedButton.vue';
import { useFeedbackStore } from '@/stores/feedback.store';
import { usePreferencesStore } from '@/stores/preferences.store';
import { ref, watch } from 'vue';
import step1 from './step1.vue';
import step2 from './step2.vue';
import step3 from './step3.vue';
import step4 from './step4.vue';

const preferencesStore = usePreferencesStore()
const feedbackStore = useFeedbackStore()
const showDialog = defineModel()
const currentStep = ref(1)
const databaseCreated = ref(false)

const steps = [
  feedbackStore.i18n.t('misc.firstStartup.connectToServer'),
  feedbackStore.i18n.t('misc.firstStartup.lookAndFeel'),
  feedbackStore.i18n.t('misc.firstStartup.database'),
  feedbackStore.i18n.t('misc.firstStartup.userData'),
]

preferencesStore.getServerState()


watch(() => currentStep.value, async () => {
  if (currentStep.value == 3 && !databaseCreated.value) {
    await preferencesStore.resetDb();
    await preferencesStore.resetExerciseProg();

    databaseCreated.value = true;
  }
})
</script>

<template>
  <action-dialog
    v-model="showDialog"
    :title="$t('misc.firstStartup.title')"
    icon="mdi-human-greeting"
    max-width="800"
    persistent
  >
    <v-stepper
      v-model="currentStep"
      alt-labels
      flat
    >
      <template #default="{ prev, next }">
        <!-- Header items -->
        <v-stepper-header>
          <template v-for="(step, n) in steps">
            <v-stepper-item
              :complete="currentStep > n + 1"
              :title="step"
              :value="n + 1"
              complete-icon="mdi-check"
              color="success"
            />

            <v-divider v-if="n < steps.length - 1" />
          </template>
        </v-stepper-header>


        <!-- Content -->
        <v-stepper-window>
          <!-- Step 1: Check connection to backend server -->
          <v-stepper-window-item
            :value="1"
          >
            <step1 />
          </v-stepper-window-item>


          <!-- Step 2: Select theme and language -->
          <v-stepper-window-item
            :value="2"
            
          >
            <step2 />
          </v-stepper-window-item>

          <!-- Step 3: Reset the database -->
          <v-stepper-window-item
            :value="3"
          >
            <step3 />
          </v-stepper-window-item>

          <!-- Step 4: Personal data -->
          <v-stepper-window-item
            :value="4"
          >
            <step4 />
          </v-stepper-window-item>
        </v-stepper-window>


        <!-- Next/Previous buttons -->
        <v-stepper-actions
          @click:next="next"
          @click:prev="prev"
        >
          <template #prev="{ props }">
            <outlined-button
              @click="props.onClick()"
              :disabled="currentStep == 1 || preferencesStore.fetchInProgress"
              color="grey"
              prepend-icon="mdi-arrow-left"
            >
              {{ $t('misc.actions.back') }}
            </outlined-button>
          </template>

          <template #next="{ props }">
            <outlined-button
              v-if="currentStep < steps.length"
              @click="props.onClick()"
              :disabled="preferencesStore.fetchInProgress"
              append-icon="mdi-arrow-right"
            >
              {{ $t('misc.actions.next') }}
            </outlined-button>

            <outlined-button
              v-else
              @click="showDialog = false; preferencesStore.firstStartup = false"
              :disabled="preferencesStore.studentName.length < 5 || 
                preferencesStore.registrationNumber.length < 8"
              append-icon="mdi-check"
              color="success"
            >
              {{ $t('misc.firstStartup.complete') }}
            </outlined-button>
          </template>
        </v-stepper-actions>
      </template>
    </v-stepper>
  </action-dialog>
</template>
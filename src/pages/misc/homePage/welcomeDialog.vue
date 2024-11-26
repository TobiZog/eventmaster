<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import ServerStateText from '@/components/pageParts/serverStateText.vue';
import { useFeedbackStore } from '@/stores/feedback.store';
import { usePreferencesStore } from '@/stores/preferences.store';
import { ref, watch } from 'vue';

const preferencesStore = usePreferencesStore()
const feedbackStore = useFeedbackStore()
const showDialog = defineModel()
const currentStep = ref(0)

const steps = [
  feedbackStore.i18n.t('misc.firstStartup.connectToServer'),
  feedbackStore.i18n.t('misc.firstStartup.database'),
  feedbackStore.i18n.t('misc.firstStartup.exercises'),
  feedbackStore.i18n.t('misc.firstStartup.userData'),
]

preferencesStore.getServerState()


watch(() => currentStep.value, () => {
  switch(currentStep.value) {
    case 2: {
      preferencesStore.resetDb();
      break;
    }

    case 3: {
      preferencesStore.resetExerciseProg();
      break;
    }

    case 4: {
      
      break;
    }
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
            class="text-h4 text-center"
          >
            <div>
              {{ $t('preferences.serverState') }}:
            </div>

            <server-state-text />
          </v-stepper-window-item>

          <!-- Step 2: Reset the database -->
          <v-stepper-window-item
            :value="2"
          >
            <div v-if="preferencesStore.fetchInProgress" class="text-center text-h4 pb-4">
              <div class="pb-4">
                {{ $t('misc.firstStartup.createDatabase') }}
              </div>

              <v-progress-linear indeterminate />
            </div>

            <div v-else class="text-center text-h4 pb-4 text-green">
              <v-icon icon="mdi-check" /> {{ $t('misc.firstStartup.finished') }}
            </div>
          </v-stepper-window-item>

          <!-- Step 3: Create exercises -->
          <v-stepper-window-item
            :value="3"
          >
            <div v-if="preferencesStore.fetchInProgress" class="text-center text-h4 pb-4">
              <div class="pb-4">
                {{ $t('misc.firstStartup.createExercises') }}
              </div>
              
              <v-progress-linear indeterminate />
            </div>

            <div v-else class="text-center text-h4 pb-4 text-green">
              <v-icon icon="mdi-check" /> {{ $t('misc.firstStartup.finished') }}
            </div>
          </v-stepper-window-item>

          <!-- Step 4: Personal data -->
          <v-stepper-window-item
            :value="4"
          >
            <v-container class="px-0 py-2">
              <v-row>
                <v-col>
                  <v-alert color="warning" icon="mdi-alert">
                    {{ $t('misc.firstStartup.enterYourPersonalData') }}
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    variant="outlined"
                    hide-details
                    :label="$t('misc.yourFullName')"
                    v-model="preferencesStore.studentName"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    variant="outlined"
                    hide-details
                    :label="$t('misc.registrationNumber')"
                    v-model="preferencesStore.registrationNumber"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-window-item>
        </v-stepper-window>


        <!-- Next/Previous buttons -->
        <v-stepper-actions
          @click:next="next"
        >
          <template #prev="{ props }">
            <v-spacer />
          </template>

          <template #next="{ props }">
            <outlined-button
              v-if="currentStep < 4"
              @click="props.onClick()"
              :disabled="preferencesStore.fetchInProgress"
            >
              {{ $t('misc.actions.next') }}
            </outlined-button>

            <outlined-button
              v-else
              @click="showDialog = false; preferencesStore.firstStartup = false"
              :disabled="preferencesStore.studentName.length == 0 || 
                preferencesStore.registrationNumber.length == 0"
              prepend-icon="mdi-check"
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
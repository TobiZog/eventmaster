<script setup lang="ts">
import accountDataCard from './accountDataCard.vue';
import accountManagingCard from './accountManagingCard.vue';
import addressesCard from './addressesCard.vue';
import paymentsCard from './paymentsCard.vue';
import { ref } from 'vue';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()
const updateInProgress = ref(false)

async function updateAccount() {
  updateInProgress.value = true

  await accountStore.updateAccount()

  updateInProgress.value = false
}
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <account-data-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <addresses-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <payments-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <account-managing-card />
      </v-col>
    </v-row>
  </v-container>

  <VLayoutItem model-value position="bottom" size="60">
    <div class="ma-4">
      <v-fab
        icon="mdi-content-save"
        location="right"
        color="green"
        absolute
        offset
        @click="updateAccount"
        :loading="updateInProgress"
      />
    </div>
  </VLayoutItem>
</template>
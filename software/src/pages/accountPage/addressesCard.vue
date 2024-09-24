<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import outlinedButton from '@/components/outlinedButton.vue';

const accountStore = useAccountStore()
</script>

<template>
  <card-view 
    icon="mdi-home"
    :title="$t('account.addresses')"
  >
    <v-expansion-panels>
      <v-expansion-panel
        v-for="address in accountStore.userAccount.addresses"
        :title="address.street + ' ' + address.houseNumber"
        color="grey"
      >
        <template #text>
          <v-row class="pt-5">
            <v-col>
              <v-text-field
                :label="$t('userInfo.street')"
                v-model="address.street"
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('userInfo.houseNumber')"
                v-model="address.houseNumber"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                :label="$t('userInfo.postalCode')"
                v-model="address.postalCode"
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('userInfo.city')"
                v-model="address.city"
              />
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <template #actions>
      <outlined-button
        @click="accountStore.updateAccount()"
        prepend-icon="mdi-content-save"
        color="green"
      >
        Save
      </outlined-button>
    </template>
  </card-view>
</template>
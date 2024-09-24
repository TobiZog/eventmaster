<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import outlinedButton from '@/components/outlinedButton.vue';
import { AddressModel } from '@/data/models/addressModel';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { getNumberStartRules, getPostalRules, getStringRules } from '@/scripts/validationRules';

const accountStore = useAccountStore()
</script>

<template>
  <card-view 
    icon="mdi-home"
    :title="$t('account.addresses')"
  >
    <v-expansion-panels v-if="accountStore.userAccount.addresses.length > 0">
      <v-expansion-panel
        v-for="address in accountStore.userAccount.addresses"
        color="primary"
      >
        <template #title>
          {{ address.street + ' ' + address.houseNumber }}
        </template>

        <template #text>
          <v-row class="pt-5">
            <v-col>
              <v-text-field
                :label="$t('userInfo.street')"
                v-model="address.street"
                :rules="getStringRules()"
                clearable
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('userInfo.houseNumber')"
                v-model="address.houseNumber"
                :rules="getNumberStartRules()"
                clearable
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                :label="$t('userInfo.postalCode')"
                v-model="address.postalCode"
                :rules="getPostalRules()"
                clearable
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('userInfo.city')"
                v-model="address.city"
                :rules="getStringRules()"
                clearable
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-center align-center">
              <outlined-button
                @click="accountStore.removeAddress(address)"
                color="red"
                prepend-icon="mdi-delete"
              >
                {{ $t('remove') }}
              </outlined-button>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-empty-state
      v-else
      :title="$t('account.noAddresses')"
      icon="mdi-home-off"
    />

    <template #actions>
      <outlined-button
        @click="accountStore.userAccount.addresses.push(new AddressModel())"
        prepend-icon="mdi-plus"
        color="green"
      >
        {{ $t('add') }}
      </outlined-button>
    </template>
  </card-view>
</template>
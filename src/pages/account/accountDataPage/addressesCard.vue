<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useAccountStore } from '@/stores/account.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { AddressModel } from '@/data/models/user/addressModel';
import { getNumberStartRules, getPostalRules, getStringRules } from '@/scripts/validationRules';

const accountStore = useAccountStore()
</script>

<template>
  <card-view 
    icon="mdi-home"
    :title="$t('account.userData.address', 2)"
  >
    <v-expansion-panels v-if="accountStore.userAccount.addresses != undefined && accountStore.userAccount.addresses.length > 0">
      <v-expansion-panel
        v-for="address in accountStore.userAccount.addresses"
        color="primary"
      >
        <template #title>
          <div v-if="address.street != undefined">
            {{ address.street }}
          </div>
          
          &nbsp;
          
          <div v-if="address.houseNumber != undefined">
            {{ address.houseNumber }}
          </div>
        </template>

        <template #text>
          <v-row class="pt-5">
            <v-col>
              <v-text-field
                :label="$t('account.userData.street')"
                v-model="address.street"
                :rules="getStringRules()"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('account.userData.houseNumber')"
                v-model="address.houseNumber"
                :rules="getNumberStartRules()"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                :label="$t('account.userData.postalCode')"
                v-model="address.postalCode"
                :rules="getPostalRules()"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('account.userData.placeOfResidence')"
                v-model="address.city"
                :rules="getStringRules()"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-center align-center">
              <outlined-button
                @click="accountStore.removeAddress(address)"
                color="error"
                prepend-icon="mdi-delete"
              >
                {{ $t('misc.actions.remove') }}
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
        color="success"
      >
        {{ $t('misc.actions.add') }}
      </outlined-button>
    </template>
  </card-view>
</template>
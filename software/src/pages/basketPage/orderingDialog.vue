<script setup lang="ts">
import actionDialog from '@/components/actionDialog.vue';
import { useBasketStore } from '@/data/stores/basketStore';
import outlinedButton from '@/components/outlinedButton.vue';
import { ModelRef, ref } from 'vue';
import { useAccountStore } from '@/data/stores/accountStore';

const basketStore = useBasketStore()
const accountStore = useAccountStore()
const showDialog: ModelRef<boolean> = defineModel()
const orderingInProgress = ref(false)

async function doOrder() {
  orderingInProgress.value = true
  await basketStore.takeOrder()
  
  showDialog.value = false
  orderingInProgress.value = false
}
</script>

<template>
  <action-dialog
    :title="$t('ordering.ordering')"
    icon="mdi-basket-check"
    v-model="showDialog"
    max-width="800"
  >
    <v-row>
      <v-col>
        Address
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-radio-group>
          <v-radio
            v-for="address in accountStore.userAccount.addresses"
            :value="address"
            :label="address.street + ' ' + address.houseNumber + ', ' + address.postalCode + ' ' + address.city"
          />
        </v-radio-group>
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button
        @click="doOrder"
        :loading="orderingInProgress"
      >
        {{ $t('ordering.takeOrder') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
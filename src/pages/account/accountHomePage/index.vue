<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import dashboardCard from '@/components/pageParts/dashboardCard.vue';
import { useOrderStore } from '@/stores/order.store';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { millisecondsToHumanReadableString } from '@/scripts/dateTimeScripts';

const accountStore = useAccountStore()
const orderStore = useOrderStore()
const router = useRouter()

orderStore.getOrdersOfAccount(accountStore.userAccount, accountStore.userAccountToken)
accountStore.refreshAccount()
</script>

<template>
  <v-container>
    <v-row>
      <dashboard-card
        :title="$t('order.order', 2)"
        icon="mdi-basket-check"
        :first-line="orderStore.orders.length + ' ' + $t('order.order', 2)"
        :second-line="$t('order.ordersDescription')"
        button-route="/account/orders"
        :loading="orderStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('account.accountManagement')"
        icon="mdi-account"
        :first-line="accountStore.userAccount.username"
        :second-line="$t('account.accountManagementDescription')"
        :loading="accountStore.fetchInProgress"
        button-route="/account/data"
      />

      <dashboard-card
        :title="$t('account.addressManagement')"
        icon="mdi-city"
        :first-line="accountStore.userAccount.addresses?.length + ' ' + 
          $t('account.userData.address', accountStore.userAccount.addresses?.length)"
        :second-line="$t('account.addressManagementDetails')"
        :loading="accountStore.fetchInProgress"
        button-route="/account/addresses"
      />

      <dashboard-card
        :title="$t('account.paymentsManagement', 2)"
        icon="mdi-currency-eur"
        :first-line="accountStore.userAccount.payments?.length + ' ' + 
          $t('account.userData.payment', accountStore.userAccount.payments?.length)"
        :second-line="$t('account.managePaymentsDescription')"
        :loading="accountStore.fetchInProgress"
        button-route="/account/payments"
      />

      <dashboard-card
        :title="$t('account.logout.logout')"
        :first-line="millisecondsToHumanReadableString(moment().diff(moment(accountStore.loggedInTimeStamp))) + ' h ' + $t('account.sessionTime')"
        :second-line="$t('account.logout.logoutDescription')"
        icon="mdi-logout"
      >
        <template #actions>
          <outlined-button
            color="error"
            @click="accountStore.logout(); router.push('/account/login')"
          >
            {{ $t('account.logout.logout') }}
          </outlined-button>
        </template>
      </dashboard-card>
    </v-row>
  </v-container>
</template>
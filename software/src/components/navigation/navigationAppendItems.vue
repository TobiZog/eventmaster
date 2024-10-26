<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import { useBasketStore } from '@/stores/basket.store';

const accountStore = useAccountStore()
const basketStore = useBasketStore()
</script>

<template>
  <v-btn variant="plain" icon="mdi-magnify" to="/search" />

  <v-btn v-if="accountStore.userAccount.id == undefined" variant="plain" icon="mdi-account" to="/account/login" />
  <v-btn v-else variant="plain" icon="mdi-account-check" to="/account/home" />

  <div>
    <v-badge
      :content="basketStore.itemsInBasket.reduce((tot, item) => {
        return tot + item.seats.length
      }, 0)"
      color="red" offset-x="8" offset-y="8">
      <v-btn variant="plain" icon="mdi-cart" to="/basket" />
    </v-badge>
  </div>

  <v-btn
    v-if="accountStore.userAccount.accountRole != null && 
      accountStore.userAccount.accountRole.privilegeAdminPanel"
    variant="plain"
    icon="mdi-table-cog"
    to="/admin"
  />

  <v-btn variant="plain" icon="mdi-help" to="/help" />
  <v-btn variant="plain" icon="mdi-cog" to="/preferences"/>
</template>
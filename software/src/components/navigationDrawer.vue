<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';
import { useBasketStore } from '@/data/stores/basketStore';
import vuetify from '@/plugins/vuetify';

const userStore = useUserStore()
const basketStore = useBasketStore()
const navRail = defineModel("navRail", { type: Boolean })
</script>

<template>
  <v-list>
    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.shopping') }}</div>
      <div v-else></div>
    </v-list-subheader>
    <v-list-item :title="$t('menu.products')" prepend-icon="mdi-store" to="/" link />
    <v-list-item :title="$t('menu.basket')" to="/basket" link >
      <template v-slot:prepend>
        <v-badge color="primary" :content="basketStore.itemsInBasket.length">
          <v-icon icon="mdi-cart" />
        </v-badge>
      </template>
    </v-list-item>

    <v-divider />

    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.account') }}</div>
      <div v-else></div>
    </v-list-subheader>
    <v-list-item v-if="userStore.userAccountId == -1" :title="$t('menu.login')" prepend-icon="mdi-login" to="/login" link />
    <v-list-item v-else :title="$t('logout')" prepend-icon="mdi-logout" @click="userStore.userAccountId = -1" link />

    <v-list-item v-if="userStore.userAccountId != -1" :title="$t('menu.account')" prepend-icon="mdi-account" to="/account" link />
    <v-list-item v-if="userStore.userAccountId != -1" :title="$t('menu.orders')" prepend-icon="mdi-cart-check" to="/orders" link />

    <v-divider />
    
    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.systemAndHelp') }}</div>
      <div v-else></div>
    </v-list-subheader>
    <v-list-item :title="$t('menu.helpInstructions')" prepend-icon="mdi-chat-question" to="/help" link />
    <v-list-item :title="$t('menu.preferences')" prepend-icon="mdi-cog" to="/preferences" link />
  </v-list>
</template>
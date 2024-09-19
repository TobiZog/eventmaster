<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';
import { useBasketStore } from '@/data/stores/basketStore';

const userStore = useUserStore()
const basketStore = useBasketStore()
const navRail = defineModel("navRail", { type: Boolean })
</script>

<template>
  <v-list>
    <!-- Shopping Section -->

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


    <!-- Account Section -->

    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.account') }}</div>
      <div v-else></div>
    </v-list-subheader>

    <v-expand-transition>
      <div v-if="!userStore.loggedIn">
        <v-list-item v-if="!userStore.loggedIn" :title="$t('menu.login')" prepend-icon="mdi-login" to="/login" link />
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div v-if="userStore.loggedIn">
        <v-list-item :title="$t('menu.account')" prepend-icon="mdi-account" to="/account" link />
        <v-list-item :title="$t('menu.orders')" prepend-icon="mdi-cart-check" to="/orders" link />
        <v-list-item :title="$t('menu.logout')" prepend-icon="mdi-logout" @click="userStore.logout" link />
      </div>
    </v-expand-transition>

    <v-divider />


    <!-- System and help section -->
    
    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.systemAndHelp') }}</div>
      <div v-else></div>
    </v-list-subheader>
    <v-list-item :title="$t('menu.helpInstructions')" prepend-icon="mdi-chat-question" to="/help" link />
    <v-list-item :title="$t('menu.preferences')" prepend-icon="mdi-cog" to="/preferences" link />
  </v-list>
</template>
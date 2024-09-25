<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()
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
      <div v-if="accountStore.userAccount.id == null">
        <v-list-item v-if="accountStore.userAccount.id == null" :title="$t('menu.login')" prepend-icon="mdi-login" to="/login" link />
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div v-if="accountStore.userAccount.id != null">
        <v-list-item :title="$t('menu.account')" prepend-icon="mdi-account" to="/account" link />
        <v-list-item :title="$t('menu.orders')" prepend-icon="mdi-cart-check" to="/orders" link />
        <v-list-item :title="$t('menu.logout')" prepend-icon="mdi-logout" @click="accountStore.logout" link />
      </div>
    </v-expand-transition>

    <v-divider />


    <!-- System and help section -->
    
    <v-list-subheader>
      <div v-if="!navRail">{{ $t('menu.systemAndHelp') }}</div>
      <div v-else></div>
    </v-list-subheader>
    <v-list-item :title="$t('menu.helpInstructions')" prepend-icon="mdi-chat-question" to="/help" link />
    <v-list-item :title="$t('menu.scoreBoard')" prepend-icon="mdi-podium-gold" to="/scoreBoard" link />
    <v-list-item :title="$t('menu.preferences')" prepend-icon="mdi-cog" to="/preferences" link />


    <div v-if="accountStore.userAccount.accountRole.privilegeAdminPanel">
      <v-divider />

      <v-list-subheader>
        <div v-if="!navRail">{{ $t('menu.admin.admin') }}</div>
        <div v-else></div>
      </v-list-subheader>

      <v-list-item :title="$t('menu.admin.dashboard')" prepend-icon="mdi-view-dashboard" to="/admin/dashboard" link />
      <v-list-item :title="$t('menu.admin.categories')" prepend-icon="mdi-label" to="/admin/categories" link />
      <v-list-item :title="$t('brand', 2)" prepend-icon="mdi-factory" to="/admin/brands" link />
      <v-list-item :title="$t('menu.admin.products')" prepend-icon="mdi-store-cog" to="/admin/products" link />
      <v-list-item :title="$t('menu.admin.accounts')" prepend-icon="mdi-account-multiple" to="/admin/accounts" link />
    </div>
    
  </v-list>
</template>
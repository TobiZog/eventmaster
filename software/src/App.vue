<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from './data/stores/userStore';
import vuetify from './plugins/vuetify';
import { useBasketStore } from './data/stores/basketStore';
import { i18n } from './plugins/i18n';

const userStore = useUserStore()
const basketStore = useBasketStore()
const theme = useTheme()
const navRail = ref(vuetify.display.mobile)

theme.global.name.value = userStore.theme
i18n.global.locale = userStore.language
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navRail = !navRail" />

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer :rail="navRail" permanent>
      <v-list>
        <v-list-subheader>
          <div v-if="!navRail">{{ $t('menu.shopping') }}</div>
          <div v-else></div>
        </v-list-subheader>
        <v-list-item :title="$t('menu.products')" prepend-icon="mdi-store" to="/products" link />
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
        <v-list-item :title="$t('menu.login')" prepend-icon="mdi-login" to="/login" link />
        <v-list-item :title="$t('menu.account')" prepend-icon="mdi-account" to="/account" link />
        <v-list-item :title="$t('menu.orders')" prepend-icon="mdi-cart-check" to="/orders" link />

        <v-divider />
        
        <v-list-subheader>
          <div v-if="!navRail">{{ $t('menu.systemAndHelp') }}</div>
          <div v-else></div>
        </v-list-subheader>
        <v-list-item :title="$t('menu.helpInstructions')" prepend-icon="mdi-chat-question" to="/help" link />
        <v-list-item :title="$t('menu.preferences')" prepend-icon="mdi-cog" to="/preferences" link />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- Here changes the router the content -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

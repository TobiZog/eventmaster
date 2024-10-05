<script setup lang="ts">
import { useAccountStore } from '@/data/stores/accountStore';
import { useBasketStore } from '@/data/stores/basketStore';
import router from '@/plugins/router';

const accountStore = useAccountStore()
const basketStore = useBasketStore()

function startSearch() {
  // todo
  router.push("/shows/search")
}
</script>

<template>
  <v-text-field
    variant="outlined"
    append-inner-icon="mdi-magnify"
    density="compact"
    class="mt-5 mr-5"
    @click:append-inner="startSearch"
    width="400"
  />

  <v-btn v-if="accountStore.userAccount.id == 0" variant="plain" icon="mdi-account" to="/account/login" />
  <v-btn v-else variant="plain" icon="mdi-account" to="/account/home" />

  <div>
    <v-badge
      :content="basketStore.itemsInBasket.reduce((tot, item) => {
        return tot + item.seats.length
      }, 0)"
      color="red" offset-x="8" offset-y="8">
      <v-btn variant="plain" icon="mdi-cart" to="/basket" />
    </v-badge>
  </div>

  <v-btn variant="plain" icon="mdi-help" to="/system/help" />
  <v-btn variant="plain" icon="mdi-cog" to="/system/preferences"/>
</template>
<script setup lang="ts">
import { useAccountStore } from "@/stores/account.store";
import { useBasketStore } from "@/stores/basket.store";
import { useExerciseStore } from "@/stores/exercise.store";
import { ref, watch } from "vue";

const accountStore = useAccountStore();
const basketStore = useBasketStore();
const exerciseStore = useExerciseStore();
const basketItems = ref(0);

exerciseStore.getAllExercises();

watch(
  () => basketStore.itemsInBasket,
  () => {
    basketItems.value = basketStore.itemsInBasket.reduce((tot, item) => {
      return tot + item.seats.length;
    }, 0);
  }
);
</script>

<template>
  <!-- Global search -->
  <v-tooltip :text="$t('misc.search.globalsearch')" location="bottom">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="plain" icon="mdi-magnify" to="/search" />
    </template>
  </v-tooltip>

  <!-- Account -->
  <v-tooltip :text="$t('account.account')" location="bottom">
    <template #activator="{ props }">
      <v-btn
        v-if="accountStore.userAccountToken == ''"
        v-bind="props"
        variant="plain"
        icon="mdi-account"
        to="/account/login"
      />

      <v-btn
        v-else
        v-bind="props"
        variant="plain"
        icon="mdi-account-check"
        to="/account/home"
      />
    </template>
  </v-tooltip>

  <!-- Basket -->
  <v-tooltip :text="$t('basket.basket')" location="bottom">
    <template #activator="{ props }">
      <v-badge
        v-if="basketItems > 0"
        :content="basketItems"
        color="error"
        offset-x="8"
        offset-y="8"
      >
        <v-btn v-bind="props" variant="plain" icon="mdi-cart" to="/basket" />
      </v-badge>

      <v-btn
        v-else
        v-bind="props"
        variant="plain"
        icon="mdi-cart"
        to="/basket"
      />
    </template>
  </v-tooltip>

  <!-- Exercise page -->
  <v-tooltip :text="$t('misc.firstStartup.exercises')" location="bottom">
    <template #activator="{ props }">
      <v-badge
        v-if="exerciseStore.exercisePageVisible"
        :content="
          exerciseStore.exercises.reduce((tot, exercise) => {
            if (exercise.available && !exercise.solved) {
              return tot + 1;
            } else {
              return tot;
            }
          }, 0)
        "
        color="error"
        offset-x="8"
        offset-y="8"
      >
        <v-btn
          v-bind="props"
          variant="plain"
          icon="mdi-book-open-blank-variant"
          to="/help"
        />
      </v-badge>
    </template>
  </v-tooltip>

  <!-- Admin panel -->
  <v-tooltip :text="$t('admin.adminpanel')" location="bottom">
    <template #activator="{ props }">
      <v-btn
        v-if="accountStore.adminPanelVisible"
        v-bind="props"
        variant="plain"
        icon="mdi-table-cog"
        to="/admin"
      />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('preferences.preferences')" location="bottom">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="plain" icon="mdi-cog" to="/preferences" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import { useOrderStore } from '@/stores/order.store';
import moment from 'moment';
import { title } from 'process';

const orderStore = useOrderStore()

const headers = [
  { title: "Account", value: "account.username" },
  { title: "Name", value: "account" },
  { title: "Bestellt am", value: "orderedAt" },
  { title: "Adresse", value: "street" },
  { title: "Stadt", value: "city" },
  { title: "Versendet", value: "shipped" },
  { title: "", value: "edit", width: 130 }
]

orderStore.getAllOrders()
</script>

<template>
  <admin-data-layout>
    <v-data-table
      :headers="headers"
      :items="orderStore.orders"
    >
      <template #item.account="{ item }">
        {{ item.account.firstName }} {{ item.account.lastName }}
      </template>

      <template #item.orderedAt="{ item }">
        {{ moment(item.orderedAt).format("DD.MM.YYYY, HH:mm:ss") }}
      </template>

      <template #item.street="{ item }">
        {{ item.address.street }} {{ item.address.houseNumber }}
      </template>

      <template #item.city="{ item }">
        {{ item.address.postalCode }} {{ item.address.city }}
      </template>

      <template #item.shipped="{ item }">
        <v-icon
          :icon="item.shipped ? 'mdi-check' : 'mdi-close'"
          :color="item.shipped ? 'green' : 'red'"
        />
      </template>

      <template #item.edit="{ item }">
        <v-btn
          icon="mdi-eye"
          variant="plain"
        />

        <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="orderStore.deleteOrder(item)"
        />
      </template>

    </v-data-table>
  </admin-data-layout>
</template>
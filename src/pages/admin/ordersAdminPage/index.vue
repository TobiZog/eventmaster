<script setup lang="ts">
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import { useOrderStore } from '@/stores/order.store';
import moment from 'moment';
import OrderDetailDialog from './orderDetailDialog.vue';

const orderStore = useOrderStore()

const headers = [
  { title: "Account", value: "account.username" },
  { title: "Name", value: "account" },
  { title: "Bestellt am", value: "orderedAt" },
  { title: "Adresse", value: "street" },
  { title: "Stadt", value: "city" },
  { title: "Versendet", value: "shipped" },
  { title: "Aktionen", value: "edit", width: 130 }
]

orderStore.getAllOrders()
</script>

<template>
  <admin-data-layout
    :hide-add-button="true"
  >
    <v-data-table
      :headers="headers"
      :items="orderStore.orders"
      :loading="orderStore.fetchInProgress"
      :items-per-page="100"
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
          :color="item.shipped ? 'success' : 'error'"
        />
      </template>

      <template #item.edit="{ item }">
        <v-btn
          icon="mdi-eye"
          variant="plain"
          @click="orderStore.openDetails(item)"
        />

        <v-btn
          :icon="item.shipped ? 'mdi-close-circle-outline' : 'mdi-check-circle-outline'"
          variant="plain"
          :color="item.shipped ? 'error' : 'success'"
          @click="orderStore.changeOrderShippedState(item, !item.shipped)"
        />
      </template>

    </v-data-table>
  </admin-data-layout>

  <order-detail-dialog />
</template>
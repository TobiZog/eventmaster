<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useOrderStore } from '@/stores/order.store';
import moment from 'moment';

const orderStore = useOrderStore()
</script>

<template>
  <action-dialog
    v-model="orderStore.showDetailDialog"
    :title="$t('order.order')"
    icon="mdi-basket"
  >
    <v-list>
      <v-list-subheader>
        {{ $t('ticket.ticket', 2) }}
      </v-list-subheader>

      <v-list-item v-for="ticket of orderStore.order.tickets">
        {{ moment(ticket.concert.date).format("DD.MM.YYYY") }} - 
        {{ ticket.concert.band.name }} - {{ ticket.concert.name }}
      </v-list-item>
    </v-list>
  </action-dialog>
</template>
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
    max-width="800"
  >
    <v-list>
      <v-list-subheader>
        {{ $t('account.account') }}
      </v-list-subheader>

      <v-list-item prepend-icon="mdi-account">
        {{ orderStore.order.account.username }}
      </v-list-item>

      <v-list-item prepend-icon="mdi-card-account-details">
        {{ orderStore.order.account.firstName }} {{ orderStore.order.account.lastName }}
      </v-list-item>

      <v-list-item prepend-icon="mdi-home">
        {{ orderStore.order.address.street }} {{ orderStore.order.address.houseNumber }}
      </v-list-item>

      <v-list-item prepend-icon="mdi-city">
        {{ orderStore.order.address.postalCode }} {{ orderStore.order.address.city }}
      </v-list-item>

      <v-list-subheader>
        {{ $t('order.order') }}
      </v-list-subheader>

      <v-list-item prepend-icon="mdi-calendar">
        {{ moment(orderStore.order.orderedAt).format("DD.MM.YYYY, HH:mm:ss") }}
      </v-list-item>

      <v-list-item prepend-icon="mdi-truck">
        {{ orderStore.order.shipped ? 'Versendet' : 'Nicht versendet' }}
      </v-list-item>

      <v-list-item>
        <v-table>
          <thead>
            <tr>
              <th>{{ $t('concert.date') }}</th>
              <th>{{ $t('concert.name') }}</th>
              <th>{{ $t('band.name') }}</th>
              <th>{{ $t('location.name') }}</th>
              <th>{{ $t('location.seat.seatGroup') }}</th>
              <th>{{ $t('location.seat.seatRow') }}</th>
              <th>{{ $t('location.seat.seat') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="ticket of orderStore.order.tickets">
              <td>{{ moment(ticket.concert.date).format("DD.MM.YYYY") }}</td>
              <td>{{ ticket.concert.name }}</td>
              <td>{{ ticket.concert.band.name }}</td>
              <td>{{ ticket.concert.location.name }}</td>
              <td>{{ ticket.seat.seatRow.seatGroup.name }}</td>
              <td>{{ ticket.seat.seatRow.row }}</td>
              <td>{{ ticket.seat.seatNr }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-list-item>
    </v-list>
  </action-dialog>
</template>
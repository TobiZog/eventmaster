<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import ticketListItem from '@/components/pageParts/ticketListItem.vue';
import { OrderApiModel } from '@/data/models/apiEndpoints/orderApiModel';
import moment from 'moment';

defineProps({
  order: OrderApiModel,
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <card-view
    :title="$t('order.orderedAt') + ' ' + moment(order.orderedAt).format('DD.MM.YY, HH:mm') + ' ' + $t('order.oclock')"
    variant="outlined"
  >
    <v-row>
      <v-col>
        <v-card variant="outlined" class="ml-5 pa-3">
          <div class="text-h6">
            <v-icon icon="mdi-home" />
            {{ $t('account.userData.address', 1) }}
          </div>

          <div class="pl-9">{{ order.address.street }} {{ order.address.houseNumber }}</div>
          <div class="pl-9">{{ order.address.postalCode }} {{ order.address.city }}</div>
        </v-card>
      </v-col>

      <v-col>
        <v-card variant="outlined" class="mr-5 pa-3">
          <div class="text-h6">
            <v-icon icon="mdi-currency-usd" />
            {{ $t('account.userData.payment', 1) }}
          </div>
          <div class="pl-9">{{ order.payment.bankName }}</div>
          <div class="pl-9">{{ order.payment.iban }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-for="ticket of order.tickets">
      <v-col>
        <ticket-list-item
          :concert="ticket.concert"
          :event="ticket.concert.name"
          :band="ticket.concert.band"
          :location="ticket.concert.location"
          :city="ticket.concert.location.city"
          :image="ticket.concert.image"
          :seat="ticket.seat.seatNr"
          :seat-group="ticket.seat.seatRow.seatGroup.name"
          :seat-row="ticket.seat.seatRow.row"
        />
      </v-col>
    </v-row>
  </card-view>
</template>
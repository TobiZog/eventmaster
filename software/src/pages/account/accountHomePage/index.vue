<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import cardView from '@/components/basics/cardView.vue';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore()
const router = useRouter()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <card-view
          :title="$t('misc.greeting', { msg: accountStore.userAccount.username })"
          icon="mdi-hand-wave"
        >
          <v-container>
            <v-row>
              <v-col>
                <card-view
                  :title="$t('order.orders', 2)"
                  icon="mdi-basket-check"
                  @click="router.push('/account/orders')"
                >
                  {{ $t('order.ordersDescription') }}
                </card-view>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <card-view
                  :title="$t('account.accountManagement')"
                  icon="mdi-account"
                  @click="router.push('/account/data')"
                >
                  {{ $t('account.accountManagementDescription') }}
                </card-view>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <card-view
                  :title="$t('account.logout.logout')"
                  icon="mdi-logout"
                  @click="accountStore.logout(); router.push('/account/login')"
                >
                  {{ $t('account.logout.logoutDescription') }}
                </card-view>
              </v-col>
            </v-row>
          </v-container>
        </card-view>
        
      </v-col>
    </v-row>
  </v-container>
</template>
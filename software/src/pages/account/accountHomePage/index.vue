<script setup lang="ts">
import { useAccountStore } from '@/data/stores/accountStore';
import cardView from '@/components/cardView.vue';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore()
const router = useRouter()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <card-view
          :title="$t('hello') + ' ' + accountStore.userAccount.firstName + ' ' + accountStore.userAccount.lastName"
          icon="mdi-hand-wave"
        >
          <v-container>
            <v-row>
              <v-col>
                <card-view
                  :title="$t('orders', 2)"
                  icon="mdi-basket-check"
                  @click="router.push('/account/orders')"
                >
                  {{ $t('ordersDescription') }}
                </card-view>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <card-view
                  :title="$t('accountManagement')"
                  icon="mdi-account"
                  @click="router.push('/account/edit')"
                >
                  {{ $t('accountManagementDescription') }}
                </card-view>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <card-view
                  :title="$t('logout')"
                  icon="mdi-logout"
                  @click="accountStore.logout(); router.push('/account/login')"
                >
                  {{ $t('logoutDescription') }}
                </card-view>
              </v-col>
            </v-row>
          </v-container>
        </card-view>
        
      </v-col>
    </v-row>
  </v-container>
</template>
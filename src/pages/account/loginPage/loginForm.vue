<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/stores/account.store';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore()
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const router = useRouter()

async function startLogin() {
  accountStore.login()
    .then(result => {
      if (accountStore.userAccountToken != "") {
        router.push("/account/home")
      }
    })
}
</script>

<template>
  <card-view
    :title="$t('account.login.login')"
    icon="mdi-login"
    max-width="600"
  >
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.username')"
          prepend-icon="mdi-account"
          v-model="accountStore.loginData.username"
          variant="outlined"
          clearable
          hide-details
          @keyup.enter="startLogin"
          id="txt-username"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.password')"
          prepend-icon="mdi-key"
          type="password" 
          variant="outlined"
          v-model="accountStore.loginData.password"
          clearable
          hide-details
          @keyup.enter="startLogin"
          id="txt-password"
        />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button 
        @click="showRegisterCard = true"
        prepend-icon="mdi-plus"
        :loading="accountStore.fetchInProgress"
      >
        {{ $t('account.register') }}
      </outlined-button>

      <outlined-button
        append-icon="mdi-arrow-right"
        @click="startLogin"
        :loading="accountStore.fetchInProgress"
        color="success"
        id="btn-login"
      >
        {{ $t('account.login.login') }}
      </outlined-button>
    </template>
  </card-view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const loginInProgress = ref(false)
const username = ref("duranduran")
const password = ref("H4nn0ver")

async function startLogin() {
  loginInProgress.value = true
  await accountStore.login(username.value, password.value)
  loginInProgress.value = false
}
</script>

<template>
  <card-view :title="$t('menu.login')" prepend-icon="mdi-login" elevation="8">
    <v-row>
      <v-col>
        <v-text-field :label="$t('account.username')" prepend-icon="mdi-account" clearable v-model="username"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field :label="$t('account.password')" prepend-icon="mdi-key" type="password" 
          clearable v-model="password" />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button 
        @click="showRegisterCard = true"
        prepend-icon="mdi-plus"
        :disabled="loginInProgress"
      >
        {{ $t('account.noAccountRegister') }}
      </outlined-button>

      <outlined-button
        append-icon="mdi-arrow-right"
        @click="startLogin"
        :loading="loginInProgress"
      >
        {{ $t('menu.login') }}
      </outlined-button>
    </template>
  </card-view>
</template>
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
const usernameWrong = ref(false)
const passwordWrong = ref(false)

async function startLogin() {
  loginInProgress.value = true
  usernameWrong.value = false
  passwordWrong.value = false

  if (username.value == null || username.value.length == 0) {
    usernameWrong.value = true
  } 

  if (password.value == null || password.value.length == 0) {
    passwordWrong.value = true
  }

  if (username.value != null && username.value.length > 0 && 
    password.value != null && password.value.length > 0)
  {
    await accountStore.login(username.value, password.value)
  }

  loginInProgress.value = false
}
</script>

<template>
  <card-view :title="$t('menu.login')" prepend-icon="mdi-login" elevation="8">
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.username')"
          prepend-icon="mdi-account"
          v-model="username"
          :error="usernameWrong"
          clearable
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.password')"
          prepend-icon="mdi-key"
          type="password" 
          v-model="password"
          :error="passwordWrong"
          clearable
        />
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
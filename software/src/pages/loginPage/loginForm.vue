<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import BannerModel from '@/data/models/bannerModel';
import { useUserStore } from '@/data/stores/userStore';
import axios from 'axios';
import { ref } from 'vue';

const userStore = useUserStore()
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const banner = defineModel("banner", { type: BannerModel })
const username = ref("")
const password = ref("")

function startLogin() {
  axios.post('http://127.0.0.1:3000/accounts/login', { 
    username: username.value,
    password: password.value
  })
  .then(res => {
    if (res.status == 200) {
      banner.value.bannerState = BannerStateEnum.LOGINSUCCESSFUL
      banner.value.show = true

      userStore.userAccountId = res.data.userAccountId
    }
  })
  .catch(res => {
    banner.value.bannerState = BannerStateEnum.WRONGLOGIN
    banner.value.show = true
  })
}
</script>

<template>
  <v-card :title="$t('menu.login')" prepend-icon="mdi-login" elevation="8">
    <v-container>
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
    </v-container>

    <v-card-actions>
      <v-btn variant="outlined" @click="showRegisterCard = true" color="primary" prepend-icon="mdi-plus">
        {{ $t('account.noAccountRegister') }}
      </v-btn>
      <v-spacer />
      <v-btn variant="outlined" append-icon="mdi-arrow-right" color="primary"
        @click="startLogin">{{ $t('menu.login') }}</v-btn>
    </v-card-actions>

  </v-card>
</template>
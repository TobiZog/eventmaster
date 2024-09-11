<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { AccountModel } from '@/data/models/accountModel';
import BannerModel from '@/data/models/bannerModel';
import axios from 'axios';
import { ref } from 'vue';

const newUser = ref(new AccountModel())
const banner = defineModel("banner", { required: true, type: BannerModel })
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })

function registerUser() {
  axios.post('http://127.0.0.1:3000/accounts/register', newUser.value)
    .then(res => {
      console.log(res)
      if (res.status == 200) {
        banner.value.bannerState = BannerStateEnum.LOGINSUCCESSFUL
        banner.value.show = true
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.status == 400) {
        banner.value.bannerState = BannerStateEnum.WRONGLOGIN
        banner.value.show = true
      }
    })
}
</script>

<template>
  <v-card :title="$t('account.register')">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('account.username')"
            prepend-icon="mdi-account"
            v-model="newUser.username"
            clearable
          />
        </v-col>

        <v-col>
          <v-text-field
            :label="$t('account.password')"
            prepend-icon="mdi-key"
            type="password"
            v-model="newUser.password"
            clearable
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.firstName')"
            prepend-icon="mdi-card-account-details"
            v-model="newUser.firstName"
            clearable
          />
        </v-col>

        <v-col>
          <v-text-field :label="$t('userInfo.lastName')" v-model="newUser.lastName" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.street')"
            prepend-icon="mdi-numeric"
            v-model="newUser.street"
            clearable
          />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('userInfo.houseNumber')" v-model="newUser.houseNumber" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            :label="$t('userInfo.postalCode')"
            prepend-icon="mdi-city"
            v-model="newUser.postalCode"
            clearable
          />
        </v-col>
        <v-col>
          <v-text-field :label="$t('userInfo.city')" v-model="newUser.city" clearable />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-btn prepend-icon="mdi-arrow-left" color="primary" variant="outlined" 
        @click="showRegisterCard = false">
          {{ $t('backToLogin') }}
        </v-btn>
      <v-spacer />
      <v-btn prepend-icon="mdi-account-plus" color="primary" variant="outlined" 
        @click="registerUser">
          {{ $t('register') }}
        </v-btn>
    </template>
  </v-card>
</template>
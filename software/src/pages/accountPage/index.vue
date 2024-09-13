<script setup lang="ts">
import axios from 'axios';


axios.get("http://127.0.0.1:3000/")
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-row>
            <v-col>
              <v-text-field :label="$t('account.username')"  disabled />
            </v-col>
            <v-col>
              <v-text-field  />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
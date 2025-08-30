<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import OutlinedButton from "@/components/basics/outlinedButton.vue";

</script>

<template>
  <card-view
    :title="$t('preferences.importExport.title')"
    icon="mdi-swap-horizontal-bold"
  >
    <v-row>
      <v-col>
        <v-file-input
          :label="$t('preferences.importExport.selectConfigFile')"
          variant="outlined"
          accept=".json"
          hide-details
        />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button prepend-icon="mdi-export">
        {{ $t("preferences.importExport.download") }}
      </outlined-button>

      <outlined-button prepend-icon="mdi-upload" color="green">
        {{ $t("preferences.importExport.upload") }}
      </outlined-button>
    </template>

  </card-view>
</template>
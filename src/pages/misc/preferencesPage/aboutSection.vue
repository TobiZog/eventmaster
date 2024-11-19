<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import packageJson from './../../../../package.json'

</script>

<template>
  <card-view
    :title="$t('preferences.aboutProject')"
    icon="mdi-information"
  >
    <template #borderless>
      <v-list>
        <v-list-item
          title="Software Version"
          :subtitle="packageJson.version"
          prepend-icon="mdi-counter"
        />
        <v-list-item 
          title="Lizenz"
          subtitle="MIT"
          prepend-icon="mdi-license"
        />
        <v-list-item
          title="Entwickler"
          subtitle="Tobias Zoghaib"
          prepend-icon="mdi-account"
        />
        <v-list-item 
          title="Entwickelt im Auftrag"
          subtitle="Uni Hannover, Institut für IT-Sicherheit, Fachgebiet Usable Security and Privacy"
          prepend-icon="mdi-school"
        />
        <v-list-item 
          title="Copyright"
          subtitle="2024"
          prepend-icon="mdi-copyright"
        />
      </v-list>
    </template>
  </card-view>
</template>
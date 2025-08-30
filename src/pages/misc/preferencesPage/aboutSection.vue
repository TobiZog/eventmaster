<script setup lang="ts">
import cardView from "@/components/basics/cardView.vue";
import packageJson from "./../../../../package.json";

function openExternal(url: string) {
  window.open(url, "_blank");
}
</script>

<template>
  <card-view :title="$t('preferences.aboutProject')" icon="mdi-information">
    <template #borderless>
      <v-list>
        <v-list-item
          :title="$t('misc.softwareVersion')"
          :subtitle="packageJson.version"
          prepend-icon="mdi-counter"
        />
        <v-list-item
          :title="$t('misc.license')"
          subtitle="MIT"
          prepend-icon="mdi-license"
        />
        <v-list-item
          :title="$t('misc.developer')"
          subtitle="Tobias Zoghaib"
          prepend-icon="mdi-account"
        />
        <v-list-item
          :title="$t('misc.developedFor')"
          subtitle="Uni Hannover, Institut für IT-Sicherheit, Fachgebiet Usable Security and Privacy"
          prepend-icon="mdi-school"
        />
        <v-list-item
          :title="$t('misc.copyright')"
          subtitle="2024-2025"
          prepend-icon="mdi-copyright"
        />
        <v-list-item
          :title="$t('misc.githubRepository')"
          prepend-icon="mdi-web"
          @click="openExternal('https://github.com/TobiZog/eventmaster')"
        />
        <v-list-item
          :title="$t('misc.projectPage')"
          prepend-icon="mdi-web"
          @click="
            openExternal(
              'https://www.itsec.uni-hannover.de/de/usec/forschung/eventmaster-learning-web-attacks'
            )
          "
        />
      </v-list>
    </template>
  </card-view>
</template>

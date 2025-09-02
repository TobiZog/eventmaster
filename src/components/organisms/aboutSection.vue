<script setup lang="ts">
import cardView from "@/components/molecules/cardView.vue";
import packageJson from "../../../package.json";
import listItem from "@/components/atoms/listItem.vue";

function openExternal(url: string) {
  window.open(url, "_blank");
}

function openRepository() {
  openExternal(
    "https://github.com/TobiZog/eventmaster"
  );
}

function openWebsite() {
  openExternal(
    "https://www.itsec.uni-hannover.de/de/usec/forschung/eventmaster-learning-web-attacks"
  );
}
</script>

<template>
  <card-view :title="$t('preferences.aboutProject')" icon="mdi-information">
    <template #borderless>
      <v-list>
        <list-item
          :title="$t('misc.softwareVersion')"
          :subtitle="packageJson.version"
          prepend-icon="mdi-counter"
        />
        <list-item
          :title="$t('misc.license')"
          subtitle="MIT"
          prepend-icon="mdi-license"
        />
        <list-item
          :title="$t('misc.developer')"
          subtitle="Tobias Zoghaib"
          prepend-icon="mdi-account"
        />
        <list-item
          :title="$t('misc.developedFor')"
          subtitle="Uni Hannover, Institut für IT-Sicherheit, Fachgebiet Usable Security and Privacy"
          prepend-icon="mdi-school"
        />
        <list-item
          :title="$t('misc.copyright')"
          subtitle="2024-2025"
          prepend-icon="mdi-copyright"
        />
        <list-item
          :title="$t('misc.githubRepository')"
          prepend-icon="mdi-web"
          :onTap="openRepository"
        />
        <list-item
          :title="$t('misc.projectPage')"
          prepend-icon="mdi-web"
          :onTap="openWebsite"
        />
      </v-list>
    </template>
  </card-view>
</template>

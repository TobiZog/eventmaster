<script setup lang="ts">
const props = defineProps({
  // Title string
  title: String,

  // Subtitle string below title
  subtitle: String,

  // Icon on the left side
  prependIcon: String,

  // Activate loading state (skeleton loader)
  loading: {
    type: Boolean,
    default: false,
  },

  // Handle action if user taps on item
  // Activates a icon on the right site
  onTap: {
    type: Function,
    default: undefined,
  },
});

function executeOnTapped() {
  if (props.onTap != undefined) {
    props.onTap();
  }
}
</script>

<template>
  <v-skeleton-loader :loading="loading" type="list-item">
    <v-list-item
      :title="title"
      :subtitle="subtitle"
      :prepend-icon="prependIcon"
      :append-icon="onTap != undefined ? 'mdi-open-in-new' : ''"
      width="100%"
      @click="executeOnTapped()"
    />
  </v-skeleton-loader>
</template>

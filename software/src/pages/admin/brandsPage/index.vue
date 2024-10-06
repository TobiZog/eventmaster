<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
// import { useProductStore } from '@/data/stores/productStore';

// const productStore = useProductStore()

const headers = [
  { title: "Name", value: "name" },
  { title: "Edit", value: "edit" },
]
</script>

<template>
  <!-- <v-container max-width="800">
    <v-row>
      <v-col>
        <card-view
          :title="$t('brand', 2)"
          icon="mdi-label"
          :subtitle="productStore.brands.length + ' ' + $t('brand', productStore.brands.length)"
        >
          <v-data-table
            :items="productStore.brands"
            :headers="headers"
          >
          </v-data-table>
        </card-view>
      </v-col>
    </v-row>
  </v-container> -->
</template>
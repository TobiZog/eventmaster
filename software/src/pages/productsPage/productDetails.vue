<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ModelRef, ref } from 'vue';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice, productToBasketItem } from '@/scripts/productScripts';
import ActionDialog from '@/components/actionDialog.vue'
import { ProductWithCategoryModel } from '@/data/models/productWithCategoryModel';
import { BasketItemModel } from '@/data/models/basketItemModel';

const showDialog: ModelRef<boolean> = defineModel()
const nrOfArticles = ref(1)
const basketStore = useBasketStore()

const props = defineProps({
  product: ProductWithCategoryModel
})

function addProductToBasket() {
  basketStore.addItemToBasket(
    new BasketItemModel()
  )
  basketStore.addItemToBasket(productToBasketItem(props.product, nrOfArticles.value))
  nrOfArticles.value = 1
  showDialog.value = false
}
</script>

<template>
  <action-dialog
    :title="product.name"
    :subtitle="product.brand"
    :image-url="'http://127.0.0.1:3000/static/' + product.imageUrl"
    v-model="showDialog"
  >
    <template #content>
      <v-row>
        <v-col>
          <v-icon :icon="product.category.icon" />
          {{ product.category.name }}
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-h6">
          {{ $t("product.description") }}
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-body-1">
          {{ product.description }}
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-row>
        <v-col>
          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h3"> {{ product.rating }} <span class="text-h6 ml-n3">/5</span> </div>
            <v-rating :model-value="product.rating" color="yellow-darken-3" half-increments disabled />
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-row>
        <v-col>
          <v-number-input
            :reverse="false"
            controlVariant="default"
            :label="$t('quantity')"
            :hideInput="false"
            :inset="false"
            v-model="nrOfArticles"
            :min="1"
            :max="10"
            density="comfortable"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center flex-column my-auto text-h3">
          {{ calcProductPrice(product, nrOfArticles) }} €
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-btn prepend-icon="mdi-cart-plus" @click="addProductToBasket" color="primary" variant="outlined">
        {{ $t('addToBasket') }}
      </v-btn>
    </template>
  </action-dialog>
</template>
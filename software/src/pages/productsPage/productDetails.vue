<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ProductModel } from '@/data/models/productModel';
import { CategoryModel } from '@/data/models/categoryModel';
import { ModelRef, ref } from 'vue';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice, productToBasketItem } from '@/scripts/productScripts';
import ActionDialog from '@/components/actionDialog.vue'

const showDialog: ModelRef<boolean> = defineModel()
const nrOfArticles = ref(1)
const basketStore = useBasketStore()

const props = defineProps({
  product: ProductModel,
  // todo productCategory: CategoryModel
})

function addProductToBasket() {
  // todo basketStore.addItemToBasket(productToBasketItem(props.product, props.productCategory, nrOfArticles.value))
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
        <!-- todo <v-col>
          <v-icon :icon="productCategory.icon" />
          {{ productCategory.name }}
        </v-col> -->
      </v-row>
      <v-row>
        <v-col>
          {{ product.description }}
        </v-col>
      </v-row>
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

        <v-spacer />

        <v-col cols="2" class="justify-center d-flex">
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
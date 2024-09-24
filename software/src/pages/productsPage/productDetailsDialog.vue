<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ModelRef, ref, watch } from 'vue';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice, productToBasketItem } from '@/scripts/productScripts';
import ActionDialog from '@/components/actionDialog.vue'
import { ProductModel } from '@/data/models/productModel';
import outlinedButton from '@/components/outlinedButton.vue';

const props = defineProps({
  product: {
    type: ProductModel,
    default: new ProductModel()
  }
})

const showDialog: ModelRef<boolean> = defineModel()
const nrOfArticles = ref(1)
const basketStore = useBasketStore()
const selectedImage = ref("")

function addProductToBasket() {
  basketStore.addItemToBasket(productToBasketItem(props.product, nrOfArticles.value))
  nrOfArticles.value = 1
  showDialog.value = false
}

watch(() => props.product.images, () => {
  selectedImage.value = 'http://localhost:3000/static/' + props.product.images[0]
})
</script>

<template>
  <action-dialog
    :title="product.brand.name + ': ' + product.name"
    :icon="product.category.icon"
    :subtitle="product.category.name"
    v-model="showDialog"
  >
    <v-row>
      <!-- Image col -->
      <v-col>
        <v-row>
          <v-col class="py-0">
            <v-sheet color="white">
              <v-img :src="selectedImage" height="600" />
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer />

          <v-col v-for="image in product.images">
            <v-card
              width="60"
              @click="selectedImage = 'http://localhost:3000/static/' + image"
              color="white"
            >
              <v-img :src="'http://localhost:3000/static/' + image" height="60" />
            </v-card>
          </v-col>

          <v-spacer />
        </v-row>
      </v-col>


      <!-- Product description col -->
      <v-col>
        <v-row>
          <v-col class="text-h6 pt-0">
            {{ $t("product.description") }}
          </v-col>
        </v-row>

        <v-row class="text-body-1 mt-0"  style="height: 450px; overflow-y: auto;">
          <div v-if="product.description.length != 0">
            <v-col class="text-body-1">
            {{ product.description }}
          </v-col>
          </div>

          <div v-if="product.specs.length > 1">
            <v-list>
              <v-list-item v-for="spec in product.specs">
                <v-icon icon="mdi-circle-small" /> {{ spec }}
              </v-list-item>
            </v-list>
          </div>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col class="pb-0">
            <div class="d-flex align-center flex-column">
              <div class="text-h3"> {{ product.rating }} <span class="text-h6 ml-n3">/5</span> </div>
              <v-rating :model-value="product.rating" color="yellow-darken-3" half-increments disabled />
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col cols="3">
            <div class="pt-3">
              <div v-if="product.inStock > 5" class="text-green-lighten-1">
                {{ $t("product.storedItemsAvailable", [product.inStock]) }}
              </div>
              <div v-else-if="product.inStock > 0" class="text-orange-lighten-1">
                {{ $t("product.storedItemsAvailable", [product.inStock]) }}
              </div>
              <div v-else class="text-red">
                {{ $t("product.soldOut") }}
              </div>
            </div>
          </v-col>
          <v-col class="d-flex align-end flex-column my-auto">
            <div v-if="product.discount == 0" class="text-h3">{{ product.price }} €</div>
            <div v-else class="d-flex align-center flex-column my-auto">
              <div class="text-h3"> 
                <span class="text-red-lighten-1"> {{ calcProductPrice(product, nrOfArticles) }} €</span>
                <span class="text-h6 ml-2 text-decoration-line-through">{{ product.price }} € </span>
                <span class="text-h6 ml-4 mb-1 bg-red">-{{ product.discount }} %</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <template #actions>
      <v-number-input
        max-width="200"
        :reverse="false"
        controlVariant="default"
        :label="$t('quantity')"
        :hideInput="false"
        :inset="true"
        v-model="nrOfArticles"
        variant="outlined"
        :min="1"
        :max="10"
        density="comfortable"
        :hide-details="true"
        :disabled="product.inStock == 0"
      />

      <outlined-button
        prepend-icon="mdi-cart-plus"
        @click="addProductToBasket"
        height="50"
        :disabled="product.inStock == 0"
      >
        {{ $t('addToBasket') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
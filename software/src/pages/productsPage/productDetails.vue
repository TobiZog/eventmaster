<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ModelRef, ref, watch } from 'vue';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice, productToBasketItem } from '@/scripts/productScripts';
import ActionDialog from '@/components/actionDialog.vue'
import { ProductWithCategoryModel } from '@/data/models/productWithCategoryModel';
import { BasketItemModel } from '@/data/models/basketItemModel';

const props = defineProps({
  product: {
    type: ProductWithCategoryModel,
    default: new ProductWithCategoryModel()
  }
})

const showDialog: ModelRef<boolean> = defineModel()
const nrOfArticles = ref(1)
const basketStore = useBasketStore()
const selectedImage = ref("")

function addProductToBasket() {
  basketStore.addItemToBasket(
    new BasketItemModel()
  )
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
    :title="product.brand + ': ' + product.name"
    :icon="product.category.icon"
    :subtitle="product.category.name"
    v-model="showDialog"
  >
    <template #content>
      <v-container class="pt-n3">
        <v-row>
          <!-- Image col -->
          <v-col>
            <v-row>
              <v-col class="py-0">
                <v-img :src="selectedImage" height="600" />
              </v-col>
            </v-row>

            <v-row>
              <v-spacer />

              <v-col v-for="image in product.images">
                <v-card width="60" @click="selectedImage = 'http://localhost:3000/static/' + image" >
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

            <v-row v-if="product.description.length != 0">
              <v-col class="text-body-1">
                {{ product.description }}
              </v-col>
            </v-row>

            <v-row class="text-body-1 mt-0" v-if="product.specs.length > 1">
              <v-list>
                <v-list-item v-for="spec in product.specs">
                  - {{ spec }}
                </v-list-item>
              </v-list>
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
      </v-container>
    </template>

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
      />

      <v-btn
        prepend-icon="mdi-cart-plus"
        @click="addProductToBasket"
        color="primary"
        variant="outlined"
        height="50"
      >
        {{ $t('addToBasket') }}
      </v-btn>
    </template>
  </action-dialog>
</template>
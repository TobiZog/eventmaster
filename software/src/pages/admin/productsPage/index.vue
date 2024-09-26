<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import productEditDialog from './productEditDialog.vue';
import { ref } from 'vue';

// const productStore = useProductStore()
// const editProduct = ref(new ProductModel())
const showEditProductDialog = ref(false)

const headers = [
  { title: "Category", value: "category.name" },
  { title: "Brand", value: "brand.name" },
  { title: "Name", value: "name" },
  { title: "Price", value: "price" },
  { title: "Discount", value: "discount" },
  { title: "Rating", value: "rating" },
  { title: "In stock", value: "inStock" },
  { title: "Edit", value: "edit" },
]

// function openEditProductDialog(product: ProductModel) {
//   editProduct.value = product
//   showEditProductDialog.value = true
// }
</script>

<template>
  <v-container>
    <v-row>
      <!-- <v-col>
        <card-view 
          :title="$t('product.product', 2)"
          :subtitle="productStore.products.length + ' ' + $t('product.product', productStore.products.length)"
          icon="mdi-store"
        >
          <v-data-table
            :headers="headers"
            :items="productStore.products"
          >
            <template v-slot:item.price="{ item }">
              {{ item.price }} €
            </template>

            <template v-slot:item.discount="{ item }">
              <div v-if="item.discount > 0">
                {{ item.discount }} %
              </div>
            </template>

            <template v-slot:item.inStock="{ item }">
              <div v-if="item.inStock > 5" class="text-green-lighten-1">
                <v-icon icon="mdi-check" />
                {{ $t("product.storedItemsAvailable", [item.inStock]) }}
              </div>
              <div v-else-if="item.inStock > 0" class="text-orange-lighten-1">
                <v-icon icon="mdi-alert" />
                {{ $t("product.storedItemsAvailable", [item.inStock]) }}
              </div>
              <div v-else class="text-red">
                <v-icon icon="mdi-alert-circle" />
                {{ $t("product.soldOut") }}
              </div>
            </template>

            <template v-slot:item.edit="{ item }">
              <v-btn
                icon="mdi-pencil"
                color="orange"
                variant="text"
                @click="openEditProductDialog(item)"
              />

              <v-btn
                icon="mdi-store-off"
                color="red"
                variant="text"
                v-if="item.offered"
              />

              <v-btn
                icon="mdi-store"
                color="green"
                variant="text"
                v-if="!item.offered"
              />
            </template>
          </v-data-table>
        </card-view>
      </v-col> -->
    </v-row>
  </v-container>

  <!-- <product-edit-dialog
    v-model="showEditProductDialog"
    :edit-product="editProduct" /> -->
</template>
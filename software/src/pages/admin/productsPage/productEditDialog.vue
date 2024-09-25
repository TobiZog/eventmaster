<script setup lang="ts">
import actionDialog from '@/components/actionDialog.vue';
import { ProductModel } from '@/data/models/productModel';
import outlinedButton from '@/components/outlinedButton.vue';
import { useProductStore } from '@/data/stores/productStore';
import { ModelRef } from 'vue';

const showDialog: ModelRef<boolean> = defineModel()
const editProduct = defineModel("editProduct", { type: ProductModel, required: true})
const productStore = useProductStore()

function saveProduct() {
  // todo
  showDialog.value = false
}
</script>

<template>
  <action-dialog
    :title="$t('editProduct')"
    icon="mdi-store-edit"
    v-model="showDialog"
  >
    <v-row>
      <v-col>
        <v-select
          :items="productStore.categories"
          v-model="editProduct.category"
          :label="$t('category')"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
          </template>

          <template v-slot:selection="{ item }">
            <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
          </template>
        </v-select>
      </v-col>

      <v-col>
        <v-select
          :items="productStore.brands"
          v-model="editProduct.brand"
          :label="$t('brand')"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.name" />
          </template>

          <template v-slot:selection="{ item }">
            <v-list-item :title="item.raw.name" />
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="editProduct.name"
          :label="$t('product.productName')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea
          v-model="editProduct.description"
          :label="$t('product.description')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="editProduct.price"
          :label="$t('product.productPrice')"
          suffix="€"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="editProduct.discount"
          :label="$t('product.discount')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="editProduct.inStock"
          :label="$t('product.inStock')"
        />
      </v-col>
    </v-row>

    <!-- todo -->
    {{ editProduct.images }}
    {{ editProduct.specs }}

    <template #actions>
      <outlined-button
        color="green"
        prepend-icon="mdi-content-save"
        @click="saveProduct"
      >
        {{ $t('save') }}
      </outlined-button>
    </template>
  </action-dialog>  
</template>
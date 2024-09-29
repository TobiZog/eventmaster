<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import OutlinedButton from '@/components/outlinedButton.vue';

// defineProps({
//   tour: {
//     required: true,
//     type: TourModel
//   }
// })
</script>

<template>
  <!-- <card-view
    :title="tour.band.name"
    :subtitle="tour.name"
    :prepend-image="'http://127.0.0.1:3000/static/bands/' + tour.band.images[0]"
    link
  >
    {{ tour.band.descriptionDe }}

    <template #actions>
      <OutlinedButton>
        {{ tour.shows.length }} {{ $t('tours.concert', tour.shows.length) }}
      </OutlinedButton>
    </template> -->
    
    <!-- <template> -->
          <!-- <div>
            <v-rating
              size="medium"
              :model-value="product.rating"
              active-color="yellow-darken-1"
              color="grey-darken-1"
              half-increments
              readonly
            />

            {{ product.rating }}/5
          </div> -->

          <!-- <div>
            <v-list class="pa-0">
              <v-list-item v-for="i in 2" class="pa-0 ma-0">
                <v-icon icon="mdi-circle-small" /> {{ product.specs[i - 1] }}
              </v-list-item>
            </v-list>
          </div> -->
        <!-- </v-col> -->

        <!-- <v-col cols="2" class="pt-5 pr-7"> -->
          <!-- <div v-if="product.discount == 0" class="font-weight-bold text-h5 text-right">
            {{ product.price }} €
          </div>

          <div v-else>
            <div class="font-weight-bold text-h5 text-right">
              {{ (product.price * ( 100 - product.discount) / 100).toFixed(2) }} €
            </div>
            <div>
              <div class="text-decoration-line-through text-right">{{ product.price }} €</div>
            </div>
          </div> -->

          <!-- <div style="position: absolute; bottom: 0; right: 0;" class="pr-2 pb-2">
            <div v-if="product.inStock > 5" class="text-green-lighten-1">
              {{ $t("product.storedItemsAvailable", [product.inStock]) }}
            </div>
            <div v-else-if="product.inStock > 0" class="text-orange-lighten-1">
              {{ $t("product.storedItemsAvailable", [product.inStock]) }}
            </div>
            <div v-else class="text-red">
              {{ $t("product.soldOut") }}
            </div>
          </div> -->
    <!-- </template> -->
  <!-- </card-view> -->
</template>

<style scoped>
.v-sheet {
  filter: brightness(60%)
}

.v-card:hover :deep(.v-sheet) {
  filter: brightness(80%)
}
</style>
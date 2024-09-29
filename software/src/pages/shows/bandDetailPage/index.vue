<script setup lang="ts">
import { useConcertStore } from '@/data/stores/concertStore';
import { BandModel } from '@/data/models/acts/bandModel';
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import { calcRating, calcRatingValues } from '@/scripts/concertScripts';

const router = useRouter()

const concertStore = useConcertStore()
const band: BandModel = concertStore.bands.find(band =>
  band.name.replaceAll(' ', '-').toLowerCase() == router.currentRoute.value.params.bandName
)
</script>

<template>
  <div class="position-relative top-0 left-0">
    <v-img
      :src="'http://localhost:3000/static/bands/' + band.images[0]"
      height="600"
      cover
      gradient="to top, rgba(0, 0, 0, .8), rgba(255, 255, 255, 0.1)"
    >
      <div class="position-absolute bottom-0 pa-5">
        <p class="text-h3">{{ band.name }}</p>
        <p class="text-h6">{{ band.descriptionDe }}</p>
      </div>
    </v-img>
  </div>

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider title="Band Mitglieder" />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="member of band.members">
            <card-with-top-image
              :title="member.name"
              :image="'artists/' + member.image"
            />
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider title="Konzerte" />
          </v-col>
        </v-row>

        <v-row v-for="concert of band.tours[0].concerts">
          <v-col>
            <card-with-left-image
              :title="dateStringToHumanReadableString(concert.date)"
              :image="'http://localhost:3000/static/locations/' + concert.location.image"
              :link="false"
            >
              <div>
                {{ concert.location.name }}
              </div>

              <div>
                {{ concert.location.address }}
              </div>

              <div>
                {{ concert.location.city.name }}
              </div>

              <template #append>
                <div class="pb-3">
                  {{ concert.price.toFixed(2) }} €
                </div>

                <div>
                  <outlined-button
                    prepend-icon="mdi-basket-plus"
                  >
                      Hinzufügen
                  </outlined-button>
                </div>            
              </template>
            </card-with-left-image>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <section-divider title="Bewertungen" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex align-center justify-center flex-column" style="height: 100%;">
              <div class="text-h2 mt-5">
                {{ calcRating(band.ratings).toFixed(1) }}
                <span class="text-h6 ml-n3">/5</span>
              </div>
          
              <v-rating
                :model-value="calcRating(band.ratings)"
                color="yellow-darken-3"
                half-increments
                size="x-large"
              />

              <div class="px-3">{{ band.ratings.length }} Bewertungen</div>
            </div>
          </v-col>

          <v-col>
            <v-list>
              <v-list-item v-for="ratingValue in calcRatingValues(band.ratings)">
                <template v-slot:prepend>
                  <span>{{ ratingValue.value }}</span>
                  <v-icon class="ml-3 mr-n3" icon="mdi-star" />
                </template>

                <v-progress-linear
                  :model-value="(ratingValue.count / band.ratings.length) * 100"
                  height="20"
                  color="yellow-darken-3"
                  rounded
                />

                <template v-slot:append>
                  <span class="d-flex justify-end" style="width: 25px;"> {{ ratingValue.count }} </span>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider title="Fotos" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-carousel
              show-arrows
              hide-delimiter-background
              hide-delimiters
              height="900"
            >
              <template #prev="{ props }">
                <v-btn
                  variant="text"
                  @click="props.onClick"
                  icon="mdi-chevron-left"
                />
              </template>

              <template #next="{ props }">
                <v-btn
                  variant="text"
                  @click="props.onClick"
                  icon="mdi-chevron-right"
                />
              </template>


              <v-carousel-item
                v-for="image in band.images"
                :src="'http://localhost:3000/static/bands/' + image" 
                cover
              />
            </v-carousel>
          </v-col>
        </v-row>
        </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>
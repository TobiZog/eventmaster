<script setup lang="ts">
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import cardView from '@/components/basics/cardView.vue';
import { useConcertStore } from '@/stores/concert.store';
import { useBandStore } from '@/stores/band.store';
import { useAccountStore } from '@/stores/account.store';
import { useLocationStore } from '@/stores/location.store';
import { ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise.store';
import { useGenreStore } from '@/stores/genre.store';

const router = useRouter()
const concertStore = useConcertStore()
const bandStore = useBandStore()
const accountStore = useAccountStore()
const genreStore = useGenreStore()
const locationStore = useLocationStore()
const soldOutConcerts = ref(0)
const exerciseStore = useExerciseStore()

exerciseStore.solveExercise(2, 1)

bandStore.getBands()
locationStore.getLocations()
genreStore.getGenres()
accountStore.getAllAccounts()
concertStore.getConcerts()
  .then(result => {
    for(let concert of concertStore.concerts) {
      concert.inStock == 0 ? soldOutConcerts.value++ : ""
    }
  })
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <card-view
          :title="$t('band.band', 2)"
          icon="mdi-guitar-electric"
        >
          <div class="text-h4 text-center">
            {{ bandStore.bands.length }} {{ $t('band.band', 2) }}
          </div>

          <template #actions>
            <outlined-button
              @click="router.push('/admin/bands')"
            >
              {{ $t('misc.actions.more') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>

      <v-col>
        <card-view
          :title="$t('concert.concert', 2)"
          icon="mdi-ticket"
        >
          <div class="text-h4 text-center">
            {{ concertStore.concerts.length }} {{ $t('concert.concert', 2) }}
          </div>

          <div class="text-disabled text-center">
            {{ soldOutConcerts }} {{ $t('concert.concertSoldOut') }}
          </div>

          <template #actions>
            <outlined-button
              @click="router.push('/admin/concerts')"
            >
              {{ $t('misc.actions.more') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>


      <v-col>
        <card-view
          :title="$t('location.location', 2)"
          icon="mdi-city"
        >
          <div class="text-h4 text-center">
            {{ locationStore.locations.length }} {{ $t('location.location', 2) }}
          </div>

          <template #actions>
            <outlined-button
              @click="router.push('/admin/locations')"
            >
              {{ $t('misc.actions.more') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>
    </v-row>
    


    <v-row>
      <v-col>
        <card-view
          :title="$t('account.account', 2)"
          icon="mdi-account"
        >
          <div class="text-h4 text-center">
            {{ accountStore.accounts.length }} {{ $t('account.account', accountStore.accounts.length) }}
          </div>

          <template #actions>
            <outlined-button
              @click="router.push('/admin/accounts')"
            >
              {{ $t('misc.actions.more') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>

      <v-col>
        <card-view
          :title="$t('band.genre', 2)"
          icon="mdi-music-clef-treble"
        >
          <div class="text-h4 text-center">
            {{ genreStore.genres.length }} {{ $t('band.genre', 2) }}
          </div>

          <template #actions>
            <outlined-button
              @click="router.push('/admin/genres')"
            >
              {{ $t('misc.actions.more') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>
    </v-row>
      
  </v-container>
</template>
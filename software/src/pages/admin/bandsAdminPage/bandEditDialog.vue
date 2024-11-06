<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { GenreModel } from '@/data/models/acts/genreModel';
import { useBandStore } from '@/stores/band.store';
import { useGenreStore } from '@/stores/genre.store';

const bandStore = useBandStore()
const genreStore = useGenreStore()

function itemProps(item: GenreModel) {
  return {
    title: item.name
  }
}
</script>

<template>
  <action-dialog
    v-model="bandStore.showEditDialog"
    :title="$t('band.editBand')"
    icon="mdi-pencil"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('band.name')"
            v-model="bandStore.band.name"
            variant="outlined"
            hide-details
          />
        </v-col>

        <v-col>
          <v-text-field
            :label="$t('band.foundingYear')"
            v-model="bandStore.band.foundingYear"
            variant="outlined"
            hide-details
          />
        </v-col>

        <v-col>
          <v-select
            :label="$t('band.genre', 2)"
            v-model="bandStore.band.genres"
            :items="genreStore.genres"
            :item-props="itemProps"
            variant="outlined"
            hide-details
            chips
            multiple
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea
            :label="$t('band.descriptionDe')"
            v-model="bandStore.band.descriptionDe"
            variant="outlined"
            hide-details
          />
        </v-col>

        <v-col>
          <v-textarea
            :label="$t('band.descriptionEn')"
            v-model="bandStore.band.descriptionEn"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-img
          :src="bandStore.band.logo"
        />
        </v-col>
        <v-col>
          <v-img
            max-width="300"
            :src="bandStore.band.imageMembers"
            placeholder=""
          />
        </v-col>
      </v-row>
    </v-container>
    
    <template #actions>
      <outlined-button
        color="green"
        @click="bandStore.saveBand"
        :loading="bandStore.fetchInProgress"
      >
        {{ $t('misc.actions.save') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
import { fetchAllGenres } from "@/data/api/genreApi";
import { GenreApiModel } from "@/data/models/acts/genreApiModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGenreStore = defineStore("genreStore", {
  state: () => ({
    /** All available genres from server */
    genres: ref<Array<GenreApiModel>>([]),

    /** Currently edited genre */
    genre: ref<GenreApiModel>(new GenreApiModel()),

    /** Genres to filter bands for */
    filteredGenres: ref<Array<GenreApiModel>>([]),

    showEditDialog: ref(false),
    fetchInProgress: ref(false)
  }),

  actions: {
    getGenres() {
      this.fetchInProgress = true

      fetchAllGenres()
        .then(response => {
          this.genres = response.data
          this.fetchInProgress = false
        })
    },

    /**
     * Prepare edit dialog for new genre, opens it
     */
    newGenre() {
      this.genre = new GenreApiModel()
      this.showEditDialog = true
    },

    editGenre(genre: GenreApiModel) {
      this.genre = genre
      this.showEditDialog = true
    },

    saveGenre() {
      // todo
    },

    deleteGenre(genre: GenreApiModel) {
      // todo
    }
  }
})
import { deleteGenre, fetchAllGenres, patchGenre, postGenre } from "@/data/api/genreApi";
import { GenreApiModel } from "@/data/models/acts/genreApiModel";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFeedbackStore } from "./feedback.store";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";

export const useGenreStore = defineStore("genreStore", {
  state: () => ({
    /** All available genres from server */
    genres: ref<Array<GenreApiModel>>([]),

    /** Currently edited genre */
    genre: ref<GenreApiModel>(new GenreApiModel()),

    /** Genres to filter bands for */
    filteredGenres: ref<Array<GenreApiModel>>([]),

    /** Show or hide edit dialog for Genre object */
    showEditDialog: ref(false),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all genres from the database
     */
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

    /**
     * Edit a Genre object, move parameter to this.genre, opens dialog
     * 
     * @param genre Selected Genre object
     */
    editGenre(genre: GenreApiModel) {
      this.genre = genre
      this.showEditDialog = true
    },

    /**
     * Save edited genre to the backend server
     */
    saveGenre() {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      if (this.genre.id == undefined) {
        // Creating new Genre
        postGenre(this.genre)
          .then(response => {
            if (response.status == 200) {
              feedbackStore.addSnackbar(BannerStateEnum.GENRESAVEDSUCCESSFUL)
              this.getGenres()
              this.showEditDialog = false
            } else {
              feedbackStore.addSnackbar(BannerStateEnum.GENRESAVEDERROR)
            }
          })
      } else {
        // Update existing Genre
        patchGenre(this.genre)
          .then(response => {
            if (response.status == 200) {
              feedbackStore.addSnackbar(BannerStateEnum.GENRESAVEDSUCCESSFUL)
              this.getGenres()
              this.showEditDialog = false
            } else {
              feedbackStore.addSnackbar(BannerStateEnum.GENRESAVEDERROR)
            }
          })
      }
    },

    /**
     * Delete a Genre object
     * 
     * @param genre Genre to delete
     */
    deleteGenre(genre: GenreApiModel) {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      deleteGenre(genre)
        .then(response => {
          if (response.status == 200) {
            feedbackStore.addSnackbar(BannerStateEnum.GENREDELETESUCCESSFUL)
            this.getGenres()
          } else {
            feedbackStore.addSnackbar(BannerStateEnum.GENREDELETEERROR)
          }
        })
    }
  }
})
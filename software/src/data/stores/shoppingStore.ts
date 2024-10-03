import { defineStore } from "pinia";
import { ref } from "vue";
import { EventModel } from "../models/acts/eventModel";
import { fetchEvents } from "../api/eventApi";

export const useShoppingStore = defineStore("shoppingStore", {
  state: () => ({
    events: ref<Array<EventModel>>([])
  }),

  actions: {
    getEvents(city: string = "", genre: string = "") {
      fetchEvents(city, genre)
        .then(result => {
          this.events = result.data
        })
    }
  }
})
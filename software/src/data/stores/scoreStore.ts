import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const useScoreStore = defineStore("scoreStore", {
  state: () => ({
    progressGroup0: useLocalStorage("hackmycart/scoreStore/progressGroup0", 0),
    progressGroup1: useLocalStorage("hackmycart/scoreStore/progressGroup1", 0),
    progressGroup2: useLocalStorage("hackmycart/scoreStore/progressGroup2", 0),
    progressGroup3: useLocalStorage("hackmycart/scoreStore/progressGroup3", 0),
  })
})
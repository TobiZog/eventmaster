import { LanguageEnum } from "@/data/enums/languageEnum";
import { ExerciseGroupModel } from "@/data/models/exercises/exerciseGroupModel";
import { ExerciseModel } from "@/data/models/exercises/exerciseModel";
import { usePreferencesStore } from "@/stores/preferences.store";

export function getExerciseNameLanguage(exercise: ExerciseModel) {
  let preferencesStore = usePreferencesStore()

  switch (preferencesStore.language) {
    case LanguageEnum.GERMAN:
      return exercise.nameDe;
    case LanguageEnum.ENGLISH:
      return exercise.nameEn;
  }
}

export function getExerciseDescriptionLanguage(exercise: ExerciseModel) {
  let preferencesStore = usePreferencesStore()

  switch (preferencesStore.language) {
    case LanguageEnum.GERMAN:
      return exercise.descriptionDe;
    case LanguageEnum.ENGLISH:
      return exercise.descriptionEn;
  }
}

export function getExerciseGroupNameLanguage(exerciseGroup: ExerciseGroupModel) {
  let preferencesStore = usePreferencesStore()

  switch (preferencesStore.language) {
    case LanguageEnum.GERMAN:
      return exerciseGroup.nameDe;
    case LanguageEnum.ENGLISH:
      return exerciseGroup.nameEn;
  }
}
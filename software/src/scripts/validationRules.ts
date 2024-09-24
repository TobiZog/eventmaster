import { useFeedbackStore } from "@/data/stores/feedbackStore"

/**
 * Check a string for no numbers and more than four digits
 * 
 * @returns Array of rules
 */
export function getStringRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value) {
        return true
      } else {
        return feedbackStore.i18n.t('required')
      }
    },
    value => {
      if (/[^0-9]/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('noDigitsAllowed')
      }
    },
    value => {
      if (value?.length >= 4) {
        return true
      } else {
        return feedbackStore.i18n.t('notEnoughChars')
      }
    }
  ]
} 

/**
 * Check a string for exact five digits length and only digits
 * 
 * @returns Array of rules
 */
export function getPostalRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value?.length == 5) {
        return true
      } else if (value?.length < 5) {
        return feedbackStore.i18n.t('notEnoughChars')
      } else {
        return feedbackStore.i18n.t('tooMuchChars')
      }
    },
    value => {
      if (value?.length == 5) {
        return true
      } else {
        return feedbackStore.i18n.t('notEnoughChars')
      }
    },
    value => {
      if (/^\d+$/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('onlyDigitsAllowed')
      }
    }
  ]
}

/**
 * Check a string for not empty and first char is a digit
 * 
 * @returns Array of rules
 */
export function getNumberStartRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value) {
        return true
      } else {
        return feedbackStore.i18n.t('required')
      }
    },
    value => {
      if (/^\d/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('digitsAtStartNeeded')
      }
    },
  ]
}

/**
 * Check a string for email format
 * 
 * @returns Array of rules
 */
export function getEmailRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value) return true

      return feedbackStore.i18n.t('emailRequired')
    },
    value => {
      if (/.+@.+\..+/.test(value)) return true

      return feedbackStore.i18n.t('emailIsNotValid')
    },
  ]
}

/**
 * Check a string for a good password
 * 
 * @returns Array of rules
 */
export function getPasswordRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value) {
        return true
      } else {
        return feedbackStore.i18n.t('required')
      }
    },
    value => {
      if (value?.length >= 8) {
        return true
      } else {
        return feedbackStore.i18n.t('passwordToShort')
      }
    }
  ]
}

/**
 * Check a string for IBAN format
 * 
 * @returns Array of rules
 */
export function getIbanRules() {
  const feedbackStore = useFeedbackStore()

  return [
    value => {
      if (value) {
        return true
      } else {
        return feedbackStore.i18n.t('required')
      }
    },
    value => {
      if (/[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('wrongIban')
      }
    }
  ]
}
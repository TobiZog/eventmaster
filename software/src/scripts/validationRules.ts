import { useFeedbackStore } from "@/stores/feedback.store"

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
        return feedbackStore.i18n.t('misc.validation.required')
      }
    },
    value => {
      if (/[^0-9]/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.noDigitsAllowed')
      }
    },
    value => {
      if (value?.length >= 4) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.notEnoughChars')
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
        return feedbackStore.i18n.t('misc.validation.notEnoughChars')
      } else {
        return feedbackStore.i18n.t('misc.validation.tooMuchChars')
      }
    },
    value => {
      if (value?.length == 5) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.notEnoughChars')
      }
    },
    value => {
      if (/^\d+$/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.onlyDigitsAllowed')
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
        return feedbackStore.i18n.t('misc.validation.required')
      }
    },
    value => {
      if (/^\d/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.digitsAtStartNeeded')
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

      return feedbackStore.i18n.t('account.emailRequired')
    },
    value => {
      if (/.+@.+\..+/.test(value)) return true

      return feedbackStore.i18n.t('account.emailIsNotValid')
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
        return feedbackStore.i18n.t('misc.validation.required')
      }
    },
    value => {
      if (value?.length >= 8) {
        return true
      } else {
        return feedbackStore.i18n.t('misc.validation.notEnoughChars')
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
        return feedbackStore.i18n.t('misc.validation.required')
      }
    },
    value => {
      if (/[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?/.test(value)) {
        return true
      } else {
        return feedbackStore.i18n.t('account.wrongIban')
      }
    }
  ]
}
import { createI18n } from "vue-i18n";
import german from './../locales/de.json'
import english from './../locales/en.json'

type MessageSchema = typeof german

export const i18n = createI18n<[MessageSchema], 'de' | 'en'>({
  legacy: true,
  locale: 'de',
  messages: {
    'de': german,
    'en': english
  }
})
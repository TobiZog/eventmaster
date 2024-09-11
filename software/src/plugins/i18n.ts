import { createI18n } from "vue-i18n";
import german from './../locales/german.json'
import english from './../locales/english.json'

type MessageSchema = typeof german

export const i18n = createI18n<[MessageSchema], 'de' | 'en'>({
  legacy: false,
  locale: 'de',
  messages: {
    'de': german,
    'en': english
  }
})
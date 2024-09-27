// Vuetify & Material icons imports
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

// Vuetify config
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      darkRed: {
        dark: true,
        colors: {
          primary: colors.red.darken1,
          secondary: colors.red.lighten2
        }
      },
      lightRed: {
        dark: false,
        colors: {
          primary: colors.red.darken1,
          secondary: colors.red.darken4
        }
      },
      darkBlue: {
        dark: true,
        colors: {
          primary: colors.blue.darken4,
          secondary: colors.blue.lighten2
        }
      },
      lightBlue: {
        dark: false,
        colors: {
          primary: colors.blue.darken1,
          secondary: colors.blue.darken4
        }
      },
      darkGreen: {
        dark: true,
        colors: {
          primary: colors.green.darken1,
          secondary: colors.green.lighten2
        }
      },
      lightGreen: {
        dark: false,
        colors: {
          primary: colors.green.darken1,
          secondary: colors.green.darken4
        }
      }
    }
  }
})

export default vuetify
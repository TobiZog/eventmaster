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
      dark: {
        dark: true,
        colors: {
          primary: colors.blue.darken4,
          secondary: colors.yellow.darken3,
          sheet: colors.grey.darken4
        }
      },
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken4,
          secondary: colors.yellow.darken3,
          sheet: colors.grey.lighten3
        }
      },
    }
  }
})

export default vuetify
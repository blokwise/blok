import { defineNuxtConfig } from 'nuxt'
import BlokwiseBlok from '..'

export default defineNuxtConfig({
  typescript: {
    shim: false
  },

  modules: [
    BlokwiseBlok
  ],

  blokwiseblok: {
    withConsole: true
  }
})

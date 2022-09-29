import { resolve } from 'path'
import { fileURLToPath } from 'url'
import consola from 'consola'
import { defineNuxtModule, installModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  withConsole: boolean,
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'blokwiseblok',
    compatibility: {
      nuxt: '^3.0.0-rc.6'
    }
  },
  defaults: {
    withConsole: false,
    prefix: ''
  },

  async setup (options, nuxt) {
    const logger = consola.withScope('@blokwise/blok')

    await installModule('@blokwise/dynamic', { withConsole: options.withConsole })

    // transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // add blokwise blok components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        prefix: options.prefix
      })
    })

    // Add blokwise blok composables
    // nuxt.hook('autoImports:dirs', (dirs) => {
    //   dirs.push(resolve(runtimeDir, 'composables'))
    // })

    if (options.withConsole) {
      logger.success({
        message: 'blok component ready',
        additional: 'Module @blokwise/blok successfully registered.\nReady to auto import and hydrate components based on storyblok blok schemas\nRead docs: https://blok.blokwise.io',
        badge: true
      })
    }
  }
})

import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils-edge'

const playground = fileURLToPath(new URL('../../playground', import.meta.url))

await setup({
  rootDir: playground,
  server: true,
  browser: false
})

describe('Blok component', () => {
  it('should render the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>index</h1>')
  }, 50000)

  it('loads bloks dynamically', async () => {
    const html = await $fetch('/')
    expect(html).toContain('This is totally foo!')
    expect(html).toContain('This is a bar')
    expect(html).toContain('This bar is somewhat different')
    expect(html).toContain('Another bar hanging with the cool kids')
  }, 50000)

  it('handles scoped slotData correctly', async () => {
    const html = await $fetch('/')
    expect(html).toContain('vue')
  }, 50000)
})

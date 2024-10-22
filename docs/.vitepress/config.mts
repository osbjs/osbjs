import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'osbjs',
  description: 'A minimalist osu! storyboarding library.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Reference', link: '/reference/storyboarding-api' },
    ],

    sidebar: {
      '/guide': {
        base: '/guide/',
        items: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting started', link: 'getting-started' },
              {
                text: 'Your first storyboard',
                link: 'your-first-storyboard',
              },
            ],
          },
          {
            text: 'Diving deeper',
            items: [
              { text: 'Components', link: 'components' },

            ]
          }
        ],
      },
      '/reference': {
        base: '/reference/',
        items: [
          { text: 'Storyboarding API', link: 'storyboarding-api' },
          { text: 'Parser API', link: 'parser-api' },
        ],
      },
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/osbjs/osbjs' }],
  },
  markdown: {
    lineNumbers: true,
    async shikiSetup(shiki) {
      const osbLang = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'osb.tmLanguage.json'), 'utf8'),
      )
      const osuLang = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'osu.tmLanguage.json'), 'utf8'),
      )
      await shiki.loadLanguage(osbLang, osuLang)
    },
  },
})

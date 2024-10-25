import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'osbjs',
  description: 'A minimalist osu! storyboarding library.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Reference', link: '/reference/graphic' },
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
            items: [{ text: 'Components', link: 'components' }],
          },
        ],
      },
      '/reference': {
        base: '/reference/',
        items: [
          {
            text: 'Storyboard elements',
            items: [
              { text: 'Graphic', link: 'graphic' },
              { text: 'Sprite', link: 'sprite' },
              { text: 'Animation', link: 'animation' },
              { text: 'Sample', link: 'sample' },
              { text: 'Component', link: 'component' },
              { text: 'Storyboard', link: 'storyboard' },
            ],
          },
          {
            text: 'Storyboard commands',
            items: [
              { text: 'Command', link: 'command' },
              { text: 'TypedCommand', link: 'typedcommand' },
              { text: 'Fade', link: 'fade' },
              { text: 'Rotate', link: 'rotate' },
              { text: 'Move', link: 'move' },
              { text: 'Scale', link: 'scale' },
              { text: 'ScaleVec', link: 'scalevec' },
              { text: 'Color', link: 'color' },
              { text: 'FlipH', link: 'fliph' },
              { text: 'FlipV', link: 'flipv' },
              { text: 'Additive', link: 'additive' },
              { text: 'CompoundCommand', link: 'compoundcommand' },
              { text: 'Trigger', link: 'trigger' },
              { text: 'Loop', link: 'loop' },
            ],
          },

          {
            text: 'Utilities',
            items: [
              { text: 'Layer', link: 'layer' },
              { text: 'Origin', link: 'origin' },
              { text: 'Easing', link: 'easing' },
              { text: 'SampleLayer', link: 'samplelayer' },
              { text: 'Vector2', link: 'vector2' },
              { text: 'Timestamp', link: 'timestamp' },
              { text: 'Color3', link: 'color3' },
              { text: 'TriggerType', link: 'triggertype' },
            ],
          },
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

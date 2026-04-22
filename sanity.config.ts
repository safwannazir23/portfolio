import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = 'mtweenzb'
const dataset = 'production'

export default defineConfig({
  basePath: '/admin',
  name: 'Portfolio_Studio',
  title: 'Portfolio Studio',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

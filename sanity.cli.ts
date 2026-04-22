import { defineCliConfig } from 'sanity/cli'

const projectId = 'mtweenzb'
const dataset = 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  }
})

import { createClient } from 'next-sanity'

export const projectId = 'mtweenzb'
export const dataset = 'production'
export const apiVersion = '2023-05-03' // Use a current date

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for real-time updates
})

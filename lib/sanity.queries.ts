import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  title,
  description,
  link,
  icon,
  mainImage,
  order
}`

export const educationQuery = groq`*[_type == "education"] | order(order asc) {
  degree,
  tag,
  duration,
  institution,
  location,
  description,
  order
}`

export const workQuery = groq`*[_type == "work"] | order(order asc) {
  "role": position,
  company,
  location,
  status,
  duration,
  description,
  order
}`

export const certificatesQuery = groq`*[_type == "certificate"] | order(order asc) {
  title,
  issuer,
  date,
  link,
  order
}`

export const proficienciesQuery = groq`*[_type == "proficiency"] | order(order asc) {
  name,
  category,
  icon,
  order
}`

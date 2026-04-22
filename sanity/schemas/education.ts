export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
    },
    {
      name: 'tag',
      title: 'Tag (e.g., Highest)',
      type: 'string',
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration (e.g., 2021 - 2025)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

export default {
  name: 'work',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status (e.g., Intern, Freelance)',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
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

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'The name of the Lucide icon to use (e.g., LayoutGrid, Sparkles)',
    },
    {
      name: 'mainImage',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort projects',
    },
  ],
}

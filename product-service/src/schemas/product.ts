export default {
  type: 'object',
  properties: {
    count: { type: 'number' },
    description: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' },
    image_src: { type: 'string' },
  },
  required: ['count', 'price', 'title'],
} as const;

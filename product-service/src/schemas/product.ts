export default {
  type: 'object',
  properties: {
    count: { type: 'number' },
    description: { type: 'string' },
    id: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' },
    imageSrc: { type: 'string' },
  },
  required: ['count', 'description', 'id', 'price', 'title', 'imageSrc'],
} as const;

export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' },
    description: { type: 'string', nullable: true },
    image_src: { type: 'string', nullable: true },
  },
  required: ['count', 'price', 'title'],
} as const;

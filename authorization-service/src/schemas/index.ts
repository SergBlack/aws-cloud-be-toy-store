export default {
  type: 'object',
  properties: {
    login: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['login', 'password'],
} as const;

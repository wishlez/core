export const getRandomId = (prefix: string): string => `${prefix}-${Buffer.from(Math.random().toString()).toString('base64')}`;

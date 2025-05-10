import { defineType } from 'sanity';
import product from './product';

export default {
  name: 'default',
  types: [product],  // Add 'product' schema directly without using schemaTypes
};

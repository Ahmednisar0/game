// schemas/product.js

export default {
  name: 'product',  // Unique name for this document type
  title: 'Product',  // Title displayed in Sanity Studio
  type: 'document',  // Document type schema
  fields: [
    {
      name: 'name',  // Product name
      title: 'Name',
      type: 'string',  // Type for the name field
    },
    {
      name: 'slug',  // Unique identifier for the product (URL-friendly)
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',  // Auto-generate the slug from the name
        maxLength: 200,  // Max length for the slug
      },
    },
    {
      name: 'description',  // Product description
      title: 'Description',
      type: 'text',  // Type for the description field
    },
    {
      name: 'price',  // Product price
      title: 'Price',
      type: 'number',  // Type for the price field
    },
    {
      name: 'category',  // Product category
      title: 'Category',
      type: 'string',  // Type for the category field
    },
    {
      name: 'image',  // Product image
      title: 'Image',
      type: 'image',  // Image field type
      options: {
        hotspot: true,  // Enable image cropping and hotspot functionality
      },
    },
    {
      name: 'inventoryCount',  // Track stock quantity
      title: 'Inventory Count',
      type: 'number',  // Type for inventory count
    },
    {
      name: 'tags',  // Optional tags for filtering or searching
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],  // Array of strings for tags
    },
  ],
};

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
    token: 'sk3JHaNEvrjouPNxxSgrmT9mfjzHf8IjxyLIZNZ3nYHUq9KteSc1Rzux2YGBr34DRffZCRhAW2T0dRc5zYZ18brDa1e1a3osEOPOxwKYzRN0xc8dZKXyUUwiia1rlSqH40dM7aNQ1MqHdE9VOdFHmXsOFka5L4izyiFEho04ZwiXoIm3zTN2',
  
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

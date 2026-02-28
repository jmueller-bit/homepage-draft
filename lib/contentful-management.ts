// Separate file for Contentful Management Client to avoid build issues
// This file should only be imported by admin pages

export const getManagementClient = async () => {
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
    return null
  }
  const { createClient } = await import('contentful-management')
  return createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    host: 'api.eu.contentful.com', // EU-Region!
  })
}

// Separate file for Contentful Management Client to avoid build issues
// This file should only be imported by admin pages

export const getManagementClient = async () => {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN?.trim()
  if (!token) {
    console.error('CONTENTFUL_MANAGEMENT_TOKEN is not set')
    return null
  }
  
  const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim()
  console.log('Creating management client for space:', spaceId)
  console.log('Token exists:', !!token)
  console.log('Token length:', token.length)
  
  const { createClient } = await import('contentful-management')
  return createClient({
    accessToken: token,
    host: 'api.eu.contentful.com', // EU-Region!
  })
}

import { NextResponse } from 'next/server'
import { getManagementClient } from '@/lib/contentful-management'

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? 'gesetzt' : 'fehlt',
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? 'gesetzt' : 'fehlt',
      CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN ? 'gesetzt' : 'fehlt',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'gesetzt' : 'fehlt',
    }
  }

  // Test Delivery Client
  try {
    const { contentfulClient } = await import('@/lib/contentful')
    const entries = await contentfulClient.getEntries({ limit: 1 })
    diagnostics.deliveryClient = {
      status: 'ok',
      canConnect: true,
      entriesFound: entries.total
    }
  } catch (error: any) {
    diagnostics.deliveryClient = {
      status: 'error',
      canConnect: false,
      error: error.message,
      details: error.response?.data || error
    }
  }

  // Test Management Client
  try {
    const managementClient = await getManagementClient()
    if (!managementClient) {
      diagnostics.managementClient = {
        status: 'error',
        canConnect: false,
        error: 'CONTENTFUL_MANAGEMENT_TOKEN ist nicht gesetzt'
      }
    } else {
      try {
        const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim()
        if (!spaceId) {
          diagnostics.managementClient = {
            status: 'error',
            canConnect: false,
            error: 'CONTENTFUL_SPACE_ID ist nicht gesetzt'
          }
        } else {
          const space = await managementClient.getSpace(spaceId)
          const environment = await space.getEnvironment('master')
          const contentTypes = await environment.getContentTypes()
          
          diagnostics.managementClient = {
            status: 'ok',
            canConnect: true,
            spaceId: spaceId,
            spaceName: space.name,
            environment: environment.name,
            contentTypes: contentTypes.items.map((ct: any) => ct.name)
          }
        }
      } catch (spaceError: any) {
        diagnostics.managementClient = {
          status: 'error',
          canConnect: false,
          spaceId: process.env.CONTENTFUL_SPACE_ID?.trim(),
          error: spaceError.message,
          details: spaceError.response?.data || spaceError
        }
      }
    }
  } catch (error: any) {
    diagnostics.managementClient = {
      status: 'error',
      canConnect: false,
      error: error.message
    }
  }

  return NextResponse.json(diagnostics)
}

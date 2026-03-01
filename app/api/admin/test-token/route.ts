export const dynamic = 'force-dynamic'

export async function GET() {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN?.trim()
  const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim()
  
  if (!token) {
    return Response.json({ error: 'CONTENTFUL_MANAGEMENT_TOKEN ist nicht gesetzt' }, { status: 400 })
  }
  
  // Test 1: Token-Info abrufen
  let tokenInfo = null
  try {
    const res = await fetch('https://api.contentful.com/users/me', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json'
      }
    })
    tokenInfo = await res.json()
  } catch (e: any) {
    tokenInfo = { error: e.message }
  }
  
  // Test 2: Alle Spaces des Tokens auflisten
  let spaces = null
  try {
    const res = await fetch('https://api.contentful.com/spaces', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json'
      }
    })
    const data = await res.json()
    spaces = data.items?.map((s: any) => ({ 
      id: s.sys.id, 
      name: s.name,
      isTarget: s.sys.id === spaceId 
    }))
  } catch (e: any) {
    spaces = { error: e.message }
  }
  
  // Test 3: Spezifische Space testen
  let targetSpace = null
  if (spaceId) {
    try {
      const res = await fetch(`https://api.contentful.com/spaces/${spaceId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.contentful.management.v1+json'
        }
      })
      if (res.ok) {
        targetSpace = await res.json()
      } else {
        targetSpace = { error: `Status ${res.status}`, status: res.status }
      }
    } catch (e: any) {
      targetSpace = { error: e.message }
    }
  }
  
  return Response.json({
    tokenInfo,
    spaces,
    targetSpace,
    config: {
      spaceId,
      tokenFirstChars: token ? token.substring(0, 10) + '...' : 'nicht gesetzt',
      tokenLength: token?.length
    }
  })
}
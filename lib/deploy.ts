// Vercel Deploy Hook Integration
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_URL

export async function triggerVercelDeploy() {
  if (!VERCEL_DEPLOY_HOOK) {
    console.warn('Vercel Deploy Hook nicht konfiguriert')
    return { success: false, error: 'Deploy Hook nicht konfiguriert' }
  }

  try {
    const response = await fetch(VERCEL_DEPLOY_HOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      console.log('✅ Vercel Deployment gestartet')
      return { success: true }
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    console.error('Fehler beim Triggern des Deployments:', error)
    return { success: false, error: String(error) }
  }
}

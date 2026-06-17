export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { getPayload } = await import('payload')
      const configPromise = await import('@payload-config')
      const payload = await getPayload({ config: configPromise.default })
      await payload.db.migrate()
    } catch (err) {
      console.error('[instrumentation] Migration skipped:', err)
    }
  }
}

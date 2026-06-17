export async function register() {
  console.log('[instrumentation] register() called, NEXT_RUNTIME =', process.env.NEXT_RUNTIME)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { getPayload } = await import('payload')
      const configPromise = await import('@payload-config')
      const payload = await getPayload({ config: configPromise.default })
      console.log('[instrumentation] running migrations...')
      await payload.db.migrate()
      console.log('[instrumentation] migrations complete')
    } catch (err) {
      console.error('[instrumentation] Migration failed:', err)
    }
  }
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { getPayload } = await import('payload')
      const { pushDevSchema } = await import('@payloadcms/drizzle')
      const configPromise = await import('@payload-config')
      const payload = await getPayload({ config: configPromise.default })
      await pushDevSchema(payload.db as any)
    } catch (err) {
      console.error('[instrumentation] Schema push skipped:', err)
    }
  }
}

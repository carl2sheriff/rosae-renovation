import type { SanitizedConfig } from 'payload'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

const configPromise = import('@payload-config').then(
  (m) => m.default as unknown as SanitizedConfig,
)

export default async function NotFound() {
  return NotFoundPage({
    config: configPromise,
    importMap,
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve({}),
  })
}

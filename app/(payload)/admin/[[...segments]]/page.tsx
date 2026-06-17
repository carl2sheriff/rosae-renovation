import type { Metadata } from 'next'
import type { SanitizedConfig } from 'payload'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const configPromise = import('@payload-config').then(
  (m) => m.default as unknown as SanitizedConfig,
)

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({ config: configPromise, params, searchParams })
}

export default function Page({ params, searchParams }: Args) {
  return RootPage({ config: configPromise, importMap, params, searchParams })
}

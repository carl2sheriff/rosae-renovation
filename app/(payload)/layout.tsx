import type { ServerFunctionClient } from 'payload'
import type { SanitizedConfig } from 'payload'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'

type Props = {
  children: React.ReactNode
}

const configPromise = import('@payload-config').then(
  (m) => m.default as unknown as SanitizedConfig,
)

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function PayloadLayout({ children }: Props) {
  return RootLayout({
    config: configPromise,
    importMap,
    serverFunction,
    children,
  })
}

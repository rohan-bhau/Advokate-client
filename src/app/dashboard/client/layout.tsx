import { requireRole } from '@/lib/core/core'
import React from 'react'

const ClientLayout = async({ children }: any) => {
    await requireRole("client")
  return children
}

export default ClientLayout

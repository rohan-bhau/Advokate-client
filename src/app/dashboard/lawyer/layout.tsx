import { requireRole } from '@/lib/core/core'
import React from 'react'

const LawyerLayout = async ({children}:any) => {
    await requireRole("lawyer")
  return children
}

export default LawyerLayout

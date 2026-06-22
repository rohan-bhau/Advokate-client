import { requireRole } from '@/lib/core/core'
import React from 'react'

const AdminLayout = async ({ children }: any) => {
    await requireRole("admin")
  return children
}

export default AdminLayout

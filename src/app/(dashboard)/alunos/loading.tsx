import React from 'react'
import { DataTableSkeleton } from '@/components/table-skeleton'

const Loading = () => {
  return (
    <div>
      <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
    </div>
  )
}

export default Loading

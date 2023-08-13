import { useState } from 'react'
import { usePagination } from 'react-use-pagination'

interface useSSPaginationProps {
  uri: string
  body: any
  pagesize: number
  accessToken: string
}

function useSSPagination(props: useSSPaginationProps): any {
  const { uri, body, pagesize, accessToken } = props

  const [length, setLength] = useState<number>(0)

  const { currentPage, pageSize } = usePagination({
    totalItems: length,
    initialPageSize: pagesize,
  })
}

export default useSSPagination

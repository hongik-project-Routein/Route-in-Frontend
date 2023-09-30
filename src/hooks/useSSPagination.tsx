import React, { useEffect, useState } from 'react'

import { usePagination } from 'react-use-pagination'
import { request } from '../util/axios'
import useUser from '../recoil/hooks/useUser'
import SSPagination from './../components/pagination/SSPagination'

interface FetchResult {
  results: any
  count: number
}

/**
 * useSSpagintion
 * 서버 사이드 페이지네이션을 제공해주는 커스텀 훅
 *
 * T: 요청을 받고 싶은 데이터 타입
 * uri: body 뒤에 붙는 엔드포인트
 * pageSize: 한 페이지에 보여지는 아이템 개수
 */
function useSSPagination<T>(
  uri: string,
  pageSize: number
): {
  loading: boolean
  error: any
  curPageItem: T[]
  renderSSPagination: () => JSX.Element
} {
  const [length, setLength] = useState<number>(0)
  const [curPageItem, setCurPageItem] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>('')

  const { loadUserInfo } = useUser()

  const { currentPage, setPage } = usePagination({
    totalItems: length,
    initialPageSize: pageSize,
  })

  const fetchData = async (page: number): Promise<any> => {
    setLoading(true)
    try {
      const response = await request<FetchResult>(
        'get',
        `${uri}page=${page}`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      console.log(response)

      setLength(response.count)
      return response.results
    } catch (error) {
      console.log(error)

      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const result = await fetchData(currentPage + 1) // 페이지 넘버는 협의 후 결정
      setCurPageItem(result)
    }

    loadData().catch((error) => {
      console.log(error)
    })
  }, [currentPage, uri])

  const onSetPage = (page: number): void => {
    setPage(page - 1)
  }

  const renderSSPagination = (): JSX.Element => {
    return (
      <SSPagination
        page={currentPage + 1}
        pageSize={pageSize}
        count={length}
        setPage={onSetPage}
      />
    )
  }

  return {
    loading,
    error,
    curPageItem,
    renderSSPagination,
  }
}

export default useSSPagination

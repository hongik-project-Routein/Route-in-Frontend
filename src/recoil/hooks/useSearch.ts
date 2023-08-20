import { useRecoilState } from 'recoil'
import search, { type Category } from '../atom/search'
import { useCallback } from 'react'
import { request } from '../../util/axios'
import useUser from './useUser'

interface UseSearchFunction {
  keyword: string
  category: Category
  changeKeyword: (keyword: string) => void
  changeCategory: (category: Category) => void
  onSearch: <T>(keyword: string, category: Category) => Promise<T[] | undefined>
}

function useSearch(): UseSearchFunction {
  const [searchCondition, setSearchCondition] = useRecoilState(search)
  const { loadUserInfo } = useUser()

  const keyword = searchCondition.keyword
  const category = searchCondition.category

  const changeKeyword = useCallback((keyword: string) => {
    setSearchCondition((prev) => ({ ...prev, keyword }))
  }, [])

  const changeCategory = useCallback((category: Category) => {
    setSearchCondition((prev) => ({ ...prev, category }))
  }, [])

  const onSearch = useCallback(
    async <T>(keyword: string, category: Category) => {
      try {
        const response = await request<T[]>(
          'get',
          `/search/${keyword.toLocaleLowerCase()}/${category.toLocaleLowerCase()}`,
          null,
          {
            Authorization: `Bearer ${loadUserInfo().accessToken}`,
          }
        )
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [searchCondition]
  )

  return {
    keyword,
    category,
    changeKeyword,
    changeCategory,
    onSearch,
  }
}

export default useSearch

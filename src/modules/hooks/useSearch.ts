import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '..'
import { type Category, ChangeCategory, ChangeKeyword } from '../slice/search'
import { request } from '../../util/axios'

function useSearch(): any {
  const dispatch = useDispatch()

  const keyword = useSelector((state: RootState) => state.search.keyword)
  const category = useSelector((state: RootState) => state.search.category)

  const changeKeyword = useCallback((keyword: string) => {
    dispatch(ChangeKeyword({ keyword }))
  }, [])

  const changeCategory = useCallback((category: Category) => {
    dispatch(ChangeCategory({ category }))
  }, [])

  const searchKeyword = useCallback(async () => {
    try {
      console.log(category, keyword)

      const response = await request<string>(
        'get',
        `/search/${category.toLocaleLowerCase()}/${keyword.toLocaleLowerCase()}`
      )
      return response
    } catch (err) {
      console.log(err)
    }
  }, [])

  return { keyword, category, changeKeyword, changeCategory, searchKeyword }
}

export default useSearch

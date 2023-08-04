import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '..'
import {
  ChangeExploreTabIndex,
  ChangeNavbarIndex,
  ChangeProfileTabIndex,
  ChangeSearchTabIndex,
} from '../slice/tab'

function useTab(): any {
  const dispatch = useDispatch()

  const navbar = useSelector((state: RootState) => state.tab.navbar)
  const search = useSelector((state: RootState) => state.tab.search)
  const profile = useSelector((state: RootState) => state.tab.profile)
  const explore = useSelector((state: RootState) => state.tab.explore)

  const changeNavbarIndex = useCallback((index: number) => {
    dispatch(ChangeNavbarIndex(index))
  }, [])

  const changeSearchTabIndex = useCallback((index: number) => {
    dispatch(ChangeSearchTabIndex(index))
  }, [])

  const changeProfileTabIndex = useCallback((index: number) => {
    dispatch(ChangeProfileTabIndex(index))
  }, [])

  const changeExploreTabIndex = useCallback((index: number) => {
    dispatch(ChangeExploreTabIndex(index))
  }, [])

  return {
    navbar,
    search,
    profile,
    explore,
    changeNavbarIndex,
    changeSearchTabIndex,
    changeProfileTabIndex,
    changeExploreTabIndex,
  }
}

export default useTab

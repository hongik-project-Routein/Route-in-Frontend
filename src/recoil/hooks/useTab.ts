import { useRecoilState } from 'recoil'
import tab from '../atom/tab'
import { useCallback } from 'react'

interface useTabFunction {
  navbar: number
  search: number
  profile: number
  explore: number
  changeNavbarIndex: (index: number) => void
  changeSearchTabIndex: (index: number) => void
  changeProfileTabIndex: (index: number) => void
  changeExploreTabIndex: (index: number) => void
}

function useTab(): useTabFunction {
  const [tabState, setTabState] = useRecoilState(tab)

  const navbar = tabState.navbar
  const search = tabState.search
  const profile = tabState.profile
  const explore = tabState.explore

  const changeNavbarIndex = useCallback((index: number) => {
    setTabState((prev) => {
      return {
        ...prev,
        navbar: index,
      }
    })
  }, [])
  const changeSearchTabIndex = useCallback((index: number) => {
    setTabState((prev) => {
      return {
        ...prev,
        search: index,
      }
    })
  }, [])
  const changeProfileTabIndex = useCallback((index: number) => {
    setTabState((prev) => {
      return {
        ...prev,
        profile: index,
      }
    })
  }, [])
  const changeExploreTabIndex = useCallback((index: number) => {
    setTabState((prev) => {
      return {
        ...prev,
        explore: index,
      }
    })
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

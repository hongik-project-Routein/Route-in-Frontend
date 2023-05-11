import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
import { changeExploreTabIndex } from '../../modules/tap/Exploretab'
import UserRecommendExploreArticle from './userRecommendExplore'
import LocationExploreArticle from './locationExplore'

export default function Explore(): JSX.Element {
  const dispatch = useDispatch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const curIndex = useSelector(
    (state: RootState) => state.changeExploreTabReducer.index
  )
  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    dispatch(changeExploreTabIndex(index))
  }
  useEffect(() => {
    setSelectedTabIndex(curIndex)
  }, [selectedTabIndex])
  return (
    <>
      {selectedTabIndex === 0 ? (
        <HeaderAndSidebar
          article={
            <LocationExploreArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 1 ? (
        <HeaderAndSidebar
          article={
            <UserRecommendExploreArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </>
  )
}

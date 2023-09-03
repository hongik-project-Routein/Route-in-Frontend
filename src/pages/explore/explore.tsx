import React, { useState, useEffect } from 'react'
import UserRecommendExploreArticle from './userRecommendExplore'
import LocationExploreArticle from './locationExplore'
import useTab from '../../recoil/hooks/useTab'

export default function Explore(): JSX.Element {
  const { explore, changeExploreTabIndex } = useTab()

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(explore)

  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    changeExploreTabIndex(index)
  }
  useEffect(() => {
    setSelectedTabIndex(explore)
  }, [selectedTabIndex])
  return (
    <>
      {selectedTabIndex === 0 ? (
        <UserRecommendExploreArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 1 ? (
        <LocationExploreArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </>
  )
}

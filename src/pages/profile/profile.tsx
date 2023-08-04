import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import ProfileMapArticle from './profileMap'
import ProfilePostArticle from './profilePost'
import ProfileBookmarkArticle from './profileBookmark'
import useTab from '../../modules/hooks/useTab'

export default function MyProfile(): JSX.Element {
  const { profile, changeProfileTabIndex } = useTab()

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(profile)

  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    changeProfileTabIndex(index)
  }
  useEffect(() => {
    setSelectedTabIndex(profile)
  }, [selectedTabIndex])

  return (
    <>
      {selectedTabIndex === 0 ? (
        <HeaderAndSidebar
          article={
            <ProfileMapArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 1 ? (
        <HeaderAndSidebar
          article={
            <ProfilePostArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 2 ? (
        <HeaderAndSidebar
          article={
            <ProfileBookmarkArticle
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

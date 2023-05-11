import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
import { changeProfileTabIndex } from '../../modules/tap/profiletab'
import ProfileMapArticle from './profileMap'
import ProfilePostArticle from './profilePost'
import ProfileStoryArticle from './profileStory'
import ProfileBookmarkArticle from './profileBookmark'

export default function MyProfile(): JSX.Element {
  const dispatch = useDispatch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const curIndex = useSelector(
    (state: RootState) => state.changeProfileTabReducer.index
  )
  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    dispatch(changeProfileTabIndex(index))
  }
  useEffect(() => {
    setSelectedTabIndex(curIndex)
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
            <ProfileStoryArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 3 ? (
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

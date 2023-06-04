import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { type RootState } from '../../modules'
import { changeSearchTabIndex } from '../../modules/tap/tab'
import SearchPostArticle from './SearchPost'
import SearchPinArticle from './SearchPin'
import SearchMapArticle from './SearchMap'
import SearchUserArticle from './SearchUser'

export default function Search(): JSX.Element {
  const dispatch = useDispatch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const curIndex = useSelector(
    (state: RootState) => state.changeTabReducer.index
  )
  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    dispatch(changeSearchTabIndex(index))
  }
  useEffect(() => {
    setSelectedTabIndex(curIndex)
  }, [selectedTabIndex])
  return (
    <>
      {selectedTabIndex === 0 ? (
        <HeaderAndSidebar
          article={
            <SearchPostArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 1 ? (
        <HeaderAndSidebar
          article={
            <SearchPinArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 2 ? (
        <HeaderAndSidebar
          article={
            <SearchMapArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 3 ? (
        <HeaderAndSidebar
          article={
            <SearchUserArticle
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

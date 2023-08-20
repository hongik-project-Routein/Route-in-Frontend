import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/common/headerAndSidebar'
import SearchPostArticle from './SearchPost'
import SearchPinArticle from './SearchPin'
import SearchMapArticle from './SearchMap'
import SearchUserArticle from './SearchUser'
import { searchTabContents } from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import useTab from '../../recoil/hooks/useTab'

export default function Search(): JSX.Element {
  const { search, changeSearchTabIndex } = useTab()

  const { changeCategory } = useSearch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(search)

  const handleTabClick = async (index: number): Promise<void> => {
    setSelectedTabIndex(index)
    changeSearchTabIndex(index)
    const newCategory = searchTabContents[index].category
    changeCategory(newCategory)
  }

  useEffect(() => {
    setSelectedTabIndex(search)
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

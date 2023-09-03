import React, { useState, useEffect } from 'react'
import SearchPostArticle from './SearchPost'
import SearchPinArticle from './SearchPin'
import SearchMapArticle from './SearchMap'
import SearchUserArticle from './SearchUser'
import { searchTabContents } from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import useTab from '../../recoil/hooks/useTab'

export default function Search(): JSX.Element {
  const { search, changeSearchTabIndex } = useTab()

  const { changeKeyword, changeCategory } = useSearch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(search)

  const handleTabClick = async (index: number): Promise<void> => {
    setSelectedTabIndex(index)
    changeSearchTabIndex(index)
    const newCategory = searchTabContents[index].category
    changeCategory(newCategory)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const keyword = searchParams.get('q')
    changeKeyword(keyword ?? '')
  }, [])

  useEffect(() => {
    setSelectedTabIndex(search)
  }, [selectedTabIndex])

  return (
    <>
      {selectedTabIndex === 0 ? (
        <SearchPostArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 1 ? (
        <SearchPinArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 2 ? (
        <SearchMapArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 3 ? (
        <SearchUserArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </>
  )
}

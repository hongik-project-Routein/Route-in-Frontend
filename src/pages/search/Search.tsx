import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import SearchPostArticle from './SearchPost'
import SearchPinArticle from './SearchPin'
import SearchMapArticle from './SearchMap'
import SearchUserArticle from './SearchUser'
import useTab from '../../modules/hooks/useTab'
import { useNavigate } from 'react-router-dom'
import useSearch from '../../modules/hooks/useSearch'
import { searchTabContents } from '../../components/searchTab'

export default function Search(): JSX.Element {
  const navigate = useNavigate()
  const { search, changeSearchTabIndex } = useTab()
  const { keyword, changeCategory } = useSearch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(search)

  const handleTabClick = (index: number): void => {
    const params = new URLSearchParams()
    params.append('query', keyword)
    console.log(params.toString())

    navigate(
      `/search/${searchTabContents[index].category}?${params.toString()}`
    )
    setSelectedTabIndex(index)
    changeSearchTabIndex(index)
    changeCategory(searchTabContents[index].category)
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

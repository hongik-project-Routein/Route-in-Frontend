import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import ProfileMapContent from '../../components/etc/profileMap'
import { type LoadPost } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'

interface SearchMapArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchMapArticle(
  props: SearchMapArticleProps
): JSX.Element {
  const { keyword, category } = useSearch()
  const [searchResult, setSearchResult] = useState<LoadPost[] | undefined>([])

  const { curPageItem, renderSSPagination } = useSSPagination<LoadPost>(
    `/search/${keyword.toLocaleLowerCase()}/${category.toLocaleLowerCase()}`,
    6
  )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem])

  return (
    <>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultTitle>
        <SearchResultKeyword>{keyword}</SearchResultKeyword>
        {keyword === ''
          ? `검색어를 입력하세요`
          : `와 관련된 경로를 추천합니다.`}
      </SearchResultTitle>
      <SearchResultContainer>
        {searchResult !== undefined ? (
          <ProfileMapContent size="450px" posts={searchResult} />
        ) : null}
      </SearchResultContainer>
      {renderSSPagination()}
    </>
  )
}

const SearchResultTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 25px;
`

const SearchResultKeyword = styled.span`
  color: ${theme.colors.primaryColor};
`

const SearchResultContainer = styled.div`
  width: 900px;
`

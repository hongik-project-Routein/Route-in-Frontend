import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import SearchWindow from '../../components/searchWindow'
import SearchTab from '../../components/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchPinType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchPin from '../../components/eachItem/EachSearchPin'

interface SearchPinArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPinArticle(
  props: SearchPinArticleProps
): JSX.Element {
  const { keyword, category } = useSearch()
  const [searchResult, setSearchResult] = useState<SearchPinType[] | undefined>(
    []
  )

  const { curPageItem, renderSSPagination } = useSSPagination<SearchPinType>(
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
        {keyword === '' ? `검색어를 입력하세요` : `와 관련된 핀을 추천합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        {searchResult !== undefined
          ? searchResult.map((pin, idx) => (
              <EachSearchPin key={idx} loadPin={pin} />
            ))
          : null}
      </SearchResultGrid>
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

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`

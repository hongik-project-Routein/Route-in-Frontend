import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchUserType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchUser from '../../components/eachItem/EachSearchUser'

interface SearchUserArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchUserArticle(
  props: SearchUserArticleProps
): JSX.Element {
  const { keyword, category } = useSearch()
  const [searchResult, setSearchResult] = useState<
    SearchUserType[] | undefined
  >([])

  const { curPageItem, renderSSPagination } = useSSPagination<SearchUserType>(
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
        {keyword === '' ? `검색어를 입력하세요` : `유저를 검색합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        {searchResult !== undefined
          ? searchResult.map((user, idx) => (
              <EachSearchUser key={idx} loadUser={user} />
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
  grid-gap: 46px;
  width: 900px;
`

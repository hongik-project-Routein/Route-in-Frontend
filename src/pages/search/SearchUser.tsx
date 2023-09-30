import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchUserType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchUser from '../../components/eachItem/EachSearchUser'
import { useNavigate } from 'react-router-dom'

interface SearchUserArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchUserArticle(
  props: SearchUserArticleProps
): JSX.Element {
  const { keyword, changeKeyword } = useSearch()
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState<
    SearchUserType[] | undefined
  >([])

  const { curPageItem, renderSSPagination } = useSSPagination<SearchUserType>(
    `/api/user/?search=${keyword.toLocaleLowerCase()}`,
    6
  )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem, keyword])

  useEffect(() => {
    changeKeyword('')
    navigate('/search')
  }, [])

  return (
    <>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultTitle>
        <SearchResultKeyword>{keyword}</SearchResultKeyword>
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
  margin-bottom: 50px;
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

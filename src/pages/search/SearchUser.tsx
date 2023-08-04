import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PageMoveBtn from '../../components/pageMoveBtn'
import SearchWindow from '../../components/searchWindow'
import useSearch from '../../modules/hooks/useSearch'
import SearchTab from '../../components/searchTab'

interface SearchUserArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchUserArticle(
  props: SearchUserArticleProps
): JSX.Element {
  const { keyword } = useSearch()

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
      <SearchResultGrid></SearchResultGrid>
      <PageMoveBtn />
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

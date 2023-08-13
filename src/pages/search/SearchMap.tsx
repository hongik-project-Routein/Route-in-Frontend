import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PageMoveBtn from '../../components/pageMoveBtn'
import SearchWindow from '../../components/searchWindow'
import SearchTab from '../../components/searchTab'
import useSearch from './../../recoil/hooks/useSearch'

interface SearchMapArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchMapArticle(
  props: SearchMapArticleProps
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
        {keyword === ''
          ? `검색어를 입력하세요`
          : `와 관련된 경로를 추천합니다.`}
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

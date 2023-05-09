import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import Tab from '../../components/tab'
import SearchWindow from '../../components/searchWindow'

interface TabContent {
  tabName: string
  link: string
}

interface SearchPostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPostArticle(
  props: SearchPostArticleProps
): JSX.Element {
  const tabContents: TabContent[] = [
    { tabName: '게시글', link: '/search/post' },
    { tabName: '핀', link: '/search/pin' },
    { tabName: '지도', link: '/search/map' },
    { tabName: '유저', link: '/search/user' },
  ]
  return (
    <>
      <SearchWindow />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultTitle>
        <SearchResultKeyword>해시태그</SearchResultKeyword>
        {` 와 관련된 게시글을 추천합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
      </SearchResultGrid>
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

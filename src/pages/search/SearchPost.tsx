import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import Tab from '../../components/tab'
import SearchWindow from '../../components/searchWindow'
import { type PostCardData, postDemo } from '../../dummy/post'

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
  const [keyword, setKeyword] = useState<string>('')

  // 더미 데이터 용
  const [posts, setPosts] = useState<PostCardData[]>([])
  const loadPost = (): void => {
    const post: PostCardData[] = postDemo
    setPosts(post)
  }
  useEffect(() => {
    loadPost()
  }, [posts])
  return (
    <>
      <SearchWindow setKeyword={setKeyword} />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultTitle>
        <SearchResultKeyword>{keyword}</SearchResultKeyword>
        {keyword === ''
          ? `검색어를 입력하세요`
          : `와 관련된 게시글을 추천합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        {posts !== undefined
          ? posts.map((post, idx) => <PostSmall key={idx} post={post} />)
          : null}
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
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`

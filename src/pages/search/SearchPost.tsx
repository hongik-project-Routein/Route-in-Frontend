import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import SearchWindow from '../../components/searchWindow'
import { postDemo } from '../../dummy/post'
import useSearch from '../../modules/hooks/useSearch'
import SearchTab from '../../components/searchTab'
import { type LoadPost } from '../../types/postTypes'

interface SearchPostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPostArticle(
  props: SearchPostArticleProps
): JSX.Element {
  const { keyword } = useSearch()

  // 더미 데이터 용
  const [posts, setPosts] = useState<LoadPost[]>([])
  const loadPost = (): void => {
    const post: LoadPost[] = postDemo
    setPosts(post)
  }
  useEffect(() => {
    loadPost()
  }, [posts])
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
          : `와 관련된 게시글을 추천합니다.`}
      </SearchResultTitle>
      <SearchResultGrid>
        {posts !== undefined
          ? posts.map((post, idx) => <PostSmall key={idx} loadPost={post} />)
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

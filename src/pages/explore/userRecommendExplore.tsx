import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import Tab from '../../components/tab'
import theme from '../../styles/Theme'
import { type PostCardData, postDemo } from '../../dummy/post'

interface TabContent {
  tabName: string
  link: string
}

interface UserRecommendExploreArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function UserRecommendExploreArticle(
  props: UserRecommendExploreArticleProps
): JSX.Element {
  const tabContents: TabContent[] = [
    { tabName: '현재 위치', link: '/explore/location' },
    { tabName: '추천', link: '/explore/recommend' },
  ]
  // 더미 데이터 용
  const [posts, setPosts] = useState<PostCardData[]>([])
  const loadPost = (): void => {
    const post: PostCardData[] = postDemo
    const select = post.filter(
      (item) =>
        item.postId === '4' || item.postId === '5' || item.postId === '6'
    )
    setPosts(select)
  }
  useEffect(() => {
    loadPost()
  }, [posts])
  return (
    <>
      <ExploreHeader>
        <Hashtags>
          <Hashtag>#야구장</Hashtag>
          <Hashtag>#치킨</Hashtag>
          <Hashtag>#콘서트</Hashtag>
        </Hashtags>
        <RecommandationMent>
          {`jinokim98님의 성향에 맞는 게시물을 추천합니다.`}
        </RecommandationMent>
      </ExploreHeader>
      <Tab
        tabContent={tabContents}
        handleTabfunc={props.handleTabfunc}
        tabIndex={props.tabIndex}
      />
      <RecommandationResultGrid>
        {posts !== undefined
          ? posts.map((post, idx) => <PostSmall key={idx} post={post} />)
          : null}
      </RecommandationResultGrid>
      <PageMoveBtn />
    </>
  )
}

const ExploreHeader = styled.header`
  font-size: 20px;
  margin-top: 78px;
  margin-bottom: 30px;
`
const Hashtags = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`

const Hashtag = styled.div`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
  font-size: 14px;
  color: ${theme.colors.primaryColor};
`

const RecommandationMent = styled.div`
  margin-bottom: 50px;
`

const RecommandationResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 46px;
  width: 900px;
`

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import Tab from '../../components/tab'
import { type PostCardData, postDemo } from '../../dummy/post'

interface TabContent {
  tabName: string
  link: string
}

interface LocationExploreArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function LocationExploreArticle(
  props: LocationExploreArticleProps
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
      (item) => item.postId === '5' || item.postId === '6'
    )
    setPosts(select)
  }
  useEffect(() => {
    loadPost()
  }, [posts])
  return (
    <>
      <ExploreHeader>
        <CurrentLocation>
          <FontAwesomeIcon icon={faLocationDot} />
          <Address>홍익대학교 서울캠퍼스</Address>
        </CurrentLocation>
        <RecommandationMent>
          {`현재 위치에 관련된 게시물을 추천합니다.`}
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
const CurrentLocation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`

const Address = styled.div`
  margin-left: 20px;
`

const RecommandationMent = styled.div`
  margin-bottom: 44px;
`

const RecommandationResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`

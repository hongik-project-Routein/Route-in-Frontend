import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import Tab from '../../components/tab'

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
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
        <PostSmall />
      </RecommandationResultGrid>
      <PageMoveBtn />
    </>
  )
}

const ExploreHeader = styled.header`
  font-size: 20px;
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
  margin-bottom: 30px;
`

const RecommandationResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 46px;
  width: 900px;
`

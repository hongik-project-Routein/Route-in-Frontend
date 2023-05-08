import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import HeaderAndSidebar from '../../components/headerAndSidebar'

export default function LocationExplore(): JSX.Element {
  return <HeaderAndSidebar article={<ExploreArticle />} />
}

function ExploreArticle(): JSX.Element {
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
      <Tab>탭</Tab>
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

const Tab = styled.div`
  width: 70%;
  height: 50px;
  margin-bottom: 30px;
`

const RecommandationResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 46px;
  width: 900px;
`

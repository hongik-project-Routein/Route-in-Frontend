import React from 'react'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'

export default function LocationExplore(): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <ExploreGrid>
        <ExploreArticle />
      </ExploreGrid>
    </Grid>
  )
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar createPost createPost ';
`

const HeaderGrid = styled.div`
  grid-area: header;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const ExploreGrid = styled.div`
  grid-area: createPost;
`
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

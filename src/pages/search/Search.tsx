import React from 'react'
import styled from 'styled-components'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import theme from '../../styles/Theme'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'

export default function Search(): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <SearchGrid>
        <SearchArticle />
      </SearchGrid>
    </Grid>
  )
}

function SearchArticle(): JSX.Element {
  return (
    <>
      <SearchWindow>
        <InputKeyword placeholder="해시태그로 검색" />
        <SearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchWindow>
      <Tab>탭</Tab>
      <SearchResultTitle>
        <SearchResultKeyword>해시태그</SearchResultKeyword>
        {` 로 검색 관련된 게시글을 추천합니다.`}
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
const SearchGrid = styled.div`
  grid-area: createPost;
`

const SearchWindow = styled.div`
  display: flex;
  width: 520px;
  height: 60px;
  margin-bottom: 30px;
`

const InputKeyword = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.primaryColor};
  font-size: 16px;
`
const SearchButton = styled.button`
  width: 40px;
  height: 60px;
  border: 1px solid ${theme.colors.primaryColor};
  border-left: none;
`

const Tab = styled.div`
  width: 70%;
  height: 50px;
  margin-bottom: 30px;
`

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

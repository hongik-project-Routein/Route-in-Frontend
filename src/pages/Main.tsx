import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Post from '../components/post'
import styled from 'styled-components'
import UserRecommend from '../components/userRecommend'
import theme from '../styles/Theme'

function Main(): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      <PostGrid>
        <Post />
      </PostGrid>
      <RecommendGrid>
        <UserRecommend />
      </RecommendGrid>
      <FooterGrid>
        <Footer>
          {`@ 2023 Route in
          From Hongik Univ. Project 1 Group6`}
        </Footer>
      </FooterGrid>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar post recommend'
    'sidebar post footer';
`

const HeaderGrid = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${theme.colors.white};
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const PostGrid = styled.div`
  grid-area: post;
`
const RecommendGrid = styled.div`
  grid-area: recommend;
`

const FooterGrid = styled.div`
  grid-area: footer;
`

const Footer = styled.footer`
  color: #475467;
  text-align: center;
  white-space: pre-line;
  line-height: 24px;
`

export default Main

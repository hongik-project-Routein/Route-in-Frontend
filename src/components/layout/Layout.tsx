import React from 'react'
import styled from 'styled-components'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import { Outlet } from 'react-router-dom'

function Layout(): JSX.Element {
  return (
    <Container>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      <ArticleGrid>
        <Outlet />
      </ArticleGrid>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar article article ';

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }
`

const HeaderGrid = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  width: 100%;
  height: 80px;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
  position: fixed;
  top: 90px;
  left: 0;
  z-index: 20;

  width: 260px;
  height: 100%;

  @media screen and (max-width: 480px) {
    display: none;
  }
`
const ArticleGrid = styled.div`
  grid-area: article;
`

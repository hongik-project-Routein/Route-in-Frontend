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
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar article article ';
`

const HeaderGrid = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const ArticleGrid = styled.div`
  grid-area: article;
`

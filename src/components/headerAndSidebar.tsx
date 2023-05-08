import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Sidebar from './sidebar'

interface propsType {
  article: JSX.Element
}

export default function HeaderAndSidebar(props: propsType): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <ArticleGrid>{props.article}</ArticleGrid>
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
    'sidebar article article ';
`

const HeaderGrid = styled.div`
  grid-area: header;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const ArticleGrid = styled.div`
  grid-area: article;
`

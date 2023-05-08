import React from 'react'
import styled from 'styled-components'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Profile from '../../components/profile'

export default function Setting(): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <SettingGrid>
        <SettingArticle />
      </SettingGrid>
    </Grid>
  )
}

function SettingArticle(): JSX.Element {
  return (
    <>
      <Profile />
      <Tab>탭</Tab>
      <TabArticle></TabArticle>
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
const SettingGrid = styled.div`
  grid-area: createPost;
`
const Tab = styled.div`
  width: 70%;
  height: 50px;
  margin-bottom: 30px;
`

const TabArticle = styled.div`
  width: 900px;
  height: 450px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
`

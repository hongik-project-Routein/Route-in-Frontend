import React from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import HeaderAndSidebar from '../../components/headerAndSidebar'

export default function MyProfile(): JSX.Element {
  return <HeaderAndSidebar article={<MyProfileArticle />} />
}

function MyProfileArticle(): JSX.Element {
  return (
    <>
      <Profile />
      <Tab>탭</Tab>
      <TabArticle></TabArticle>
    </>
  )
}

const Tab = styled.div`
  width: 70%;
  height: 50px;
  margin-bottom: 30px;
`

const TabArticle = styled.div`
  width: 900px;
  height: 450px;
`

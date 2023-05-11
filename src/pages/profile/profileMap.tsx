import React from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import Tab from '../../components/tab'

interface TabContent {
  tabName: string
  link: string
}

interface ProfileMapArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function ProfileMapArticle(
  props: ProfileMapArticleProps
): JSX.Element {
  const username = 'jinokim98' // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username}/map` },
    { tabName: '게시글', link: `/profile/${username}/post` },
    { tabName: '스토리', link: `/profile/${username}/story` },
    { tabName: '북마크', link: `/profile/${username}/bookmark` },
  ]
  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle></TabArticle>
    </>
  )
}

const TabArticle = styled.div`
  width: 900px;
  height: 450px;
`

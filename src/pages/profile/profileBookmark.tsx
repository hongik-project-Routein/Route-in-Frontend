import React from 'react'
import styled from 'styled-components'
import Profile from '../../components/etc/profile'
import Tab from '../../components/util/tab'
import PostSmall from '../../components/post/postSmall'
import { type LoadPost } from '../../types/postTypes'
import useUser from '../../recoil/hooks/useUser'
import useSSPagination from '../../hooks/useSSPagination'

interface TabContent {
  tabName: string
  link: string
}

interface ProfileBookmarkArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function ProfileBookmarkArticle(
  props: ProfileBookmarkArticleProps
): JSX.Element {
  const { loadUserInfo } = useUser()
  const uname = loadUserInfo().uname

  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${uname ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${uname ?? ''}/post` },
    { tabName: '북마크', link: `/profile/${uname ?? ''}/bookmark` },
  ]

  const { curPageItem, renderSSPagination } = useSSPagination<LoadPost>(
    `/api/user/${uname}/bookmark`,
    6
  )

  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle>
        {curPageItem.length > 0
          ? curPageItem.map((post, idx) => (
              <PostSmall key={idx} loadPost={post} />
            ))
          : null}
      </TabArticle>
      {renderSSPagination()}
    </>
  )
}

const TabArticle = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`

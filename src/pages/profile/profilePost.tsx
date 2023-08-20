import React from 'react'
import styled from 'styled-components'
import Profile from '../../components/etc/profile'
import Tab from '../../components/util/tab'
import PostSmall from '../../components/post/postSmall'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import profileStore from '../../recoil/atom/profile'

interface TabContent {
  tabName: string
  link: string
}

interface ProfilePostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function ProfilePostArticle(
  props: ProfilePostArticleProps
): JSX.Element {
  const { username } = useParams() // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${username ?? ''}/post` },
    { tabName: '북마크', link: `/profile/${username ?? ''}/bookmark` },
  ]
  // 더미 데이터 용
  const myPosts = useRecoilValue(profileStore)

  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle>
        {myPosts.post_set.length > 0
          ? myPosts.post_set.map((post, idx) => (
              <PostSmall key={idx} loadPost={post} />
            ))
          : null}
      </TabArticle>
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

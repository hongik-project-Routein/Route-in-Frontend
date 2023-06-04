import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import Tab from '../../components/tab'
import PostSmall from '../../components/postSmall'
import PageMoveBtn from '../../components/pageMoveBtn'
import { type PostCardData, postDemo } from '../../dummy/post'
import { useParams } from 'react-router-dom'

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
  const { username } = useParams() // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${username ?? ''}/post` },
    { tabName: '스토리', link: `/profile/${username ?? ''}/story` },
    { tabName: '북마크', link: `/profile/${username ?? ''}/bookmark` },
  ]
  // 더미 데이터 용
  const [posts, setPosts] = useState<PostCardData[]>([])
  const loadPost = (): void => {
    const post: PostCardData[] = postDemo
    setPosts(post)
  }
  useEffect(() => {
    loadPost()
  }, [posts])
  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle>
        {posts !== undefined
          ? posts.map((post, idx) => <PostSmall key={idx} loadPost={post} />)
          : null}
      </TabArticle>
      <PageMoveBtn />
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

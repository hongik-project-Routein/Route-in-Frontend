import React from 'react'
import styled from 'styled-components'
import Tab from '../../components/util/tab'
import PostSmall from '../../components/post/postSmall'
import { type LoadPost } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import { useParams } from 'react-router-dom'
import moment from 'moment'

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
  const { uname } = useParams()

  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${uname ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${uname ?? ''}/post` },
    { tabName: '북마크', link: `/profile/${uname ?? ''}/bookmark` },
  ]

  const { curPageItem, renderSSPagination } = useSSPagination<LoadPost>(
    `/api/user/${uname as string}/bookmark/?`,
    6
  )

  // 백에서 게시글 생성 시간을 보내주어야 정렬 가능
  const sortByCreatedAt = (a: LoadPost, b: LoadPost): number => {
    if (moment(a.post.created_at) < moment(b.post.created_at)) return 1
    if (moment(a.post.created_at) > moment(b.post.created_at)) return -1
    return 0
  }

  return (
    <>
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle>
        {curPageItem !== undefined && curPageItem.length > 0
          ? [...curPageItem]
              .sort(sortByCreatedAt)
              .map((post, idx) => <PostSmall key={idx} loadPost={post} />)
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

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`

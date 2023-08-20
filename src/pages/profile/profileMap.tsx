import React from 'react'
import Profile from '../../components/profile'
import Tab from '../../components/tab'
import { useParams } from 'react-router-dom'
import ProfileMapContent from '../../components/profileMap'
import { useRecoilValue } from 'recoil'
import profileStore from '../../recoil/atom/profile'

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
  const { username } = useParams() // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${username ?? ''}/post` },
    { tabName: '북마크', link: `/profile/${username ?? ''}/bookmark` },
  ]

  const userProfile = useRecoilValue(profileStore)
  console.log(userProfile.posts.length)

  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      {userProfile.posts.length > 0 ? (
        <ProfileMapContent size="450px" posts={userProfile.posts} />
      ) : null}
    </>
  )
}

import React from 'react'
import Tab from '../../components/util/tab'
import { useParams } from 'react-router-dom'
import ProfileMapContent from '../../components/etc/profileMap'
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
  const { uname } = useParams() // 실제는 db에서 uname 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${uname ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${uname ?? ''}/post` },
    { tabName: '북마크', link: `/profile/${uname ?? ''}/bookmark` },
  ]

  const userProfile = useRecoilValue(profileStore)

  return (
    <>
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      {userProfile.post_set.length > 0 ? (
        <ProfileMapContent size="450px" posts={userProfile.post_set} />
      ) : null}
    </>
  )
}

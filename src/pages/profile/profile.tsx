import React, { useState, useEffect } from 'react'
import ProfileMapArticle from './profileMap'
import ProfilePostArticle from './profilePost'
import ProfileBookmarkArticle from './profileBookmark'
import { useRecoilState } from 'recoil'
import profileStore from '../../recoil/atom/profile'
import { useParams } from 'react-router-dom'
import { request } from '../../util/axios'
import { type UserData } from '../../types/userType'
import useTab from '../../recoil/hooks/useTab'
import useUser from '../../recoil/hooks/useUser'
import useFollow from '../../recoil/hooks/useFollow'
import Profile from '../../components/etc/profile'

export default function MyProfile(): JSX.Element {
  const { profile, changeProfileTabIndex } = useTab()
  const { uname } = useParams()
  const { loadUserInfo } = useUser()

  const { followerList, followingList } = useFollow()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(profile)

  const [userProfile, setUserProfile] = useRecoilState(profileStore)

  const fetchData = async (): Promise<UserData> => {
    try {
      const response = await request<UserData>(
        'get',
        `/api/user/${uname as string}`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const loadUserInfo = async (): Promise<void> => {
      const result = await fetchData()
      setUserProfile(result)
    }

    loadUserInfo().catch((error) => {
      console.log(error)
    })
  }, [followerList, followingList])

  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    changeProfileTabIndex(index)
  }

  useEffect(() => {
    setSelectedTabIndex(profile)
  }, [selectedTabIndex])

  return (
    <>
      <Profile
        isMyProfile={uname === loadUserInfo().uname}
        userProfile={userProfile}
      />
      {selectedTabIndex === 0 ? (
        <ProfileMapArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 1 ? (
        <ProfilePostArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 2 ? (
        <ProfileBookmarkArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </>
  )
}

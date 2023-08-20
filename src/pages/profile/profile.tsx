import React, { useState, useEffect } from 'react'
import HeaderAndSidebar from '../../components/common/headerAndSidebar'
import ProfileMapArticle from './profileMap'
import ProfilePostArticle from './profilePost'
import ProfileBookmarkArticle from './profileBookmark'
import { useSetRecoilState } from 'recoil'
import profileStore from '../../recoil/atom/profile'
import { useParams } from 'react-router-dom'
import { request } from '../../util/axios'
import { type UserData } from '../../types/userType'
import useTab from '../../recoil/hooks/useTab'

export default function MyProfile(): JSX.Element {
  const { profile, changeProfileTabIndex } = useTab()
  const { username } = useParams()

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(profile)
  const setUserProfile = useSetRecoilState(profileStore)

  const fetchData = async (): Promise<UserData> => {
    try {
      const response = await request<UserData>(
        'get',
        `/api/user/${username as string}`
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
  }, [])

  const handleTabClick = (index: number): void => {
    setSelectedTabIndex(index)
    changeProfileTabIndex(index)
  }
  useEffect(() => {
    setSelectedTabIndex(profile)
  }, [selectedTabIndex])

  return (
    <>
      {selectedTabIndex === 0 ? (
        <HeaderAndSidebar
          article={
            <ProfileMapArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 1 ? (
        <HeaderAndSidebar
          article={
            <ProfilePostArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : selectedTabIndex === 2 ? (
        <HeaderAndSidebar
          article={
            <ProfileBookmarkArticle
              handleTabfunc={handleTabClick}
              tabIndex={selectedTabIndex}
            />
          }
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </>
  )
}

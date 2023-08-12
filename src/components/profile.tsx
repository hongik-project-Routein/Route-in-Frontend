import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import FollowerModal from './followerModal'
import FollowingModal from './followingModal'
import { useParams } from 'react-router-dom'
import useModal from '../hooks/useModal'
import { request } from '../util/axios'
import { type UserData } from './../mocks/data/user'
import useUser from '../recoil/hooks/useUser'
import useFollow from '../recoil/hooks/useFollow'

export default function Profile(): JSX.Element {
  const [introductionText, setIntroductionText] = useState<string>('')
  const [activeIntroductionModify, setActiveIntroductionModify] =
    useState(false)

  const { loadUserInfo } = useUser()
  const { followerList, followingList } = useFollow()

  const myUname = loadUserInfo().uname

  const followerRef = useRef<HTMLDivElement>(null)
  const followingRef = useRef<HTMLDivElement>(null)

  const followModalOpen = useModal(followerRef)
  const followingModalOpen = useModal(followingRef)

  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)
  const { username } = useParams()

  const [userInfo, setUserInfo] = useState<UserData>()

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
      setUserInfo(result)

      setIsMyProfile(username === myUname)
      setIntroductionText(result.introduction)
      setActiveIntroductionModify(true)
    }

    loadUserInfo().catch((error) => {
      console.log(error)
    })
  }, [])

  const handleIntroduction = async (): Promise<void> => {
    if (!activeIntroductionModify) {
      try {
        const response = await request<string>('post', '/api/user/profile', {
          introduction: introductionText,
        })
        setIntroductionText(response)
        setActiveIntroductionModify(true)
      } catch (error) {
        console.log(error)
        throw error
      }
    } else {
      setActiveIntroductionModify(!activeIntroductionModify)
    }
  }

  return (
    <>
      <ProfileHeader>
        <ProfileImage src={userInfo?.profile} />
        <ProfileDesc>
          <NameAndEditBtn>
            <Nickname>{userInfo?.nickname}</Nickname>
            <EditButton isMyProfile={isMyProfile} onClick={handleIntroduction}>
              {activeIntroductionModify ? '프로필 편집' : '저장'}
            </EditButton>
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {userInfo?.postNum}</NumOfPosts>
            <FollowerContainer ref={followerRef}>
              <Follower>팔로워 {followerList.length}</Follower>
              {followModalOpen && userInfo !== undefined ? (
                <FollowerModal followerList={followerList} />
              ) : null}
            </FollowerContainer>
            <FollowContainer ref={followingRef}>
              <Follow>팔로잉 {followingList.length}</Follow>
              {followingModalOpen && userInfo !== undefined ? (
                <FollowingModal followList={followingList} />
              ) : null}
            </FollowContainer>
          </Statistics>
          <Introduction
            value={introductionText}
            spellCheck="false"
            readOnly={activeIntroductionModify}
            onChange={(event) => {
              setIntroductionText(event.target.value)
            }}
          ></Introduction>
        </ProfileDesc>
      </ProfileHeader>
    </>
  )
}

const ProfileHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`

const ProfileImage = styled.img`
  width: 230px;
  height: 230px;
  margin-right: 30px;
  border-radius: 50%;
`
const ProfileDesc = styled.div`
  width: 420px;
`

const NameAndEditBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`
const Nickname = styled.div`
  margin-right: 30px;
  font-size: 25px;
  color: ${theme.colors.primaryColor};
`
const EditButton = styled.button<{ isMyProfile: boolean }>`
  display: ${(props) => (props.isMyProfile ? 'block' : 'none')};
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 400;
`

const Statistics = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  & > div {
    margin-right: 30px;
  }
`
const NumOfPosts = styled.div``
const FollowerContainer = styled.div`
  position: relative;
`
const Follower = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const FollowContainer = styled.div`
  position: relative;
`
const Follow = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const Introduction = styled.textarea`
  width: 420px;
  height: 120px;
  resize: none;
  outline: none;
  border: 1px solid #d9d9d9;
`

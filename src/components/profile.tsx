import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import FollowerModal from './followerModal'
import FollowingModal from './followingModal'
import useModal from '../hooks/useModal'
import { request } from '../util/axios'
import useUser from '../recoil/hooks/useUser'
import { useRecoilValue } from 'recoil'
import profileStore from '../recoil/atom/profile'

export default function Profile(): JSX.Element {
  const [introductionText, setIntroductionText] = useState<string>('')
  const [activeIntroductionModify, setActiveIntroductionModify] =
    useState(false)

  const userProfile = useRecoilValue(profileStore)

  const { loadUserInfo } = useUser()
  const myUname = loadUserInfo().uname

  // 팔로워 모달
  const followerRef = useRef<HTMLDivElement>(null)
  const followingRef = useRef<HTMLDivElement>(null)

  // 팔로잉 모달
  const followModalOpen = useModal(followerRef)
  const followingModalOpen = useModal(followingRef)

  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

  useEffect(() => {
    if (userProfile.uname === myUname) {
      setIsMyProfile(true)
      setActiveIntroductionModify(true)
    }
    setIntroductionText(userProfile.introduction)
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
        <ProfileImage src={userProfile?.image} />
        <ProfileDesc>
          <NameAndEditBtn>
            <Nickname>{userProfile?.uname}</Nickname>
            <EditButton isMyProfile={isMyProfile} onClick={handleIntroduction}>
              {activeIntroductionModify ? '프로필 편집' : '저장'}
            </EditButton>
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {userProfile?.posts.length}</NumOfPosts>
            <FollowerContainer ref={followerRef}>
              <Follower>팔로워 {userProfile?.follower_set.length}</Follower>
              {followModalOpen && userProfile !== undefined ? (
                <FollowerModal followerList={userProfile?.follower_set} />
              ) : null}
            </FollowerContainer>
            <FollowContainer ref={followingRef}>
              <Follow>팔로잉 {userProfile?.following_set.length}</Follow>
              {followingModalOpen && userProfile !== undefined ? (
                <FollowingModal followList={userProfile?.following_set} />
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

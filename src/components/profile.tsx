import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import FollowModal from './followModal'
import FollowingModal from './followingModal'
import { useDispatch } from 'react-redux'
import { changeIntroduction } from '../modules/profile'
import { useParams } from 'react-router-dom'
import { userDemo, type UserData } from '../dummy/user'

export default function Profile(): JSX.Element {
  const dispatch = useDispatch()
  const [introductionText, setIntroductionText] = useState<string>('')
  const [activeIntroductionModify, setActiveIntroductionModify] =
    useState(false)
  const [followModalVisibliity, setFollowModalVisibliity] = useState(false)
  const [followingModalVisibliity, setFollowingModalVisibliity] =
    useState(false)
  const followRef = useRef<HTMLDivElement>(null)
  const followingRef = useRef<HTMLDivElement>(null)

  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)
  const { username } = useParams()

  const [userInfo, setUserInfo] = useState<UserData>()

  useEffect(() => {
    // 더미데이터여서
    const totalUser: UserData[] = userDemo
    const curUser: UserData | undefined = totalUser.find(
      (user) => user.nickname === username
    )
    setUserInfo(curUser)
    console.log(username)

    setIsMyProfile(username === 'jinokim98')
    setIntroductionText(curUser?.introduction ?? '')
    setActiveIntroductionModify(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        followRef.current == null ||
        !followRef.current.contains(event.target as HTMLElement)
      ) {
        setFollowModalVisibliity(false)
      }
      if (
        followingRef.current == null ||
        !followingRef.current.contains(event.target as HTMLElement)
      ) {
        setFollowingModalVisibliity(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [followRef, followingRef])
  return (
    <>
      <ProfileHeader>
        <ProfileImage src={userInfo?.profile} />
        <ProfileDesc>
          <NameAndEditBtn>
            <Nickname>{userInfo?.nickname}</Nickname>
            <EditButton
              isMyProfile={isMyProfile}
              onClick={() => {
                if (!activeIntroductionModify) {
                  dispatch(changeIntroduction(introductionText))
                }
                setActiveIntroductionModify(!activeIntroductionModify)
              }}
            >
              {activeIntroductionModify ? '프로필 편집' : '저장'}
            </EditButton>
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {userInfo?.postNum}</NumOfPosts>
            <FollowerContainer ref={followRef}>
              <Follower
                onClick={() => {
                  setFollowModalVisibliity(!followModalVisibliity)
                }}
              >
                팔로워 {userInfo?.followerNum}
              </Follower>
              {followModalVisibliity ? <FollowModal /> : null}
            </FollowerContainer>
            <FollowContainer ref={followingRef}>
              <Follow
                onClick={() => {
                  setFollowingModalVisibliity(!followingModalVisibliity)
                }}
              >
                팔로우 {userInfo?.followNum}
              </Follow>
              {followingModalVisibliity ? <FollowingModal /> : null}
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

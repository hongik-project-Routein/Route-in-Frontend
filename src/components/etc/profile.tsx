import React, { useState, useRef, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import FollowerModal from '../popup/followerModal'
import FollowingModal from '../popup/followingModal'
import useModal from '../../hooks/useModal'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { type UserData } from '../../types/userType'
import FollowButton from '../follow/followButton'
import Mobile from '../layout/Mobile'

interface ProfileProps {
  isMyProfile: boolean
  userProfile: UserData
}

export default function Profile(props: ProfileProps): JSX.Element {
  const [introductionText, setIntroductionText] = useState<string>(
    props.userProfile.introduction
  )
  const [activeModify, setActiveModify] = useState(false)
  const [profileImage, setProfileImage] = useState(props.userProfile.image)

  const { loadUserInfo } = useUser()

  // 팔로워 모달
  const followerRef = useRef<HTMLDivElement>(null)
  const followingRef = useRef<HTMLDivElement>(null)

  // 팔로잉 모달
  const { modalOpen: followModalOpen } = useModal(followerRef)
  const { modalOpen: followingModalOpen } = useModal(followingRef)

  useEffect(() => {
    setActiveModify(props.isMyProfile)
    setIntroductionText(props.userProfile.introduction)
    setProfileImage(props.userProfile.image)
  }, [props.userProfile])

  const handleIntroduction = async (): Promise<void> => {
    if (!activeModify) {
      try {
        // 소개글 변경
        await request<string>(
          'put',
          `/api/user/${loadUserInfo().uname}/`,
          {
            introduction: introductionText,
          },
          {
            Authorization: `Bearer ${loadUserInfo().accessToken}`,
          }
        )
        // 이미지 변경 url 받아서 요청 날리면 된다.
        // await request<string>(
        //   'put',
        //   `/api/user/${loadUserInfo().uname}/`,
        //   {
        //     image: profileImage,
        //   },
        //   {
        //     Authorization: `Bearer ${loadUserInfo().accessToken}`,
        //   }
        // )
        setIntroductionText(introductionText)
        setActiveModify(true)
      } catch (error) {
        console.log(error)
        throw error
      }
    } else {
      setActiveModify(!activeModify)
    }
  }

  const fileRef = useRef<HTMLInputElement | null>(null)

  const onEditImage = (): void => {
    if (fileRef.current !== null) {
      fileRef.current.click()
    }
  }

  const handleProfileImage = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files

    if (files != null) {
      const file = files[0]
      const newUrl = await readUrl(file)
      setProfileImage(newUrl)
    }
  }

  const readUrl = async (file: File): Promise<string> => {
    return await new Promise<string>((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const url = fileReader.result?.toString() ?? ''
        resolve(url)
      }
      fileReader.readAsDataURL(file)
    })
  }

  return (
    <>
      <ProfileHeader>
        <ProfileImage src={profileImage}>
          {props.isMyProfile && !activeModify ? (
            <EditProfileBtn icon={faPen} onClick={onEditImage} />
          ) : null}
          <InputFile
            id="file"
            type="file"
            accept=".jpg,.png,.jpeg"
            ref={fileRef}
            onChange={handleProfileImage}
          />
        </ProfileImage>
        <ProfileDesc>
          <NameAndEditBtn>
            <Mobile>
              <ProfileImageMobile src={profileImage} />
            </Mobile>
            <Nickname>{props.userProfile?.uname}</Nickname>
            <EditButton
              isMyProfile={props.isMyProfile}
              onClick={handleIntroduction}
            >
              {activeModify ? '프로필 편집' : '저장'}
            </EditButton>
            <Blank />
            <FollowButton uname={props.userProfile.uname} />
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {props.userProfile?.post_set.length}</NumOfPosts>
            <FollowerContainer ref={followerRef}>
              <Follower>
                팔로워 {props.userProfile?.follower_set.length}
              </Follower>
              {followModalOpen && props.userProfile !== undefined ? (
                <FollowerModal followerList={props.userProfile?.follower_set} />
              ) : null}
            </FollowerContainer>
            <FollowContainer ref={followingRef}>
              <Follow>팔로잉 {props.userProfile?.following_set.length}</Follow>
              {followingModalOpen && props.userProfile !== undefined ? (
                <FollowingModal followList={props.userProfile?.following_set} />
              ) : null}
            </FollowContainer>
            <span>나와의 거리 : 100km</span>
          </Statistics>
          <Introduction
            value={introductionText}
            spellCheck="false"
            readOnly={activeModify}
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

const ProfileImage = styled.div<{ src: string }>`
  position: relative;
  width: 230px;
  height: 230px;
  margin-right: 30px;
  border-radius: 50%;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const ProfileImageMobile = styled.div<{ src: string }>`
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`
const ProfileDesc = styled.div`
  width: 420px;

  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 12px;
  }
`
const EditProfileBtn = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 10px;
  right: 10px;

  font-size: 16px;
  cursor: pointer;
`

const InputFile = styled.input`
  display: none;
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

const Blank = styled.div`
  width: 10px;
  height: 10px;
`

const Statistics = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  & > div {
    margin-right: 30px;
  }

  span {
    margin-left: 20px;
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

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

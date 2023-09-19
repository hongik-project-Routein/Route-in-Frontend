import React, { useState, useRef, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import FollowerModal from '../popup/followerModal'
import FollowingModal from '../popup/followingModal'
import useModal from '../../hooks/useModal'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { useRecoilValue } from 'recoil'
import profileStore from '../../recoil/atom/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

interface ProfileProps {
  isMyProfile: boolean
}

export default function Profile(props: ProfileProps): JSX.Element {
  const [introductionText, setIntroductionText] = useState<string>('')
  const [activeModify, setActiveModify] = useState(false)

  const userProfile = useRecoilValue(profileStore)

  const [profileImage, setProfileImage] = useState(userProfile.image)

  const { loadUserInfo } = useUser()

  // 팔로워 모달
  const followerRef = useRef<HTMLDivElement>(null)
  const followingRef = useRef<HTMLDivElement>(null)

  // 팔로잉 모달
  const followModalOpen = useModal(followerRef)
  const followingModalOpen = useModal(followingRef)

  useEffect(() => {
    setActiveModify(props.isMyProfile)
    setIntroductionText(userProfile.introduction)
  }, [])

  const handleIntroduction = async (): Promise<void> => {
    if (!activeModify) {
      try {
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
            <Nickname>{userProfile?.uname}</Nickname>
            <EditButton
              isMyProfile={props.isMyProfile}
              onClick={handleIntroduction}
            >
              {activeModify ? '프로필 편집' : '저장'}
            </EditButton>
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {userProfile?.post_set.length}</NumOfPosts>
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
`
const ProfileDesc = styled.div`
  width: 420px;
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

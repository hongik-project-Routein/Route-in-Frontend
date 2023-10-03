import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'
import useFollow from '../../recoil/hooks/useFollow'
import { type UserData } from '../../types/userType'
import useUser from '../../recoil/hooks/useUser'
import FollowButton from '../follow/followButton'

interface FollowProps {
  followList: string[]
}

export default function FollowingModal(props: FollowProps): JSX.Element {
  const [followLists, setFollowLists] = useState<UserData[]>([])
  const { followingList } = useFollow()

  const { loadUserInfo } = useUser()

  const getFollowList = async (): Promise<UserData[]> => {
    const followUserList: UserData[] = []
    try {
      for (const user of props.followList) {
        const response = await request<UserData>(
          'get',
          `/api/user/${user}`,
          undefined,
          {
            Authorization: `Bearer ${loadUserInfo().accessToken}`,
          }
        )
        followUserList.push(response)
      }
      return followUserList
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const loadFollowList = async (): Promise<void> => {
      const result: UserData[] = await getFollowList()
      setFollowLists(result)
    }
    loadFollowList().catch((error) => {
      console.log(error)
    })
  }, [followingList])

  return (
    <ModalContainer>
      <ModalTitle>팔로잉</ModalTitle>
      <ModalInner>
        {followLists?.map((user, idx) => (
          <Row key={idx}>
            <ProfileImage src={user.image} />
            <NicknameAndName>
              <Nickname>{user.uname}</Nickname>
              <Name>{user.name}</Name>
            </NicknameAndName>
            <FollowButton uname={user.uname} />
          </Row>
        ))}
      </ModalInner>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  top: 30px;
  left: -125px;
  z-index: 3;
  width: 333px;
  height: 560px;
  background-color: ${theme.colors.white};
  border: 1px solid #d9d9d9;
  border-radius: 12px;
`

const ModalTitle = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 15px;
  border-bottom: 1px solid #d9d9d9;
  text-align: center;
  font-size: 16px;
`

const ModalInner = styled.div`
  margin: 30px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const NicknameAndName = styled.div``
const Nickname = styled.div``
const Name = styled.div`
  padding-top: 5px;
  font-size: 13px;
`

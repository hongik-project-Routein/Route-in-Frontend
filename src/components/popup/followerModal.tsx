import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'
import useFollow from '../../recoil/hooks/useFollow'
import { type UserData } from '../../types/userType'
import useUser from '../../recoil/hooks/useUser'
import FollowButton from '../follow/followButton'

interface FollowerProps {
  followerList: string[]
}

export default function FollowerModal(props: FollowerProps): JSX.Element {
  const [followerLists, setFollowerLists] = useState<UserData[]>([])
  const { followerList } = useFollow()

  const { loadUserInfo } = useUser()

  const getFollowerList = async (): Promise<UserData[]> => {
    const followerUserList: UserData[] = []
    try {
      for (const user of props.followerList) {
        const response = await request<UserData>(
          'get',
          `/api/user/${user}`,
          undefined,
          {
            Authorization: `Bearer ${loadUserInfo().accessToken}`,
          }
        )
        followerUserList.push(response)
      }
      return followerUserList
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const loadFollowerList = async (): Promise<void> => {
      const result: UserData[] = await getFollowerList()
      setFollowerLists(result)
    }
    loadFollowerList().catch((error) => {
      console.log(error)
    })
  }, [followerList])

  return (
    <ModalContainer>
      <ModalTitle>팔로워</ModalTitle>
      <ModalInner>
        {followerLists?.map((user, idx) => (
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
  z-index: 1;
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

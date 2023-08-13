import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { request } from '../util/axios'
import useFollow from '../recoil/hooks/useFollow'
import { type UserData } from './../types/userType'

interface FollowerProps {
  followerList: string[]
}

export default function FollowerModal(props: FollowerProps): JSX.Element {
  const [followerLists, setFollowerLists] = useState<UserData[]>([])
  const { followerList, deleteFollower } = useFollow()

  const getFollowerList = async (): Promise<UserData[]> => {
    const followerUserList: UserData[] = []
    try {
      for (const user of props.followerList) {
        const response = await request<UserData>('get', `/api/user/${user}`)
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

  const handleDeleteFollower = async (uname: string): Promise<void> => {
    try {
      await request('delete', `/api/user/follower/${uname}`)
      deleteFollower(uname)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <ModalContainer>
      <ModalTitle>팔로잉</ModalTitle>
      <ModalInner>
        {followerLists?.map((user, idx) => (
          <Row key={idx}>
            <ProfileImage src={user.image} />
            <NicknameAndName>
              <Nickname>{user.uname}</Nickname>
              <Name>{user.name}</Name>
            </NicknameAndName>
            <FollowButton
              onClick={async () => {
                await handleDeleteFollower(user.uname)
              }}
            >
              삭제
            </FollowButton>
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

const FollowButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: #d9d9d9;
  border-radius: 25px;
`

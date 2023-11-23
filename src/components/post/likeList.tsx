import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'
import EachLikeUsers from '../eachItem/EachLikeUsers'
import { type UserData } from '../../types/userType'
import useUser from '../../recoil/hooks/useUser'

interface LikeListProps {
  like_users: string[]
}

function LikeList(props: LikeListProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserData[]>([])

  const { loadUserInfo } = useUser()

  const loadLikeUser = async (): Promise<void> => {
    const likeUserList: UserData[] = []
    try {
      if (props.like_users.length <= 0) return

      for (const user of props.like_users) {
        const response = await request<UserData>(
          'get',
          `/api/user/${user}`,
          undefined,
          {
            Authorization: `Bearer ${loadUserInfo().accessToken}`,
          }
        )
        likeUserList.push(response)
      }
      setUserInfo(likeUserList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadLikeUser().catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <Container>
      <Title>좋아요 누른 사람들</Title>
      <Inner>
        {userInfo.length > 0 &&
          userInfo.map((user) => (
            <EachLikeUsers key={`each_user${user.uname}`} eachUser={user} />
          ))}
      </Inner>
    </Container>
  )
}

export default LikeList

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 50;
  width: 333px;
  height: 360px;
  background-color: ${theme.colors.white};
  border: 1px solid #d9d9d9;
  border-radius: 12px;

  overflow-y: scroll;
`

const Title = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 15px;
  border-bottom: 1px solid #d9d9d9;
  text-align: center;
  font-size: 16px;
`

const Inner = styled.div`
  margin: 30px;
`

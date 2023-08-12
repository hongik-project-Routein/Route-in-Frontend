import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { request } from '../util/axios'
import EachLikeUsers from './eachItem/EachLikeUsers'

interface LikeListProps {
  like_users: string[]
}

export interface UserInfo {
  name: string
  uname: string
  image: string
}

function LikeList(props: LikeListProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([])

  const loadUserInfo = async (): Promise<void> => {
    try {
      if (props.like_users.length <= 0) return
      const response = await request<UserInfo[]>('get', `/api/user/profile/`)
      setUserInfo(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUserInfo().catch((error) => {
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

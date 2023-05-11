import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'

interface FollowList {
  image: string
  nickname: string
  username: string
}

export default function FollowingModal(): JSX.Element {
  const FollowLists: FollowList[] = [
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      username: '김진호',
    },
  ]
  return (
    <ModalContainer>
      <ModalTitle>팔로잉</ModalTitle>
      <ModalInner>
        {FollowLists.map((item, idx) => (
          <Row key={idx}>
            <ProfileImage src={item.image} />
            <NicknameAndName>
              <Nickname>{item.nickname}</Nickname>
              <Name>{item.username}</Name>
            </NicknameAndName>
            <FollowButton>팔로잉</FollowButton>
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

import React from 'react'
import styled from 'styled-components'

interface FollowList {
  image: string
  nickname: string
  username: string
}

export default function FollowModal(): JSX.Element {
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
            <FollowButton>삭제</FollowButton>
          </Row>
        ))}
      </ModalInner>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  width: 333px;
  height: 560px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
`

const ModalTitle = styled.div`
  width: 100%;
  height: 45px;
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
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const NicknameAndName = styled.div``
const Nickname = styled.div``
const Name = styled.div``

const FollowButton = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 25px;
`

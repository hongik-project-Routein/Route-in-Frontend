import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'

export default function Profile(): JSX.Element {
  const introductionText: string = `김진호
홍익대학교 경영학과`
  return (
    <>
      <ProfileHeader>
        <ProfileImage src="https://avatars.githubusercontent.com/u/81083461?v=4" />
        <ProfileDesc>
          <NameAndEditBtn>
            <Nickname>jinokim98</Nickname>
            <EditButton>프로필 편집</EditButton>
          </NameAndEditBtn>
          <Statistics>
            <NumOfPosts>게시글 {25}</NumOfPosts>
            <Follower>팔로워 {220}</Follower>
            <Follow>팔로우 {225}</Follow>
          </Statistics>
          <Introduction
            value={introductionText}
            spellCheck="false"
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
const EditButton = styled.button`
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
const Follower = styled.div``
const Follow = styled.div``

const Introduction = styled.textarea`
  width: 420px;
  height: 120px;
  resize: none;
  outline: none;
  border: 1px solid #d9d9d9;
`

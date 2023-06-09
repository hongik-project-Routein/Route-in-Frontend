import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import theme from '../../styles/Theme'

export default function Setting(): JSX.Element {
  return <HeaderAndSidebar article={<SettingArticle />} />
}

function SettingArticle(): JSX.Element {
  const [nickname, setNickname] = useState<string>('')
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNickname(event.target.value)
  }
  useEffect(() => {
    setNickname('jinokim98')
  }, [])
  return (
    <>
      <Profile />
      <TabArticle>
        <UserStateSet>
          <UserStateTitle>회원 설정</UserStateTitle>
          <NicknameEdit>
            <InputNicknameLabel htmlFor="nickname">
              닉네임 변경
            </InputNicknameLabel>
            <InputNickname
              id="nickname"
              type="text"
              value={nickname}
              onChange={onChange}
            />
            <DuplicateCheckBtn>중복체크</DuplicateCheckBtn>
          </NicknameEdit>
          <TerminateMembership>회원 탈퇴</TerminateMembership>
          <TerminateMembershipBtn>회원 탈퇴하기</TerminateMembershipBtn>
        </UserStateSet>
      </TabArticle>
    </>
  )
}

const TabArticle = styled.div`
  width: 900px;
  height: 450px;
  padding: 30px 30px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
`

const UserStateSet = styled.article``

const UserStateTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 25px;
`

const NicknameEdit = styled.div`
  margin-bottom: 15px;
`

const InputNicknameLabel = styled.label`
  margin-right: 20px;
`

const InputNickname = styled.input`
  width: 150px;
  height: 30px;
  padding: 0 5px;
  margin-right: 20px;
  border: 1px solid #d9d9d9;
`

const DuplicateCheckBtn = styled.button`
  height: 30px;
  padding: 0 12px;
  background-color: ${theme.colors.primaryColor};
  color: white;
  border-radius: 5px;
`

const TerminateMembership = styled.label`
  margin-right: 35px;
`

const TerminateMembershipBtn = styled.button`
  height: 30px;
  padding: 0 12px;
  background-color: ${theme.colors.primaryColor};
  color: white;
  border-radius: 5px;
`

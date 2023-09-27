import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Profile from '../../components/etc/profile'
import theme from '../../styles/Theme'
import useUser from '../../recoil/hooks/useUser'
import { request } from '../../util/axios'
import { useNavigate } from 'react-router-dom'
import ModifyMyInfo from './ModifyMyInfo'
import useModal from '../../hooks/useModal'
import BlockModal from '../../components/popup/blockModal'
import getUserinfo from '../../components/function/getUserinfo'

function Setting(): JSX.Element {
  const { loadUserInfo, logout } = useUser()
  const navigate = useNavigate()

  const blockUserRef = useRef(null)
  const blockModal = useModal(blockUserRef)

  const [isShowModifyUserinfo, setIsShowModifyUserinfo] =
    useState<boolean>(false)

  const withdraw = async (): Promise<void> => {
    if (
      window.confirm(
        '정말 탈퇴하시겠습니까?\n탈퇴하면 내 모든 게시글과 정보가 사라집니다.'
      )
    ) {
      try {
        await request('delete', `/api/user/${loadUserInfo().uname}`, null, {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        })
        logout()
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showModifyUserinfo = (): void => {
    setIsShowModifyUserinfo((prev) => !prev)
  }

  return (
    <>
      <Profile
        isMyProfile={true}
        userProfile={getUserinfo(loadUserInfo().uname)}
      />
      <SettingArticle>
        <Title>회원 설정</Title>

        <Article>
          <Item>
            <Label>회원정보 수정</Label>
            <LabelButton onClick={showModifyUserinfo}>
              {!isShowModifyUserinfo ? '정보 수정' : '취소'}
            </LabelButton>
          </Item>

          {isShowModifyUserinfo ? <ModifyMyInfo /> : null}

          <Item>
            <Label>회원 탈퇴</Label>
            <LabelButton onClick={withdraw}>회원 탈퇴하기</LabelButton>
          </Item>

          <Item>
            <Label>차단 계정</Label>
            <LabelButton as="div" ref={blockUserRef}>
              차단계정 확인하기
            </LabelButton>
            {blockModal ? (
              <div ref={blockUserRef}>
                <BlockModal />
              </div>
            ) : null}
          </Item>
        </Article>
      </SettingArticle>
    </>
  )
}

export default Setting

const SettingArticle = styled.div`
  width: 900px;
  min-height: 450px;
  padding: 30px 30px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
`

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 25px;
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  margin-bottom: 30px;
`

const Label = styled.label`
  margin-right: 35px;
`

const LabelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  padding: 0 12px;
  background-color: ${theme.colors.primaryColor};
  color: white;
  font-size: 14px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`

import React, { useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import NoticeModal from '../popup/noticeModal'
import useModal from '../../hooks/useModal'
import { useNavigate } from 'react-router-dom'
import useUser from '../../recoil/hooks/useUser'

export default function Header(): JSX.Element {
  const noticeRef = useRef<HTMLDivElement>(null)
  const modalOpen = useModal(noticeRef)
  const { logout } = useUser()
  const navigate = useNavigate()

  const userLogout = (): void => {
    logout()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <Logo src="/logo.png" />
      <IconContainer>
        <Notice ref={noticeRef}>
          <Bell modalVisible={modalOpen} type="button">
            <FontAwesomeIcon icon={faBell} />
          </Bell>
          {modalOpen ? <NoticeModal /> : null}
        </Notice>
        <LogoutButton onClick={userLogout}>로그아웃</LogoutButton>
      </IconContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid #d9d9d9;
`

const Logo = styled.img`
  object-fit: cover;
  width: 170px;
  margin-top: 15px;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`

const Notice = styled.div`
  margin-right: 20px;
`

const Bell = styled.button<{ modalVisible: boolean }>`
  color: ${(props) =>
    props.modalVisible ? theme.colors.primaryColor : '#d9d9d9'};
  font-size: 24px;
`

const LogoutButton = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`

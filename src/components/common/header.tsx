import React, { useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import NoticeModal from '../popup/noticeModal'
import useModal from '../../hooks/useModal'
import { useNavigate } from 'react-router-dom'
import useUser from '../../recoil/hooks/useUser'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Mobile from '../layout/Mobile'
import UserRecommandMobile from '../popup/userRecommandMobile'
import SidebarMobile from './sidebarMobile'

export default function Header(): JSX.Element {
  const noticeRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const { modalOpen: noticeModal } = useModal(noticeRef)
  const { modalOpen: hamburgerModal, changeModalState: hamburgerOpen } =
    useModal(hamburgerRef)
  const { modalOpen: userModal, changeModalState: userOpen } = useModal(userRef)

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
          <Bell modalVisible={noticeModal} type="button">
            <FontAwesomeIcon icon={faBell} />
          </Bell>
          {noticeModal ? <NoticeModal /> : null}
        </Notice>
        <LogoutButton onClick={userLogout}>로그아웃</LogoutButton>
        <Mobile>
          <>
            <div ref={userRef}>
              <UserRecommandModal icon={faUser} onClick={userOpen} />
              {userModal && <UserRecommandMobile />}
            </div>
            <div ref={hamburgerRef}>
              <MobileHamburger icon={faBars} onClick={hamburgerOpen} />
              {hamburgerModal && <SidebarMobile />}
            </div>
          </>
        </Mobile>
      </IconContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${theme.colors.white};
  border-bottom: 1px solid #d9d9d9;
`

const Logo = styled.img`
  object-fit: cover;
  width: 150px;
  margin-top: 10px;
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

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const LogoutButton = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const MobileHamburger = styled(FontAwesomeIcon)`
  font-size: 25px;
  color: ${theme.colors.disable};

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const UserRecommandModal = styled(FontAwesomeIcon)`
  margin-right: 20px;
  font-size: 25px;
  color: ${theme.colors.disable};

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

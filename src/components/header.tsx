import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import theme from './../styles/Theme'
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import NoticeModal from './noticeModal'

export default function Header(): JSX.Element {
  const [noticeModalVisibliity, setnoticeModalVisibliity] = useState(false)
  const noticeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        noticeRef.current == null ||
        !noticeRef.current.contains(event.target as HTMLElement)
      ) {
        setnoticeModalVisibliity(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [noticeRef])
  return (
    <HeaderContainer>
      <Logo src={logo} />
      <IconContainer>
        <Notice ref={noticeRef}>
          <Bell
            modalVisible={noticeModalVisibliity}
            type="button"
            onClick={() => {
              setnoticeModalVisibliity(!noticeModalVisibliity)
            }}
          >
            <FontAwesomeIcon icon={faBell} />
          </Bell>
          {noticeModalVisibliity ? <NoticeModal /> : null}
        </Notice>
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

const Notice = styled.div``

const Bell = styled.button<{ modalVisible: boolean }>`
  color: ${(props) =>
    props.modalVisible ? theme.colors.primaryColor : '#d9d9d9'};
  font-size: 24px;
`

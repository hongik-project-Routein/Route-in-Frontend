import React from 'react'
import styled from 'styled-components'
import theme from './../styles/Theme'
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

export default function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo src={logo} />
      </LogoLink>
      <IconContainer>
        <Bell>
          <FontAwesomeIcon icon={faBell} />
        </Bell>
      </IconContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid #d9d9d9;
`

const LogoLink = styled(Link)``

const Logo = styled.img`
  object-fit: cover;
  width: 170px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`

const Bell = styled.div`
  color: #d9d9d9;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`

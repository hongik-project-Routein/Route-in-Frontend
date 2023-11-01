import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faMagnifyingGlass,
  faLocationDot,
  faSquarePlus,
  faGear,
  type IconDefinition,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

import theme from '../../styles/Theme'
import useUser from '../../recoil/hooks/useUser'
import useTab from '../../recoil/hooks/useTab'

interface TapContent {
  icon: IconDefinition
  name: string
  link: string
}

const TapContents: TapContent[] = [
  { icon: faHouse, name: '홈', link: '/' },
  { icon: faMagnifyingGlass, name: '검색', link: '/search' },
  { icon: faLocationDot, name: '추천', link: '/explore' },
  { icon: faSquarePlus, name: '만들기', link: '/post/create' },
  { icon: faGear, name: '설정', link: '/setting' },
]

function SidebarMobile(): JSX.Element {
  const { navbar, changeNavbarIndex } = useTab()

  const [selectedTabIndex, setselectedTabIndex] = useState<number>(navbar)

  const { loadUserInfo, logout } = useUser()

  const userinfo = loadUserInfo()

  const handleTabClick = (index: number): void => {
    setselectedTabIndex(index)
    changeNavbarIndex(index)
  }

  const navigate = useNavigate()

  const userLogout = (): void => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    setselectedTabIndex(navbar)
  }, [selectedTabIndex])

  return (
    <SidebarContainer>
      <UserContainer
        to={`/profile/${userinfo.uname}`}
        active={selectedTabIndex === -1}
        onClick={() => {
          handleTabClick(-1)
        }}
      >
        <Profile src={userinfo.image} />
        <NicknameContainer>
          <Nickname>{userinfo.uname}</Nickname>
          <Introduce>{userinfo.name}</Introduce>
        </NicknameContainer>
      </UserContainer>
      <Tab>
        {TapContents.map((item, idx) => (
          <TabContentContainer
            key={idx}
            to={item.link}
            onClick={() => {
              handleTabClick(idx)
            }}
          >
            <Indicator active={selectedTabIndex === idx} />
            <TabIcon>
              <FontAwesomeIcon icon={item.icon} />
            </TabIcon>
            <TabName>{item.name}</TabName>
          </TabContentContainer>
        ))}
      </Tab>
      <LogoutTab onClick={userLogout}>
        <LogoutIcon icon={faArrowRightFromBracket} />
        <TabName>로그아웃</TabName>
      </LogoutTab>
    </SidebarContainer>
  )
}

export default SidebarMobile

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 20px;
  background-color: ${theme.colors.white};
  border: 1px solid #98a2b3;
  border-radius: 12px;

  height: 100%;

  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
`
const UserContainer = styled(Link)<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;

  margin-bottom: 20px;
  padding: 20px;
  border: ${(props) => (props.active ? '2px' : '1px')} solid
    ${theme.colors.primaryColor};
  border-radius: 15px;
`

const Profile = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Nickname = styled.div`
  color: ${theme.colors.primaryColor};
  font-size: 24px;
`

const Introduce = styled.div`
  margin-top: 7px;
  color: #d9d9d9;
  font-size: 16px;
`

const Tab = styled.nav`
  display: flex;
  flex-direction: column;
`

const TabContentContainer = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;
`

const Indicator = styled.div<{ active: boolean }>`
  width: 5px;
  height: 42px;
  background-color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.white};
`

const TabIcon = styled.div`
  width: 24px;
  font-size: 16px;
  margin: 12px 15px;
`

const TabName = styled.div`
  color: #707070;
  font-size: 16px;
`

const LogoutTab = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`

const LogoutIcon = styled(FontAwesomeIcon)`
  width: 24px;
  font-size: 16px;
  margin: 12px 15px;
`

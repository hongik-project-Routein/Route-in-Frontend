import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faMagnifyingGlass,
  faLocationDot,
  faSquarePlus,
  faGear,
  type IconDefinition,
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
  { icon: faHouse, name: '홈', link: '/home' },
  { icon: faMagnifyingGlass, name: '검색', link: '/search' },
  { icon: faLocationDot, name: '탐색', link: '/explore' },
  { icon: faSquarePlus, name: '만들기', link: '/post/create' },
  { icon: faGear, name: '설정', link: '/setting' },
]

export default function Sidebar(): JSX.Element {
  const { navbar, changeNavbarIndex } = useTab()

  const [selectedTabIndex, setselectedTabIndex] = useState<number>(navbar)

  const { loadUserInfo } = useUser()

  const userinfo = loadUserInfo()

  const handleTabClick = (index: number): void => {
    setselectedTabIndex(index)
    changeNavbarIndex(index)
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
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
`
const UserContainer = styled(Link)<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 33px;
  padding: 40px 20px;
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

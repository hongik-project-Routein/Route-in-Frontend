import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faImage,
  faMagnifyingGlass,
  faLocationDot,
  faComment,
  faSquarePlus,
  faGear,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import theme from '../styles/Theme'

interface TapContent {
  icon: IconDefinition
  name: string
  link: string
}

const TapContents: TapContent[] = [
  { icon: faHouse, name: '홈', link: '/' },
  { icon: faImage, name: '스토리', link: '/' },
  { icon: faMagnifyingGlass, name: '검색', link: '/' },
  { icon: faLocationDot, name: '탐색', link: '/' },
  { icon: faComment, name: '메시지', link: '/' },
  { icon: faSquarePlus, name: '만들기', link: '/' },
  { icon: faGear, name: '설정', link: '/' },
]

export default function Sidebar(): JSX.Element {
  return (
    <SidebarContainer>
      <UserContainer>
        <Profile src="https://avatars.githubusercontent.com/u/81083461?v=4" />
        <NicknameContainer>
          <Nickname to="/">Jinhokim98</Nickname>
          <Introduce>김진호</Introduce>
        </NicknameContainer>
      </UserContainer>
      <Tab>
        {TapContents.map((item, idx) => (
          <TabContentContainer key={idx} to={item.link}>
            <Indicator />
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
const UserContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 33px;
  padding: 40px 20px;
  border: 1px solid ${theme.colors.primaryColor};
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

const Nickname = styled(Link)`
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

const Indicator = styled.div`
  width: 5px;
  height: 42px;
  background-color: ${theme.colors.primaryColor};
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

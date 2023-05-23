import React, { useEffect, useState } from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import {
  type UserStoryInfoByClass,
  type StoryGroupItems,
  UserStoryInfoByclasses,
} from '../../dummy/story'
import StoryModal from '../../components/storyModal'
import routeImage from '../../img/routemodify.png'

export default function Story(): JSX.Element {
  return <HeaderAndSidebar article={<ShowStory />} />
}

function ShowStory(): JSX.Element {
  const [existStory, setExistStory] = useState<boolean>(false)
  const [stories, setStories] = useState<UserStoryInfoByClass>()
  // 전체가 다 열림
  const myStory = false
  useEffect(() => {
    setExistStory(myStory)
    setStories(UserStoryInfoByclasses) // 더미데이터 채워넣는 코드
  }, [])
  useEffect(() => {
    console.log(stories)
  }, [stories])
  return (
    <>
      <MyInfo>
        <StoryProfile
          existStory={existStory}
          profileImage="https://avatars.githubusercontent.com/u/81083461?v=4"
        />
        <NicknameContainer>
          <Nickname>Jinhokim98</Nickname>
          <Introduce>김진호</Introduce>
        </NicknameContainer>
      </MyInfo>
      <LayerGroup>
        <ShowStoryContainer>
          <FirstClass>
            {stories !== undefined && <StoryGroup storyGroup={stories.first} />}
            <MapIcon>
              <FontAwesomeIcon icon={faLocationDot} />
            </MapIcon>
          </FirstClass>
          <SecondClass>
            <SecondClassInner>
              {stories !== undefined && (
                <StoryGroup storyGroup={stories.second} />
              )}
              <MapIcon>
                <FontAwesomeIcon icon={faLocationDot} />
              </MapIcon>
            </SecondClassInner>
          </SecondClass>
          <ThirdClass>
            {stories !== undefined && <StoryGroup storyGroup={stories.third} />}
            <MapIcon>
              <FontAwesomeIcon icon={faLocationDot} />
            </MapIcon>
          </ThirdClass>
          <FourthClass>
            <FourthClassInner>
              {stories !== undefined && (
                <StoryGroup storyGroup={stories.fourth} />
              )}
              <MapIcon>
                <FontAwesomeIcon icon={faLocationDot} />
              </MapIcon>
            </FourthClassInner>
          </FourthClass>
        </ShowStoryContainer>
      </LayerGroup>
    </>
  )
}

interface StoryProfileProps {
  existStory: boolean
  profileImage: string
}

function StoryProfile(props: StoryProfileProps): JSX.Element {
  return (
    <>
      {!props.existStory ? (
        <Link to="/story/create">
          <Profile src={props.profileImage} active={props.existStory} />
        </Link>
      ) : (
        <Profile src={props.profileImage} active={props.existStory} />
      )}
    </>
  )
}

interface StoryGroupProps {
  storyGroup: StoryGroupItems[]
}

function StoryGroup(props: StoryGroupProps): JSX.Element {
  const [readState, setReadState] = useState<boolean[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean[] | []>([])

  useEffect(() => {
    const storyReadStatus = props.storyGroup.map((story) => story.isRead)
    setReadState(storyReadStatus)
  }, [])

  useEffect(() => {
    setIsModalOpen(props.storyGroup.map(() => false))
  }, [props.storyGroup])

  const readStory = (idx: number): void => {
    const updatedReadState = [...readState]
    updatedReadState[idx] = true
    setReadState(updatedReadState)
  }
  const setModalOpen = (idx: number): void => {
    const updateIsModalOpen = isModalOpen.map((modal, index) => index === idx)
    setIsModalOpen(updateIsModalOpen)
  }
  return (
    <ProfileGroup>
      {props.storyGroup.map((story, idx) => (
        <ProfileUser key={idx}>
          <ProfileInStory
            src={story.profileImage}
            active={readState[idx]}
            onClick={() => {
              setModalOpen(idx)
              readStory(idx)
            }}
          />
          {isModalOpen[idx] && (
            <>
              <Backdrop />
              <StoryModal storyInfo={story} setModalOpen={setModalOpen} />
            </>
          )}
          <NicknameInStoryGroup>{story.nickname}</NicknameInStoryGroup>
        </ProfileUser>
      ))}
    </ProfileGroup>
  )
}

const MyInfo = styled.div`
  display: flex;
  height: 60px;
  margin: 40px 0 30px 35px;
`

const Profile = styled.img<{ active: boolean }>`
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 50%;
  border: ${(props) =>
    props.active ? `3px solid ${theme.colors.primaryColor}` : `none`};
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

const LayerGroup = styled.div`
  position: relative;
  width: 800px;
  height: 300px;
  margin-top: 70px;
  background-image: url(${routeImage});
  background-size: contain;
  background-repeat: no-repeat;
`

const ShowStoryContainer = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    '. second . fourth'
    'first . third .';
`

const FirstClass = styled.div`
  grid-area: first;
  width: 180px;
  height: 150px;
  border-radius: 8px;
`
const SecondClass = styled.div`
  grid-area: second;
  position: relative;
`

const SecondClassInner = styled.div`
  position: absolute;
  top: -90px;
  width: 180px;
  height: 150px;
  border-radius: 8px;
`

const ThirdClass = styled.div`
  grid-area: third;
  width: 180px;
  height: 150px;
  border-radius: 8px;
`
const FourthClass = styled.div`
  grid-area: fourth;
  position: relative;
`

const FourthClassInner = styled.div`
  position: absolute;
  top: -90px;
  left: -20px;
  width: 180px;
  height: 150px;
  border-radius: 8px;
`

const MapIcon = styled.div`
  width: 30px;
  margin: 10px auto;
  color: ${theme.colors.primaryColor};
  font-size: 30px;
`

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileInStory = styled.img<{ active: boolean }>`
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  object-fit: cover;
  border: ${(props) =>
    props.active
      ? `3px solid white`
      : `3px solid ${theme.colors.primaryColor}`};
  &:hover {
    cursor: pointer;
  }
`

const NicknameInStoryGroup = styled.div`
  color: ${theme.colors.white};
  font-size: 12px;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
`

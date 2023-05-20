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
} from './dummyData'

export default function Story(): JSX.Element {
  return <HeaderAndSidebar article={<ShowStory />} />
}

function ShowStory(): JSX.Element {
  const [existStory, setExistStory] = useState<boolean>(false)
  const [stories, setStories] = useState<UserStoryInfoByClass>()
  const myStory = true
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
      <ShowStoryContainer>
        <FirstClass>
          <MapIcon>
            <FontAwesomeIcon icon={faLocationDot} />
          </MapIcon>
          {stories !== undefined && <StoryGroup storyGroup={stories.first} />}
        </FirstClass>
        <FirstToSecond>
          <FirstToSecondLine />
        </FirstToSecond>
        <SecondClass>
          <MapIcon>
            <FontAwesomeIcon icon={faLocationDot} />
          </MapIcon>
          {stories !== undefined && <StoryGroup storyGroup={stories.second} />}
        </SecondClass>
        <SecondToThird>
          <SecondToThirdLine />
        </SecondToThird>
        <ThirdClass>
          <MapIcon>
            <FontAwesomeIcon icon={faLocationDot} />
          </MapIcon>
          {stories !== undefined && <StoryGroup storyGroup={stories.third} />}
        </ThirdClass>
        <ThirdToFourth>
          <ThirdToFourthLine />
        </ThirdToFourth>
        <FourthClass>
          <MapIcon>
            <FontAwesomeIcon icon={faLocationDot} />
          </MapIcon>
          {stories !== undefined && <StoryGroup storyGroup={stories.fourth} />}
        </FourthClass>
      </ShowStoryContainer>
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
  useEffect(() => {
    const storyReadStatus = props.storyGroup.map((story) => story.isRead)
    setReadState(storyReadStatus)
  }, [])
  const readStory = (idx: number): void => {
    const updatedReadState = [...readState]
    updatedReadState[idx] = true
    setReadState(updatedReadState)
  }
  return (
    <ProfileGroup>
      {props.storyGroup.map((story, idx) => (
        <ProfileUser key={`first-${idx}`}>
          <ProfileInStory
            src={story.profileImage}
            active={readState[idx]}
            onClick={() => {
              readStory(idx)
            }}
          />
          <NicknameInStoryGroup>{story.nickname}</NicknameInStoryGroup>
        </ProfileUser>
      ))}
    </ProfileGroup>
  )
}

const MyInfo = styled.div`
  display: flex;
  height: 60px;
  margin-top: 40px;
  margin-bottom: 30px;
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

const ShowStoryContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  grid-template-areas:
    'first . third ThirdToFourth'
    'FirstToSecond second SecondToThird fourth';
`

const FirstClass = styled.div`
  grid-area: first;
  width: 200px;
  height: 150px;
  background-color: rgba(80, 187, 223, 0.4);
  border-radius: 8px;
`
const SecondClass = styled.div`
  grid-area: second;
  width: 200px;
  height: 150px;
  background-color: rgba(127, 206, 232, 0.4);
  border-radius: 8px;
`
const ThirdClass = styled.div`
  grid-area: third;
  width: 200px;
  height: 150px;
  background-color: rgba(177, 226, 241, 0.4);
  border-radius: 8px;
`
const FourthClass = styled.div`
  grid-area: fourth;
  width: 200px;
  height: 150px;
  background-color: rgba(224, 244, 249, 0.4);
  border-radius: 8px;
`

const MapIcon = styled.div`
  margin: 10px;
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
  font-size: 12px;
`

const FirstToSecond = styled.div`
  grid-area: FirstToSecond;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    '. border'
    '. .';
`

const FirstToSecondLine = styled.div`
  grid-area: border;
  border-left: 2px dotted ${theme.colors.black};
  border-bottom: 2px dotted ${theme.colors.black};
`

const SecondToThird = styled.div`
  grid-area: SecondToThird;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'border .'
    '. .';
`

const SecondToThirdLine = styled.div`
  grid-area: border;
  border-right: 2px dotted ${theme.colors.black};
  border-bottom: 2px dotted ${theme.colors.black};
`

const ThirdToFourth = styled.div`
  grid-area: ThirdToFourth;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    '. .'
    'border .';
`

const ThirdToFourthLine = styled.div`
  grid-area: border;
  border-top: 2px dotted ${theme.colors.black};
  border-right: 2px dotted ${theme.colors.black};
`

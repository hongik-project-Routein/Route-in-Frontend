import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faComment,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Hashtag from './hashtag'
import theme from '../styles/Theme'

const postText: string = `#김포공항
\n김포공항은 좋았다. 시설도 좋고 깔끔했으며 여행가기 전 설레는 마음이 가득한 공간이었다.
\n#제주레포츠랜드
\n레포츠랜드에서 우리는 카트를 타고 씽씽 달리는 스릴 넘치는 시간이었다.
\n#스누피가든제주
\n스누피가 너무 귀여웠고 너무 잘 꾸며저있어서 행복했던 곳이다.
\n#제주여행 #제주익사이팅
\n이번 제주도 여행은~~~~
`

export default function Post(): JSX.Element {
  const [heartCount, setHeartCount] = useState<number>(0)
  const [heartActive, setHeartActive] = useState(false)
  const [bookmarkActive, setbookmarkActive] = useState(false)
  const handleHeartButton = (): void => {
    heartActive ? setHeartCount(heartCount - 1) : setHeartCount(heartCount + 1)
    setHeartActive(!heartActive)
  }
  return (
    <>
      <PersonalInfoContainer>
        <UserContent>
          <ProfileLink to={`/profile/jinhokim98`}>
            <Profile src="https://avatars.githubusercontent.com/u/81083461?v=4" />
          </ProfileLink>
          <Nickname to={`/profile/jinhokim98`}>jinhokim98</Nickname>
          <DistanceFromMe>나와의 거리: 100km</DistanceFromMe>
        </UserContent>
        <RestContent>
          <Icons>
            <HeartAndNumber>
              <Heart onClick={handleHeartButton} active={heartActive}>
                <FontAwesomeIcon icon={faHeart} />
              </Heart>
              <NumOfHeart>{heartCount}</NumOfHeart>
            </HeartAndNumber>
            <DirectMessage>
              <FontAwesomeIcon icon={faComment} />
            </DirectMessage>
            <Bookmark
              active={bookmarkActive}
              onClick={() => {
                setbookmarkActive(!bookmarkActive)
              }}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostImageContainer>
        <PostDetailLink to="/post/1">
          <PostImage src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&w=1000&q=80" />
        </PostDetailLink>
      </PostImageContainer>
      <PostText />
      <PostComment>
        <Link to="/post/1">{`댓글 ${20}개 모두 보기`}</Link>
      </PostComment>
    </>
  )
}

function PostText(): JSX.Element {
  const [limit, setLimit] = useState<number>(50)
  const toggleEllipsis = (
    str: JSX.Element,
    limit: number
  ): { string: JSX.Element; isShowMore: boolean } => {
    const postText = str.props.postText
    const splitText = postText.split('\n')
    const limitedText = []
    let lengthCount = 0
    let isShowMore = false

    for (let i = 0; i < splitText.length; i++) {
      const line = splitText[i]
      const words = line.split(' ')

      limitedText.push(
        <p key={`p-${i}`}>
          {words.map((word: string) => {
            if (word.startsWith('#')) {
              if (lengthCount + word.length + 3 > limit) {
                isShowMore = true
                return null
              }
              lengthCount += word.length + 3
              return (
                <a
                  href={`/search?q=${word.substring(1)}`}
                  key={word}
                  style={{ color: `${theme.colors.primaryColor}` }}
                >
                  {word}{' '}
                </a>
              )
            } else {
              lengthCount += word.length + 1
              return <span key={word}>{word} </span>
            }
          })}
        </p>
      )

      if (isShowMore) {
        break
      }
    }
    return {
      string: <>{limitedText}</>,
      isShowMore,
    }
  }
  const onClickMore = (str: string) => (): void => {
    setLimit(str.length)
  }
  return (
    <PostTextContainer>
      {toggleEllipsis(<Hashtag postText={postText} />, limit).string}
      {toggleEllipsis(<Hashtag postText={postText} />, limit).isShowMore && (
        <MoreButton onClick={onClickMore(postText)}>...더보기</MoreButton>
      )}
    </PostTextContainer>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 582px;
  height: 60px;
`

const UserContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ProfileLink = styled(Link)``

const Profile = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`

const Nickname = styled(Link)`
  margin-right: 20px;
  font-size: 20px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DistanceFromMe = styled.span`
  font-size: 16px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const HeartAndNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 10px;
`

const Heart = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? theme.colors.primaryColor : 'black')};
  &:hover {
    cursor: pointer;
  }
`

const NumOfHeart = styled.div`
  font-size: 16px;
  margin-top: 5px;
`

const DirectMessage = styled.div`
  width: 20px;
  margin-right: 10px;
`

const Bookmark = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? theme.colors.primaryColor : 'black')};
  width: 20px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`
const PostImageContainer = styled.div`
  width: 100%;
  height: 582px;
  margin-top: 20px;
`
const PostImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
`
const PostDetailLink = styled(Link)``

const PostTextContainer = styled.p`
  margin-top: 20px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`

const MoreButton = styled.button``

const PostComment = styled.p`
  margin: 20px 0;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`

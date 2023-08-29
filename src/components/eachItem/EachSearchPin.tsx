import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type SearchPinType } from '../../types/postTypes'

interface EachSearchPinProps {
  loadPin: SearchPinType
}

function EachSearchPin(props: EachSearchPinProps): JSX.Element {
  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.loadPin.writer}`}>
          <Profile src={props.loadPin.profile} />
          <Nickname>{props.loadPin.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart>{props.loadPin.like_users.length}</NumOfHeart>
          <Icons>
            <Heart>
              <FontAwesomeIcon icon={faHeart} />
            </Heart>
            <Bookmark>
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostImageContainer>
        <PinImage src={props.loadPin.pin.image} />
      </PostImageContainer>
      <PostDetailLink to={`/post/${props.loadPin.postId}`}>
        상세 게시물로
      </PostDetailLink>
    </div>
  )
}

export default EachSearchPin

const PersonalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const UserContent = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const Nickname = styled.span`
  margin-right: 20px;
  font-size: 16px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const NumOfHeart = styled.span`
  font-size: 12px;
  margin-right: 20px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Heart = styled.div`
  margin-right: 10px;
`

const Bookmark = styled.div`
  margin-right: 10px;
`
const PostImageContainer = styled.div`
  height: 300px;
  margin-top: 20px;
`

const PostDetailLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 50px;
  margin-top: 10px;
`

const PinImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

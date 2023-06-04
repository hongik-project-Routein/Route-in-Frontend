import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { type NotificationData, notificationDummy } from '../dummy/notification'

export default function NoticeModal(): JSX.Element {
  const dummyNotification: NotificationData[] = notificationDummy
  return (
    <ModalContainer>
      {dummyNotification.map((notice, idx) => (
        <Row key={idx}>
          <ProfileImageContainer>
            <ProfileImage src={notice.actorProfile} />
          </ProfileImageContainer>
          <NoticeDesc>
            <Nickname>{notice.actor}</Nickname>
            님이 회원님의{' '}
            {notice.noticeType === 'post' ? '게시글에 ' : '스토리에 '}
            {notice.noticeDesc}
          </NoticeDesc>
          <PostImage src={notice.postImage} />
        </Row>
      ))}
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 5px;
  z-index: 1;
  width: 333px;
  padding: 30px;
  background-color: ${theme.colors.white};
  border: 1px solid #98a2b3;
  border-radius: 12px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ProfileImageContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`
const NoticeDesc = styled.div`
  font-size: 12px;
`

const Nickname = styled.span`
  color: ${theme.colors.primaryColor};
  font-size: 13px;
`

const PostImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 10px;
  object-fit: cover;
`

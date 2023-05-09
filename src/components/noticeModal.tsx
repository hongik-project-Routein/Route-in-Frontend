import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'

interface NoticeList {
  image: string
  nickname: string
  noticeDesc: string
  postImage: string
}

export default function NoticeModal(): JSX.Element {
  const FollowLists: NoticeList[] = [
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      nickname: 'jinokim98',
      noticeDesc: '님이 회원님의 게시물에 좋아요를 눌렀습니다.',
      postImage:
        'https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg',
    },
  ]
  return (
    <ModalContainer>
      {FollowLists.map((item, idx) => (
        <Row key={idx}>
          <ProfileImage src={item.image} />
          <NoticeDesc>
            <Nickname>{item.nickname}</Nickname>
            {`${item.noticeDesc}`}
          </NoticeDesc>
          <PostImage src={item.postImage} />
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

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
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

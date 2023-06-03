import React, {
  useState,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faBookmark,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import Hashtag from '../../components/hashtag'
import { Link, useParams } from 'react-router-dom'
import theme from '../../styles/Theme'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { useDispatch } from 'react-redux'
import { ClickHeartButton, EnrollCommentAction } from '../../modules/comment'
import { v4 as uuidV4 } from 'uuid'
// import { postDemo, type PostCardData } from '../../dummy/post'
import KakaoMapPost from '../../components/KakaoMapPost'
import { type LoadPostDetail, type CommentContent } from '../../types/postTypes'
import { request } from '../../util/axios'
// import { useSelector, useDispatch } from 'react-redux'

export default function PostDetail(): JSX.Element {
  return <HeaderAndSidebar article={<PostDetailArticle />} />
}

function PostDetailArticle(): JSX.Element {
  const { postid } = useParams()

  // 실제는 맞는 것만 요청해야겠지만 데모이기 때문에 다 불러와서 필터링임
  // const [post, setPost] = useState<PostCardData>()
  // const loadPost = (): void => {
  //   const posts: PostCardData[] = postDemo
  //   const select = posts.find((post) => post.postId === postid)
  //   setPost(select)
  // }

  const [post, setPost] = useState<LoadPostDetail>()
  const loadPost = async (): Promise<void> => {
    try {
      const loadPost = await request<LoadPostDetail>(
        'get',
        'loadpostdetail',
        postid
      )
      setPost(loadPost)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadPost().catch((err) => {
      console.log(err)
    })
  }, [post])
  return (
    <>
      {post !== undefined ? (
        <>
          <PersonalInfoContainer>
            <UserContent>
              <Profile src={post.profile} />
              <Nickname>{post.writer}</Nickname>
              <DistanceFromMe>나와의 거리: {post.direction}km</DistanceFromMe>
            </UserContent>
            <RestContent>
              <Icons>
                <HeartAndNumber>
                  <Heart>
                    <FontAwesomeIcon icon={faHeart} />
                  </Heart>
                  <NumOfHeart>{post.likeUsers}</NumOfHeart>
                </HeartAndNumber>
                <Bookmark>
                  <FontAwesomeIcon icon={faBookmark} />
                </Bookmark>
              </Icons>
            </RestContent>
          </PersonalInfoContainer>
          <PostContainer>
            <PostImageContainer>
              <KakaoMapPost
                size="400px"
                pinCount={post.pinCount}
                pinImages={post.pinImage}
                latLng={post.latLng}
              ></KakaoMapPost>
            </PostImageContainer>
            <PostText>{<Hashtag postText={post.postText} />}</PostText>
          </PostContainer>
          <Comment postId={post.postId} comments={post.comment} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

interface CommentProps {
  postId: string
  comments: CommentContent[] | undefined
}

function Comment(props: CommentProps): JSX.Element {
  const [text, setText] = useState<string>('')
  const [comments, setComments] = useState<CommentContent[] | []>([])
  const [emojiClick, setEmojiClick] = useState(false)

  const dispatch = useDispatch()
  // const enrolledComments = useSelector(
  //   (state: RootState) => state.commentReducer.comment
  // )

  useEffect(() => {
    props.comments !== undefined ? setComments(props.comments) : setComments([])
  }, [comments])

  const EmojiButtonClick = (): void => {
    setEmojiClick((cur) => !cur)
  }
  const onClick = (emojiData: EmojiClickData): void => {
    setText((cur) => cur + emojiData.emoji)
    setEmojiClick(false)
  }
  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event
    setText(value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (text === '') return

    const newComment = {
      id: uuidV4(),
      image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
      commentWriter: 'jinokim98',
      comment: text,
      time: 1,
      heartCount: 0,
      isHeartButtonClick: false,
    }

    setComments((cur) => [...cur, newComment])
    setText('')
    dispatch(EnrollCommentAction(newComment))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') event.preventDefault()
  }

  return (
    <>
      <CommentContainer>
        {comments.length > 0 &&
          comments.map((comment, idx) => (
            <CommentComponent key={idx} comment={comment} />
          ))}
      </CommentContainer>
      <WriteCommentContainer onSubmit={onSubmit}>
        <Emoji onClick={EmojiButtonClick}>
          <FontAwesomeIcon icon={faFaceSmile} />
        </Emoji>
        {emojiClick && (
          <EmojiPickerContainer>
            <EmojiPicker
              height={350}
              width="100%"
              autoFocusSearch={false}
              onEmojiClick={onClick}
            />
          </EmojiPickerContainer>
        )}
        <CommentInput
          type="text"
          value={text}
          placeholder="댓글 입력"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <EnrollComment type="submit" disabled={text === ''}>
          게시
        </EnrollComment>
      </WriteCommentContainer>
    </>
  )
}

interface CommentComponentProps {
  comment: CommentContent
}

function CommentComponent(props: CommentComponentProps): JSX.Element {
  const [likes, setLikes] = useState<number>(props.comment.heartCount)
  const [liked, setLiked] = useState<boolean>(props.comment.isHeartButtonClick)
  const dispatch = useDispatch()

  const handleLikeClick = (): void => {
    liked ? setLikes(likes - 1) : setLikes(likes + 1)
    setLiked(!liked)
    dispatch(ClickHeartButton(props.comment.id, props.comment))
  }

  return (
    <Row>
      <CommentProfile src={props.comment.image} />
      <CommentMain>
        <Maintext>
          <CommentNickname to="/profile/jinokim98">
            {props.comment.commentWriter}
          </CommentNickname>
          <CommentDesc>{props.comment.comment}</CommentDesc>
        </Maintext>
        <Rest>
          <Time>{`${props.comment.time}분전`}</Time>
          <HeartCount>{`좋아요 ${likes}개`}</HeartCount>
          <ReplyButton>댓글 달기</ReplyButton>
        </Rest>
        <ViewReply></ViewReply>
      </CommentMain>
      <HeartButton
        onClick={() => {
          handleLikeClick()
        }}
        active={liked}
      >
        <FontAwesomeIcon icon={faHeart} />
      </HeartButton>
    </Row>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const UserContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12%;
`

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

const Nickname = styled.span`
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

const Heart = styled.div``

const NumOfHeart = styled.div`
  font-size: 16px;
  margin-top: 5px;
`

const Bookmark = styled.div`
  width: 20px;
  margin-right: 10px;
`

const PostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
`

const PostImageContainer = styled.div`
  width: 400px;
  height: 400px;
  margin-top: 20px;
  margin-right: 50px;
`

const PostText = styled.p`
  width: 300px;
  height: 400px;
  margin-top: 40px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`

const CommentContainer = styled.div`
  width: 750px;
  height: 250px;
  margin-bottom: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow-y: scroll;
`

const Row = styled.div`
  display: flex;
  position: relative;
  padding: 12px;
`
const CommentProfile = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  border-radius: 50%;
  object-fit: cover;
`

const CommentMain = styled.div``
const Maintext = styled.p`
  display: flex;
  align-items: center;
`
const CommentNickname = styled(Link)`
  margin-right: 10px;
  font-weight: 700;
`
const CommentDesc = styled.span``

const Rest = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
`
const Time = styled.div`
  padding-top: 3px;
  margin-right: 10px;
  font-size: 12px;
`
const HeartCount = styled.div`
  padding-top: 3px;
  margin-right: 10px;
  font-size: 12px;
`
const ReplyButton = styled.button`
  font-size: 12px;
`
const HeartButton = styled.button<{ active: boolean }>`
  position: absolute;
  top: 15px;
  right: 40px;
  color: ${(props) => (props.active ? theme.colors.primaryColor : 'black')};
`
const ViewReply = styled.button``

const WriteCommentContainer = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  width: 750px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const Emoji = styled.button`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  text-align: center;
  font-size: 25px;
`

const EmojiPickerContainer = styled.div`
  position: absolute;
  top: 50px;
`

const CommentInput = styled.input`
  width: 600px;
  height: 30px;
  margin-right: 40px;
  padding: 8px;
`
const EnrollComment = styled.button<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? '#b1e2f1' : theme.colors.primaryColor)};
  font-weight: 700;
`

import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import Carousel from '../../components/carousel'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
import { changeHashtag } from '../../modules/hashtag'

export default function WritePost(): JSX.Element {
  const images: JSX.Element[] = [
    <Image
      key={0}
      src="https://avatars.githubusercontent.com/u/81083461?v=4"
    />,
    <Image
      key={1}
      src="https://visitowa.com/wp-content/uploads/2021/02/DSC07749-1.jpg"
    />,
    <Image
      key={2}
      src="https://images.pexels.com/photos/2193600/pexels-photo-2193600.jpeg?cs=srgb&dl=pexels-lisa-fotios-2193600.jpg&fm=jpg"
    />,
    <Image
      key={3}
      src="https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg"
    />,
  ]
  const [hashtag, setHashtag] = useState<string[] | []>([])
  const [text, setText] = useState<string>('')
  const dispatch = useDispatch()
  const hashtags = useSelector(
    (state: RootState) => state.changeHashtagReducer.data
  )
  useEffect(() => {
    setText(hashtags.join().replace(/,/g, '\n\n'))
    setHashtag(hashtags)
  }, [])
  useEffect(() => {
    console.log(hashtag)
  }, [hashtag])
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value)
  }
  const pushHashtag = (): void => {
    const newHashtags: string[] = []
    text.split('\n').forEach((line) => {
      line.split(' ').forEach((word) => {
        if (word.startsWith('#')) {
          newHashtags.push(word)
          console.log(word)
        }
      })
    })
    setHashtag(newHashtags)
    dispatch(changeHashtag(newHashtags))
  }
  // props: Dispatch<SetStateAction<Location[]>>
  return (
    <>
      <Title>새 게시물 만들기</Title>
      <Paragraph>{`장소에 대한 해시태그가 자동으로 완성됩니다.`}</Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel items={images}></Carousel>
        </PictureGroup>
        <LocationGroup>
          <WriteSpace value={text} onChange={handleOnChange} />
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButtonLink
          to="/post/create/setimage"
          onClick={() => {
            pushHashtag()
          }}
        >
          <NextButton>{`다음으로`}</NextButton>
        </NextButtonLink>
        <Blank />
      </ButtonContainer>
    </>
  )
}

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
`
const Paragraph = styled.p`
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
  text-align: center;
`

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`

const PictureGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WriteSpace = styled.textarea`
  width: 350px;
  height: 350px;
  resize: none;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const Image = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`
const Blank = styled.div``

const NextButtonLink = styled(Link)`
  margin: auto;
`
const NextButton = styled.button`
  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

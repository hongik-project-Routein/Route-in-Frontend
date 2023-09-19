import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import Carousel from '../../components/util/carousel'
import { Link } from 'react-router-dom'
import {
  type HashtagAndText,
  type HashtagAutoAndText,
  type Pin,
} from '../../types/postTypes'
import usePost from '../../recoil/hooks/usePost'
import PostInput from '../../components/textarea/postInput'
import { tagProcess } from '../../components/function/tag'

export default function WritePost(): JSX.Element {
  const [hashtagAutoTextList, setHashtagAutoTextList] = useState<
    HashtagAutoAndText[] | []
  >([])
  const [text, setText] = useState<string>('')

  const { pins, imgUrls, changeHashtagAndText } = usePost()

  // 초기 해시태그 자동 값 가져오기
  useEffect(() => {
    const loadHashtagAuto: HashtagAutoAndText[] = pins.map((item: Pin) => {
      return {
        hashtagAuto: item.hashtagAuto.hashtagAuto,
        text: '',
      }
    })
    setHashtagAutoTextList(loadHashtagAuto)
  }, [])

  // 새로 만든 해시태그를 감지해서 푸시하는 함수
  const pushHashtag = (): void => {
    const newHashtags: string[] = []
    text.split('\n').forEach((line) => {
      line.split(' ').forEach((word) => {
        if (word.startsWith('#')) {
          newHashtags.push(word)
        }
      })
    })
    const newPins: Pin[] = pins.map((pin: Pin, idx: number) => {
      return {
        ...pin,
        hashtagAuto: hashtagAutoTextList[idx],
      }
    })

    const payload: HashtagAndText = {
      hashtag: newHashtags,
      text: `${tagProcess(text)}`,
    }

    changeHashtagAndText(newPins, payload)
  }

  return (
    <>
      <Title>새 게시물 만들기</Title>
      <Paragraph>{`장소에 대한 해시태그가 자동으로 완성됩니다.`}</Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel
            items={imgUrls.map((item: string, idx: number) => (
              <CarouselImage key={idx} src={item} />
            ))}
          ></Carousel>
        </PictureGroup>
        <LocationGroup>
          {hashtagAutoTextList.map((hashtag, idx) => (
            <HashtagAutoTextContainer key={idx}>
              <HashtagAuto>{hashtag.hashtagAuto}</HashtagAuto>
              <HashtagAutoTextInput
                value={hashtag.text}
                onChange={(event) => {
                  setHashtagAutoTextList((prev) => {
                    const updateList = [...prev]
                    updateList[idx] = {
                      ...updateList[idx],
                      text: event.target.value,
                    }
                    return updateList
                  })
                }}
                type="text"
              />
            </HashtagAutoTextContainer>
          ))}
          <PostInput value={text} setValue={setText} />
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
  width: 350px;
  height: 350px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const HashtagAutoTextContainer = styled.div`
  position: relative;
  width: 350px;
  height: 50px;
  margin-bottom: 5px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const HashtagAuto = styled.div`
  width: 90%;
  height: 15px;
  margin: 5px 0;
  padding: 1px 2px;
  color: ${theme.colors.primaryColor};
  overflow-x: hidden;
  overflow-y: hidden;
`

const HashtagAutoTextInput = styled.input`
  width: 100%;
  height: 25px;
  padding: 0 5px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;
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

const CarouselImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

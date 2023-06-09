import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import Carousel from '../../components/carousel'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
import { ChangeHashtagAndText } from '../../modules/post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { type Pin } from '../../types/postTypes'

// 자동 생성된 해시태그의 이름과 값
interface HashtagAutoAndText {
  hashtagAuto: string
  text: string
}

// 추가로 작성한 해시태그 리스트와 전체 텍스트
interface HashtagAndText {
  hashtag: string[]
  text: string
}

export default function WritePost(): JSX.Element {
  const [hashtagAutoTextList, setHashtagAutoTextList] = useState<
    HashtagAutoAndText[] | []
  >([])
  const [text, setText] = useState<string>('')

  const pins = useSelector((state: RootState) => state.changePostReducer.pins)
  const imgUrls = useSelector(
    (state: RootState) => state.changePostReducer.imgUrls
  )

  const dispatch = useDispatch()

  // 초기 해시태그 자동 값 가져오기
  useEffect(() => {
    const loadHashtagAuto: HashtagAutoAndText[] = pins.map((item) => {
      return {
        hashtagAuto: item.hashtagAuto.hashtagAuto,
        text: '',
      }
    })
    setHashtagAutoTextList(loadHashtagAuto)
  }, [])

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value)
  }

  const deleteHashtagAutoInput = (idx: number): void => {
    const updateList = [...hashtagAutoTextList]
    updateList.splice(idx, 1)

    setHashtagAutoTextList(updateList)
  }

  // 새로 만든 해시태그를 감지해서 푸시하는 함수
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
    const newPins: Pin[] = pins.map((pin, idx) => {
      return {
        ...pin,
        hashtagAuto: hashtagAutoTextList[idx],
      }
    })

    const payload: HashtagAndText = {
      hashtag: newHashtags,
      text: `${text}`,
    }

    dispatch(ChangeHashtagAndText(newPins, payload))
  }

  return (
    <>
      <Title>새 게시물 만들기</Title>
      <Paragraph>{`장소에 대한 해시태그가 자동으로 완성됩니다.`}</Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel
            items={imgUrls.map((item, idx) => (
              <CarouselImage key={idx} src={item} />
            ))}
          ></Carousel>
        </PictureGroup>
        <LocationGroup>
          {hashtagAutoTextList.map((hashtag, idx) => (
            <HashtagAutoTextContainer key={idx}>
              <HashtagAuto>{hashtag.hashtagAuto}</HashtagAuto>
              <DeleteBtn
                onClick={() => {
                  deleteHashtagAutoInput(idx)
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </DeleteBtn>
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

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;
  width: 10px;
  height: 10px;
`

const HashtagAutoTextInput = styled.input`
  width: 100%;
  height: 25px;
  padding: 0 5px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;
`

const WriteSpace = styled.textarea`
  width: 350px;
  height: 350px;
  padding: 8px;
  resize: none;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
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

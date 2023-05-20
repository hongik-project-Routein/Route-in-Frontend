import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { useSelector } from 'react-redux'
import { type RootState } from '../../modules'
import Carousel from '../../components/carousel'

export default function SelectRepresentativePicture(): JSX.Element {
  const posts = useSelector((state: RootState) => state.changePostReducer.post)
  const rest = useSelector(
    (state: RootState) => state.changePostReducer.hashtagAndText
  )
  const loadText = (): string => {
    const hashtagAutoText: string[] = posts.map((hashtag) => {
      return `${hashtag.hashtagAuto.hashtagAuto}\n${hashtag.hashtagAuto.text}\n\n`
    })

    const returnText = hashtagAutoText.join(' ') + rest.text
    console.log(returnText)
    return returnText
  }
  return (
    <>
      <Title>대표 이미지 설정</Title>
      <Paragraph>
        {`설정한 이미지 위로 핀이 표시됩니다.
        기본 이미지 버튼을 누르면 지도 이미지로 전환됩니다.`}
      </Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel items={posts.map((item) => item.tag)}></Carousel>
          <ReturnDefaultImage>기본이미지로</ReturnDefaultImage>
        </PictureGroup>
        <LocationGroup>
          <WriteSpace>{loadText()}</WriteSpace>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButton>추가히기</NextButton>
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
const ReturnDefaultImage = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
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
const WriteSpace = styled.div`
  width: 350px;
  height: 350px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  white-space: pre-line;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const Blank = styled.div``

const NextButton = styled.button`
  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

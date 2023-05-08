import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'

export default function WritePost(): JSX.Element {
  // props: Dispatch<SetStateAction<Location[]>>
  return (
    <>
      <Title>새 게시물 만들기</Title>
      <Paragraph>{`장소에 대한 해시태그가 자동으로 완성됩니다.`}</Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel></Carousel>
        </PictureGroup>
        <LocationGroup>
          <WriteSpace />
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButton>다음으로</NextButton>
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
const Carousel = styled.div`
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
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
const WriteSpace = styled.textarea`
  width: 300px;
  height: 300px;
  resize: none;
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

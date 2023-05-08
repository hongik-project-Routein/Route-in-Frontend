import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'

export default function SelectPicture(): JSX.Element {
  // props: Dispatch<SetStateAction<Location[]>>
  return (
    <>
      <Title>사진 선택</Title>
      <Paragraph>
        {`업로드하고 싶은 사진을 아래 공간에 드래그 앤 드랍하세요
        사진 메타정보를 통해 자동으로 장소를 인식합니다.`}
      </Paragraph>
      <GroupContainer>
        <PictureGroup>
          <Carousel></Carousel>
          <EditPictureButton>사진편집</EditPictureButton>
        </PictureGroup>
        <LocationGroup>
          <Carousel></Carousel>
          <LocationName># 김포공항</LocationName>
          <LocationAddress>서울특별시 강서구 하늘길 76</LocationAddress>
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
const EditPictureButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LocationName = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 800;
`
const LocationAddress = styled.p`
  color: #475467;
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

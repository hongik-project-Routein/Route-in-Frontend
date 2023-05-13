import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { Link } from 'react-router-dom'
import Carousel from '../../components/carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

// interface Location {
//   picture: string
//   hashtag: string
// }

export default function SelectPicture(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File[] | undefined>(
    undefined
  )
  const [previewUrl, setPreviewUrl] = useState<string[] | undefined>(undefined)
  const [imgTagList, setImgTagList] = useState<JSX.Element[]>()

  const fileSelectedHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files
    if (files != null) {
      const newUrls: string[] = []
      const newFiles: File[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newUrl = await readUrl(file)
        newFiles.push(file)
        newUrls.push(newUrl)
      }
      setSelectedFile(newFiles)
      setPreviewUrl(newUrls)
    }
  }
  const readUrl = async (file: File): Promise<string> => {
    return await new Promise<string>((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const url = fileReader.result?.toString() ?? ''
        resolve(url)
      }
      fileReader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    const newImgTagList: JSX.Element[] = []
    const fileLength = selectedFile?.length
    const urlLength = previewUrl?.length
    console.log(urlLength)

    if (fileLength !== undefined && previewUrl !== undefined) {
      for (let i = 0; i < fileLength; i++) {
        const imgTag = (
          <CarouselImageProps key={i} src={previewUrl[i]} alt="img" />
        )
        newImgTagList.push(imgTag)
      }
      setImgTagList(newImgTagList)
    }
  }, [selectedFile, previewUrl])
  return (
    <>
      <Title>사진 선택</Title>
      <Paragraph>
        {`업로드하고 싶은 사진을 아래 공간에 드래그 앤 드랍하세요
        사진 메타정보를 통해 자동으로 장소를 인식합니다.`}
      </Paragraph>
      <GroupContainer>
        <PictureGroup>
          <InputImageContainer>
            {imgTagList != null ? (
              <Carousel items={imgTagList} />
            ) : (
              <>
                <InputLabel htmlFor="file">
                  <ImageIcon>
                    <FontAwesomeIcon icon={faImage} />
                  </ImageIcon>
                  <ImageIconDesc>이미지 추가</ImageIconDesc>
                </InputLabel>
                <InputPicture
                  id="file"
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(event) => {
                    fileSelectedHandler(event).catch((error) => {
                      console.log(error)
                    })
                  }}
                  multiple
                />
              </>
            )}
          </InputImageContainer>
          <EditPictureButton active={imgTagList !== undefined}>
            사진편집
          </EditPictureButton>
        </PictureGroup>
        <LocationGroup>
          <CarouselContainer></CarouselContainer>
          <LocationName># 김포공항</LocationName>
          <LocationAddress>서울특별시 강서구 하늘길 76</LocationAddress>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButtonLink to="/post/create/text">
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
const CarouselContainer = styled.div`
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
`

const InputImageContainer = styled.div``

const InputPicture = styled.input`
  display: none;
  width: 350px;
  height: 350px;
`

const InputLabel = styled.label`
  display: inline-block;
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const ImageIcon = styled.div`
  margin-top: 120px;
  font-size: 60px;
  text-align: center;
`

const ImageIconDesc = styled.div`
  margin-top: 20px;
  font-size: 25px;
  text-align: center;
`

const CarouselImageProps = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
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
const EditPictureButton = styled.button<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
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

const NextButtonLink = styled(Link)`
  margin: auto;
`
const NextButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`
/*
export default function SelectPicture(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File[] | undefined>(
    undefined
  )
  const [previewUrl, setPreviewUrl] = useState<string[] | undefined>(undefined)
  const [imgTagList, setImgTagList] = useState<JSX.Element[]>()

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files
    if (files != null) {
      const fileReaders: FileReader[] = []
      const newUrls: string[] = []
      const newFiles: File[] = []

      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const url = fileReader.result?.toString()
          newUrls.push(url as string)
          Exif.getData(fileReader.result as string, () => {
            const tags = Exif.getAllTags(files[i])
            console.log(tags)
          })
        }
        fileReaders.push(fileReader)
        newFiles.push(files[i])
        fileReader.readAsDataURL(files[i])
      }
      setSelectedFile(newFiles)
      setPreviewUrl(newUrls)
    }
  }
*/

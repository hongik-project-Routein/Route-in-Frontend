import React, { useState, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faFaceSmile,
  faSliders,
  faPen,
} from '@fortawesome/free-solid-svg-icons'

export default function CreateStory(): JSX.Element {
  return <HeaderAndSidebar article={<CreateStoryArticle />} />
}

function CreateStoryArticle(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const fileSelectedHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]
    if (file != null) {
      const newImageUrl = await readUrl(file)
      setSelectedFile(file)
      setImageUrl(newImageUrl)
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
  return (
    <>
      <Title>스토리 생성</Title>
      <Paragraph>
        {`사진의 메타정보를 기반으로 스토리가 생성됩니다.
        위치 변경을 원한다면 위치 변경 버튼을 눌러 변경해주세요`}
      </Paragraph>
      <CreateStoryContainer>
        {selectedFile != null ? (
          <>
            <StoryImage src={imageUrl} alt="img" />
            <ImageEditTools>
              <ImageEditButton>A/a</ImageEditButton>
              <ImageEditButton>
                <FontAwesomeIcon icon={faFaceSmile} />
              </ImageEditButton>
              <ImageEditButton>
                <FontAwesomeIcon icon={faSliders} />
              </ImageEditButton>
              <ImageEditButton>
                <FontAwesomeIcon icon={faPen} />
              </ImageEditButton>
            </ImageEditTools>
          </>
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
            />
          </>
        )}
      </CreateStoryContainer>
      <ButtonContainer active={selectedFile !== undefined}>
        <SetLocationButton>위치 변경</SetLocationButton>
        <CreateButton>스토리 생성</CreateButton>
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

const CreateStoryContainer = styled.div`
  position: relative;
  width: 700px;
  height: 420px;
  margin: 30px auto;
`

const InputLabel = styled.label`
  display: inline-block;
  width: 700px;
  height: 420px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const ImageIcon = styled.div`
  margin-top: 150px;
  font-size: 60px;
  text-align: center;
`

const ImageIconDesc = styled.div`
  margin-top: 20px;
  font-size: 25px;
  text-align: center;
`
const InputPicture = styled.input`
  display: none;
  width: 700px;
  height: 420px;
`

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

const ImageEditTools = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 220px;
  height: 50px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.4);
`

const ImageEditButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 10px 5px;
  border-radius: 50%;
  background-color: #d9d9d9;
  text-align: center;
`

const ButtonContainer = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  justify-content: ${(props) => (props.active ? 'space-around' : 'none')};
  margin-bottom: 30px;
`

const SetLocationButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`
const CreateButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

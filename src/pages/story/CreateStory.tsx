import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'

export default function CreateStory(): JSX.Element {
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <CreateStoryGrid>
        <CreateStoryArticle />
      </CreateStoryGrid>
    </Grid>
  )
}

function CreateStoryArticle(): JSX.Element {
  return (
    <>
      <Title>스토리 생성</Title>
      <Paragraph>
        {`사진의 메타정보를 기반으로 스토리가 생성됩니다.
        위치 변경을 원한다면 위치 변경 버튼을 눌러 변경해주세요`}
      </Paragraph>
      <CreateStoryContainer></CreateStoryContainer>
      <ButtonContainer>
        <SetLocationButton>위치 변경</SetLocationButton>
        <CreateButton>스토리 생성</CreateButton>
      </ButtonContainer>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar createPost createPost ';
`

const HeaderGrid = styled.div`
  grid-area: header;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const CreateStoryGrid = styled.div`
  grid-area: createPost;
`

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
  width: 820px;
  height: 420px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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

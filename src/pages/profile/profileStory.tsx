import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import Tab from '../../components/tab'

interface TabContent {
  tabName: string
  link: string
}

interface ProfileStoryArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function ProfileStoryArticle(
  props: ProfileStoryArticleProps
): JSX.Element {
  const username = 'jinokim98' // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username}/map` },
    { tabName: '게시글', link: `/profile/${username}/post` },
    { tabName: '스토리', link: `/profile/${username}/story` },
    { tabName: '북마크', link: `/profile/${username}/bookmark` },
  ]
  const [date, setDate] = useState('')
  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10))
  }, [])
  const onChangeDateBtn = (event: ChangeEvent<HTMLInputElement>): void => {
    setDate(event.target.value)
  }
  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <TabArticle>
        <BtnGroup>
          <DayButton
            type="date"
            value={date}
            onChange={onChangeDateBtn}
          ></DayButton>
          <MergeStoryBtn type="button">게시물로 변환</MergeStoryBtn>
          <ShowWithoutLocationStoryBtn type="button">
            위치정보가 없는 스토리 보기
          </ShowWithoutLocationStoryBtn>
        </BtnGroup>
        <MapContainer></MapContainer>
      </TabArticle>
    </>
  )
}

const TabArticle = styled.div`
  width: 900px;
  height: 450px;
`

const BtnGroup = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const DayButton = styled.input`
  width: 300px;
  height: 50px;
  margin-right: 35px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`

const MergeStoryBtn = styled.button`
  width: 130px;
  height: 50px;
  margin-right: 35px;
  background-color: #d9d9d9;
  border-radius: 25px;
  font-size: 16px;
`

const ShowWithoutLocationStoryBtn = styled.button`
  width: 230px;
  height: 50px;
  background-color: #d9d9d9;
  border-radius: 25px;
  font-size: 16px;
`
const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #d9d9d9;
`

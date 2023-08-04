import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { request } from '../util/axios'
import { type UserData } from '../mocks/data/user'
import EachRecommendUser from './eachItem/EachRecommendUser'

export default function UserRecommend(): JSX.Element {
  const [userRecommend, setUserRecommend] = useState<UserData[]>([])

  const fetchData = async (): Promise<UserData[]> => {
    try {
      const response = await request<UserData[]>(
        'get',
        `/api/user/recommend/${'jinokim98'}`
      )
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const loadUserRecommend = async (): Promise<void> => {
      const result = await fetchData()
      console.log(result)

      setUserRecommend(result)
    }
    loadUserRecommend().catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <RecommendTitle>회원님을 위한 추천</RecommendTitle>
      <RecommendContainer>
        {userRecommend?.map((user, idx) => (
          <EachRecommendUser key={`eachuser${idx}`} eachUser={user} />
        ))}
      </RecommendContainer>
    </>
  )
}

const RecommendTitle = styled.h2`
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 20px;
`

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
`

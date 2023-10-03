import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { request } from '../../util/axios'
import EachRecommendUser from '../eachItem/EachRecommendUser'
import {
  type RecommendUser,
  type RecommendUserType,
} from '../../types/userType'
import useUser from '../../recoil/hooks/useUser'

export default function UserRecommend(): JSX.Element {
  const [userRecommend, setUserRecommend] = useState<RecommendUserType[]>([])
  const { loadUserInfo } = useUser()

  const fetchData = async (): Promise<RecommendUserType[]> => {
    try {
      const response = await request<RecommendUser>(
        'get',
        `/api/recommend/user/`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )

      return response.results
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const loadUserRecommend = async (): Promise<void> => {
      const result = await fetchData()
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

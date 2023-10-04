import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PostSmall from '../../components/post/postSmall'
import { type LoadPost } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import useUser from '../../recoil/hooks/useUser'
import Loading from '../../components/util/loading'

export default function Explore(): JSX.Element {
  const [posts, setPosts] = useState<LoadPost[]>([])
  const { loadUserInfo } = useUser()

  const { loading, curPageItem, renderSSPagination } =
    useSSPagination<LoadPost>(`/api/recommend/post/?`, 6)

  useEffect(() => {
    setPosts(curPageItem)
  }, [curPageItem])

  return (
    <Container>
      <ExploreHeader>
        <RecommandationMent>
          {`${loadUserInfo().uname}님의 성향에 맞는 게시물을 추천합니다.`}
        </RecommandationMent>
      </ExploreHeader>

      <RecommandationResultGrid>
        {loading ? (
          <Loading />
        ) : posts !== undefined ? (
          posts.map((post, idx) => <PostSmall key={idx} loadPost={post} />)
        ) : null}
      </RecommandationResultGrid>
      {renderSSPagination()}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const ExploreHeader = styled.header`
  font-size: 20px;
  margin-top: 78px;
  margin-bottom: 30px;
`

const RecommandationMent = styled.div`
  margin-bottom: 50px;
`

const RecommandationResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 46px;
  width: 900px;
`

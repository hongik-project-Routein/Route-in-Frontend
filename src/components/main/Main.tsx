import React, { useState, useEffect } from 'react'
import PostCard from '../post/postCard'
import styled from 'styled-components'
import UserRecommend from '../etc/userRecommend'
import { type LoadPostPagination, type LoadPost } from '../../types/postTypes'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { useInView } from 'react-intersection-observer'
import Loading from '../util/loading'

function Main(): JSX.Element {
  const [ref, inView] = useInView()

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<LoadPost[]>([])
  const [next, setNext] = useState('')
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const loadPost = async (): Promise<void> => {
    setLoading(true)

    try {
      const loadPost = await request<LoadPostPagination>(
        'get',
        `/api/post`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      setPosts(loadPost.results)

      // 다음이 있을 때 재호출
      if (loadPost.next !== null && loadPost.next !== undefined) {
        setNext(new URL(loadPost.next).pathname + new URL(loadPost.next).search)
      } else {
        setNext('')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPost().catch((err) => {
      console.log(err)
    })
  }, [])

  const loadNext = async (): Promise<void> => {
    setLoading(true)

    try {
      if (next === '') return
      const nextContent = await request<LoadPostPagination>('get', next, null, {
        Authorization: `Bearer ${accessToken}`,
      })

      setPosts((prev) => [...prev, ...nextContent.results])

      // 다음이 있을 때 재호출
      if (nextContent.next !== null && nextContent.next !== undefined) {
        setNext(
          new URL(nextContent.next).pathname + new URL(nextContent.next).search
        )
      } else {
        setNext('')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inView) {
      loadNext().catch((error) => {
        console.log(error)
      })
    }
  }, [inView])

  return (
    <>
      {loading && <Loading />}
      <Grid>
        <PostGrid>
          {posts !== undefined &&
            posts.length > 0 &&
            posts.map((post, idx) => <PostCard key={idx} loadPost={post} />)}
          <Next ref={ref}></Next>
        </PostGrid>
        <RecommendGrid>
          <UserRecommend />
        </RecommendGrid>
      </Grid>
    </>
  )
}

const Grid = styled.div`
  display: flex;
  column-gap: 20px;
`

const PostGrid = styled.div`
  flex: 5;
`

const RecommendGrid = styled.div`
  flex: 3;
  margin-right: 10px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const Next = styled.div`
  width: 10px;
  height: 10px;
`

export default Main

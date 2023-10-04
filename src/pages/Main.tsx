import React, { useState, useEffect } from 'react'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import PostCard from '../components/post/postCard'
import styled from 'styled-components'
import UserRecommend from '../components/etc/userRecommend'
import theme from '../styles/Theme'
import { type LoadPostPagination, type LoadPost } from '../types/postTypes'
import { request } from '../util/axios'
import useUser from '../recoil/hooks/useUser'
import { useInView } from 'react-intersection-observer'

function Main(): JSX.Element {
  const [ref, inView] = useInView()

  const [posts, setPosts] = useState<LoadPost[]>([])
  const [next, setNext] = useState('')
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const loadPost = async (): Promise<void> => {
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
    }
  }

  useEffect(() => {
    loadPost().catch((err) => {
      console.log(err)
    })
  }, [])

  const loadNext = async (): Promise<void> => {
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
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      <PostGrid>
        {posts !== undefined &&
          posts.length > 0 &&
          posts.map((post, idx) => <PostCard key={idx} loadPost={post} />)}
        <Next ref={ref}></Next>
      </PostGrid>
      <RecommendGrid>
        <UserRecommend />
      </RecommendGrid>
      <FooterGrid>
        <Footer>
          {`@ 2023 Route in
          From Hongik Univ. Project 1 Group6`}
        </Footer>
      </FooterGrid>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar post recommend'
    'sidebar post footer';
`

const HeaderGrid = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${theme.colors.white};
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
  position: sticky;
  top: 0;
  z-index: 20;
`
const PostGrid = styled.div`
  grid-area: post;
`
const RecommendGrid = styled.div`
  grid-area: recommend;
`

const FooterGrid = styled.div`
  grid-area: footer;
`

const Footer = styled.footer`
  color: #475467;
  text-align: center;
  white-space: pre-line;
  line-height: 24px;
`

const Next = styled.div`
  width: 10px;
  height: 10px;
`

export default Main

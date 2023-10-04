import React, { useState, useEffect } from 'react'

import { type LoadPost } from '../../types/postTypes'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import PostDetailInner from '../../components/post/postDetailInner'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isUpdatePost } from '../../recoil/atom/updatePost'
import PostUpdate from './postUpdate'
import usePostDetail from './../../recoil/hooks/usePostdetail'

function PostDetail(): JSX.Element {
  const { postid } = useParams()
  const isUpdate = useRecoilValue(isUpdatePost)

  return !isUpdate ? (
    <PostDetailArticle postid={postid as string} />
  ) : (
    <PostUpdate postid={postid as string} />
  )
}

interface PostDetailArticleProps {
  postid: string
}

function PostDetailArticle({ postid }: PostDetailArticleProps): JSX.Element {
  const [post, setPost] = useState<LoadPost>()
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const { loadPostDetail } = usePostDetail()

  const loadPost = async (): Promise<void> => {
    try {
      if (postid !== undefined) {
        const loadPost = await request<LoadPost>(
          'get',
          `/api/post/${postid}`,
          undefined,
          {
            Authorization: `Bearer ${accessToken}`,
          }
        )

        setPost(loadPost)
        loadPostDetail(loadPost)
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

  return <PostDetailInner />
}

export default PostDetail

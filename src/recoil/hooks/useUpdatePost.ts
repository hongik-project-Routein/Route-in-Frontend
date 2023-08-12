import { type UpdatePost } from '../../types/postTypes'
import updatePost from '../atom/updatePost'
import { useRecoilState } from 'recoil'

function useUpdatePost(): any {
  const [curUpdatePost, setCurUpdatePost] =
    useRecoilState<UpdatePost>(updatePost)
}

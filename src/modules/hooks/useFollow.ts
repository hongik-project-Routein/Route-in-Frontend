import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '..'
import { useCallback } from 'react'
import { type UserData } from '../../mocks/data/user'
import {
  AddFollower,
  AddFollowing,
  DeleteFollower,
  DeleteFollowing,
  LoadFollowList,
} from '../slice/follow'

function useFollow(): any {
  const dispatch = useDispatch()

  const nickname = useSelector((state: RootState) => state.follow.nickname)
  const follower = useSelector((state: RootState) => state.follow.follower)
  const following = useSelector((state: RootState) => state.follow.following)

  const loadFollowList = useCallback((user: UserData) => {
    dispatch(
      LoadFollowList({
        nickname: user.nickname,
        follower: user.followerList,
        following: user.followList,
      })
    )
  }, [])

  const addFollower = useCallback((follower: string) => {
    dispatch(AddFollower({ nickname, follower }))
  }, [])

  const deleteFollower = useCallback((follower: string) => {
    dispatch(DeleteFollower({ nickname, follower }))
  }, [])

  const addFollowing = useCallback((following: string) => {
    dispatch(AddFollowing({ nickname, following }))
  }, [])

  const deleteFollowing = useCallback((following: string) => {
    dispatch(DeleteFollowing({ nickname, following }))
  }, [])

  return {
    follower,
    following,
    loadFollowList,
    addFollower,
    deleteFollower,
    addFollowing,
    deleteFollowing,
  }
}

export default useFollow

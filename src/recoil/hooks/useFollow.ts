import { useRecoilState } from 'recoil'
import follower from '../selector/follower'
import following from '../selector/following'
import { useCallback } from 'react'

function useFollow(): any {
  const [followerList, setFollowerList] = useRecoilState<string[]>(follower)
  const [followingList, setFollowingList] = useRecoilState<string[]>(following)

  const addFollower = useCallback((follower: string) => {
    setFollowerList((prev) => [...prev, follower])
  }, [])

  const deleteFollower = useCallback((follower: string) => {
    setFollowerList((prev) => prev.filter((user) => user !== follower))
  }, [])

  const addFollowing = useCallback((following: string) => {
    setFollowingList((prev) => [...prev, following])
  }, [])

  const deleteFollowing = useCallback((following: string) => {
    setFollowingList((prev) => prev.filter((user) => user !== following))
  }, [])

  return {
    followerList,
    followingList,
    addFollower,
    deleteFollower,
    addFollowing,
    deleteFollowing,
  }
}

export default useFollow

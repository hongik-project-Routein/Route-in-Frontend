import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useUser from '../../recoil/hooks/useUser'
import useFollow from '../../recoil/hooks/useFollow'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'

interface FollowButtonProps {
  uname: string
}

const followStateColor: Record<number, string> = {
  0: theme.colors.disable,
  1: theme.colors.disable,
  2: theme.colors.primaryColor,
  3: theme.colors.primaryColor,
}

function FollowButton(props: FollowButtonProps): JSX.Element {
  const { uname } = props
  const [followState, setFollowState] = useState<number>(-1)

  const { loadUserInfo } = useUser()
  const { followerList, followingList, addFollowing, deleteFollowing } =
    useFollow()

  useEffect(() => {
    const myName = loadUserInfo().uname
    const followerSet = new Set(followerList)
    const followingSet = new Set(followingList)

    const isMine = uname === myName // 나일 때
    const isFollowing = followingSet.has(uname) // 팔로우 중일 때
    const isFollower = followerSet.has(uname) // 맞팔일 때

    if (isMine) {
      setFollowState(0)
    } else if (isFollowing) {
      setFollowState(1)
    } else if (!isFollower) {
      setFollowState(2)
    } else {
      setFollowState(3)
    }
  }, [uname, loadUserInfo, followState, followingList])

  const followStateChange = (): void => {
    switch (followState) {
      case 0:
        break
      case 1:
        deleteFollowing(uname)
        break
      case 2:
      case 3:
        addFollowing(uname)
        break
    }
  }

  const onFollowButton = async (): Promise<void> => {
    try {
      const response = await request(
        'post',
        `/api/user/${uname}/follow/`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      console.log(response)
      followStateChange()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FollowButtonStyle state={followState} onClick={onFollowButton}>
      {followState === 0
        ? '나'
        : followState === 1
        ? '팔로잉'
        : followState === 2
        ? '팔로우'
        : followState === 3
        ? '맞팔로우'
        : '알 수 없음'}
    </FollowButtonStyle>
  )
}

export default FollowButton

const FollowButtonStyle = styled.button<{ state: number }>`
  width: 80px;
  height: 35px;
  background-color: ${(props) => followStateColor[props.state]};
  border-radius: 25px;
`

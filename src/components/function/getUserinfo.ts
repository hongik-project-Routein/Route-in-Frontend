import { useEffect, useState } from 'react'
import useUser from '../../recoil/hooks/useUser'
import { type UserData } from '../../types/userType'
import { request } from '../../util/axios'

function getUserinfo(username: string): UserData {
  const [userinfo, setUserinfo] = useState<UserData>()
  const { loadUserInfo } = useUser()

  const fetchData = async (): Promise<UserData> => {
    try {
      const response = await request<UserData>(
        'get',
        `/api/user/${username}`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const defaultData: UserData = {
    uname: '',
    id: 0,
    last_login: '1',
    email: '',
    name: '',
    introduction: '',
    age: 0,
    image: '',
    following_set: [],
    follower_set: [],
    post_set: [],
  }

  useEffect(() => {
    const loadUserInfo = async (): Promise<void> => {
      setUserinfo(await fetchData())
    }

    loadUserInfo().catch((error) => {
      console.log(error)
    })
  }, [username])

  return userinfo !== undefined ? userinfo : defaultData
}

export default getUserinfo

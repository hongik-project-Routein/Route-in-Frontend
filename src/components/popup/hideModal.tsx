import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'
import { type UserData } from '../../types/userType'
import useUser from '../../recoil/hooks/useUser'
import BlockButton from '../etc/blockButton'

function HideModal(): JSX.Element {
  const [hideList, setHideList] = useState<UserData[]>([])

  const { loadUserInfo } = useUser()

  const getHideList = async (): Promise<UserData[]> => {
    try {
      const response = await request<UserData[]>(
        'get',
        `/api/user/hide`,
        undefined,
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

  useEffect(() => {
    const loadFollowList = async (): Promise<void> => {
      const result: UserData[] = await getHideList()
      setHideList(result)
    }
    loadFollowList().catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <ModalContainer>
      <ModalTitle>숨긴 유저</ModalTitle>
      <ModalInner>
        {hideList.length > 0 ? (
          hideList?.map((user, idx) => (
            <Row key={idx}>
              <ProfileImage src={user.image} />
              <NicknameAndName>
                <Nickname>{user.uname}</Nickname>
                <Name>{user.name}</Name>
              </NicknameAndName>
              <BlockButton />
            </Row>
          ))
        ) : (
          <div>숨긴 유저가 없습니다.</div>
        )}
      </ModalInner>
    </ModalContainer>
  )
}

export default HideModal

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 50;
  width: 333px;
  height: 360px;
  background-color: ${theme.colors.white};
  border: 1px solid #d9d9d9;
  border-radius: 12px;
`

const ModalTitle = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 15px;
  border-bottom: 1px solid #d9d9d9;
  text-align: center;
  font-size: 16px;
`

const ModalInner = styled.div`
  margin: 30px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const NicknameAndName = styled.div``
const Nickname = styled.div``
const Name = styled.div`
  padding-top: 5px;
  font-size: 13px;
`

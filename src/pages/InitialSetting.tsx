import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import image from '../img/background-image.jpg'
import { useForm } from 'react-hook-form'
import { type FieldValues } from 'react-hook-form/dist/types'
import InputInfo from '../components/input/inputInfo'
import { Regex } from '../constants/Regex'
import theme from '../styles/Theme'
import { request } from '../util/axios'
import useUser from '../recoil/hooks/useUser'
import { useNavigate } from 'react-router-dom'

export default function InitialSetting(): JSX.Element {
  const [isUnameChecked, setIsUnameChecked] = useState<boolean>(false)
  const navigate = useNavigate()

  const { loadUserInfo, logout } = useUser()

  const Message = `시작을 위해 몇 가지 설정이 필요합니다.`

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = async (data: FieldValues): Promise<void> => {
    if (!isUnameChecked) {
      alert('중복체크를 해주세요')
      return
    }

    try {
      const response = await request<string>(
        'post',
        `/api/user/initial_setting/`,
        data,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )

      if (response === '초기 설정 완료.') {
        logout()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const inputUname = watch('uname')

  // 중복 체크 함수
  const checkDuplicate = async (): Promise<void> => {
    try {
      const response = await request<boolean>(
        'post',
        `/api/user/uname_check/${inputUname as string}/`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      if (response) {
        alert('중복 확인 체크완료')
        setIsUnameChecked(true)
      }
    } catch (error) {
      alert('이미 사용 중인 계정이름입니다.')
    }
  }

  useEffect(() => {
    setIsUnameChecked(false)
  }, [inputUname])

  return (
    <InitialSettingContainer>
      <BackgroundImage src={image} />
      <Container>
        <InputContainer>
          <Title>Route in</Title>
          <FollowMessage>{Message}</FollowMessage>
          <InputForm onSubmit={handleSubmit(onSubmit)}>
            <InputInfo
              width={300}
              labelName="계정이름"
              name="uname"
              specificPlaceholder="계정이름을 입력해주세요"
              checkDuplicate={checkDuplicate}
              type="text"
              register={register}
              errors={errors.uname}
              minLength={6}
              maxLength={20}
              pattern={Regex.uname.pattern}
            />
            <InputInfo
              width={300}
              labelName="이름"
              name="name"
              specificPlaceholder="이름을 입력해주세요"
              checkDuplicate={false}
              type="text"
              register={register}
              errors={errors.name}
              minLength={2}
              maxLength={20}
              pattern={Regex.name.pattern}
            />
            <InputInfo
              width={300}
              labelName="나이"
              name="age"
              specificPlaceholder="나이를 입력해주세요"
              checkDuplicate={false}
              type="number"
              register={register}
              errors={errors.age}
              minLength={1}
              maxLength={3}
              pattern={Regex.age.pattern}
            />
            <InputInfo
              width={300}
              labelName="성별"
              name="gender"
              specificPlaceholder="성별을 입력해주세요"
              checkDuplicate={false}
              type="text"
              register={register}
              errors={errors.gender}
              minLength={1}
              maxLength={1}
              pattern={Regex.gender.pattern}
            />
            <SaveButton>저장</SaveButton>
          </InputForm>
        </InputContainer>
      </Container>
    </InitialSettingContainer>
  )
}

const InitialSettingContainer = styled.div`
  display: flex;
  height: 500px;
`

const BackgroundImage = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  margin: 40px 50px 50px auto;
  border-radius: 5px;
`

const Container = styled.article`
  margin: 40px auto 50px 50px;
`

const InputContainer = styled.div`
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`

const Title = styled.h1`
  margin: 80px 0 60px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
`
const FollowMessage = styled.p`
  margin-bottom: 40px;
  color: #475467;
  text-align: center;
  white-space: pre-line;
  line-height: 10px;
`

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 0 30px 0 73px;
`

const SaveButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`

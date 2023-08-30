import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputInfo from '../input/inputInfo'
import { Regex } from '../../constants/Regex'
import { type FieldValues, useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/Theme'

function CommonSignup(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const [isUnameChecked, setIsUnameChecked] = useState<boolean>(false)

  const { logout } = useUser()
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues): Promise<void> => {
    if (!isUnameChecked) {
      alert('중복체크를 해주세요')
      return
    }

    try {
      const response = await request<string>('post', `/api/user/signup/`, data)

      if (response === '회원가입 성공') {
        logout()
        navigate('/commom-signin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const inputUname = watch('uname')

  // 중복 체크 함수 -> 일반 회원가입이라 엑세스 토큰이 없음
  const checkDuplicate = async (): Promise<void> => {
    try {
      const response = await request<boolean>(
        'post',
        `/api/user/uname_check/${inputUname as string}/`,
        null
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
    <Container>
      <InputContainer>
        <Title>Route in</Title>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputInfo
            width={300}
            labelName="이메일"
            name="email"
            specificPlaceholder="이메일을 입력해주세요"
            checkDuplicate={false}
            type="text"
            register={register}
            errors={errors.email}
            minLength={1}
            maxLength={20}
            pattern={Regex.email.pattern}
          />
          <InputInfo
            width={300}
            labelName="비밀번호"
            name="password"
            specificPlaceholder="비밀번호를 입력해주세요"
            checkDuplicate={false}
            type="password"
            register={register}
            errors={errors.password}
            minLength={10}
            maxLength={20}
            pattern={Regex.password.pattern}
          />
          <InputInfo
            width={300}
            labelName="비밀번호 확인"
            name="checkpassword"
            specificPlaceholder="비밀번호 재확인"
            checkDuplicate={false}
            type="password"
            register={register}
            errors={errors.checkpassword}
            minLength={10}
            maxLength={20}
            pattern={Regex.password.pattern}
          />
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
          <SaveButton>회원가입</SaveButton>
        </InputForm>
      </InputContainer>
    </Container>
  )
}

export default CommonSignup

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
  margin: 80px 0 40px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
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

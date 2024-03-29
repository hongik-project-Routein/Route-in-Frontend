import React, { useState } from 'react'
import styled from 'styled-components'
import InputInfo from '../input/inputInfo'
import { Regex } from '../../constants/Regex'
import { type FieldValues, useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { Link, useNavigate } from 'react-router-dom'
import theme from '../../styles/Theme'
import { type Auth } from './kakao'
import { type UserState } from '../../recoil/atom/user'
import { type AxiosError } from 'axios'
import Loading from '../util/loading'

function CommonSignin(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const { login } = useUser()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      setLoading(true)

      const response = await request<Auth>('post', `/api/accounts/login/`, data)

      const userinfo: UserState = {
        name: response.name,
        uname: response.uname,
        email: response.email,
        age: response.age,
        gender: response.gender,
        image: response.image,
        follower_set: response.follower_set,
        following_set: response.following_set,
        accessToken: response.access,
      }

      login(userinfo)

      setLoading(false)

      if (response.uname === null) {
        navigate('/initial-setting')
      } else {
        navigate('/')
      }
    } catch (error) {
      const errorResponse = (error as AxiosError).response
      if (errorResponse !== undefined) {
        if (errorResponse.status === 400) {
          alert('회원정보가 일치하지 않습니다. 다시 확인해주세요')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      {loading && <Loading />}
      <InputContainer>
        <Title>Route in</Title>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputInfo
            width={300}
            labelName="이메일"
            name="email"
            specificPlaceholder="이메일을 입력해주세요"
            defaultValue={undefined}
            checkDuplicate={false}
            checkPassword={null}
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
            defaultValue={undefined}
            checkDuplicate={false}
            checkPassword={null}
            type="password"
            register={register}
            errors={errors.password}
            minLength={8}
            maxLength={20}
            pattern={Regex.password.pattern}
          />

          <LoginButton>로그인</LoginButton>
        </InputForm>
      </InputContainer>
      <GoSignUpContainer>
        <GoSignUpDesc>아직 계정이 없다면</GoSignUpDesc>
        <SignUpButton to="/common-signup">
          <SignUpDesc>Sign Up</SignUpDesc>
        </SignUpButton>
      </GoSignUpContainer>
    </Container>
  )
}

export default CommonSignin

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const InputContainer = styled.div``

const Title = styled.h1`
  margin: 80px 0 60px 0;
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

const LoginButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`

const GoSignUpContainer = styled.div`
  width: 100%;
  height: 130px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`
const GoSignUpDesc = styled.p`
  margin: 20px 0;
  text-align: center;
`
const SignUpButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 40px;
  margin: 10px auto;
  border: 3px solid ${theme.secondaryColors.secondary};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background-color: rgba(242, 203, 191, 0.3);
  }
`
const SignUpDesc = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: auto 5px;
`

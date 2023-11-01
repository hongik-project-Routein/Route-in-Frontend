import React from 'react'
import styled from 'styled-components'
import InputInfo from '../input/inputInfo'
import { Regex } from '../../constants/Regex'
import { type FieldValues, useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/Theme'
import { type AxiosError } from 'axios'

function CommonSignup(): JSX.Element {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const { logout } = useUser()
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const body = {
      email: data.email,
      password1: data.password,
      password2: data.checkpassword,
    }

    try {
      const response = await request<string>(
        'post',
        `/api/accounts/registration/`,
        body
      )

      if (response === '회원가입 성공') {
        logout()
        navigate('/common-login')
      }
    } catch (error) {
      const errorResponse = (error as AxiosError).response
      if (errorResponse !== undefined) {
        console.log(errorResponse)
      }
    }
  }

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
          <InputInfo
            width={300}
            labelName="비밀번호 확인"
            name="checkpassword"
            specificPlaceholder="비밀번호 재확인"
            defaultValue={undefined}
            checkDuplicate={false}
            checkPassword={() => getValues('password')}
            type="password"
            register={register}
            errors={errors.checkpassword}
            minLength={8}
            maxLength={20}
            pattern={Regex.password.pattern}
          />
          <SaveButton>회원가입</SaveButton>
        </InputForm>
      </InputContainer>
    </Container>
  )
}

export default CommonSignup

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

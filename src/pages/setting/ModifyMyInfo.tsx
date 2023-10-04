import React, { useEffect, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import styled from 'styled-components'
import InputInfo from '../../components/input/inputInfo'
import { Regex } from '../../constants/Regex'
import theme from '../../styles/Theme'

function ModifyMyInfo(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const { loadUserInfo } = useUser()
  const [isUnameChecked, setIsUnameChecked] = useState<boolean>(false)
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

  const onSubmit = async (data: FieldValues): Promise<void> => {
    if (!isUnameChecked) {
      alert('중복체크를 해주세요')
      return
    }

    try {
      await request<string>('post', `/api/user/initial_setting/`, data, {
        Authorization: `Bearer ${loadUserInfo().accessToken}`,
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setIsUnameChecked(false)
  }, [inputUname])

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)}>
      <InputInfo
        width={300}
        labelName="계정이름"
        name="uname"
        specificPlaceholder="계정이름을 입력해주세요"
        defaultValue={loadUserInfo().uname}
        checkDuplicate={checkDuplicate}
        checkPassword={null}
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
        defaultValue={loadUserInfo().name}
        checkDuplicate={false}
        checkPassword={null}
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
        defaultValue={loadUserInfo().age}
        checkDuplicate={false}
        checkPassword={null}
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
        defaultValue={loadUserInfo().gender}
        checkDuplicate={false}
        checkPassword={null}
        type="text"
        register={register}
        errors={errors.gender}
        minLength={1}
        maxLength={1}
        pattern={Regex.gender.pattern}
      />
      <SaveButton>저장</SaveButton>
    </InputForm>
  )
}

export default ModifyMyInfo

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;

  margin-bottom: 30px;
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

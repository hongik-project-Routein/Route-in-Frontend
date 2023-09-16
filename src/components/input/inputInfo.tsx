import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import {
  type Merge,
  type FieldError,
  type FieldErrorsImpl,
  type UseFormRegister,
  type FieldValues,
} from 'react-hook-form/dist/types'

interface InputInfoProps {
  width: number
  labelName: string
  name: string
  specificPlaceholder: string
  checkDuplicate: boolean | (() => Promise<void>)
  checkPassword: null | (() => any)
  type: string
  register: UseFormRegister<FieldValues>
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  minLength: number
  maxLength: number
  pattern: RegExp
}

function InputInfo(props: InputInfoProps): JSX.Element {
  return (
    <InputRow width={props.width}>
      <Label>{props.labelName}</Label>
      <InputRowContent>
        <Input
          type={props.type}
          placeholder={`${props.specificPlaceholder ?? ''}`}
          maxLength={props.maxLength}
          {...props.register(props.name, {
            required: {
              value: true,
              message: '필수 입력입니다.',
            },
            minLength: {
              value: props.minLength,
              message: '글자수가 너무 적어요',
            },
            pattern: {
              value: props.pattern,
              message: '조건에 맞게 입력해주세요',
            },
            validate: {
              check: (val) => {
                if (props.checkPassword == null) return
                if (props.checkPassword() !== val) {
                  return '비밀번호가 일치하지 않습니다'
                }
              },
            },
          })}
        />
        {typeof props.checkDuplicate === 'function' ? (
          <CheckDuplicate type="button" onClick={props.checkDuplicate}>
            중복확인
          </CheckDuplicate>
        ) : null}
      </InputRowContent>
      <ErrorMessage>
        {props.errors != null && (props.errors.message as string)}
      </ErrorMessage>
    </InputRow>
  )
}

export default InputInfo

const InputRow = styled.div<{ width: number }>`
  display: grid;
  grid-template-areas:
    'Label Input'
    'Error .';
  grid-row-gap: 5px;
  justify-content: flex-start;
  width: ${(props) => `${props.width}px`};
  margin-bottom: 10px;
`

const Label = styled.label`
  grid-area: Label;
  width: 120px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`

const InputRowContent = styled.div`
  grid-area: Input;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 20px;
`

const Input = styled.input`
  width: 100%;
  height: 24px;
  background-color: ${theme.colors.white};
  border: none;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`

const CheckDuplicate = styled.button`
  width: 60px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 10px;
`

const ErrorMessage = styled.span`
  grid-area: Error;
  color: #ff9494;
  font-family: 'Pretendard', sans-serif;
  font-size: 9px;
  font-weight: 300;
  line-height: 150%;
  white-space: nowrap;
`

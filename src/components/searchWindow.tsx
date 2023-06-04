import React, { type FormEvent, useState } from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchWindowProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchWindow(props: SearchWindowProps): JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (keyword === '') return
    props.setKeyword(keyword)
  }
  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event
    setKeyword(value)
  }
  return (
    <SearchWindowContainer onSubmit={onSubmit}>
      <InputKeyword
        value={keyword}
        onChange={onChange}
        placeholder="해시태그로 검색"
      />
      <SearchButton type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchWindowContainer>
  )
}

const SearchWindowContainer = styled.form`
  display: flex;
  width: 520px;
  height: 60px;
  margin-top: 77px;
  margin-bottom: 30px;
`

const InputKeyword = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.primaryColor};
  font-size: 16px;
`
const SearchButton = styled.button`
  width: 40px;
  height: 60px;
  border: 1px solid ${theme.colors.primaryColor};
  border-left: none;
`

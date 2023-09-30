import React, { type FormEvent, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import useSearch from '../../recoil/hooks/useSearch'
import useInput from '../../hooks/useInput'

export default function SearchWindow(): JSX.Element {
  const { keyword, changeKeyword } = useSearch()
  const [inputKeyword, setInputKeyword] = useInput<string, HTMLInputElement>(
    keyword
  )

  const navigate = useNavigate()

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (inputKeyword.trim() === '') return

    const params = new URLSearchParams()
    params.append('q', inputKeyword)

    changeKeyword(inputKeyword)
    navigate(`/search?${params.toString()}`)
  }

  useEffect(() => {
    changeKeyword('')
  }, [window.location.href])

  return (
    <SearchWindowContainer onSubmit={onSubmit}>
      <InputKeyword
        value={inputKeyword}
        onChange={setInputKeyword}
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

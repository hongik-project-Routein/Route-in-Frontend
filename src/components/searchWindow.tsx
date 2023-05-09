import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchWindow(): JSX.Element {
  return (
    <SearchWindowContainer>
      <InputKeyword placeholder="해시태그로 검색" />
      <SearchButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchWindowContainer>
  )
}

const SearchWindowContainer = styled.div`
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

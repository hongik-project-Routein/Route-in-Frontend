import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchPinType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchPin from '../../components/eachItem/EachSearchPin'
import { useNavigate } from 'react-router-dom'

interface SearchPinArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPinArticle(
  props: SearchPinArticleProps
): JSX.Element {
  const { keyword, changeKeyword } = useSearch()
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState<SearchPinType[] | undefined>(
    []
  )

  const { curPageItem, renderSSPagination } = useSSPagination<SearchPinType>(
    `/api/pin/?search=${keyword.toLocaleLowerCase()}&`,
    6
  )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem])

  useEffect(() => {
    changeKeyword('')
    navigate('/search')
  }, [])

  return (
    <>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      <SearchResultGrid>
        {searchResult !== undefined
          ? searchResult.map((pin, idx) => (
              <EachSearchPin key={idx} loadPin={pin} />
            ))
          : null}
      </SearchResultGrid>
      {renderSSPagination()}
    </>
  )
}

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 9fr;
  margin-right: 20px;
`

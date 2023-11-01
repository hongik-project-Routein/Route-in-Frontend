import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchPinType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchPin from '../../components/eachItem/EachSearchPin'

interface SearchPinArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPinArticle(
  props: SearchPinArticleProps
): JSX.Element {
  const { keyword } = useSearch()

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

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

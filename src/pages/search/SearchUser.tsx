import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import { type SearchUserType } from '../../types/postTypes'
import useSSPagination from '../../hooks/useSSPagination'
import EachSearchUser from '../../components/eachItem/EachSearchUser'
import Loading from '../../components/util/loading'

interface SearchUserArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchUserArticle(
  props: SearchUserArticleProps
): JSX.Element {
  const { keyword } = useSearch()

  const [searchResult, setSearchResult] = useState<
    SearchUserType[] | undefined
  >([])

  const { loading, curPageItem, renderSSPagination } =
    useSSPagination<SearchUserType>(
      `/api/user/?search=${keyword.toLocaleLowerCase()}&`,
      6
    )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem, keyword])

  return (
    <>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />

      {loading ? (
        <Loading />
      ) : (
        keyword !== '' && (
          <>
            <SearchResultGrid>
              {searchResult !== undefined
                ? searchResult.map((user, idx) => (
                    <EachSearchUser key={idx} loadUser={user} />
                  ))
                : null}
            </SearchResultGrid>
            {renderSSPagination()}
          </>
        )
      )}
    </>
  )
}

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 46px;
  width: 900px;

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

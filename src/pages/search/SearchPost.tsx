import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PostSmall from '../../components/post/postSmall'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import { type LoadPost } from '../../types/postTypes'
import useSearch from './../../recoil/hooks/useSearch'
import useSSPagination from '../../hooks/useSSPagination'
import Loading from '../../components/util/loading'

interface SearchPostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPostArticle(
  props: SearchPostArticleProps
): JSX.Element {
  const { keyword } = useSearch()
  const [searchResult, setSearchResult] = useState<LoadPost[] | undefined>([])

  const { loading, curPageItem, renderSSPagination } =
    useSSPagination<LoadPost>(
      `/api/post/?search=${keyword.toLocaleLowerCase()}&`,
      6
    )

  useEffect(() => {
    setSearchResult(curPageItem)
  }, [curPageItem])

  return (
    <Container>
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
                ? searchResult.map((post, idx) => (
                    <PostSmall key={idx} loadPost={post} />
                  ))
                : null}
            </SearchResultGrid>
            {renderSSPagination()}
          </>
        )
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

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

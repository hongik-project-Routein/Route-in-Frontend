import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PostSmall from '../../components/post/postSmall'
import SearchWindow from '../../components/util/searchWindow'
import SearchTab from '../../components/util/searchTab'
import { type LoadPost } from '../../types/postTypes'
import useSearch from './../../recoil/hooks/useSearch'
import useSSPagination from '../../hooks/useSSPagination'
import { useNavigate } from 'react-router-dom'

interface SearchPostArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function SearchPostArticle(
  props: SearchPostArticleProps
): JSX.Element {
  const { keyword, changeKeyword } = useSearch()
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState<LoadPost[] | undefined>([])

  const searchParams = new URLSearchParams(window.location.search)
  const urlkeyword = searchParams.get('q')

  const searchKeyword = keyword === '' ? urlkeyword : keyword

  const { curPageItem, renderSSPagination } = useSSPagination<LoadPost>(
    `/api/post/?search=${
      searchKeyword !== null ? searchKeyword.toLocaleLowerCase() : ' '
    }&`,
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
    <Container>
      <SearchWindow />
      <SearchTab
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />

      <SearchResultGrid>
        {searchResult !== undefined
          ? searchResult.map((post, idx) => (
              <PostSmall key={idx} loadPost={post} />
            ))
          : null}
      </SearchResultGrid>
      {renderSSPagination()}
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
`

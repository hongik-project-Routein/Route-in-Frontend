import React, { useState, useEffect } from 'react'
import SearchPostArticle from './SearchPost'
import SearchPinArticle from './SearchPin'
import SearchUserArticle from './SearchUser'
import { searchTabContents } from '../../components/util/searchTab'
import useSearch from './../../recoil/hooks/useSearch'
import useTab from '../../recoil/hooks/useTab'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function Search(): JSX.Element {
  const { search, changeSearchTabIndex } = useTab()
  const navigate = useNavigate()

  const { changeKeyword, changeCategory } = useSearch()
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(search)

  const handleTabClick = async (index: number): Promise<void> => {
    setSelectedTabIndex(index)
    changeSearchTabIndex(index)
    const newCategory = searchTabContents[index].category
    changeCategory(newCategory)

    changeKeyword('')
    navigate('/search')
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const keyword = searchParams.get('q')

    changeKeyword(keyword ?? '')
  }, [window.location.search])

  useEffect(() => {
    setSelectedTabIndex(search)
  }, [selectedTabIndex])

  return (
    <Container>
      {selectedTabIndex === 0 ? (
        <SearchPostArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 1 ? (
        <SearchPinArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : selectedTabIndex === 2 ? (
        <SearchUserArticle
          handleTabfunc={handleTabClick}
          tabIndex={selectedTabIndex}
        />
      ) : (
        <div>잘못된 접근</div>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

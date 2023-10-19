import React, { type KeyboardEvent, type ChangeEvent, useState } from 'react'

import { type UseFormSetValue } from 'react-hook-form'
import { type IDataForm } from './dummyData'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface ISearchPlace {
  order: number
  setValue: UseFormSetValue<IDataForm>
  closeModal: () => void
}

function SearchPlace({
  setValue,
  order,
  closeModal,
}: ISearchPlace): JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const [searchResult, setSearchResult] = useState<any>(undefined)

  const [resultIndex, setResultIndex] = useState<number>(0)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value)
  }

  const searchPlace = (): void => {
    const places = new kakao.maps.services.Places()

    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(result)
      }
    })
  }

  const clickPlace = (index: number): void => {
    setResultIndex(index)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') event.preventDefault()
  }

  const setPlace = (): void => {
    if (keyword.trim() === '') return

    setValue(`pins.${order}.latitude`, searchResult[resultIndex].y)
    setValue(`pins.${order}.longitude`, searchResult[resultIndex].x)
    setValue(`pins.${order}.mapID`, searchResult[resultIndex].id)
    closeModal()
  }

  return (
    <SearchPlaceModalContainer>
      <ModalHeader>
        <CloseButton onClick={closeModal}>X</CloseButton>
      </ModalHeader>
      <SearchBarContainer>
        <SearchBar
          type="text"
          value={keyword}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={searchPlace} disabled={keyword === ''}>
          검색
        </SearchButton>
      </SearchBarContainer>
      <SearchResultContainer>
        <PlaceList>
          {searchResult?.map((result: any, idx: number) => (
            <SearchResultRow
              key={idx}
              onClick={() => {
                clickPlace(idx)
              }}
              current={resultIndex === idx}
            >
              <PlaceName>{result.place_name}</PlaceName>
              <Address>{result.road_address_name}</Address>
            </SearchResultRow>
          ))}
        </PlaceList>
        <MapContainer>
          {searchResult !== undefined ? (
            <Map
              center={{
                lat: Number(searchResult[resultIndex].y),
                lng: Number(searchResult[resultIndex].x),
              }}
              style={{ width: '100%', height: '100%' }}
              draggable={false}
              zoomable={false}
            >
              <MapMarker
                position={{
                  lat: Number(searchResult[resultIndex].y),
                  lng: Number(searchResult[resultIndex].x),
                }}
              ></MapMarker>
            </Map>
          ) : null}
        </MapContainer>
      </SearchResultContainer>
      <SelectPlaceButton
        onClick={setPlace}
        disabled={searchResult === undefined}
      >
        선택
      </SelectPlaceButton>
    </SearchPlaceModalContainer>
  )
}

export default SearchPlace

const SearchPlaceModalContainer = styled.div`
  position: fixed;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);

  height: 430px;
  z-index: 999;

  background-color: ${theme.colors.primary100};
  border: 1px solid black;
  border-radius: 8px;
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
  padding-top: 5px;
`

const SearchBarContainer = styled.div`
  display: flex;
  width: 600px;
  height: 50px;
  margin-left: 12px;
`

const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  margin-right: 30px;
  padding: 0 5px;
  background-color: white;
`

const SearchButton = styled.button<{ disabled: boolean }>`
  width: 50px;
  height: 30px;
  background-color: ${(props) =>
    props.disabled ? '#d9d9d9' : theme.colors.primaryColor};
  color: white;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`

const SearchResultContainer = styled.div`
  display: flex;
  width: 600px;
  height: 300px;
  padding: 8px 12px;
`

const PlaceList = styled.div`
  width: 200px;
  height: 100%;
  margin-right: 30px;
  padding: 8px 12px;
  background-color: white;
  overflow-y: scroll;
`

const SearchResultRow = styled.div<{ current: boolean }>`
  margin-bottom: 10px;
  padding: 3px;
  background-color: ${(props) => (props.current ? '#d9d9d9' : 'white')};
  border-bottom: 1px solid black;
  &:hover {
    cursor: pointer;
    background-color: #d9d9d9;
  }
`

const PlaceName = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`

const Address = styled.p`
  font-size: 10px;
`

const MapContainer = styled.div`
  width: 350px;
  height: 100%;
  background-color: white;
`

const CloseButton = styled.button`
  margin-right: 20px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`

const SelectPlaceButton = styled.button<{ disabled: boolean }>`
  width: 50px;
  height: 30px;
  margin-left: 12px;
  background-color: ${(props) =>
    props.disabled ? '#d9d9d9' : theme.colors.primaryColor};
  color: white;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`

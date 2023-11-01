import React, { useState, type ChangeEvent } from 'react'
import {
  type GPSInfo,
  type PlaceInfo,
} from '../../pages/createPost/SelectPicture'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import theme from '../../styles/Theme'

interface SearchPlaceModalProps {
  modalRef: any
  onClose: () => void
  index: number
  addresses: [] | PlaceInfo[]
  setAddresses: React.Dispatch<React.SetStateAction<[] | PlaceInfo[]>>
  imgGPSInfoList: GPSInfo[]
  setImgGPSInfoList: React.Dispatch<React.SetStateAction<[] | GPSInfo[]>>
}

function SearchPlaceModal(props: SearchPlaceModalProps): JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const [searchResults, setSearchResults] = useState<undefined | any[]>(
    undefined
  )
  const [resultIndex, setResultIndex] = useState<number>(0)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value)
  }

  const closeModal = (): void => {
    props.onClose()
  }

  const searchPlace = (): void => {
    const places = new kakao.maps.services.Places()

    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(result)
      }
    })
  }

  const clickPlace = (index: number): void => {
    setResultIndex(index)
  }

  const setPlaceInfo = (): void => {
    if (searchResults !== undefined) {
      const updatedAddresses = props.addresses

      const updatedImgGpsInfos = [...props.imgGPSInfoList]

      updatedAddresses[props.index].address =
        searchResults[resultIndex].road_address_name

      updatedAddresses[props.index].placeName = searchResults[
        resultIndex
      ].place_name.replace(/\s+/g, '_')

      const updatedGPSInfo = {
        latitude: Number(searchResults[resultIndex].y),
        longitude: Number(searchResults[resultIndex].x),
        placeId: Number(searchResults[resultIndex].id),
      }

      updatedAddresses[props.index].gpsInfo = updatedGPSInfo
      updatedImgGpsInfos[props.index] = updatedGPSInfo

      props.setAddresses(updatedAddresses)
      props.setImgGPSInfoList(updatedImgGpsInfos)
      props.onClose()
    }
  }

  return (
    <SearchPlaceModalContainer ref={props.modalRef}>
      <ModalHeader>
        <CloseButton onClick={closeModal}>X</CloseButton>
      </ModalHeader>
      <SearchBarContainer>
        <SearchBar type="text" value={keyword} onChange={onChange}></SearchBar>
        <SearchButton onClick={searchPlace} disabled={keyword === ''}>
          검색
        </SearchButton>
      </SearchBarContainer>
      <SearchResultContainer>
        <PlaceList>
          {searchResults?.map((result, idx) => (
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
          {searchResults !== undefined ? (
            <Map
              center={{
                lat: Number(searchResults[resultIndex].y),
                lng: Number(searchResults[resultIndex].x),
              }}
              style={{ width: '100%', height: '100%' }}
              draggable={false}
              zoomable={false}
            >
              <MapMarker
                position={{
                  lat: Number(searchResults[resultIndex].y),
                  lng: Number(searchResults[resultIndex].x),
                }}
              ></MapMarker>
            </Map>
          ) : null}
        </MapContainer>
      </SearchResultContainer>
      <SelectPlaceButton
        onClick={setPlaceInfo}
        disabled={searchResults === undefined}
      >
        선택
      </SelectPlaceButton>
    </SearchPlaceModalContainer>
  )
}

export default SearchPlaceModal

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

  @media screen and (max-width: 480px) {
    top: 50%;
    left: 50%;
  }
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
  width: 100%;
  height: 50px;
  margin-left: 12px;

  @media screen and (max-width: 480px) {
  }
`

const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  margin-right: 30px;
  padding: 0 5px;
  background-color: white;

  border-radius: 5px;
  border: none;

  @media screen and (max-width: 480px) {
    width: 250px;
    margin-right: 10px;
  }
`

const SearchButton = styled.button<{ disabled: boolean }>`
  width: 50px;
  height: 30px;
  background-color: ${(props) =>
    props.disabled ? '#d9d9d9' : theme.colors.primaryColor};
  color: white;

  border-radius: 5px;
  border: none;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }

  @media screen and (max-width: 480px) {
    margin-right: 20px;
  }
`

const SearchResultContainer = styled.div`
  display: flex;
  width: 600px;
  height: 300px;
  padding: 8px 12px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`

const PlaceList = styled.div`
  width: 200px;
  height: 100%;
  margin-right: 30px;
  padding: 8px 12px;
  background-color: white;
  overflow-y: scroll;

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: 20px;
  }
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

  @media screen and (max-width: 480px) {
    width: 100%;
  }
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

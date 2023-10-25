import React, { useState, useEffect, useRef, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { useNavigate } from 'react-router-dom'
import CarouselSelectPicture from '../../components/util/carouselSelectPicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { gps } from 'exifr'
import { type Pin } from '../../types/postTypes'
import ImageEditor from '../../components/util/imageEditor'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import usePost from '../../recoil/hooks/usePost'

export interface GPSInfo {
  latitude: number
  longitude: number
  placeId: number
}

export interface PlaceInfo {
  placeName: string
  address: string
  gpsInfo: GPSInfo
}

export default function SelectPicture(): JSX.Element {
  const { kakao } = window
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(
    undefined
  )
  // 최적화 필요
  const [pinList, setPinList] = useState<Pin[]>([])
  const [imageUrls, setImageUrls] = useState<string[] | undefined>(undefined)
  const [imgGPSInfoList, setImgGPSInfoList] = useState<GPSInfo[] | []>([])
  const [addresses, setAddresses] = useState<PlaceInfo[] | []>([])
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)
  const mapRef = useRef(null)

  const { enrollImages, changePlace } = usePost()

  const fileSelectedHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files
    if (files != null) {
      const newUrls: string[] = []
      const newFiles: File[] = []
      const newGPSInfo: GPSInfo[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newUrl = await readUrl(file)
        const exifTags = await readExifTags(file)
        newFiles.push(file)
        newUrls.push(newUrl)

        // 위치정보가 없으면 아무 위치나 보여준다. 그 위치는 내가 좋아하는 카페ㅋㅋ
        exifTags !== undefined
          ? newGPSInfo.push(exifTags)
          : newGPSInfo.push({
              latitude: 37.5484216771677,
              longitude: 126.921772870235,
              placeId: NaN,
            })
      }
      setSelectedFiles(newFiles)
      setImageUrls(newUrls)
      setImgGPSInfoList(newGPSInfo)
    }
  }
  const readUrl = async (file: File): Promise<string> => {
    return await new Promise<string>((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const url = fileReader.result?.toString() ?? ''
        resolve(url)
      }
      fileReader.readAsDataURL(file)
    })
  }

  const readExifTags = async (file: File): Promise<GPSInfo | undefined> => {
    try {
      const exifData = await gps(file)
      if (exifData.latitude !== null && exifData.longitude !== null) {
        return {
          latitude: exifData.latitude,
          longitude: exifData.longitude,
          placeId: NaN,
        }
      }
    } catch (error) {
      console.error('no gps info', error)
    }
    return undefined
  }

  const runImageEditor = (): void => {
    setModalOpen(true)
  }

  const runSearchPlace = (): void => {
    setSearchModalOpen(true)
  }

  // url이 변경됐을 때만 실행 => 사진을 넣을 때만 실행되길 원함
  useEffect(() => {
    const newPins: Pin[] = []
    const newAddressList: PlaceInfo[] = []
    const fileLength = selectedFiles?.length

    const processImages = async (): Promise<void> => {
      if (
        selectedFiles !== undefined &&
        fileLength !== undefined &&
        imageUrls !== undefined
      ) {
        for (let i = 0; i < fileLength; i++) {
          const placeInfo = await getPlacesName(imgGPSInfoList[i])

          newPins.push({
            picture: selectedFiles[i],
            hashtagAuto: { hashtagAuto: `#${placeInfo.placeName}`, text: '' },
            LatLng: {
              lat: imgGPSInfoList[i].latitude,
              lng: imgGPSInfoList[i].longitude,
            },
            placeId: placeInfo.gpsInfo.placeId,
          })
          newAddressList.push(placeInfo)
        }
        setPinList(newPins)
        setAddresses(newAddressList)
        // dispatch(EnrollImages(newPins, imageUrls))
        enrollImages(newPins, imageUrls)
      }
    }

    processImages().catch((error) => {
      console.log(error)
    })
  }, [imageUrls])

  const getPlacesName = async (place: GPSInfo): Promise<PlaceInfo> => {
    try {
      const geocoder = new kakao.maps.services.Geocoder()

      const getAddress = async (): Promise<PlaceInfo> => {
        return await new Promise<PlaceInfo>((resolve) => {
          const callback = (result: any, status: any): void => {
            if (status === kakao.maps.services.Status.OK) {
              // 결과에서 첫 번째의 주소와 장소 이름을 얻는다. placeId는 Geocoder서비스로 얻을 수 없어서 NaN
              const getBuildingName = (result: any): string => {
                if (result.road_address !== null) {
                  return result.road_address.building_name.replace(/\s+/g, '_')
                } else {
                  return ''
                }
              }

              const addressResult = result[0].address.address_name
              const buildingName = getBuildingName(result[0])
              let getPlaceId = NaN

              if (buildingName !== '') {
                const places = new kakao.maps.services.Places()

                const getPlaceIdUsingAPI = new Promise<number>(
                  (resolve, reject) => {
                    console.log(result[0].road_address.building_name)

                    places.keywordSearch(
                      result[0].road_address.building_name,
                      (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                          resolve(Number(result[0].id))
                        } else {
                          reject(new Error('검색 결과가 없습니다.'))
                        }
                      }
                    )
                  }
                )

                Promise.all([getPlaceIdUsingAPI])
                  .then(([placeId]) => {
                    getPlaceId = placeId

                    resolve({
                      placeName: buildingName,
                      address: addressResult,
                      gpsInfo: {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        placeId: getPlaceId,
                      },
                    })
                  })
                  .catch((err) => {
                    console.log(err)
                    resolve({
                      placeName: '',
                      address: addressResult,
                      gpsInfo: {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        placeId: getPlaceId,
                      },
                    })
                  })
              } else {
                resolve({
                  placeName: buildingName,
                  address: addressResult,
                  gpsInfo: {
                    latitude: place.latitude,
                    longitude: place.longitude,
                    placeId: getPlaceId,
                  },
                })
              }
            }
          }
          geocoder.coord2Address(place.longitude, place.latitude, callback)
        })
      }

      const placeInfo: PlaceInfo = await getAddress()
      return placeInfo
    } catch (error) {
      console.log(error)
      return {
        placeName: '',
        address: '',
        gpsInfo: { latitude: -1, longitude: -1, placeId: -1 },
      }
    }
  }

  const navigate = useNavigate()

  const goWritePost = (): void => {
    navigate('/post/create/text')
  }

  const enrollHashtagAuto = (): void => {
    if (imageUrls === undefined) return
    const newPost = pinList.map((post, idx) => {
      return {
        ...post,
        hashtagAuto: { hashtagAuto: `#${addresses[idx].placeName}`, text: '' },
        LatLng: {
          lat: addresses[idx].gpsInfo.latitude,
          lng: addresses[idx].gpsInfo.longitude,
        },
        placeId: addresses[idx].gpsInfo.placeId,
      }
    })

    changePlace(newPost, imageUrls)
    goWritePost()
  }

  const [isAllPlaceIdFill, setIsAllPlaceIdFill] = useState<boolean>(false)

  // placeId가 전부 채워져있지 않으면 다음으로 버튼 비활성화
  useEffect(() => {
    if (addresses.length <= 0) {
      setIsAllPlaceIdFill(false)
    } else {
      setIsAllPlaceIdFill(
        addresses.find((address) => isNaN(address.gpsInfo.placeId)) ===
          undefined
      )
    }
  }, [addresses, imgGPSInfoList])

  return (
    <>
      <Title>사진 선택</Title>
      <Paragraph>
        {`업로드하고 싶은 사진을 아래 공간에 드래그 앤 드랍하세요
        사진 메타정보를 통해 자동으로 장소를 인식합니다.`}
      </Paragraph>
      <GroupContainer>
        <PictureGroup>
          <InputImageContainer>
            {imageUrls != null ? (
              <CarouselSelectPicture
                items={imageUrls}
                setCarouselIndex={setCarouselIndex}
              />
            ) : (
              <>
                <InputLabel htmlFor="file">
                  <ImageIcon>
                    <FontAwesomeIcon icon={faImage} />
                  </ImageIcon>
                  <ImageIconDesc>이미지 추가</ImageIconDesc>
                </InputLabel>
                <InputPicture
                  id="file"
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(event) => {
                    fileSelectedHandler(event).catch((error) => {
                      console.log(error)
                    })
                  }}
                  multiple
                />
              </>
            )}
          </InputImageContainer>
          <EditPictureButton
            active={imageUrls !== undefined}
            onClick={runImageEditor}
          >
            사진편집
          </EditPictureButton>
          {modalOpen && <ImageEditor setModalOpen={setModalOpen} />}
        </PictureGroup>
        <LocationGroup>
          <CarouselContainer>
            {imgGPSInfoList.length > 0 ? (
              <Map
                center={{
                  lat: imgGPSInfoList[carouselIndex].latitude,
                  lng: imgGPSInfoList[carouselIndex].longitude,
                }}
                style={{ width: '100%', height: '100%' }}
                ref={mapRef}
              >
                <MapMarker
                  position={{
                    lat: imgGPSInfoList[carouselIndex].latitude,
                    lng: imgGPSInfoList[carouselIndex].longitude,
                  }}
                ></MapMarker>
              </Map>
            ) : null}
          </CarouselContainer>
          <LocationName>
            {addresses.length > 0
              ? addresses[carouselIndex].placeName !== ''
                ? `#${addresses[carouselIndex].placeName}`
                : ''
              : null}
            {searchModalOpen && (
              <SearchPlaceModal
                setModalOpen={setSearchModalOpen}
                index={carouselIndex}
                addresses={addresses}
                setAddresses={setAddresses}
                imgGPSInfoList={imgGPSInfoList}
                setImgGPSInfoList={setImgGPSInfoList}
              />
            )}
          </LocationName>
          <LocationAddress>
            {addresses.length > 0
              ? addresses[carouselIndex].address
              : '사진을 입력하세요'}
          </LocationAddress>
          {imgGPSInfoList.length > 0 && (
            <SearchPlaceButton
              onClick={() => {
                runSearchPlace()
              }}
            >
              장소 찾기
            </SearchPlaceButton>
          )}
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButton
          onClick={enrollHashtagAuto}
          active={isAllPlaceIdFill}
        >{`다음으로`}</NextButton>
        <Blank />
      </ButtonContainer>
    </>
  )
}

interface SearchPlaceModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    props.setModalOpen(false)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        props.setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

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
      props.setModalOpen(false)
    }
  }

  return (
    <SearchPlaceModalContainer ref={modalRef}>
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

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
`
const Paragraph = styled.p`
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
  text-align: center;
`
const CarouselContainer = styled.div`
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
`

const InputImageContainer = styled.div``

const InputPicture = styled.input`
  display: none;
  width: 350px;
  height: 350px;
`

const InputLabel = styled.label`
  display: inline-block;
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const ImageIcon = styled.div`
  margin-top: 120px;
  font-size: 60px;
  text-align: center;
`

const ImageIconDesc = styled.div`
  margin-top: 20px;
  font-size: 25px;
  text-align: center;
`

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

const PictureGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const EditPictureButton = styled.button<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  width: 100px;
  height: 35px;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LocationName = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 800;
`
const LocationAddress = styled.p`
  color: #475467;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const Blank = styled.div``

const NextButton = styled.button<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};

  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const SearchPlaceButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  background-color: ${theme.colors.primaryColor};
  color: white;
  border-radius: 5px;
`

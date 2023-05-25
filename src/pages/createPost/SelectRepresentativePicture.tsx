import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
import CarouselSetRepresentative from '../../components/carouselSetRepresentative'
import html2canvas from 'html2canvas'
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  Polyline,
} from '@react-google-maps/api'
import mapMarker from '../../img/mapMarker.svg'
import { SavePost } from '../../modules/post'

export default function SelectRepresentativePicture(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })
  console.log(isLoaded)

  const [text, setText] = useState<string>('')
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })
  const [representativeImageIdx, setRepresentativeImageIdx] =
    useState<number>(0)
  const [mapImageLink, setMapImageLink] = useState<string | undefined>(
    undefined
  )
  const [hideIndexChangeButton, setHideIndexChangeButton] =
    useState<boolean>(false)
  const dispatch = useDispatch()

  const posts = useSelector((state: RootState) => state.changePostReducer.post)
  const rest = useSelector(
    (state: RootState) => state.changePostReducer.hashtagAndText
  )
  const loadText = (): void => {
    const hashtagAutoText: string[] = posts.map((hashtag) => {
      return `${hashtag.hashtagAuto.hashtagAuto}\n${hashtag.hashtagAuto.text}\n\n`
    })

    const returnText = hashtagAutoText.join(' ') + rest.text
    setText(returnText)
  }

  // 본문 읽어오기
  useEffect(() => {
    loadText()
  }, [])

  const savePost = (): void => {
    dispatch(SavePost({ posts, text }))
  }

  const calculateCenter = (map: google.maps.Map): void => {
    if (posts.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()

      posts.forEach((GPSInfo) => {
        const { lat, lng } = GPSInfo.LatLng
        bounds.extend(new window.google.maps.LatLng(lat, lng))
      })

      const center = bounds.getCenter()
      map.fitBounds(bounds)

      setCenter({ lat: center.lat(), lng: center.lng() })
    }
  }

  const MarkerLine = (): JSX.Element => {
    const route: Array<{ lat: number; lng: number }> = posts.map((GPSInfo) => ({
      lat: GPSInfo.LatLng.lat,
      lng: GPSInfo.LatLng.lng,
    }))
    return (
      <Polyline
        path={route}
        options={{
          strokeColor: theme.colors.primaryColor,
          strokeWeight: 3,
          strokeOpacity: 0.8,
        }}
      />
    )
  }
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const googleMapMarkerToImage = async (): Promise<string | undefined> => {
    if (mapContainerRef.current == null) return

    const mapContainer = mapContainerRef.current
    const canvas = await html2canvas(mapContainer)
    const context = canvas.getContext('2d')

    if (context != null) {
      const targetColor = [229, 227, 223]

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]

        if (
          red === targetColor[0] &&
          green === targetColor[1] &&
          blue === targetColor[2]
        ) {
          data[i + 3] = 0
        }
      }

      context.putImageData(imageData, 0, 0)

      const newImageData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = newImageData
      link.download = 'map.png'
      link.click()
      return newImageData
    }
  }

  // 사진 캡쳐하는 이미지 => loading 화면이 필요할 것 같음
  const CaptureImage = async (): Promise<string> => {
    try {
      const link = await new Promise<string>((resolve) => {
        setTimeout(() => {
          googleMapMarkerToImage()
            .then((res) => {
              resolve(res ?? '')
            })
            .catch((error) => {
              console.log(error)
            })
        }, 3000)
      })

      return link ?? ''
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  useEffect(() => {
    const setMapLink = async (): Promise<void> => {
      const image = await CaptureImage()
      setMapImageLink(image)
    }
    setMapLink().catch((error) => {
      console.log(error)
    })
  }, [])

  const imageLoad = (): JSX.Element => {
    return <MapMarkerImage src={mapImageLink} alt="map" />
  }

  const hideIndexButton = (): void => {
    setHideIndexChangeButton((prev) => !prev)
  }

  useEffect(() => {
    console.log(representativeImageIdx)
  }, [representativeImageIdx])

  return (
    <>
      <Title>대표 이미지 설정</Title>
      <Paragraph>
        {`설정한 이미지 위로 핀이 표시됩니다.
        기본 이미지 버튼을 누르면 지도 이미지로 전환됩니다.`}
      </Paragraph>
      <GroupContainer>
        <LayerGroup>
          {mapImageLink !== undefined ? (
            <GoogleMapMarkerLayer>{imageLoad()}</GoogleMapMarkerLayer>
          ) : (
            <LoadingMessage>Loading...</LoadingMessage>
          )}
          <PictureGroup>
            <CarouselSetRepresentative
              items={posts.map((item) => item.tag)}
              setRepresentativeImageIdx={setRepresentativeImageIdx}
              hideIndexChangeButton={hideIndexChangeButton}
            ></CarouselSetRepresentative>
          </PictureGroup>
          <GoogleMapContainer ref={mapContainerRef}>
            {posts.length > 0 && (
              <GoogleMap
                options={{
                  streetViewControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  disableDefaultUI: true,
                  styles: [
                    {
                      featureType: 'all',
                      elementType: 'geometry',
                      stylers: [{ visibility: 'off' }],
                    },
                    {
                      featureType: 'all',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }],
                    },
                  ],
                }}
                center={center}
                mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                onLoad={(map) => {
                  calculateCenter(map)
                }}
              >
                {posts.length > 0 &&
                  posts.map((GPSInfo, idx) => (
                    <MarkerF
                      key={idx}
                      position={{
                        lat: GPSInfo.LatLng.lat,
                        lng: GPSInfo.LatLng.lng,
                      }}
                      icon={{
                        url: `${mapMarker}`,
                        scale: 5,
                        scaledSize: new window.google.maps.Size(20, 20),
                      }}
                    />
                  ))}
                {posts.length > 0 && MarkerLine()}
              </GoogleMap>
            )}
          </GoogleMapContainer>
        </LayerGroup>
        <LocationGroup>
          <WriteSpace>{text}</WriteSpace>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <SetRepresentativeImageBtn onClick={hideIndexButton}>
          {hideIndexChangeButton ? `취소` : `대표 이미지로 설정`}
        </SetRepresentativeImageBtn>
        <NextButton onClick={savePost}>추가하기</NextButton>
      </ButtonContainer>
    </>
  )
}

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

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

const LayerGroup = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 350px;
`

const LoadingMessage = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding-top: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${theme.colors.primaryColor};
  text-align: center;
  font-weight: 700;
  font-size: 30px;
`

const GoogleMapMarkerLayer = styled.div`
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
`

const MapMarkerImage = styled.img`
  clip-path: inset(0 0 20px 0);
  object-fit: cover;
`

const PictureGroup = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const GoogleMapContainer = styled.div`
  position: absolute;
  z-index: 0;
  top: 2%;
  left: 2%;
  width: 96%;
  height: 96%;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WriteSpace = styled.div`
  width: 350px;
  height: 350px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  white-space: pre-line;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const SetRepresentativeImageBtn = styled.button`
  width: 150px;
  height: 35px;
  margin: auto;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const NextButton = styled.button`
  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

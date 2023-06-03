import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../modules'
// import mapMarker from '../../img/mapMarker.svg'
import { SavePost } from '../../modules/post'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import PostModal from '../../components/PostModal'

export default function SelectRepresentativePicture(): JSX.Element {
  const [text, setText] = useState<string>('')
  const [points, setPoints] = useState<kakao.maps.LatLng[]>([])
  const [map, setMap] = useState<kakao.maps.Map>()
  const [index, setIndex] = useState<number>(-1)
  const dispatch = useDispatch()

  const posts = useSelector((state: RootState) => state.changePostReducer.post)
  const rest = useSelector(
    (state: RootState) => state.changePostReducer.hashtagAndText
  )
  const [carouselOpen, setCarouselOpen] = useState<boolean[]>(
    Array(posts.length).fill(false)
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
    dispatch(SavePost({ writer: 'jinokim98', posts, text }))
  }

  const calculateCenter = (map: kakao.maps.Map): void => {
    if (posts.length > 0) {
      const bounds = new kakao.maps.LatLngBounds()
      const newPoint: kakao.maps.LatLng[] = []

      posts.forEach((GPSInfo) => {
        const { lat, lng } = GPSInfo.LatLng
        const point = new kakao.maps.LatLng(lat, lng)
        bounds.extend(point)
        newPoint.push(point)
      })

      setPoints(newPoint)
      map.setBounds(bounds)

      const polyline = new kakao.maps.Polyline({
        path: newPoint,
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: 'red', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
      })

      polyline.setMap(map)
    }
  }

  const changeIndex = (idx: number): void => {
    setIndex(idx)
    setCarouselOpen((prev) =>
      prev.map((open, index) => (idx === index ? !open : open))
    )
  }

  useEffect(() => {
    if (map === undefined) return
    calculateCenter(map)
  }, [map])

  useEffect(() => {
    console.log(index)
    console.log(carouselOpen)
  }, [index])

  const mapContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Title>대표 이미지 설정</Title>
      <Paragraph>
        {`설정한 이미지 위로 핀이 표시됩니다.
        기본 이미지 버튼을 누르면 지도 이미지로 전환됩니다.`}
      </Paragraph>
      <GroupContainer>
        <LayerGroup>
          <KakaoMapContainer ref={mapContainerRef}>
            {posts.length > 0 && (
              <Map
                center={{
                  lat: posts[0].LatLng.lat,
                  lng: posts[0].LatLng.lng,
                }}
                style={{ width: '100%', height: '100%' }}
                onCreate={(map) => {
                  setMap(map)
                }}
              >
                {points.length > 0 && (
                  <>
                    {points.map((point, idx) => (
                      <MapMarker
                        key={`${point.getLat()}-${point.getLng()}`}
                        position={{ lat: point.getLat(), lng: point.getLng() }}
                        onClick={() => {
                          changeIndex(idx)
                        }}
                      />
                    ))}
                  </>
                )}
              </Map>
            )}
          </KakaoMapContainer>
          <ImageGroup active={index !== -1}>
            {posts.length > 0 && index !== -1 && (
              <PostModal
                postImage={posts[index].tag}
                setModalOpen={changeIndex}
              ></PostModal>
            )}
          </ImageGroup>
        </LayerGroup>
        <LocationGroup>
          <WriteSpace>{text}</WriteSpace>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
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

const KakaoMapContainer = styled.div`
  position: absolute;
  z-index: 0;
  top: 2%;
  left: 2%;
  width: 100%;
  height: 100%;
`

const ImageGroup = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
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

const NextButton = styled.button`
  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

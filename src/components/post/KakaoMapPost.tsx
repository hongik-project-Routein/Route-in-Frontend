import React, { useState, useEffect } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import PostModal from '../popup/PostModal'

interface KakaomapPostProps {
  size: string
  pinCount: number
  pinImages: string[]
  latLng: Array<{ lat: number; lng: number }>
}

export default function KakaoMapPost(props: KakaomapPostProps): JSX.Element {
  const [map, setMap] = useState<kakao.maps.Map>()
  const [index, setIndex] = useState<number>(-1)
  const [points, setPoints] = useState<kakao.maps.LatLng[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [carouselOpen, setCarouselOpen] = useState<boolean[]>(
    Array(props.pinCount).fill(false)
  )
  const calculateCenter = (map: kakao.maps.Map): void => {
    if (props.pinCount > 0) {
      const bounds = new kakao.maps.LatLngBounds()
      const newPoint: kakao.maps.LatLng[] = []

      props.latLng.forEach((GPSInfo) => {
        const { lat, lng } = GPSInfo
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

  return (
    <LayerGroup size={props.size}>
      <KakaoMapPostContainer size={props.size}>
        {props.pinCount > 0 && (
          <Map
            center={{
              lat: props.latLng[0].lat,
              lng: props.latLng[0].lng,
            }}
            style={{ width: '100%', height: '100%' }}
            onCreate={(map) => {
              setMap(map)
            }}
            draggable={false}
            zoomable={false}
          >
            {points.length > 0 && (
              <>
                {points.map((point, idx) => (
                  <MapMarker
                    key={`${point.getLat()}-${point.getLng()}`}
                    position={{ lat: point.getLat(), lng: point.getLng() }}
                    onMouseOver={() => {
                      changeIndex(idx)
                    }}
                  ></MapMarker>
                ))}
              </>
            )}
          </Map>
        )}
      </KakaoMapPostContainer>
      <ImageGroup active={index !== -1}>
        {props.pinCount > 0 && index !== -1 && (
          <PostModal
            postImage={<img src={props.pinImages[index]} />}
            setModalOpen={changeIndex}
          ></PostModal>
        )}
      </ImageGroup>
    </LayerGroup>
  )
}

const LayerGroup = styled.div<{ size: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.size}`};
`

const KakaoMapPostContainer = styled.div<{ size: string }>`
  width: 100%;
  height: ${(props) => `${props.size}`};
  margin-top: 20px;
`

const ImageGroup = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
`

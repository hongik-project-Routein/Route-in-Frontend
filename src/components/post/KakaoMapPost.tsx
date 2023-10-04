import React, { useState, useEffect } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import EachMarker from '../eachItem/EachMarker'

interface KakaomapPostProps {
  size: string
  pinCount: number
  pinImages: string[]
  latLng: Array<{ lat: number; lng: number }>
}

export default function KakaoMapPost(props: KakaomapPostProps): JSX.Element {
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined)
  const [points, setPoints] = useState<kakao.maps.LatLng[]>([])
  const [polylines, setPolylines] = useState<kakao.maps.Polyline | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
    }
  }

  const makePolyline = (
    map: kakao.maps.Map,
    point: kakao.maps.LatLng[]
  ): void => {
    const polyline = new kakao.maps.Polyline({
      path: point,
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: 'red', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
    })

    setPolylines(polyline)
    polyline.setMap(map)
  }

  useEffect(() => {
    if (map === undefined) return
    calculateCenter(map)
  }, [map, props.pinImages])

  useEffect(() => {
    if (map === undefined) return
    makePolyline(map, points)

    return () => {
      polylines?.setMap(null)
    }
  }, [points])

  return (
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
          draggable={true}
          zoomable={false}
        >
          {points.length > 0 &&
            points.map((point, idx) => (
              <EachMarker
                key={`marker-${idx}-${point.getLat()}-${point.getLng()}`}
                size={props.size}
                point={point}
                image={props.pinImages[idx]}
              />
            ))}
        </Map>
      )}
    </KakaoMapPostContainer>
  )
}

const KakaoMapPostContainer = styled.div<{ size: string }>`
  width: 100%;
  height: ${(props) => `${props.size}`};
  margin-top: 20px;
`

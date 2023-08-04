import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import { type LoadPost } from '../types/postTypes'
import theme from '../styles/Theme'

interface ProfileMapProps {
  size: string
  posts: LoadPost[]
}

const color: Record<number, string> = {
  0: theme.colors.primaryColor,
  1: theme.colors.primaryColorVarient,
  2: theme.secondaryColors.secondary,
  3: theme.colors.black,
  4: 'red',
}

export default function ProfileMapContent(props: ProfileMapProps): JSX.Element {
  const [map, setMap] = useState<kakao.maps.Map>()
  const [points, setPoints] = useState<kakao.maps.LatLng[]>([])

  const calculateCenter = (map: kakao.maps.Map): void => {
    if (props.posts.length > 0) {
      const totalPoint: kakao.maps.LatLng[] = []
      props.posts.forEach((post, index) => {
        const newPoints: kakao.maps.LatLng[] = makePolyLine(post, map, index)
        totalPoint.push(...newPoints)
      })

      const bounds = new kakao.maps.LatLngBounds()
      totalPoint.forEach((point) => {
        bounds.extend(point)
      })
      map.setBounds(bounds)

      setPoints(totalPoint)
    }
  }

  const makePolyLine = (
    post: LoadPost,
    map: kakao.maps.Map,
    index: number
  ): kakao.maps.LatLng[] => {
    const bounds = new kakao.maps.LatLngBounds()
    const newPoint: kakao.maps.LatLng[] = []

    post.pin
      .map((pin) => ({ lat: pin.latitude, lng: pin.longitude }))
      .forEach((GPSInfo) => {
        const { lat, lng } = GPSInfo
        const point = new kakao.maps.LatLng(lat, lng)
        bounds.extend(point)
        newPoint.push(point)
      })

    map.setBounds(bounds)

    const polyline = new kakao.maps.Polyline({
      path: newPoint,
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: color[index % 5], // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다  1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
    })

    polyline.setMap(map)

    return newPoint
  }

  useEffect(() => {
    if (map === undefined) return
    calculateCenter(map)
  }, [map])

  return (
    <KakaoMapPostContainer size={props.size}>
      {props.posts.length > 0 && (
        <Map
          center={{
            lat: props.posts[0].pin[0].latitude,
            lng: props.posts[0].pin[0].longitude,
          }}
          style={{ width: '90%', height: '100%' }}
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
                />
              ))}
            </>
          )}
        </Map>
      )}
    </KakaoMapPostContainer>
  )
}

const KakaoMapPostContainer = styled.div<{ size: string }>`
  width: 100%;
  height: ${(props) => `${props.size}`};
  margin: 20px 0;
`

import React, { useState } from 'react'
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface EachMarkerProps {
  point: kakao.maps.LatLng
  image: string
  size: string
  goToPostDetail?: string
}

function EachMarker(props: EachMarkerProps): JSX.Element {
  const { point, image, size } = props
  const [visible, setVisible] = useState<boolean>(false)

  const navigate = useNavigate()

  const goToDetail = (): void => {
    if (props.goToPostDetail === undefined) return

    navigate(props.goToPostDetail)
    window.location.reload()
  }

  return (
    <>
      <MapMarker
        key={`${point.getLat()}-${point.getLng()}`}
        position={{ lat: point.getLat(), lng: point.getLng() }}
        onMouseOver={() => {
          setVisible(true)
        }}
        onMouseOut={() => {
          setVisible(false)
        }}
        onClick={goToDetail}
      />
      {visible && (
        <CustomOverlayMap
          position={{ lat: point.getLat(), lng: point.getLng() }}
          yAnchor={size === '582px' ? 1.2 : 1.4}
        >
          <InfoWindow image={image} big={size === '582px'} />
        </CustomOverlayMap>
      )}
    </>
  )
}

export default EachMarker

const InfoWindow = styled.div<{ image: string; big: boolean }>`
  position: relative;
  width: ${(props) => (props.big ? '300px' : '150px')};
  height: ${(props) => (props.big ? '200px' : '100px')};

  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`

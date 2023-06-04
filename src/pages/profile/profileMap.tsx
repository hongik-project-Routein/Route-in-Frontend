import React from 'react'
import styled from 'styled-components'
import Profile from '../../components/profile'
import Tab from '../../components/tab'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'
import { useParams } from 'react-router-dom'

interface TabContent {
  tabName: string
  link: string
}

interface ProfileMapArticleProps {
  handleTabfunc: (index: number) => void
  tabIndex: number
}

export default function ProfileMapArticle(
  props: ProfileMapArticleProps
): JSX.Element {
  const { username } = useParams() // 실제는 db에서 username 가져올 것
  const tabContents: TabContent[] = [
    { tabName: '지도', link: `/profile/${username ?? ''}/map` },
    { tabName: '게시글', link: `/profile/${username ?? ''}/post` },
    { tabName: '스토리', link: `/profile/${username ?? ''}/story` },
    { tabName: '북마크', link: `/profile/${username ?? ''}/bookmark` },
  ]

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })
  return (
    <>
      <Profile />
      <Tab
        tabContent={tabContents}
        tabIndex={props.tabIndex}
        handleTabfunc={props.handleTabfunc}
      />
      {!isLoaded ? <div>load</div> : <Map />}
    </>
  )
}

function Map(): JSX.Element {
  return (
    <MapContainer>
      <GoogleMap
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
      />
      <MarkerF position={{ lat: 44, lng: -80 }} />
    </MapContainer>
  )
}

const MapContainer = styled.div`
  width: 8fr;
  height: 450px;
  margin-right: 50px;
`

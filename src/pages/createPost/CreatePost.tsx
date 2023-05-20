import React from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import SelectPicture from './SelectPicture'
import { useJsApiLoader } from '@react-google-maps/api'

export default function CreatePost(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })
  return (
    <HeaderAndSidebar
      article={
        <SelectPicture
          mapApi={isLoaded}
          mapApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''}
        />
      }
    />
  )
}

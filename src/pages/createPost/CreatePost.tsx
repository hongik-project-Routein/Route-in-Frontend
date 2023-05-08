import React from 'react'
// import SelectPicture from './selectPicture'
import WritePost from './WritePost'
import HeaderAndSidebar from '../../components/headerAndSidebar'

// interface Location {
//   picture: string
//   hashtag: string
// }

export default function CreatePost(): JSX.Element {
  // const [locations, setLocations] = useState<Location[]>([])
  return <HeaderAndSidebar article={<WritePost />} />
}

import React from 'react'
import styled from 'styled-components'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
// import SelectPicture from './selectPicture'
import WritePost from './WritePost'

// interface Location {
//   picture: string
//   hashtag: string
// }

export default function CreatePost(): JSX.Element {
  // const [locations, setLocations] = useState<Location[]>([])
  return (
    <Grid>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <SidebarGrid>
        <Sidebar />
      </SidebarGrid>
      {/* 변경되는 내용 */}
      <CreatePostGrid>
        {/* <SelectPicture /> */}
        {<WritePost />}
      </CreatePostGrid>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;
  grid-template-areas:
    'header header header'
    'sidebar createPost createPost ';
`

const HeaderGrid = styled.div`
  grid-area: header;
`
const SidebarGrid = styled.div`
  grid-area: sidebar;
`
const CreatePostGrid = styled.div`
  grid-area: createPost;
`

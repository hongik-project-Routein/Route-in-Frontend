import React from 'react'
import HeaderAndSidebar from '../../components/common/headerAndSidebar'
import SelectPicture from './SelectPicture'

export default function CreatePost(): JSX.Element {
  return <HeaderAndSidebar article={<SelectPicture />} />
}

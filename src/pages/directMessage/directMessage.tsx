import React from 'react'
import HeaderAndSidebar from '../../components/headerAndSidebar'

export default function DiretMessage(): JSX.Element {
  return <HeaderAndSidebar article={<DirectMessageArticle />} />
}

function DirectMessageArticle(): JSX.Element {
  return (
    <>
      <div>DM</div>
    </>
  )
}

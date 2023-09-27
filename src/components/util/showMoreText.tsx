import React from 'react'
import ReactShowMoreText from 'react-show-more-text'
import Hashtag from './hashtag'

interface IShowMoreText {
  content: string
}

function ShowMoreText(props: IShowMoreText): JSX.Element {
  const { content } = props

  const tag = <Hashtag postText={content} />
  console.log(tag)

  return (
    <ReactShowMoreText
      lines={3}
      more="더보기"
      less="닫기"
      expanded={false}
      truncatedEndingComponent={'... '}
      anchorClass="show-more-less-clickable"
    >
      {<Hashtag postText={content} />}
    </ReactShowMoreText>
  )
}

export default ShowMoreText

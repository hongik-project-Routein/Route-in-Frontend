import React from 'react'
import theme from '../../styles/Theme'
import uuid from 'react-uuid'

interface HashtagProps {
  postText: string
}

// 해시태그 구현은 조금 더 생각해봐야겠다.
export default function Hashtag(props: HashtagProps): JSX.Element {
  const renderTextWithHashtags = (): JSX.Element[] => {
    return props.postText.split('\n').map((line) => (
      <div key={uuid()}>
        {line.split(' ').map((word) => {
          if (word.startsWith('#')) {
            return (
              <a
                href={`/search?q=${word.substring(1)}`}
                key={uuid()}
                style={{ color: `${theme.colors.primaryColor}` }}
              >
                {word}
              </a>
            )
          }
          return <span key={uuid()}>{word} </span>
        })}
      </div>
    ))
  }
  return <>{renderTextWithHashtags()}</>
}

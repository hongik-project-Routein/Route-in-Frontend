import React from 'react'
import theme from '../../styles/Theme'
import uuid from 'react-uuid'

interface HashtagProps {
  postText: string
}

// 해시태그 구현은 조금 더 생각해봐야겠다.
export default function Hashtag(props: HashtagProps): JSX.Element {
  const renderTextWithTags = (): JSX.Element[] => {
    return props.postText.split('\n').map((line, lineIndex) => (
      <div key={uuid()}>
        {line.split(' ').map((word, wordIndex) => {
          let tag = word
          let link = null
          if (word.startsWith('#')) {
            tag = word.substring(1)
            link = `/search?q=${tag}`
          } else if (word.startsWith('@')) {
            tag = word.substring(1)
            link = `/profile/${tag}/post`
          }

          return (
            <span key={uuid()}>
              {link !== null ? (
                <a
                  href={link}
                  style={{ color: `${theme.colors.primaryColor}` }}
                >
                  {tag}
                </a>
              ) : (
                tag
              )}
              {wordIndex < line.split(' ').length - 1 && ' '}
            </span>
          )
        })}
      </div>
    ))
  }
  return <>{renderTextWithTags()}</>
}

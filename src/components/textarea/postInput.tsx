import React from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import styled from 'styled-components'
import useUser from '../../recoil/hooks/useUser'
import defaultStyle from '../../styles/tag/defaultStyle'
import defaultMentionStyle from '../../styles/tag/defaultMentionStyle'

interface PostInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface UserList {
  id: string
  display: string
}

function PostInput(props: PostInputProps): JSX.Element {
  const { loadUserInfo } = useUser()

  const getUserData = (
    query: string,
    callback: (users: UserList[]) => void
  ): void => {
    if (query === undefined) {
      return
    }

    const temp = loadUserInfo().following_set
    const userData = temp.map((user) => ({
      id: user,
      display: user,
    }))

    const filteredUsers = userData.filter((user) =>
      user.display.toLowerCase().includes(query)
    )
    callback(filteredUsers)
  }

  return (
    <TextInput
      value={props.value}
      onChange={(event) => {
        props.setValue(event.target.value)
      }}
      style={defaultStyle}
      a11ySuggestionsListLabel={'mention'}
    >
      <Mention
        appendSpaceOnAdd
        trigger="@"
        data={getUserData}
        style={defaultMentionStyle}
      />
    </TextInput>
  )
}

export default PostInput

const TextInput = styled(MentionsInput)`
  width: 350px;
  height: 350px;
  resize: none;
  outline: none;

  textarea {
    min-height: 100px;
    padding: 8px;

    border: 1px solid #d9d9d9;
    border-radius: 8px;
    outline: none;
  }
`

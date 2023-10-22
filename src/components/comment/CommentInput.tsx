import React from 'react'
import useUser from '../../recoil/hooks/useUser'
import { Mention, MentionsInput } from 'react-mentions'
import styled from 'styled-components'
import defaultStyle from '../../styles/tag/defaultStyle'
import defaultMentionStyle from '../../styles/tag/defaultMentionStyle'

interface CommentInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface UserList {
  id: string
  display: string
}

function CommentInput(props: CommentInputProps): JSX.Element {
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
      singleLine
      value={props.value}
      onChange={(event) => {
        props.setValue(event.target.value)
      }}
      style={defaultStyle}
      ignoreAccents
      a11ySuggestionsListLabel={'Suggested mentions'}
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

export default CommentInput

const TextInput = styled(MentionsInput)`
  width: 650px;
  height: 30px;
  margin-top: 10px;
  margin-right: 40px;
  padding: 10px;

  input {
    padding: 0 20px;
  }
`

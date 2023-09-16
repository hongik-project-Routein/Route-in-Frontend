import React from 'react'
import useUser from '../../recoil/hooks/useUser'
import { Mention, MentionsInput } from 'react-mentions'
import styled from 'styled-components'
import theme from '../../styles/Theme'

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
      value={props.value}
      onChange={(event) => {
        props.setValue(event.target.value)
      }}
      a11ySuggestionsListLabel={'mention'}
      singleLine
    >
      <Mention
        appendSpaceOnAdd
        trigger="@"
        data={getUserData}
        renderSuggestion={(
          suggestion,
          search,
          highlightedDisplay,
          index,
          focused
        ) => <Suggestion focused={focused}>{highlightedDisplay}</Suggestion>}
      ></Mention>
    </TextInput>
  )
}

export default CommentInput

const TextInput = styled(MentionsInput)`
  width: 600px;
  height: 30px;
  margin-top: 10px;
  margin-right: 40px;
  padding: 10px;
`

const Suggestion = styled.div<{ focused: boolean }>`
  padding: 5px 8px;

  background-color: ${(props) =>
    props.focused ? theme.colors.primaryColor : theme.colors.white};
`

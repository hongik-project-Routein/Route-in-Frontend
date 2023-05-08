import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const tabName: string[] = ['게시글', '핀', '지도', '유저']

export default function Tab(): JSX.Element {
  return (
    <TabContainer>
      <tbody>
        <Tr>
          {tabName.map((num, idx) => (
            <Td key={idx}>
              <StyledLink to="/">{num}</StyledLink>
            </Td>
          ))}
        </Tr>
      </tbody>
    </TabContainer>
  )
}

const TabContainer = styled.table`
  margin-bottom: 60px;
  height: 30px;
  border-bottom: 1px solid #d9d9d9;
`

const Tr = styled.tr`
  display: tabel-row;
`
const Td = styled.td`
  width: 30px;
  padding: 0 30px;
  color: #667085;
`

const StyledLink = styled(Link)`
  white-space: nowrap;
`

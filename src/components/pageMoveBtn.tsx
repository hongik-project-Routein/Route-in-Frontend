import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// interface PageMoveNumber {
//   nowPageNum: number
//   pageNumArray: number[]
// }
const pageNum: number[] = [1, 2, 3, 4, 5]

export default function PageMoveBtn(): JSX.Element {
  return (
    <PageMoveBtnTable>
      <PageMoveTableBody>
        <Tr>
          {pageNum.map((num, idx) => (
            <Td key={idx}>
              <Link to="/">{num}</Link>
            </Td>
          ))}
        </Tr>
      </PageMoveTableBody>
    </PageMoveBtnTable>
  )
}

const PageMoveBtnTable = styled.table`
  width: 470px;
  height: 30px;
  margin: 30px auto 30px;
`

const PageMoveTableBody = styled.tbody``

const Tr = styled.tr`
  display: tabel-row;
`
const Td = styled.td`
  width: 30px;
`

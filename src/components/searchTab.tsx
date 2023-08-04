import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { Category } from '../modules/slice/search'

interface SearchTabContents {
  tabName: string
  category: Category
}
interface TabContentProps {
  tabIndex: number
  handleTabfunc: (index: number) => void
}

export const searchTabContents: SearchTabContents[] = [
  { tabName: '게시글', category: Category.POST },
  { tabName: '핀', category: Category.PIN },
  { tabName: '지도', category: Category.MAP },
  { tabName: '유저', category: Category.USER },
]

export default function SearchTab(props: TabContentProps): JSX.Element {
  return (
    <TabContainer>
      <tbody>
        <Tr>
          {searchTabContents.map((tab, idx) => (
            <Td key={idx} active={props.tabIndex === idx}>
              <StyledLink
                onClick={() => {
                  props.handleTabfunc(idx)
                }}
              >
                {tab.tabName}
              </StyledLink>
              <Indicator active={props.tabIndex === idx} />
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
const Td = styled.td<{ active: boolean }>`
  position: relative;
  width: 30px;
  padding: 0 30px;
  color: ${(props) => (props.active ? theme.colors.primaryColor : '#667085')};
`

const Indicator = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  bottom: -0.5px;
  left: 10%;
  width: 80%;
  height: 3px;
  margin-top: 10px;
  background-color: ${theme.colors.primaryColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const StyledLink = styled.span`
  white-space: nowrap;
`

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../styles/Theme'

interface TabContent {
  tabName: string
  link: string
}
interface TabContentProps {
  tabContent: TabContent[]
  tabIndex: number
  handleTabfunc: (index: number) => void
}

export default function Tab(props: TabContentProps): JSX.Element {
  return (
    <TabContainer>
      <tbody>
        <Tr>
          {props.tabContent.map((tab, idx) => (
            <Td key={idx} active={props.tabIndex === idx}>
              <StyledLink
                to={tab.link}
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

const StyledLink = styled(Link)`
  white-space: nowrap;
`

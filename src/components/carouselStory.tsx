import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import theme from '../styles/Theme'

interface CarouselProps {
  items: JSX.Element[]
}

export default function CarouselStory(props: CarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevClick = (): void => {
    setCurrentIndex(
      (currentIndex - 1 + props.items.length) % props.items.length
    )
  }

  const handleNextClick = (): void => {
    setCurrentIndex((currentIndex + 1) % props.items.length)
  }
  return (
    <CarouselContainer>
      <LeftButton onClick={handlePrevClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </LeftButton>
      {props.items[currentIndex]}
      <RightButton onClick={handleNextClick}>
        <FontAwesomeIcon icon={faChevronRight} />
      </RightButton>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const LeftButton = styled.button`
  position: absolute;
  top: 50%;
  left: 3%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: ${theme.colors.white};
`
const RightButton = styled.button`
  position: absolute;
  top: 50%;
  right: 3%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: ${theme.colors.white};
`

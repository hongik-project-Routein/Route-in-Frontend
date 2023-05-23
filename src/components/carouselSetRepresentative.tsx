import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import theme from '../styles/Theme'

interface CarouselSetRepresentativeProps {
  items: JSX.Element[]
  setRepresentativeImageIdx: React.Dispatch<React.SetStateAction<number>>
  hideIndexChangeButton: boolean
}

export default function CarouselSetRepresentative(
  props: CarouselSetRepresentativeProps
): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevClick = (): void => {
    setCurrentIndex(
      (currentIndex - 1 + props.items.length) % props.items.length
    )
  }

  const handleNextClick = (): void => {
    setCurrentIndex((currentIndex + 1) % props.items.length)
  }

  useEffect(() => {
    props.setRepresentativeImageIdx(currentIndex)
  }, [currentIndex])

  return (
    <CarouselContainer>
      <LeftButton onClick={handlePrevClick} hide={props.hideIndexChangeButton}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </LeftButton>
      <div>{props.items[currentIndex]}</div>
      <RightButton onClick={handleNextClick} hide={props.hideIndexChangeButton}>
        <FontAwesomeIcon icon={faChevronRight} />
      </RightButton>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
`
const LeftButton = styled.button<{ hide: boolean }>`
  display: ${(props) => (props.hide ? 'none' : 'block')};
  position: absolute;
  top: 50%;
  left: 3%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: ${theme.colors.white};
`
const RightButton = styled.button<{ hide: boolean }>`
  display: ${(props) => (props.hide ? 'none' : 'block')};
  position: absolute;
  top: 50%;
  right: 3%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: ${theme.colors.white};
`

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import theme from '../../styles/Theme'

interface CarouselProps {
  items: string[]
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function CarouselSelectPicture(
  props: CarouselProps
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
  // 상위 컴포넌트에 인덱스 값이 바뀜을 알려줌
  useEffect(() => {
    props.setCarouselIndex(currentIndex)
  }, [currentIndex])
  return (
    <CarouselContainer>
      <LeftButton onClick={handlePrevClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </LeftButton>
      <CarouselImage src={props.items[currentIndex]} alt="img" />
      <RightButton onClick={handleNextClick}>
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

const CarouselImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

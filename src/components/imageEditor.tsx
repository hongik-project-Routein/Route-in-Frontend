import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface ImageEditorProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ImageEditor(props: ImageEditorProps): JSX.Element {
  const closeModal = (): void => {
    props.setModalOpen(false)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        props.setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
  return (
    <ImageEditorContainer ref={modalRef}>
      <CloseButton onClick={closeModal}>X</CloseButton>
      <ImageEditorBody>
        <CardBody>
          <FilterSection>
            <FilterLabel>Filters</FilterLabel>
            <FilterButtonGrid>
              <FilterButton>밝기</FilterButton>
              <FilterButton>회색조</FilterButton>
              <FilterButton>세피아</FilterButton>
              <FilterButton>채도</FilterButton>
              <FilterButton>대비</FilterButton>
              <FilterButton>색조</FilterButton>
            </FilterButtonGrid>
            <FilterSlider>
              <FilterlableBar>
                <FilterButtonLabel>밝기</FilterButtonLabel>
                <RangeValue>100</RangeValue>
              </FilterlableBar>
              <Slider type="range" />
            </FilterSlider>
          </FilterSection>
        </CardBody>
        <ShowImage></ShowImage>
      </ImageEditorBody>
    </ImageEditorContainer>
  )
}

const ImageEditorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 650px;
  height: 450px;
  z-index: 999;
  padding: 8px 12px;

  background-color: #d9d9d9;
  border: 1px solid black;
  border-radius: 8px;
`
const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover {
    cursor: pointer;
  }
`

const ImageEditorBody = styled.div`
  display: flex;
  margin-top: 40px;
`

const CardBody = styled.div`
  width: 250px;
  height: 350px;
  padding: 10px;
  border: 1px solid black;
`
const FilterSection = styled.div``

const FilterLabel = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`

const FilterButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`
const FilterButton = styled.button`
  padding: 8px;
  border: 1px solid black;
  border-radius: 2px;
  text-transform: capitalize;
  &:hover {
    cursor: pointer;
  }
`
const FilterSlider = styled.div`
  margin: 30px 0;
`
const FilterlableBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`
const FilterButtonLabel = styled.label`
  font-size: 15px;
  text-transform: capitalize;
`
const RangeValue = styled.span`
  font-size: 15px;
  text-transform: capitalize;
`
const Slider = styled.input`
  width: 100%;
`

const ShowImage = styled.div`
  width: 350px;
  height: 350px;
  margin-left: 20px;
  border: 1px solid black;
`

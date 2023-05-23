import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

interface StoryModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StoryModal(props: StoryModalProps): JSX.Element {
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
    <StoryModalContainer ref={modalRef}>
      <CloseButton onClick={closeModal}>X</CloseButton>
      <p>모달창입니다.</p>
    </StoryModalContainer>
  )
}

const StoryModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 400px;
  z-index: 999;

  background-color: gray;
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

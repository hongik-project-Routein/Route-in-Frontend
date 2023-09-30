import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'

interface PostModalProps {
  postImage: JSX.Element
  setModalOpen: (idx: number) => void
}

export default function PostModal(props: PostModalProps): JSX.Element {
  const closeModal = (): void => {
    props.setModalOpen(-1)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        props.setModalOpen(-1)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <StoryModalContainer ref={modalRef}>
      <ModalHeader>
        <CloseButton onClick={closeModal}>X</CloseButton>
      </ModalHeader>
      <PostImageContainer>{props.postImage}</PostImageContainer>
    </StoryModalContainer>
  )
}

const StoryModalContainer = styled.div`
  position: fixed;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);

  height: 430px;
  z-index: 999;

  background-color: ${theme.colors.primary100};
  border: none;
  border-radius: 8px;
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
  padding-top: 5px;
`

const PostImageContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 8px 12px;
`

const CloseButton = styled.button`
  margin-right: 20px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`

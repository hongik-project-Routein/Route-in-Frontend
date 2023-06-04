import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { type StoryGroupItems } from '../dummy/story'
import CarouselStory from './carouselStory'

interface StoryModalProps {
  storyInfo: StoryGroupItems
  setModalOpen: (idx: number) => void
}

export default function StoryModal(props: StoryModalProps): JSX.Element {
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

  useEffect(() => {
    console.log(props.storyInfo.storyImages[0])
  }, [])

  return (
    <StoryModalContainer ref={modalRef}>
      <ModalHeader>
        <UserHeader>
          <Profile src={props.storyInfo.profileImage} />
          <Nickname>{props.storyInfo.nickname}</Nickname>
        </UserHeader>
        <CloseButton onClick={closeModal}>X</CloseButton>
      </ModalHeader>
      <StoryImageContainer>
        <CarouselStory
          items={props.storyInfo.storyImages.map((story, idx) => (
            <CarouselImage key={idx} src={`${story}`} />
          ))}
        />
      </StoryImageContainer>
    </StoryModalContainer>
  )
}

const StoryModalContainer = styled.div`
  position: fixed;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);

  width: 700px;
  height: 450px;
  z-index: 999;

  background-color: rgb(0, 0, 0);
  border: 1px solid black;
  border-radius: 8px;
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-top: 5px;
`

const UserHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 20px;
`

const Profile = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`
const Nickname = styled.div`
  color: white;
  font-size: 24px;
`

const StoryImageContainer = styled.div`
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

const CarouselImage = styled.img`
  border-radius: 8px;
  object-fit: contain;
`

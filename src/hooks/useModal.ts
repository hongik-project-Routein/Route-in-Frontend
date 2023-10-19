import { type RefObject, useEffect, useState, useCallback } from 'react'

interface useModalReturn {
  modalOpen: boolean
  closeModal: () => void
  changeModalState: () => void
}

function useModal(modalRef: RefObject<HTMLDivElement>): useModalReturn {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    modalRef.current?.addEventListener('click', () => {
      setModalOpen(true)
    })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      modalRef.current?.removeEventListener('click', () => {
        setModalOpen(true)
      })
    }
  }, [modalRef])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const changeModalState = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  return { modalOpen, closeModal, changeModalState }
}

export default useModal

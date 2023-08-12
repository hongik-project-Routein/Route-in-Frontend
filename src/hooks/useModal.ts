import { type RefObject, useEffect, useState } from 'react'

function useModal(modalRef: RefObject<HTMLDivElement>): boolean {
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

  return modalOpen
}

export default useModal

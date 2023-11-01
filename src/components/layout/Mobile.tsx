import { useEffect, useState } from 'react'

function Mobile({ children }: { children: JSX.Element }): JSX.Element | null {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth)
    }
    window.addEventListener(`resize`, handleResize)
    return () => {
      window.removeEventListener(`resize`, handleResize)
    }
  }, [])

  useEffect(() => {
    setIsMobile(width <= 480)
  }, [width])

  return isMobile ? children : null
}

export default Mobile

import { useState, useEffect } from 'react'
import { isBrowser } from '../utils/commons'

const getWindowDimensions = window_ => {
  const { innerWidth: width, innerHeight: height } = window_
  return { width, height }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    isBrowser ? getWindowDimensions(window) : { width: 0, height: 0 }
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions(window))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

import { useState, useRef, useEffect } from 'react'
import useLayout from './useLayout'
import { ResizableOptions, ResizableReturn } from '../types'

const useResizable = (options: ResizableOptions = {}): ResizableReturn => {
  const { 
    initialWidth = 100, 
    minWidth = 50,
    onWidthChange 
  } = options
  
  const { isMobile } = useLayout()
  const [width, setWidth] = useState(initialWidth)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing.current) return
  
      if ('touches' in e && isMobile) {
        e.preventDefault()
      }
    
      const clientX = 'touches' in e 
        ? e.touches[0].clientX 
        : (e as MouseEvent).clientX
      
      const deltaX = clientX - startX.current
      const newWidth = Math.max(minWidth, startWidth.current + deltaX)
      
      setWidth(newWidth)
      if (onWidthChange) {
        onWidthChange(newWidth)
      }
    }
    
    const handleResizeEnd = () => {
      isResizing.current = false
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.removeEventListener('touchmove', handleResizeMove)
      document.removeEventListener('touchend', handleResizeEnd)
    }

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
    document.addEventListener('touchmove', handleResizeMove, { passive: false })
    document.addEventListener('touchend', handleResizeEnd)
    
    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.removeEventListener('touchmove', handleResizeMove)
      document.removeEventListener('touchend', handleResizeEnd)
    }
  }, [isMobile, minWidth, onWidthChange])

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    isResizing.current = true
    
    if ('touches' in e) {
      startX.current = e.touches[0].clientX
    } else {
      startX.current = (e as React.MouseEvent).clientX
    }
    
    startWidth.current = width
  }

  return {
    width,
    handleResizeStart,
    isResizing
  }
}

export default useResizable 
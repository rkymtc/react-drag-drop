import { useState, useRef, useEffect } from 'react'
import useLayout from './useLayout'
import { ResizableOptions, ResizableReturn } from '../types'

const useResizable = (options: ResizableOptions = {}): ResizableReturn => {
  const { 
    initialWidth = 100, 
    minWidth = 50,
    maxWidth = 800,
    onWidthChange,
    containerRef
  } = options
  
  const { isMobile } = useLayout()
  const [width, setWidth] = useState(initialWidth)
  const [isResizing, setIsResizing] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(0)
  const lastUpdateTime = useRef(0)
  const animationFrameId = useRef<number>()

  const calculateMaxWidth = () => {
    if (!containerRef) return maxWidth
    
    const container = containerRef
    const containerWidth = container.clientWidth
    const timelineItems = Array.from(container.querySelectorAll('.timeline-item'))
    const gap = 8 
    const totalGapWidth = (timelineItems.length - 1) * gap
    const minItemWidth = 100
    
    const availableWidth = containerWidth - totalGapWidth
    const maxItemWidth = Math.floor(availableWidth / timelineItems.length)
    
    return Math.max(minItemWidth, Math.min(maxWidth, maxItemWidth))
  }

  useEffect(() => {
    const updateWidth = (clientX: number) => {
      const now = Date.now()
      if (now - lastUpdateTime.current < 16) return 
      
      const deltaX = clientX - startX.current
      const dynamicMaxWidth = calculateMaxWidth()
      const newWidth = Math.max(minWidth, Math.min(dynamicMaxWidth, startWidth.current + deltaX))
      
      lastUpdateTime.current = now
      setWidth(newWidth)
      if (onWidthChange) {
        onWidthChange(newWidth)
      }
    }

    const handleResizeMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing) return
  
      if ('touches' in e && isMobile) {
        e.preventDefault()
      }
    
      const clientX = 'touches' in e 
        ? e.touches[0].clientX 
        : (e as MouseEvent).clientX
      
      cancelAnimationFrame(animationFrameId.current!)
      animationFrameId.current = requestAnimationFrame(() => updateWidth(clientX))
    }
    
    const handleResizeEnd = () => {
      setIsResizing(false)
      cancelAnimationFrame(animationFrameId.current!)
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.removeEventListener('touchmove', handleResizeMove)
      document.removeEventListener('touchend', handleResizeEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
      document.addEventListener('touchmove', handleResizeMove, { passive: false })
      document.addEventListener('touchend', handleResizeEnd)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.removeEventListener('touchmove', handleResizeMove)
      document.removeEventListener('touchend', handleResizeEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, isMobile, minWidth, onWidthChange])

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    
    if ('touches' in e) {
      startX.current = e.touches[0].clientX
    } else {
      startX.current = (e as React.MouseEvent).clientX
    }
    
    startWidth.current = width
  }

  return {
    width,
    isResizing: useRef(false),
    handleResizeStart
  }
}

export default useResizable
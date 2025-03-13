import React, { useRef, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MediaItem, ItemTypes } from '../types'

interface TimelineItemProps {
  item: MediaItem
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
  removeFromTimeline: (id: string) => void
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  item, 
  index, 
  moveItem,
  removeFromTimeline
}) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [width, setWidth] = useState(item.width || 100)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      
      const deltaX = e.clientX - startX.current
      const newWidth = Math.max(50, startWidth.current + deltaX)
      setWidth(newWidth)
    }
    
    const handleResizeEnd = () => {
      isResizing.current = false
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
    
    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [])

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TIMELINE_ITEM,
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop<{ id: string, index: number }>({
    accept: ItemTypes.TIMELINE_ITEM,
    hover: (draggedItem, monitor) => {
      if (!ref.current) return

      const dragIndex = draggedItem.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = (clientOffset?.x || 0) - hoverBoundingRect.left

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return

      moveItem(dragIndex, hoverIndex)
      draggedItem.index = hoverIndex
    }
  })

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = width
  }

  drag(drop(ref))

  const isImage = item.file.type.startsWith('image/')
  const isVideo = item.file.type.startsWith('video/')

  return (
    <div
      ref={ref}
      className={`relative flex-shrink-0 cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ width: `${width}px`, height: '64px' }}
    >
      <div className="w-full h-full overflow-hidden rounded">
        {isImage && (
          <img
            src={item.url}
            alt="timeline"
            className="w-full h-full object-cover"
          />
        )}
        {isVideo && (
          <video
            src={item.url}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <button
        onClick={() => removeFromTimeline(item.id)}
        className="absolute top-0 right-0 text-xs bg-red-600 hover:bg-red-700 px-1 py-0.5 rounded z-10"
      >
        X
      </button>
      
      <div 
        className="absolute top-0 right-0 w-4 h-full bg-blue-500 bg-opacity-50 cursor-ew-resize hover:bg-opacity-80 transition-colors"
        onMouseDown={handleResizeStart}
        title="Genişliği değiştirmek için sürükleyin"
      >
        <div className="h-full flex items-center justify-center">
          <div className="w-0.5 h-8 bg-white"></div>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem 
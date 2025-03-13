import React from 'react'
import { useDrop } from 'react-dnd'

interface DropZoneProps {
  accept: string
  onDrop: (item: any) => void
  className?: string
  children: React.ReactNode
}

const DropZone: React.FC<DropZoneProps> = ({ accept, onDrop, className, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item) => {
      onDrop(item)
      return undefined
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      className={`${className} ${isOver && canDrop ? 'bg-gray-700 bg-opacity-50' : ''}`}
    >
      {children}
    </div>
  )
}

export default DropZone 
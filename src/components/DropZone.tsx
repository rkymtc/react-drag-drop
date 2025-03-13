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
    }),
    options: {
      // Mobil cihazlarda sürükleme işlemini iyileştirmek için
      dropEffect: 'copy'
    }
  }))

  return (
    <div
      ref={drop}
      className={`${className} touch-manipulation ${isOver && canDrop ? 'active' : ''}`}
      style={{ touchAction: 'none' }}
    >
      {children}
      {isOver && canDrop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="drop-message">Bırak</div>
        </div>
      )}
    </div>
  )
}

export default DropZone 
import React from 'react'
import { useDrop } from 'react-dnd'
import { DropZoneProps } from '../types'
import useLayout from '../hooks/useLayout'

const DropZone: React.FC<DropZoneProps> = ({ accept, onDrop, className, children }) => {
  const { isMobile } = useLayout()
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: (item) => {
      onDrop(item);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <div
      ref={drop}
      className={`${className} touch-manipulation ${isOver && canDrop ? 'active' : ''}`}
      style={{ touchAction: 'none' }}
      data-is-over={isOver && canDrop ? 'true' : 'false'}
    >
      {children}
      {isOver && canDrop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`drop-message ${isMobile ? 'text-sm' : ''}`}>
            {isMobile ? 'Buraya Bırak' : 'Bırak'}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropZone 
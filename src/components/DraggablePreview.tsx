import React from 'react'
import { DraggablePreviewProps } from '../types'
import useLayout from '../hooks/useLayout'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../types'

const DraggablePreview: React.FC<DraggablePreviewProps> = ({ item }) => {
  const { isMobile } = useLayout()

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MEDIA,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const isVideo = item.file.type.startsWith('video/')

  return (
    <div
      ref={drag}
      className={`w-full h-full relative ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ 
        touchAction: 'none',
        cursor: 'grab'
      }}
      data-handler-id={`draggable-preview-${item.id}`}
    >
      {isMobile && (
        <div className="absolute inset-0 z-10 bg-transparent touch-manipulation" />
      )}
      {isVideo ? (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          controls={false}
          muted
          draggable={false}
        />
      ) : (
        <img
          src={item.url}
          alt="Media preview"
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-0.5 text-center mobile-drag-hint">
          Sürükle
        </div>
      )}
    </div>
  )
}

export default DraggablePreview 
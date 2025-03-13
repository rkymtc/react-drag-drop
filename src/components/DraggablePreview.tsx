import React from 'react'
import { useDrag } from 'react-dnd'
import { MediaItem, ItemTypes } from '../types'

interface DraggablePreviewProps {
  item: MediaItem
}

const DraggablePreview: React.FC<DraggablePreviewProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEDIA,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }))

  const isImage = item.file.type.startsWith('image/')
  const isVideo = item.file.type.startsWith('video/')

  return (
    <div
      ref={drag}
      className="cursor-move w-full h-full flex items-center justify-center touch-manipulation"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none'
      }}
    >
      {isImage && (
        <img
          src={item.url}
          alt="preview"
          className="object-cover w-full h-full"
          draggable="true"
        />
      )}
      {isVideo && (
        <video
          src={item.url}
          className="object-cover w-full h-full"
          draggable="true"
        />
      )}
    </div>
  )
}

export default DraggablePreview 
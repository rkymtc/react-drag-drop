import React from 'react'
import { MediaItem } from '../types'
import DraggablePreview from './DraggablePreview'

interface MediaListProps {
  mediaList: MediaItem[]
  removeFromMediaList: (id: string) => void
}

const MediaList: React.FC<MediaListProps> = ({ mediaList, removeFromMediaList }) => {
  let containerClass = ''
  if (mediaList.length === 1) {
    containerClass = 'flex flex-col items-center justify-center'
  } else if (mediaList.length === 2) {
    containerClass = 'grid grid-cols-2 gap-2'
  } else if (mediaList.length >= 3) {
    containerClass = 'grid grid-cols-2 sm:grid-cols-3 gap-2'
  }

  return (
    <div className={`w-full h-auto p-2 ${containerClass}`}>
      {mediaList.map((item) => (
        <div
          key={item.id}
          className="relative group border border-gray-600 rounded-md overflow-hidden w-full media-item"
        >
          <DraggablePreview item={item} />
          <button
            onClick={() => removeFromMediaList(item.id)}
            className="absolute top-1 right-1 text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
          >
            X
          </button>
        </div>
      ))}
      {mediaList.length === 0 && (
        <div className="text-gray-400 text-sm text-center">
          Dosya eklemek için sürükleyin veya "Dosya Ekle" düğmesine tıklayın.
        </div>
      )}
    </div>
  )
}

export default MediaList 
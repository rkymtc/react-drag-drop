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
    containerClass = 'flex flex-col items-center justify-center gap-2'
  } else if (mediaList.length >= 3) {
    containerClass = 'grid grid-cols-2 sm:grid-cols-2 gap-3'
  }

  return (
    <div className={`w-full h-auto p-3 ${containerClass}`}>
      {mediaList.map((item) => (
        <div
          key={item.id}
          className="relative group border border-gray-600 rounded-md overflow-hidden w-full media-item touch-manipulation glow-effect"
          style={{ touchAction: 'none' }}
        >
          <DraggablePreview item={item} />
          <button
            onClick={() => removeFromMediaList(item.id)}
            className="absolute top-1 right-1 text-xs delete-button px-2 py-1 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
            style={{ 
              fontSize: '16px',
              padding: '4px 8px' 
            }}
          >
            X
          </button>
        </div>
      ))}
      {mediaList.length === 0 && (
        <div className="empty-state text-center">
          <p>Medya Yok</p>
          <p className="text-sm">Dosya eklemek için sürükleyin veya "Dosya Ekle" düğmesine tıklayın.</p>
        </div>
      )}
    </div>
  )
}

export default MediaList 
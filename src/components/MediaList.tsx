import React from 'react'
import { MediaListProps } from '../types'
import DraggablePreview from './DraggablePreview'
import useLayout from '../hooks/useLayout'

const MediaList: React.FC<MediaListProps> = ({ mediaList, removeFromMediaList }) => {
  const { isMobile } = useLayout()

  let containerClass = ''
  if (mediaList.length === 0) {
    containerClass = 'flex flex-col items-center justify-center'
  } else if (isMobile) {
    containerClass = 'grid grid-cols-4 gap-2'
  } else {
    if (mediaList.length === 1) {
      containerClass = 'flex flex-col items-center justify-center'
    } else if (mediaList.length === 2) {
      containerClass = 'flex flex-col items-center justify-center gap-2'
    } else {
      containerClass = 'grid grid-cols-2 sm:grid-cols-2 gap-3'
    }
  }

  return (
    <div className={`w-full h-auto ${isMobile ? 'p-1' : 'p-3'} ${containerClass}`}>
      {mediaList.map((item) => (
        <div
          key={item.id}
          className="relative group border border-gray-600 rounded-md overflow-hidden w-full media-item touch-manipulation glow-effect"
          style={{ touchAction: 'none' }}
        >
          <DraggablePreview item={item} />
          <button
            onClick={() => removeFromMediaList(item.id)}
            className="absolute top-0.5 right-0.5 text-xs delete-button rounded opacity-100 transition z-20"
            style={{ 
              fontSize: isMobile ? '10px' : '16px',
              padding: isMobile ? '1px 4px' : '4px 8px',
              minWidth: isMobile ? '18px' : '36px',
              minHeight: isMobile ? '18px' : '36px'
            }}
          >
            X
          </button>
        </div>
      ))}
      {mediaList.length === 0 && (
        <div className="empty-state text-center">
          <p>{isMobile ? 'Medya Yok' : 'Medya Yok'}</p>
          <p className="text-sm">{isMobile ? 'Dosya ekle' : 'Dosya eklemek için sürükleyin veya "Dosya Ekle" düğmesine tıklayın.'}</p>
        </div>
      )}
    </div>
  )
}

export default MediaList 
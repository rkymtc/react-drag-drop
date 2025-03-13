import React from 'react'
import { MediaItem, ItemTypes, PreviewProps } from '../types'
import DropZone from './DropZone'
import useLayout from '../hooks/useLayout'

const Preview: React.FC<PreviewProps> = ({ previewItem, setPreviewItem }) => {
  const { isMobile } = useLayout()

  return (
    <div className={`${isMobile ? '' : 'flex-1'} flex items-center justify-center relative preview`}>
      <DropZone
        accept={ItemTypes.MEDIA}
        onDrop={(item: MediaItem) => setPreviewItem(item)}
        className="preview-container drop-area border-2 border-transparent"
      >
        {previewItem ? (
          <div className="flex items-center justify-center w-full h-full">
            {previewItem.file.type.startsWith('image/') ? (
              <img
                src={previewItem.url}
                alt="preview"
                className="max-w-full max-h-[40vh] md:max-h-[80vh] mx-auto rounded shadow-lg"
              />
            ) : (
              <video
                src={previewItem.url}
                controls
                className="max-w-full max-h-[40vh] md:max-h-[80vh] mx-auto rounded shadow-lg"
              />
            )}
          </div>
        ) : (
          <div className="empty-state text-center text-gray-400">
            <p className={isMobile ? "text-base mb-1" : "text-lg mb-2"}>Önizleme Yok</p>
            <p className="text-sm">{isMobile ? "Medya ekleyin" : "Sol panelden medya öğesini sürükleyip buraya bırakın."}</p>
          </div>
        )}
      </DropZone>
      {previewItem && (
        <button
          onClick={() => setPreviewItem(null)}
          className={`absolute ${isMobile ? 'top-2 right-2 px-2 py-0.5 text-xs' : 'top-4 right-4 px-3 py-1 text-sm'} delete-button rounded`}
        >
          Temizle
        </button>
      )}
    </div>
  )
}

export default Preview 
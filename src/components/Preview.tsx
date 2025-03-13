import React from 'react'
import { MediaItem, ItemTypes } from '../types'
import DropZone from './DropZone'

interface PreviewProps {
  previewItem: MediaItem | null
  setPreviewItem: (item: MediaItem | null) => void
}

const Preview: React.FC<PreviewProps> = ({ previewItem, setPreviewItem }) => {
  return (
    <div className="flex-1 flex items-center justify-center relative preview">
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
                className="max-w-full max-h-[50vh] md:max-h-[80vh] mx-auto rounded shadow-lg"
              />
            ) : (
              <video
                src={previewItem.url}
                controls
                className="max-w-full max-h-[50vh] md:max-h-[80vh] mx-auto rounded shadow-lg"
              />
            )}
          </div>
        ) : (
          <div className="empty-state text-center text-gray-400">
            <p className="text-lg mb-2">Önizleme Yok</p>
            <p className="text-sm">Sol panelden medya öğesini sürükleyip buraya bırakın.</p>
          </div>
        )}
      </DropZone>
      {previewItem && (
        <button
          onClick={() => setPreviewItem(null)}
          className="absolute top-4 right-4 delete-button px-3 py-1 rounded text-sm"
        >
          Temizle
        </button>
      )}
    </div>
  )
}

export default Preview 
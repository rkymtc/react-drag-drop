import React, { useRef } from 'react'
import { MediaItem } from '../types'
import MediaList from './MediaList'

interface SidebarProps {
  mediaList: MediaItem[]
  removeFromMediaList: (id: string) => void
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  dropAreaRef: React.RefObject<HTMLDivElement>
}

const Sidebar: React.FC<SidebarProps> = ({
  mediaList,
  removeFromMediaList,
  handleFileSelect,
  dropAreaRef
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="w-full md:w-64 flex flex-col sidebar py-3">
      <div className="p-4">
        <h2 className="text-xl font-bold section-title">Medya Dosyaları</h2>
      </div>
      <div className="p-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-md w-full mb-3 glow-effect"
        >
          Dosya Ekle
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      <div
        ref={dropAreaRef}
        className="flex-grow p-4 overflow-auto drop-area mx-4 min-h-[100px]"
      >
        <MediaList 
          mediaList={mediaList} 
          removeFromMediaList={removeFromMediaList} 
        />
      </div>
    </div>
  )
}

export default Sidebar 
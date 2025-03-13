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
    <div className="w-full md:w-64 bg-gray-800 flex flex-col sidebar py-2">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Medya Dosyaları</h2>
      </div>
      <div className="p-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full mb-3"
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
        className="flex-grow p-4 overflow-auto border border-dashed border-gray-600 rounded-md mx-4 min-h-[100px]"
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
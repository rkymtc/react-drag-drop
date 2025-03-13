import React, { useRef } from 'react'
import { SidebarProps } from '../types'
import MediaList from './MediaList'
import useLayout from '../hooks/useLayout'

const Sidebar: React.FC<SidebarProps> = ({
  mediaList,
  removeFromMediaList,
  handleFileSelect,
  dropAreaRef
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useLayout()

  return (
    <div className="w-full md:w-64 flex flex-col sidebar py-1.5">
      <div className={isMobile ? "px-2 py-0.5" : "p-4"}>
        <h2 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold section-title`}>Medya Dosyaları</h2>
      </div>
      <div className={isMobile ? "px-2 py-0.5" : "p-4"}>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`px-2 py-1 rounded-md w-full ${isMobile ? 'mb-1 text-xs' : 'mb-3'} glow-effect`}
        >
          {isMobile ? '+' : 'Dosya Ekle'}
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
        className={`flex-grow ${isMobile ? 'p-1 mx-2 min-h-[50px]' : 'p-4 mx-4 min-h-[100px]'} overflow-auto drop-area`}
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
import { useRef, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import './App.css'

import Sidebar from './components/Sidebar'
import Preview from './components/Preview'
import Timeline from './components/Timeline'

import useLayout from './hooks/useLayout'
import useMediaManager from './hooks/useMediaManager'

const touchBackendOptions = {
  enableMouseEvents: true, 
  enableTouchEvents: true, 
  delayTouchStart: 50,
  enableKeyboardEvents: true
}

function App() {
  const { isMobile, isSidebarOpen, toggleSidebar } = useLayout()
  const dropAreaRef = useRef<HTMLDivElement>(null)
  
  const {
    mediaList,
    previewItem,
    timelineItems,
    setPreviewItem,
    handleFileSelect,
    removeFromMediaList,
    handleDropToTimeline,
    removeFromTimeline,
    moveTimelineItem
  } = useMediaManager({
    dropAreaRef,
    acceptedTypes: ['image/', 'video/']
  })

  // Debug için timeline öğelerini izle
  useEffect(() => {
    console.log('Timeline items updated:', timelineItems);
  }, [timelineItems]);

  const Backend = isMobile ? TouchBackend : HTML5Backend
  const backendOptions = isMobile ? touchBackendOptions : {}

  return (
    <DndProvider backend={Backend} options={backendOptions}>
      <div className="min-h-screen text-white flex flex-col">
        <div className="bg-gray-800 p-3 md:hidden shadow-lg">
          <button 
            onClick={toggleSidebar}
            className="px-4 py-2 rounded-md glow-effect"
          >
            {isSidebarOpen ? 'Medya Panelini Gizle' : 'Medya Panelini Göster'}
          </button>
          <div className="text-lg font-medium">React Drag Drop</div>
        </div>
        
        <div className="boxes-container flex flex-col md:flex-row flex-1 responsive-container">
          {isSidebarOpen && (
            <Sidebar
              mediaList={mediaList}
              removeFromMediaList={removeFromMediaList}
              handleFileSelect={handleFileSelect}
              dropAreaRef={dropAreaRef}
            />
          )}
          
          <div className="content-area flex flex-col">
            <Preview 
              previewItem={previewItem} 
              setPreviewItem={setPreviewItem} 
            />
            
            <Timeline
              timelineItems={timelineItems}
              handleDropToTimeline={handleDropToTimeline}
              removeFromTimeline={removeFromTimeline}
              moveTimelineItem={moveTimelineItem}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default App

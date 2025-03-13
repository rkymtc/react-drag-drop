import { useRef, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import './App.css'

import Sidebar from './components/Sidebar'
import Preview from './components/Preview'
import Timeline from './components/Timeline'

import useMediaFiles from './hooks/useMediaFiles'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
}


const getBackend = () => {
  return isMobile() ? TouchBackend : HTML5Backend
}

const touchBackendOptions = {
  enableMouseEvents: true, 
  enableTouchEvents: true, 
  delayTouchStart: 50 
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
  } = useMediaFiles()


  useEffect(() => {
    const dropArea = dropAreaRef.current
    if (!dropArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      dropArea.classList.add('border-blue-500', 'border-2')
    }
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dropArea.classList.remove('border-blue-500', 'border-2')
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      dropArea.classList.remove('border-blue-500', 'border-2')
      if (e.dataTransfer?.files.length) {
        const fileList = e.dataTransfer.files
        const newItems: any[] = []
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i]
          if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const url = URL.createObjectURL(file)
            newItems.push({
              id: crypto.randomUUID(),
              file,
              url
            })
          }
        }
      }
    }

    dropArea.addEventListener('dragover', handleDragOver)
    dropArea.addEventListener('dragleave', handleDragLeave)
    dropArea.addEventListener('drop', handleDrop)

    return () => {
      dropArea.removeEventListener('dragover', handleDragOver)
      dropArea.removeEventListener('dragleave', handleDragLeave)
      dropArea.removeEventListener('drop', handleDrop)
    }
  }, [])

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  const Backend = isMobile() ? TouchBackend : HTML5Backend
  const backendOptions = isMobile() ? touchBackendOptions : {}

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

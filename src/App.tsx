
import { useRef, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css'


import Sidebar from './components/Sidebar'
import Preview from './components/Preview'
import Timeline from './components/Timeline'


import useMediaFiles from './hooks/useMediaFiles'

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="bg-gray-800 p-2 md:hidden">
          <button 
            onClick={toggleSidebar}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            {isSidebarOpen ? 'Gizle' : 'Medya Paneli'}
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

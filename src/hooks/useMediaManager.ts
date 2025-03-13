import { useState, useCallback, useEffect } from 'react'
import { MediaItem, MediaManagerOptions } from '../types'

const useMediaManager = (options: MediaManagerOptions = {}) => {
  const { 
    dropAreaRef,
    acceptedTypes = ['image/', 'video/']
  } = options
  
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [timelineItems, setTimelineItems] = useState<MediaItem[]>([])

  const handleFiles = useCallback((fileList: FileList) => {
    const newItems: MediaItem[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const isAccepted = acceptedTypes.some(type => file.type.startsWith(type))
      
      if (isAccepted) {
        const url = URL.createObjectURL(file)
        newItems.push({
          id: crypto.randomUUID(),
          file,
          url
        })
      }
    }
    setMediaList((prev) => [...prev, ...newItems])
  }, [acceptedTypes])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

 
  const removeFromMediaList = useCallback((id: string) => {
    setMediaList((prev) => {
      const toRemove = prev.find((x) => x.id === id)
      if (toRemove) {
        URL.revokeObjectURL(toRemove.url)
      }
      return prev.filter((x) => x.id !== id)
    })
  }, [])

 
  const handleDropToTimeline = useCallback((item: MediaItem) => {
    setTimelineItems((prev) => [...prev, { ...item, width: 100 }])
  }, [])

  const removeFromTimeline = useCallback((id: string) => {
    setTimelineItems((prev) => {
      const toRemove = prev.find((x) => x.id === id)
      if (toRemove) {
        URL.revokeObjectURL(toRemove.url)
      }
      return prev.filter((x) => x.id !== id)
    })
  }, [])

  const moveTimelineItem = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log(`Moving item from index ${dragIndex} to index ${hoverIndex}`);
    setTimelineItems((prevItems) => {
      const newItems = [...prevItems];
      

      if (dragIndex < 0 || dragIndex >= newItems.length || 
          hoverIndex < 0 || hoverIndex >= newItems.length) {
        console.error('Invalid indices for moveTimelineItem', { dragIndex, hoverIndex, length: newItems.length });
        return prevItems;
      }
      
      const draggedItem = newItems[dragIndex];
      
      newItems.splice(dragIndex, 1);
      
     
      newItems.splice(hoverIndex, 0, draggedItem);
      
      return newItems;
    });
  }, [])

  const updateTimelineItemWidth = useCallback((id: string, width: number) => {
    setTimelineItems(prev => 
      prev.map(item => item.id === id ? { ...item, width } : item)
    )
  }, [])


  useEffect(() => {
    if (!dropAreaRef || !dropAreaRef.current) return
    
    const dropArea = dropAreaRef.current

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
        handleFiles(e.dataTransfer.files)
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
  }, [dropAreaRef, handleFiles])

  return {
   
    mediaList,
    previewItem,
    timelineItems,
    
   
    setPreviewItem,
    handleFiles,
    handleFileSelect,
    removeFromMediaList,
    
  
    handleDropToTimeline,
    removeFromTimeline,
    moveTimelineItem,
    updateTimelineItemWidth
  }
}

export default useMediaManager 
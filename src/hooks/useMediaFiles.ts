import { useState, useCallback } from 'react'
import { MediaItem } from '../types'

export const useMediaFiles = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [timelineItems, setTimelineItems] = useState<MediaItem[]>([])

  const handleFiles = useCallback((fileList: FileList) => {
    const newItems: MediaItem[] = []
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
    setMediaList((prev) => [...prev, ...newItems])
  }, [])

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
    setTimelineItems((prevItems) => {
      const newItems = [...prevItems]
      const draggedItem = newItems[dragIndex]
      newItems.splice(dragIndex, 1)
      newItems.splice(hoverIndex, 0, draggedItem)
      return newItems
    })
  }, [])

  const updateTimelineItemWidth = useCallback((id: string, width: number) => {
    setTimelineItems(prev => 
      prev.map(item => item.id === id ? { ...item, width } : item)
    )
  }, [])

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

export default useMediaFiles 
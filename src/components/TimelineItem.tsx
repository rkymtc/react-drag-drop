import React, { useRef } from 'react'
import { TimelineItemProps } from '../types'
import useLayout from '../hooks/useLayout'
import useResizable from '../hooks/useResizable'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../types'

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  item, 
  index, 
  moveItem,
  removeFromTimeline,
  updateTimelineItemWidth
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isMobile } = useLayout()
  
  const { width, handleResizeStart } = useResizable({
    initialWidth: item.width || 100,
    minWidth: isMobile ? 50 : 100,
    containerRef: ref.current?.closest('.drop-area')?.querySelector('.flex') as HTMLDivElement,
    onWidthChange: (newWidth) => {
      updateTimelineItemWidth(item.id, newWidth)
    }
  })


  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TIMELINE_ITEM,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

 
  const [, drop] = useDrop({
    accept: ItemTypes.TIMELINE_ITEM,
    hover: (draggedItem: { id: string, index: number }, monitor) => {
      if (!ref.current) return
      
      const dragIndex = draggedItem.index
      const hoverIndex = index
      
      if (dragIndex === hoverIndex) return
      
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      
      const clientOffset = monitor.getClientOffset()
      
      const hoverClientX = (clientOffset?.x || 0) - hoverBoundingRect.left
      
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return
      
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return
      
      moveItem(dragIndex, hoverIndex)
      
      draggedItem.index = hoverIndex
    }
  })

  drag(drop(ref))

  const isImage = item.file.type.startsWith('image/')
  const isVideo = item.file.type.startsWith('video/')

  return (
    <div
      ref={ref}
      className={`relative flex-shrink-0 cursor-move touch-manipulation timeline-item glow-effect ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ 
        width: `${width}px`, 
        height: isMobile ? '36px' : '64px',
        touchAction: 'none'
      }}
      data-handler-id={`timeline-item-${item.id}`}
    >
      {isMobile && (
        <div className="absolute inset-0 z-10 bg-transparent touch-manipulation" />
      )}
      <div className="w-full h-full overflow-hidden rounded">
        {isImage && (
          <img
            src={item.url}
            alt="timeline"
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
        {isVideo && (
          <video
            src={item.url}
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeFromTimeline(item.id);
        }}
        className={`absolute top-0 right-0 text-xs delete-button rounded z-20 ${isMobile ? 'w-3.5 h-3.5 text-[8px]' : 'w-6 h-6'}`}
        style={{
          padding: isMobile ? '0px' : '2px'
        }}
      >
        X
      </button>
      
      <div 
        className={`absolute top-0 right-0 ${isMobile ? 'w-4' : 'w-4'} h-full cursor-ew-resize hover:bg-opacity-80 transition-colors z-15 resize-handle bg-blue-500 bg-opacity-50`}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleResizeStart(e);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          handleResizeStart(e);
        }}
        title="Genişliği değiştirmek için sürükleyin"
      >
        <div className="h-full flex items-center justify-center">
          <div className={`${isMobile ? 'w-0.5' : 'w-0.5'} h-5 bg-white opacity-80`}></div>
          <div className={`${isMobile ? 'w-0.5' : 'w-0.5'} h-5 bg-white opacity-80 ml-0.5`}></div>
        </div>
      </div>
      
      {!isMobile && (
        <div className="width-indicator">
          {width}px
        </div>
      )}
      
      {isMobile && isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <span className="text-white text-[8px]">Taşınıyor</span>
        </div>
      )}
    </div>
  )
}

export default TimelineItem
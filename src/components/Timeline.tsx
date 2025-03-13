import React, { useCallback } from 'react'
import { ItemTypes, TimelineProps } from '../types'
import DropZone from './DropZone'
import useLayout from '../hooks/useLayout'
import TimelineItem from './TimelineItem'

const Timeline: React.FC<TimelineProps> = ({
  timelineItems,
  handleDropToTimeline,
  removeFromTimeline,
  moveTimelineItem
}) => {
  const { isMobile } = useLayout()

  const handleMoveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    moveTimelineItem(dragIndex, hoverIndex);
  }, [moveTimelineItem]);

  return (
    <div className={isMobile ? "mt-2" : "mt-4"}>
      <div className="flex items-center px-4 relative timeline-container">
        <DropZone
          accept={ItemTypes.MEDIA}
          onDrop={handleDropToTimeline}
          className="w-full h-full flex items-center drop-area"
        >
          <div className="flex items-center gap-2 overflow-x-auto w-full h-full py-2" style={{ minWidth: 0, flexBasis: 'auto' }}>
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                moveItem={handleMoveItem}
                removeFromTimeline={removeFromTimeline}
                updateTimelineItemWidth={(width: number) => {
                  const newWidth = Math.max(width, 100); 
                  const containerWidth = document.querySelector('.timeline-container')?.clientWidth || 0;
                  const minItemWidth = 100; 
                  const maxItemWidth = Math.floor((containerWidth - (timelineItems.length - 1) * 8) / timelineItems.length); 
                  const dynamicWidth = Math.min(Math.max(newWidth, minItemWidth), maxItemWidth);
                                    return dynamicWidth;
                }}
              />
            ))}
            {timelineItems.length === 0 && (
              <div className="empty-state text-gray-400 text-sm w-full text-center">
                <p className={isMobile ? "text-base mb-1" : "text-lg mb-2"}>Timeline Boş</p>
                <p className="text-sm">{isMobile 
                  ? "Medya öğesini buraya ekleyin" 
                  : "Sol panelden medya öğesini sürükleyip buraya bırakın."}</p>
              </div>
            )}
          </div>
        </DropZone>
      </div>
    </div>
  )
}

export default Timeline
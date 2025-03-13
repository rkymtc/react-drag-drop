import React, { useCallback } from 'react'
import { ItemTypes, TimelineProps } from '../types'
import TimelineItem from './TimelineItem'
import DropZone from './DropZone'
import useLayout from '../hooks/useLayout'

const Timeline: React.FC<TimelineProps> = ({
  timelineItems,
  handleDropToTimeline,
  removeFromTimeline,
  moveTimelineItem
}) => {
  const { isMobile } = useLayout()

  const handleMoveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log(`Timeline: Moving item from ${dragIndex} to ${hoverIndex}`);
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
          <div className="flex items-center gap-2 overflow-x-auto w-full h-full py-2">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                moveItem={handleMoveItem}
                removeFromTimeline={removeFromTimeline}
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
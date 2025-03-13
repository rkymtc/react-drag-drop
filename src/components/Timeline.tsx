import React from 'react'
import { MediaItem, ItemTypes } from '../types'
import TimelineItem from './TimelineItem'
import DropZone from './DropZone'

interface TimelineProps {
  timelineItems: MediaItem[]
  handleDropToTimeline: (item: MediaItem) => void
  removeFromTimeline: (id: string) => void
  moveTimelineItem: (dragIndex: number, hoverIndex: number) => void
}

const Timeline: React.FC<TimelineProps> = ({
  timelineItems,
  handleDropToTimeline,
  removeFromTimeline,
  moveTimelineItem
}) => {
  return (
    <div className="border-t border-gray-700">
      <div className="bg-gray-800 border-t border-gray-700 flex items-center px-4 relative timeline-container">
        <DropZone
          accept={ItemTypes.MEDIA}
          onDrop={handleDropToTimeline}
          className="w-full h-full flex items-center"
        >
          <div className="flex items-center gap-2 overflow-x-auto w-full h-full py-2">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                moveItem={moveTimelineItem}
                removeFromTimeline={removeFromTimeline}
              />
            ))}
            {timelineItems.length === 0 && (
              <div className="text-gray-400 text-sm w-full text-center">
                Timeline boş. Sol panelden medya sürükleyip bırakın.
              </div>
            )}
          </div>
        </DropZone>
      </div>
    </div>
  )
}

export default Timeline 
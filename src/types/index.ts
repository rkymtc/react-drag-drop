export const ItemTypes = {
  MEDIA: 'media',
  TIMELINE_ITEM: 'timeline_item'
}

export type MediaItem = {
  id: string
  file: File
  url: string
  width?: number
}

export interface MediaListProps {
  mediaList: MediaItem[]
  removeFromMediaList: (id: string) => void
}

export interface PreviewProps {
  previewItem: MediaItem | null
  setPreviewItem: (item: MediaItem | null) => void
}

export interface TimelineProps {
  timelineItems: MediaItem[]
  handleDropToTimeline: (item: MediaItem) => void
  removeFromTimeline: (id: string) => void
  moveTimelineItem: (dragIndex: number, hoverIndex: number) => void
}

export interface TimelineItemProps {
  item: MediaItem
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
  removeFromTimeline: (id: string) => void
}

export interface SidebarProps {
  mediaList: MediaItem[]
  removeFromMediaList: (id: string) => void
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  dropAreaRef: React.RefObject<HTMLDivElement>
}

export interface DraggablePreviewProps {
  item: MediaItem
}

export interface DropZoneProps {
  accept: string
  onDrop: (item: any) => void
  className?: string
  children: React.ReactNode
}

export interface LayoutOptions {
  sidebarInitialState?: boolean
  breakpoint?: number
}

export interface LayoutState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export interface MediaManagerOptions {
  dropAreaRef?: React.RefObject<HTMLElement>
  acceptedTypes?: string[]
}

export interface ResizableOptions {
  initialWidth?: number
  minWidth?: number
  onWidthChange?: (width: number) => void
}

export interface ResizableReturn {
  width: number
  handleResizeStart: (e: React.MouseEvent | React.TouchEvent) => void
  isResizing: React.RefObject<boolean>
} 
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
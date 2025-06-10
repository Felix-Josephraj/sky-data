export interface ContentItem {
  name: string
  description: string
  duration: number
  videoImage: string
  genre: string[]
  provider: string
  totalViews: {
    total: number
    'sky-go': number
    'now-tv': number
    peacock: number
  }
  prevTotalViews: {
    total: number
    'sky-go': number
    'now-tv': number
    peacock: number
  }
}

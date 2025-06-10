import { ContentItem } from '@/types/content'

export async function fetchContentData(): Promise<ContentItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const res = await fetch(`${baseUrl}/aieng-tech-test-assets/data`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch content data')
    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

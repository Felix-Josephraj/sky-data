// app/page.tsx
import Link from 'next/link'

type ContentItem = {
  name: string
  totalViews: {
    total: number
    'sky-go': number
    'now-tv': number
    peacock: number
  }
  description: string
  videoImage: string
  genre: string[]
}

async function fetchContentData(): Promise<ContentItem[]> {
  try {
    const res = await fetch('https://my-json-server.typicode.com/alb90/aieng-tech-test-assets/data', {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch content data')
    }
    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ContentCatalog() {
  const contentData = await fetchContentData()

  if (contentData.length === 0) {
    return (
      <main className='max-w-5xl mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-6'>Content Catalog</h1>
        <p className='text-red-600'>Failed to load content. Please try again later.</p>
      </main>
    )
  }

  return (
    <main className='max-w-5xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Content Catalog</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {contentData.map((item) => (
          <Link
            key={item.name}
            href={`/content/${encodeURIComponent(item.name)}`}
            className='border rounded shadow hover:shadow-lg transition p-4 flex flex-col'
          >
            <img
              src={item.videoImage}
              alt={item.name}
              className='w-full h-48 object-cover rounded mb-3'
              loading='lazy'
            />
            <h2 className='font-semibold text-lg'>{item.name}</h2>
            <p className='text-sm text-gray-600 mb-2'>Genres: {item.genre.join(', ')}</p>
            <p className='text-sm'>
              Total Views: <strong>{item.totalViews.total.toLocaleString()}</strong>
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}

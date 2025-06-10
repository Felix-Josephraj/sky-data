import ContentCatalog from '@/components/ContentCatalog'
import { fetchContentData } from '@/lib/fetchContent'

export default async function Page() {
  const contentData = await fetchContentData()

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black'>
      {contentData.length === 0 ? (
        <main className='max-w-5xl mx-auto p-4'>
          <h1 className='text-3xl font-bold mb-6'>Content Catalog</h1>
          <p className='text-red-600'>Failed to load content. Please try again later.</p>
        </main>
      ) : (
        <ContentCatalog contentData={contentData} />
      )}
    </div>
  )
}

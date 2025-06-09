import { notFound } from 'next/navigation'
import ContentHeader from '@/components/ContentHeader'
import ContentViewsChart from '@/components/ContentViewsChart'

async function fetchContentData() {
  const res = await fetch('https://my-json-server.typicode.com/alb90/aieng-tech-test-assets/data', {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch content data')
  return res.json()
}

interface ContentDetailProps {
  params: { name: string }
}

export default async function ContentDetail({ params }: ContentDetailProps) {
  const contentData = await fetchContentData()
  const contentItem = contentData.find(
    (item) => item.name.toLowerCase() === decodeURIComponent(params.name).toLowerCase()
  )

  if (!contentItem) {
    notFound()
  }

  return (
    <main className='max-w-4xl mx-auto p-6'>
      <ContentHeader
        name={contentItem.name}
        description={contentItem.description}
        duration={contentItem.duration}
        videoImage={contentItem.videoImage}
        genre={contentItem.genre}
      />
      <ContentViewsChart current={contentItem.totalViews} previous={contentItem.prevTotalViews} />
    </main>
  )
}

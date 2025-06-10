import { notFound } from 'next/navigation'
import ContentHeader from '@/components/ContentHeader'
import ContentViewsChart from '@/components/ContentViewsChart'
import { ContentItem } from '@/types/content'
import { fetchContentData } from '@/lib/fetchContent'

interface ContentDetailProps {
  params: { name: string }
}

export default async function ContentDetail({ params }: ContentDetailProps) {
  let contentItem: ContentItem | undefined
  try {
    const contentData: ContentItem[] = await fetchContentData()
    contentItem = contentData.find((item) => item.name.toLowerCase() === decodeURIComponent(params.name).toLowerCase())
    if (!contentItem) {
      notFound()
    }
  } catch (e) {
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

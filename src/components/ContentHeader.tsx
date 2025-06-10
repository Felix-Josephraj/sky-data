import React from 'react'

interface ContentHeaderProps {
  name: string
  description: string
  duration: number
  videoImage: string
  genre: string[]
}

export default function ContentHeader({ name, description, duration, videoImage, genre }: ContentHeaderProps) {
  return (
    <div className='mb-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl'>
      <h1 className='text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-snug'>{name}</h1>

      <div className='overflow-hidden rounded-xl mb-6'>
        <img src={videoImage} alt={name} className='w-full h-auto max-h-96 object-cover ' loading='lazy' />
      </div>

      <p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>{description}</p>

      <div className='flex flex-col sm:flex-row sm:items-center gap-4 text-gray-800 dark:text-gray-200'>
        <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm'>
          ⏱️ Duration: {(duration / 60).toFixed(0)} mins
        </span>

        <span className='bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm'>
          🎬 Genres: {genre.join(', ')}
        </span>
      </div>
    </div>
  )
}

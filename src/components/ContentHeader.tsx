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
    <div className='mb-6'>
      <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>{name}</h1>
      <img src={videoImage} alt={name} className='w-fit max-h-96 rounded-lg mb-6' loading='lazy' />
      <p className='mb-4 text-gray-700 dark:text-gray-300'>{description}</p>
      <p className='mb-2 text-gray-800 dark:text-gray-200'>
        <strong>Duration:</strong> {(duration / 60).toFixed(0)} mins
      </p>
      <p className='mb-2 text-gray-800 dark:text-gray-200'>
        <strong>Genres:</strong> {genre.join(', ')}
      </p>
    </div>
  )
}

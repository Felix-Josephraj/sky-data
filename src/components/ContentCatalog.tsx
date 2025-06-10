'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ContentItem } from '@/types/content'

interface ContentCatalogProps {
  contentData: ContentItem[]
}

export default function ContentCatalog({ contentData }: ContentCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState('')

  const allGenres = useMemo(() => {
    const genreSet = new Set<string>()
    contentData.forEach((item) => item.genre.forEach((g) => genreSet.add(g)))
    return Array.from(genreSet).sort()
  }, [contentData])

  const allProviders = useMemo(() => {
    const providerSet = new Set<string>()
    contentData.forEach((item) => providerSet.add(item.provider))
    return Array.from(providerSet).sort()
  }, [contentData])

  const filteredContent = useMemo(() => {
    return contentData.filter((item) => {
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (selectedGenres.length > 0 && !selectedGenres.some((genre) => item.genre.includes(genre))) {
        return false
      }
      if (selectedProvider && item.provider !== selectedProvider) {
        return false
      }
      return true
    })
  }, [contentData, searchTerm, selectedGenres, selectedProvider])

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <main className='max-w-5xl mx-auto p-4 text-gray-200'>
      <h1 className='text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text'>
        Content Catalog
      </h1>

      {/* Filters */}
      <section className='mb-10 p-4 rounded-xl bg-gray-900 bg-opacity-80 shadow-inner ring-1 ring-gray-800'>
        {/* Search Input */}
        <div className='flex flex-wrap items-center gap-4 mb-6'>
          <input
            type='text'
            placeholder='🔍 Search by title...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-lg w-full sm:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition'
          />

          {/* Provider Select */}
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className='border border-gray-700 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition'
          >
            <option value='' className='bg-gray-800 text-gray-200'>
              🌐 All Providers
            </option>
            {allProviders.map((provider) => (
              <option key={provider} value={provider} className='bg-gray-800 text-gray-200'>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Checkboxes */}
        <div className='flex flex-wrap gap-3'>
          {allGenres.map((genre) => (
            <label
              key={genre}
              className='flex items-center bg-gray-800 text-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-700 cursor-pointer transition select-none'
            >
              <input
                type='checkbox'
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className='form-checkbox text-pink-500 bg-gray-900 border-gray-600 focus:ring-pink-500 mr-2'
              />
              <span className='capitalize'>{genre}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Content grid */}
      {filteredContent.length === 0 ? (
        <p className='text-gray-500'>No content matches your filters.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filteredContent.map((item) => (
            <Link
              key={item.name}
              href={`/content/${encodeURIComponent(item.name)}`}
              className='relative group p-1 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 shadow-xl hover:shadow-2xl transition-shadow'
            >
              <div className='rounded-2xl bg-gray-900 p-4 flex flex-col h-full backdrop-blur-md bg-opacity-80 group-hover:scale-[1.01] transform transition duration-300'>
                <img
                  src={item.videoImage}
                  alt={item.name}
                  className='w-full h-48 object-cover rounded-xl mb-4 shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105'
                  loading='lazy'
                />
                <h2 className='font-bold text-xl text-white mb-1 line-clamp-1'>{item.name}</h2>
                <p className='text-sm text-pink-300 mb-1 line-clamp-1'>🎬 Genres: {item.genre.join(', ')}</p>
                <p className='text-sm text-yellow-300 mb-1'>📺 Provider: {item.provider}</p>
                <p className='text-sm text-green-300'>
                  👁️ Total Views: <strong>{item.totalViews.total.toLocaleString()}</strong>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

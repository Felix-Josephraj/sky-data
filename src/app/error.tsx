'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('An error occurred:', error)
  }, [error])

  return (
    <section className='flex justify-center min-h-screen items-center'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold mb-4'>Something went wrong!</h2>
        <p className='mb-4 text-gray-400'>{error.message}</p>
        <button onClick={() => reset()} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white'>
          Try Again
        </button>
      </div>
    </section>
  )
}

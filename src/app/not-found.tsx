export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <h1 className='text-5xl font-bold text-red-500 mb-4'>404 - Not Found</h1>
      <p className='text-lg text-gray-400 mb-8'>Sorry, the page you’re looking for doesn’t exist.</p>
      <a href='/' className='text-blue-400 underline hover:text-blue-300'>
        Go back home
      </a>
    </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type TimeSeriesData = {
  timestamp: number
  value: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-gray-300 rounded-md p-3 shadow-lg text-sm'>
        <p className='text-gray-800 font-semibold'>{label}</p>
        <p className='text-purple-600'>Value: {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }

  return null
}

export default function AnalyticsPage() {
  const [data, setData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const res = await fetch(`${baseUrl}/aieng-tech-test-timeseries/data`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Failed to fetch time-series data')

        const json: TimeSeriesData[] = await res.json()
        // Convert timestamps to readable date string for the labels
        const formattedData = json.map((item) => ({
          ...item,
          timeLabel: new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))
        setData(formattedData)
        setLoading(false)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred')
        }
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className='p-6 text-center'>Loading chart...</p>
  if (error) return <p className='p-6 text-center text-red-600'>{error}</p>

  return (
    <main className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text transition-transform duration-300 ease-in-out hover:scale-105'>
        Viewership Analytics Over Time
      </h1>

      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timeLabel' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type='monotone' dataKey='value' stroke='#8884d8' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </main>
  )
}

'use client' // because recharts uses browser APIs

import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type TimeSeriesData = {
  timestamp: number
  value: number
}

export default function AnalyticsPage() {
  const [data, setData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://my-json-server.typicode.com/alb90/aieng-tech-test-timeseries/data', {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Failed to fetch time-series data')
        const json: TimeSeriesData[] = await res.json()

        // Convert timestamps to human-readable date string for the chart labels
        const formattedData = json.map((item) => ({
          ...item,
          timeLabel: new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))

        setData(formattedData)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Unknown error')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className='p-6 text-center'>Loading chart...</p>
  if (error) return <p className='p-6 text-center text-red-600'>{error}</p>

  return (
    <main className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Viewership Analytics Over Time</h1>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timeLabel' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='value' stroke='#8884d8' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </main>
  )
}

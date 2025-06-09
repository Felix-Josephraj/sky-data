'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ContentViewsChartProps {
  current: {
    total: number
    'sky-go': number
    'now-tv': number
    peacock: number
  }
  previous: {
    total: number
    'sky-go': number
    'now-tv': number
    peacock: number
  }
}

export default function ContentViewsChart({ current, previous }: ContentViewsChartProps) {
  const data = [
    {
      platform: 'Sky Go',
      Current: current['sky-go'],
      Previous: previous['sky-go'],
    },
    {
      platform: 'Now TV',
      Current: current['now-tv'],
      Previous: previous['now-tv'],
    },
    {
      platform: 'Peacock',
      Current: current['peacock'],
      Previous: previous['peacock'],
    },
    {
      platform: 'Total',
      Current: current.total,
      Previous: previous.total,
    },
  ]

  return (
    <div className='w-full h-96 mt-8'>
      <h2 className='text-2xl font-semibold mb-3 text-gray-900 dark:text-white'>View Comparison</h2>
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-4'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis
              dataKey='platform'
              stroke='#ccc'
              tick={{ fill: '#4B5563' }}
              tickLine={false}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis stroke='#ccc' tick={{ fill: '#4B5563' }} tickLine={false} axisLine={{ stroke: '#D1D5DB' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
              }}
              itemStyle={{ color: '#E5E7EB' }}
              labelStyle={{ color: '#D1D5DB' }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Line type='monotone' dataKey='Previous' stroke='#6366F1' strokeWidth={3} dot={{ r: 5 }} />
            <Line type='monotone' dataKey='Current' stroke='#10B981' strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

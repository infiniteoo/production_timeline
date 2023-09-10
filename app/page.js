'use client'
import TimelineA from '../components/TimelineA'
import TimelineB from '../components/TimelineB'
import TimelineC from '../components/TimelineC'
import DataReader from '../components/DataReader'
import { useState } from 'react'

export default function Home() {
  const [excelData, setExcelData] = useState([])

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <DataReader />
      <TimelineA />
      <TimelineB />
      <TimelineC />
    </main>
  )
}

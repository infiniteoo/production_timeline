'use client'

import ProductionTable from '../components/ProductionTable'
import DataReader from '../components/DataReader'
import { useState } from 'react'

export default function Home() {
  const [timelineA, setTimelineA] = useState([])
  const [timelineB, setTimelineB] = useState([])
  const [timelineC, setTimelineC] = useState([])
  const [dateAndTimeline, setDateAndTimeline] = useState([[]])

  return (
    <main className="  text-lg">
      <DataReader
        setTimelineA={setTimelineA}
        setTimelineB={setTimelineB}
        setTimelineC={setTimelineC}
        setDateAndTimeline={setDateAndTimeline}
      />
      <ProductionTable
        timelineA={timelineA}
        timelineB={timelineB}
        timelineC={timelineC}
        dateAndTimeline={dateAndTimeline}
      />
    </main>
  )
}

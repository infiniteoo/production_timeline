'use client'
import TimelineA from '../components/TimelineA'
import TimelineB from '../components/TimelineB'
import TimelineC from '../components/TimelineC'
import DateAndTimeline from '../components/DateAndTimeline'
import ProductionTable from '../components/ProductionTable'

import DataReader from '../components/DataReader'
import { useState } from 'react'

export default function Home() {
  const [timelineA, setTimelineA] = useState([])
  const [timelineB, setTimelineB] = useState([])
  const [timelineC, setTimelineC] = useState([])
  const [dateAndTimeline, setDateAndTimeline] = useState([[]])
  const [fakeCurrentDate, setFakeCurrentDate] = useState(
    new Date('2023/08/28 12:00:00'),
  )

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

import { useEffect, useState } from 'react'

type AnalyticsData = {
  revenue: number
  orders: number
}

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
      .then(res => res.json())
      .then((data: AnalyticsData) => {
        console.log("API RESPONSE:", data)
        setData(data)
      })
      .catch(err => console.error("Fetch error:", err))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Revenue: {data ? `$${data.revenue}` : "Loading..."}</h2>
      <h3>Orders: {data ? data.orders : "Loading..."}</h3>
    </div>
  )
}
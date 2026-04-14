import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [data, setData] = useState<any>()

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
  .then(res => res.json())
  .then(data => {
    console.log(data)   // debug
    setData(data)
  })
  }, [])

  return <div>Revenue: {data?.revenue}</div>
}
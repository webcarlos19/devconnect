import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-blue-700">Devconnect</h1>
      
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App

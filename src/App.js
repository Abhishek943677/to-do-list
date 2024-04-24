import React from 'react'
import "./index.css"
import AddTask from './components/AddTask'
import Header from './components/Header'
import ShowNote from './components/ShowNote'

export default function App() {
  return (
    <div className='mx-auto '>
      <Header />
      <AddTask />
    </div>
  )
}

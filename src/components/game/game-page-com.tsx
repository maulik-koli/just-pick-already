'use client'
import React from 'react'
import { useGameStore } from '@/store'


const GamePageComponet: React.FC = () => {
  const data = useGameStore(state => state.zones)

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default GamePageComponet
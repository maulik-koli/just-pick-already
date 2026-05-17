'use client'
import React from 'react'
import { useGameStore } from '@/store'
import GameScreen from './game-screen'


const GamePageComponet: React.FC = () => {
  const data = useGameStore(state => state.zones)

  return (
    // <div>{JSON.stringify(data)}</div>
    <GameScreen />
  )
}

export default GamePageComponet
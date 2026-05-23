'use client'
import React from 'react'
import { useGameStore } from '@/store'
import GameScreen from './game-screen'


const GamePageComponet: React.FC = () => {
  const data = useGameStore(state => state.zones)

  return (
    <div className='overflow-hidden!'>
      <GameScreen />
    </div>
  )
}

export default GamePageComponet
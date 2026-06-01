'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GRADIENTS = [
    { from: '#F4623A', to: '#F5A623', accent: '#F4623A' },
    { from: '#F5A623', to: '#FFB347', accent: '#F5A623' },
    { from: '#E8845A', to: '#F4623A', accent: '#E8845A' },
    { from: '#C1440E', to: '#F4623A', accent: '#C1440E' },
    { from: '#D4537E', to: '#F4623A', accent: '#D4537E' },
    { from: '#FFB347', to: '#F5A623', accent: '#FFB347' },
]
const CIRCLE_SIZE = 56
const RING_START = CIRCLE_SIZE * 2.8
const LIFETIME = 1000

const SAFE_ZONE = { w: 340, h: 220 }

interface CircleGradient {
    from: string
    to: string
    accent: string
}

interface Circle {
    id: number
    x: number
    y: number
    gradient: CircleGradient
    born: number
}

interface FloatText {
    id: number
    x: number
    y: number
    text: string
    color: string
}

export interface OsuScoreState {
    score: number
    combo: number
}


const OsuCircle: React.FC<{
    circle: Circle
    onClick: (e: React.MouseEvent, c: Circle) => void
}> = ({ circle, onClick }) => {
    const [ringSize, setRingSize] = useState(RING_START)
    const [ringOpacity, setRingOpacity] = useState(0.8)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const tick = () => {
            const elapsed = Date.now() - circle.born
            const t = Math.min(elapsed / LIFETIME, 1)
            // shrink from RING_START → CIRCLE_SIZE (approach circle closes in)
            setRingSize(RING_START - (RING_START - CIRCLE_SIZE) * t)
            setRingOpacity((1 - t) * 0.8)
            if (t < 1) rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [circle.born])

    const { gradient } = circle

    return (
        <>
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    left: circle.x,
                    top: circle.y,
                    width: ringSize,
                    height: ringSize,
                    border: `2.5px solid transparent`,
                    backgroundImage: `linear-gradient(var(--background), var(--background)), linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    opacity: ringOpacity,
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute rounded-full cursor-pointer border-none outline-none"
                style={{
                    left: circle.x,
                    top: circle.y,
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    background: `radial-gradient(circle at 35% 35%, ${gradient.to}, ${gradient.from})`,
                    boxShadow: `0 0 16px 2px ${gradient.accent}44, inset 0 -2px 6px ${gradient.from}66`,
                    opacity: 0.92,
                    x: '-50%',
                    y: '-50%',
                    zIndex: 10,
                }}
                onClick={(e) => onClick(e, circle)}
            />
        </>
    )
}



interface OsuCirclesProps {
    active: boolean
    onScoreChange?: (state: OsuScoreState) => void
}

const OsuCircles: React.FC<OsuCirclesProps> = ({ active, onScoreChange }) => {
    const [circles, setCircles] = useState<Circle[]>([])
    const [floatTexts, setFloatTexts] = useState<FloatText[]>([])

    const circleIdRef = useRef(0)
    const textIdRef = useRef(0)
    const comboRef = useRef(0)
    const scoreRef = useRef(0)
    const activeRef = useRef(active)
    const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // keep activeRef in sync
    useEffect(() => {
        activeRef.current = active
    }, [active])

    const getSafePosition = useCallback(() => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const cx = vw / 2
        const cy = vh / 2
        const halfW = SAFE_ZONE.w / 2 + CIRCLE_SIZE
        const halfH = SAFE_ZONE.h / 2 + CIRCLE_SIZE
        const margin = CIRCLE_SIZE

        let x: number, y: number
        let attempts = 0
        do {
            x = margin + Math.random() * (vw - margin * 2)
            y = margin + Math.random() * (vh - margin * 2)
            attempts++
        } while (
            Math.abs(x - cx) < halfW &&
            Math.abs(y - cy) < halfH &&
            attempts < 30
        )
        return { x, y }
    }, [])

    const showFloat = useCallback((x: number, y: number, text: string, color: string) => {
        const id = textIdRef.current++
        setFloatTexts(prev => [...prev, { id, x, y, text, color }])
        setTimeout(() => setFloatTexts(prev => prev.filter(t => t.id !== id)), 700)
    }, [])

    const onScoreChangeRef = useRef(onScoreChange)
    useEffect(() => {
        onScoreChangeRef.current = onScoreChange
    }, [onScoreChange])

    const handleCircleClick = useCallback((e: React.MouseEvent, circle: Circle) => {
        e.stopPropagation()
        e.preventDefault()

        setCircles(prev => prev.filter(c => c.id !== circle.id))

        const elapsed = Date.now() - circle.born
        const timeRatio = 1 - elapsed / LIFETIME
        const pts = timeRatio > 0.6 ? 300 : timeRatio > 0.3 ? 200 : 100
        const label = pts === 300 ? 'Perfect!' : pts === 200 ? 'Great' : 'OK'

        comboRef.current += 1
        const multiplier = comboRef.current >= 5 ? 2 : comboRef.current >= 3 ? 1.5 : 1
        scoreRef.current += Math.round(pts * multiplier)

        onScoreChangeRef.current?.({ score: scoreRef.current, combo: comboRef.current })
        showFloat(circle.x, circle.y, `${label} +${Math.round(pts * multiplier)}`, circle.gradient.accent)
    }, [showFloat])

    /* spawn one circle, schedule its expiry, then schedule next spawn */
    const spawnAndSchedule = useCallback(() => {
        if (!activeRef.current) return

        const { x, y } = getSafePosition()
        const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
        const id = circleIdRef.current++

        setCircles(prev => [...prev, { id, x, y, gradient, born: Date.now() }])

        // auto-expire after LIFETIME
        setTimeout(() => {
            setCircles(prev => {
                const exists = prev.find(c => c.id === id)
                if (exists) {
                    comboRef.current = 0
                    onScoreChangeRef.current?.({ score: scoreRef.current, combo: 0 })
                    showFloat(x, y, 'Miss', '#E24B4A')
                }
                return prev.filter(c => c.id !== id)
            })
        }, LIFETIME)

        // schedule next spawn
        const interval = 1100 + Math.random() * 500  // 1100-1600ms
        spawnTimerRef.current = setTimeout(() => {
            spawnAndSchedule()
        }, interval)
    }, [getSafePosition, showFloat])


    useEffect(() => {
        if (active) {
            activeRef.current = true
            const startDelay = setTimeout(() => {
                spawnAndSchedule()
            }, 600)
            return () => {
                clearTimeout(startDelay)
                if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
            }
        } else {
            activeRef.current = false
            if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
            setCircles([])
        }
    }, [active, spawnAndSchedule])

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 5 }}
        >
            <AnimatePresence>
                {circles.map(circle => (
                    <OsuCircle
                        key={circle.id}
                        circle={circle}
                        onClick={handleCircleClick}
                    />
                ))}
            </AnimatePresence>

            {floatTexts.map(ft => (
                <motion.div
                    key={ft.id}
                    initial={{ opacity: 1, y: 0, scale: 1.2 }}
                    animate={{ opacity: 0, y: -36, scale: 0.9 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute text-sm font-bold pointer-events-none tabular-nums"
                    style={{
                        left: ft.x,
                        top: ft.y,
                        color: ft.color,
                        transform: 'translate(-50%, -50%)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                        zIndex: 20,
                    }}
                >
                    {ft.text}
                </motion.div>
            ))}
        </div>
    )
}

export default OsuCircles
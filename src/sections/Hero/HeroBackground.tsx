import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.scss'

function polygon(cx: number, cy: number, r: number, sides: number, rot = -Math.PI / 2): string {
  const pts = Array.from({ length: sides }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / sides
    return `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`
  })
  return `M ${pts.join(' L ')} Z`
}

function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy}`
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1))
}

interface ShapeData {
  d: string
  sw: number
}

interface LineData {
  x1: number
  y1: number
  x2: number
  y2: number
}

function generateShapes(count: number): ShapeData[] {
  const shapes: ShapeData[] = []
  const types = [3, 4, 5, 6, 8, 0]
  const placed: Array<{ cx: number; cy: number; r: number }> = []

  for (let i = 0; i < count; i++) {
    let cx: number, cy: number, r: number
    let attempts = 0

    do {
      cx = rand(48, 96)
      cy = rand(8, 92)
      r = rand(3, 12)
      attempts++
    } while (
      attempts < 30 &&
      placed.some((p) => {
        const dist = Math.sqrt((cx - p.cx) ** 2 + (cy - p.cy) ** 2)
        return dist < r + p.r + 2
      })
    )

    placed.push({ cx, cy, r })

    const type = types[randInt(0, types.length - 1)]
    const sw = rand(0.08, 0.22)

    const d =
      type === 0
        ? circlePath(cx, cy, r)
        : polygon(cx, cy, r, type, rand(-Math.PI, Math.PI))

    shapes.push({ d, sw })
  }

  return shapes
}

function generateLines(count: number): LineData[] {
  const lines: LineData[] = []

  for (let i = 0; i < count; i++) {
    lines.push({
      x1: rand(40, 60),
      y1: rand(0, 30),
      x2: rand(70, 100),
      y2: rand(70, 100),
    })
  }

  return lines
}

export function HeroBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  const shapes = useMemo(() => generateShapes(randInt(10, 14)), [])
  const lines = useMemo(() => generateLines(randInt(3, 5)), [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll<SVGPathElement>('[data-shape]')
    const lineEls = svg.querySelectorAll<SVGLineElement>('[data-line]')
    const tweens: (gsap.core.Tween | gsap.core.Timeline)[] = []

    paths.forEach((path, i) => {
      const length = path.getTotalLength()
      const baseOpacity = 0.04 + Math.random() * 0.08
      const drawDuration = 2 + Math.random() * 2
      const drawDelay = 0.5 + i * rand(0.1, 0.2)

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 })

      tweens.push(
        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: baseOpacity,
          duration: drawDuration,
          delay: drawDelay,
          ease: 'power2.inOut',
        }),
      )

      tweens.push(
        gsap.to(path, {
          opacity: baseOpacity * 0.3,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: drawDelay + drawDuration,
        }),
      )

      tweens.push(
        gsap.to(path, {
          rotation: `+=${rand(5, 20)}`,
          transformOrigin: 'center center',
          duration: 20 + Math.random() * 25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }),
      )
    })

    lineEls.forEach((line, i) => {
      const length = line.getTotalLength()
      const baseOpacity = 0.02 + Math.random() * 0.04
      const drawDelay = 1 + i * 0.2

      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 })

      tweens.push(
        gsap.to(line, {
          strokeDashoffset: 0,
          opacity: baseOpacity,
          duration: 1.5 + Math.random() * 1.5,
          delay: drawDelay,
          ease: 'power2.inOut',
        }),
      )

      tweens.push(
        gsap.to(line, {
          opacity: baseOpacity * 0.3,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: drawDelay + 2,
        }),
      )
    })

    return () => tweens.forEach((t) => t.kill())
  }, [shapes, lines])

  return (
    <svg
      ref={svgRef}
      className={styles.background}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {shapes.map((s, i) => (
        <path
          key={`s-${i}`}
          data-shape=""
          d={s.d}
          fill="none"
          stroke="#edc574"
          strokeWidth={s.sw}
          opacity="0"
        />
      ))}
      {lines.map((l, i) => (
        <line
          key={`l-${i}`}
          data-line=""
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#edc574"
          strokeWidth="0.08"
          opacity="0"
        />
      ))}
    </svg>
  )
}
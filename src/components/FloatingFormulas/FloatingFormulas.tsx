import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FloatingFormulas.module.scss'

gsap.registerPlugin(ScrollTrigger)

interface FormulaItem {
  text: string
  x: number
  y: number
  parallax?: number
}

interface FloatingFormulasProps {
  items: FormulaItem[]
}

export function FloatingFormulas({ items }: FloatingFormulasProps) {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    refs.current.forEach((el, i) => {
      if (!el) return

      const amount = items[i].parallax ?? 30 + i * 15

      tweens.push(
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -amount,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        ),
      )
    })

    return () =>
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.revert()
      })
  }, [items])

  return (
    <div className={styles.wrapper}>
      {items.map((item, i) => (
        <span
          key={`${item.text}-${i}`}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={styles.formula}
          style={{ left: `${item.x}%`, top: `${item.y}px` }}
        >
          {item.text}
        </span>
      ))}
    </div>
  )
}
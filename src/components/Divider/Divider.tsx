import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Divider.module.scss'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  const ref = useRef<HTMLHRElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.revert()
    }
  }, [])

  return <hr ref={ref} className={cn(styles.divider, className)} />
}
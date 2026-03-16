import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'
import styles from './EpochIndicator.module.scss'

gsap.registerPlugin(ScrollTrigger)

const EPOCHS = [
  { id: 'ancient-egypt', key: 'egypt' },
  { id: 'ancient-greece', key: 'greece' },
  { id: 'euclid', key: 'euclid' },
  { id: 'middle-ages', key: 'middleAges' },
  { id: 'descartes', key: 'descartes' },
  { id: 'lobachevsky', key: 'lobachevsky' },
  { id: 'modern-geometry', key: 'modern' },
  { id: 'philosophy', key: 'philosophy' },
]

export function EpochIndicator() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [displayedLabel, setDisplayedLabel] = useState('')
  const textRef = useRef<HTMLSpanElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)
  const queuedKey = useRef('')
  const currentLabel = useRef('')
  const activeKey = useRef('')

  currentLabel.current = displayedLabel

  function animateTransition(newLabel: string) {
    const el = textRef.current
    const pill = pillRef.current
    if (!el || !pill) {
      setDisplayedLabel(newLabel)
      return
    }

    animating.current = true
    const startWidth = pill.offsetWidth

    gsap.to(el, {
      opacity: 0,
      y: -4,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayedLabel(newLabel)

        requestAnimationFrame(() => {
          pill.style.width = 'auto'
          const endWidth = pill.offsetWidth
          pill.style.width = `${startWidth}px`

          gsap.to(pill, {
            width: endWidth,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
              pill.style.width = ''
            },
          })

          gsap.fromTo(
            el,
            { opacity: 0, y: 4 },
            {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: 'power2.out',
              onComplete: () => {
                animating.current = false
                if (queuedKey.current) {
                  const next = queuedKey.current
                  queuedKey.current = ''
                  handleEpochChange(next)
                }
              },
            },
          )
        })
      },
    })
  }

  function handleEpochChange(key: string) {
    if (key === activeKey.current) return
    activeKey.current = key

    const newLabel = key ? t(`epochs.${key}`) : ''

    if (newLabel === currentLabel.current) return

    if (animating.current) {
      queuedKey.current = key
      return
    }

    if (!currentLabel.current) {
      setDisplayedLabel(newLabel)
      return
    }

    animateTransition(newLabel)
  }

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    const header = document.querySelector('header')
    const footer = document.querySelector('footer')

    if (header) {
      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'bottom 20%',
          onLeave: () => setVisible(true),
          onEnterBack: () => setVisible(false),
        }),
      )
    }

    if (footer) {
      triggers.push(
        ScrollTrigger.create({
          trigger: footer,
          start: 'top 85%',
          onEnter: () => setVisible(false),
          onLeaveBack: () => setVisible(true),
        }),
      )
    }

    EPOCHS.forEach(({ id, key }) => {
      const el = document.getElementById(id)
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 35%',
          onToggle: ({ isActive }) => {
            if (isActive) handleEpochChange(key)
          },
        }),
      )
    })

    return () => triggers.forEach((tr) => tr.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  return (
    <div className={cn(styles.indicator, visible && displayedLabel && styles.visible)}>
      <div ref={pillRef} className={styles.pill}>
        <div className={styles.dot} />
        <span ref={textRef} className={styles.text}>
          {displayedLabel}
        </span>
      </div>
    </div>
  )
}
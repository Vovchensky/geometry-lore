import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.scss'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  const { t } = useTranslation()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const easterEggRef = useRef<HTMLDivElement>(null)
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [easterEgg, setEasterEgg] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.6',
    )

    return () => {
      tl.revert()
    }
  }, [])

  useEffect(() => {
    if (!easterEgg || !easterEggRef.current) return

    const el = easterEggRef.current

    const tl = gsap.timeline({
      onComplete: () => setEasterEgg(false),
    })

    tl.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
    ).to(el, {
      opacity: 0,
      y: -5,
      duration: 0.4,
      delay: 2,
      ease: 'power2.in',
    })

    return () => {
      tl.revert()
    }
  }, [easterEgg])

  const handleTitleClick = () => {
    clickCount.current++

    if (clickTimer.current) clearTimeout(clickTimer.current)

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 1500)

    if (clickCount.current >= 5) {
      clickCount.current = 0
      if (clickTimer.current) clearTimeout(clickTimer.current)
      setEasterEgg(true)
    }
  }

  return (
    <header className={styles.hero}>
      <HeroBackground />
      <div className={styles.content}>
        <h1
          ref={titleRef}
          className={styles.title}
          onClick={handleTitleClick}
        >
          {t('hero.line1')}
          <br />
          {t('hero.line2')}
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          {t('hero.subtitle')}
        </p>
        {easterEgg && (
          <div ref={easterEggRef} className={styles.easterEgg}>
            <span className={styles.easterEggText}>{t('easterEgg')}</span>
          </div>
        )}
      </div>
    </header>
  )
}
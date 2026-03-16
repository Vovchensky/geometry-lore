import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { setupScrollAnimations, setupParallax } from '@/utils/animations'
import styles from './MiddleAges.module.scss'

export function MiddleAges() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))
    if (decorRef.current) cleanups.push(setupParallax(decorRef.current, 50))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Section id="middle-ages">
      <div ref={sectionRef} className={styles.wrapper}>
        <SectionTitle data-animate="up">{t('middleAges.title')}</SectionTitle>
        <Paragraph data-animate="up">{t('middleAges.p1')}</Paragraph>
        <Paragraph data-animate="up" data-delay="0.15">{t('middleAges.p2')}</Paragraph>

        <div ref={decorRef} className={styles.decor}>
          <svg viewBox="0 0 100 120" fill="none">
            <line x1="50" y1="8" x2="28" y2="110" stroke="#edc574" strokeWidth="0.6" opacity="0.08" />
            <line x1="50" y1="8" x2="72" y2="110" stroke="#edc574" strokeWidth="0.6" opacity="0.08" />
            <circle cx="50" cy="78" r="22" stroke="#edc574" strokeWidth="0.4" opacity="0.05" />
            <circle cx="50" cy="8" r="2" fill="#edc574" opacity="0.06" />
          </svg>
        </div>
      </div>
    </Section>
  )
}
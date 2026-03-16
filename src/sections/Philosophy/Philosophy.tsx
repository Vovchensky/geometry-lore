import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Quote } from '@/components/Quote'
import { setupScrollAnimations, setupParallax } from '@/utils/animations'
import styles from './Philosophy.module.scss'

export function Philosophy() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))
    if (decorRef.current) cleanups.push(setupParallax(decorRef.current, 60))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Section id="philosophy">
      <div ref={sectionRef} className={styles.wrapper}>
        <SectionTitle data-animate="up">{t('philosophy.title')}</SectionTitle>
        <Paragraph data-animate="up">{t('philosophy.p1')}</Paragraph>
        <Quote data-animate="left" author={t('philosophy.quoteAuthor')}>
          {t('philosophy.quote')}
        </Quote>
        <Paragraph data-animate="up">{t('philosophy.p2')}</Paragraph>

        <div ref={decorRef} className={styles.decor}>
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="3" fill="#edc574" opacity="0.1" />
            <circle cx="50" cy="50" r="18" stroke="#edc574" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.06" />
            <circle cx="50" cy="50" r="38" stroke="#edc574" strokeWidth="0.2" strokeDasharray="1 6" opacity="0.04" />
          </svg>
        </div>
      </div>
    </Section>
  )
}
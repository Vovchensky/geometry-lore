import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Quote } from '@/components/Quote'
import { setupScrollAnimations, setupSvgDraw, setupParallax } from '@/utils/animations'
import styles from './Lobachevsky.module.scss'

export function Lobachevsky() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))
    if (svgRef.current) cleanups.push(setupSvgDraw(svgRef.current))
    if (visualRef.current) cleanups.push(setupParallax(visualRef.current, 25))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Section id="lobachevsky">
      <div ref={sectionRef} className={styles.layout}>
        <div ref={visualRef} className={styles.visual}>
          <svg ref={svgRef} className={styles.svg} viewBox="0 0 200 150" fill="none">
            <line x1="20" y1="100" x2="180" y2="100" stroke="#edc574" strokeWidth="1" opacity="0.6" />
            <path d="M 20 70 Q 60 20 100 50 Q 140 80 180 30" stroke="#edc574" strokeWidth="0.8" opacity="0.5" />
            <path d="M 20 60 Q 70 30 100 50 Q 130 70 180 50" stroke="#edc574" strokeWidth="0.8" opacity="0.5" />
            <path d="M 20 45 Q 60 10 100 50 Q 150 95 180 60" stroke="#edc574" strokeWidth="0.8" opacity="0.3" />
            <circle cx="100" cy="50" r="3" fill="#edc574" opacity="0.8" />
            <text x="100" y="140" fill="#666" fontSize="7" textAnchor="middle">
              {t('lobachevsky.lineLabel')}
            </text>
            <text x="100" y="42" fill="#666" fontSize="6" textAnchor="middle">A</text>
          </svg>
        </div>

        <div className={styles.text}>
          <SectionTitle data-animate="right" accent>{t('lobachevsky.title')}</SectionTitle>
          <Paragraph data-animate="up">{t('lobachevsky.p1')}</Paragraph>
          <Quote data-animate="right">{t('lobachevsky.quote')}</Quote>
          <Paragraph data-animate="up">{t('lobachevsky.p2')}</Paragraph>
        </div>
      </div>
    </Section>
  )
}
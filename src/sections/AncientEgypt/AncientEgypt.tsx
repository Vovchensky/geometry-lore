import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Formula } from '@/components/Formula'
import { setupScrollAnimations, setupSvgDraw, setupParallax } from '@/utils/animations'
import styles from './AncientEgypt.module.scss'

export function AncientEgypt() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const ropeRef = useRef<SVGSVGElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))
    if (ropeRef.current) cleanups.push(setupSvgDraw(ropeRef.current))
    if (visualRef.current) cleanups.push(setupParallax(visualRef.current, 30))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Section id="ancient-egypt">
      <div ref={sectionRef} className={styles.layout}>
        <div className={styles.text}>
          <SectionTitle data-animate="up">{t('ancientEgypt.title')}</SectionTitle>
          <Paragraph data-animate="up">{t('ancientEgypt.p1')}</Paragraph>
          <Paragraph data-animate="up">{t('ancientEgypt.p2')}</Paragraph>
          <Formula decorative className={styles.bgFormula}>a² + b² = c²</Formula>
        </div>

        <div ref={visualRef} className={styles.visual}>
          <svg ref={ropeRef} className={styles.ropeSvg} viewBox="0 0 200 200" fill="none">
            <path d="M 30 170 L 170 170" stroke="#edc574" strokeWidth="1" opacity="0.6" />
            <path d="M 170 170 L 170 50" stroke="#edc574" strokeWidth="1" opacity="0.6" />
            <path d="M 170 50 L 30 170" stroke="#edc574" strokeWidth="1" opacity="0.6" />
            <path d="M 155 170 L 155 155 L 170 155" stroke="#edc574" strokeWidth="0.5" opacity="0.4" />
            <text x="100" y="188" fill="#808080" fontSize="10" textAnchor="middle">4</text>
            <text x="182" y="114" fill="#808080" fontSize="10">3</text>
            <text x="85" y="105" fill="#808080" fontSize="10" textAnchor="end">5</text>
          </svg>
        </div>
      </div>
    </Section>
  )
}
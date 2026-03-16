import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Formula } from '@/components/Formula'
import { setupScrollAnimations } from '@/utils/animations'
import styles from './WhatIsGeometry.module.scss'

export function WhatIsGeometry() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    return setupScrollAnimations(sectionRef.current)
  }, [])

  return (
    <Section id="what-is-geometry">
      <div ref={sectionRef}>
        <SectionTitle data-animate="up">{t('whatIsGeometry.title')}</SectionTitle>

        <Paragraph data-animate="up">{t('whatIsGeometry.p1')}</Paragraph>

        <div data-animate="scale" className={styles.etymology}>
          <div className={styles.etymologyItem}>
            <span className={styles.greek}>γῆ</span>
            <span className={styles.translation}>{t('whatIsGeometry.earth')}</span>
          </div>
          <span className={styles.plus}>+</span>
          <div className={styles.etymologyItem}>
            <span className={styles.greek}>μετρέω</span>
            <span className={styles.translation}>{t('whatIsGeometry.measure')}</span>
          </div>
          <span className={styles.equals}>=</span>
          <div className={styles.etymologyItem}>
            <span className={styles.result}>γεωμετρία</span>
            <span className={styles.translation}>{t('whatIsGeometry.surveying')}</span>
          </div>
        </div>

        <Paragraph data-animate="up">{t('whatIsGeometry.p2')}</Paragraph>

        <Formula decorative className={styles.bgFormula}>
          S = πr²
        </Formula>
      </div>
    </Section>
  )
}
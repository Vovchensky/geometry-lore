import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { setupScrollAnimations } from '@/utils/animations'
import styles from './ModernGeometry.module.scss'

gsap.registerPlugin(ScrollTrigger)

export function ModernGeometry() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const geometryTypes = [
    { key: 'euclidean' },
    { key: 'projective' },
    { key: 'affine' },
    { key: 'riemannian' },
    { key: 'topology' },
    { key: 'fractal' },
  ]

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))

    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`)
    const tweens: gsap.core.Tween[] = []

    cards?.forEach((card, i) => {
      tweens.push(
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          },
        ),
      )
    })

    cleanups.push(() =>
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.revert()
      }),
    )

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Section id="modern-geometry">
      <div ref={sectionRef}>
        <SectionTitle data-animate="up">{t('modernGeometry.title')}</SectionTitle>
        <Paragraph data-animate="up">{t('modernGeometry.p1')}</Paragraph>
        <Paragraph data-animate="up">{t('modernGeometry.p2')}</Paragraph>

        <div ref={cardsRef} className={styles.grid}>
          {geometryTypes.map(({ key }) => (
            <div key={key} className={styles.card}>
              <h3 className={styles.cardName}>{t(`modernGeometry.${key}`)}</h3>
              <p className={styles.cardDesc}>{t(`modernGeometry.${key}Desc`)}</p>
              <p className={styles.cardDetail}>{t(`modernGeometry.${key}Detail`)}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { setupScrollAnimations } from '@/utils/animations'
import styles from './Euclid.module.scss'

gsap.registerPlugin(ScrollTrigger)

export function Euclid() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const postulatesRef = useRef<HTMLDivElement>(null)

  const postulates = [
    { number: 'I', text: t('euclid.post1'), hint: t('euclid.hint1') },
    { number: 'II', text: t('euclid.post2'), hint: t('euclid.hint2') },
    { number: 'III', text: t('euclid.post3'), hint: t('euclid.hint3') },
    { number: 'IV', text: t('euclid.post4'), hint: t('euclid.hint4') },
    { number: 'V', text: t('euclid.post5'), hint: t('euclid.hint5') },
  ]

  useEffect(() => {
    const cleanups: (() => void)[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))

    const items = postulatesRef.current?.querySelectorAll<HTMLElement>(`.${styles.postulate}`)
    const tweens: gsap.core.Tween[] = []

    items?.forEach((el, i) => {
      tweens.push(
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
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
    <Section id="euclid">
      <div ref={sectionRef}>
        <SectionTitle data-animate="left" accent>
          {t('euclid.title')}
        </SectionTitle>

        <Paragraph data-animate="up">{t('euclid.p1')}</Paragraph>

        <div ref={postulatesRef} className={styles.postulates}>
          {postulates.map((p) => (
            <div key={p.number} className={styles.postulate}>
              <span className={styles.postulateNumber}>{p.number}</span>
              <div className={styles.postulateContent}>
                <span className={styles.postulateText}>{p.text}</span>
                <span className={styles.postulateHint}>{p.hint}</span>
              </div>
            </div>
          ))}
        </div>

        <Paragraph data-animate="up">{t('euclid.p2')}</Paragraph>
      </div>
    </Section>
  )
}
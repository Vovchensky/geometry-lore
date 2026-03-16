import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Formula } from '@/components/Formula'
import { setupScrollAnimations, setupParallax } from '@/utils/animations'
import styles from './Descartes.module.scss'

gsap.registerPlugin(ScrollTrigger)

export function Descartes() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<SVGSVGElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: (() => void)[] = []
    const tweens: gsap.core.Tween[] = []

    if (sectionRef.current) cleanups.push(setupScrollAnimations(sectionRef.current))
    if (visualRef.current) cleanups.push(setupParallax(visualRef.current, 30))

    const grid = gridRef.current
    if (grid) {
      const lines = grid.querySelectorAll<SVGLineElement>('[data-grid-line]')
      const curve = grid.querySelector<SVGPathElement>(`.${styles.curve}`)

      lines.forEach((line, i) => {
        tweens.push(
          gsap.fromTo(
            line,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              delay: i * 0.02,
              ease: 'power2.out',
              scrollTrigger: { trigger: grid, start: 'top 75%', once: true },
            },
          ),
        )
      })

      if (curve) {
        const length = curve.getTotalLength()
        tweens.push(
          gsap.fromTo(
            curve,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: grid, start: 'top 70%', once: true },
            },
          ),
        )
      }
    }

    cleanups.push(() =>
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.revert()
      }),
    )

    return () => cleanups.forEach((fn) => fn())
  }, [])

  const gridLines = []
  for (let i = 0; i <= 20; i++) {
    const pos = i * 10
    gridLines.push(
      <line key={`h-${i}`} data-grid-line="" x1="0" y1={pos} x2="200" y2={pos} stroke="#222" strokeWidth="0.3" />,
      <line key={`v-${i}`} data-grid-line="" x1={pos} y1="0" x2={pos} y2="200" stroke="#222" strokeWidth="0.3" />,
    )
  }

  return (
    <Section id="descartes">
      <div ref={sectionRef} className={styles.layout}>
        <div className={styles.text}>
          <SectionTitle data-animate="up">{t('descartes.title')}</SectionTitle>
          <Paragraph data-animate="up">{t('descartes.p1')}</Paragraph>
          <Formula data-animate="scale">y = x²</Formula>
          <Paragraph data-animate="up">{t('descartes.p2')}</Paragraph>
        </div>

        <div ref={visualRef} className={styles.visual}>
          <svg ref={gridRef} className={styles.gridSvg} viewBox="0 0 200 200" fill="none">
            {gridLines}
            <line x1="0" y1="100" x2="200" y2="100" stroke="#edc574" strokeWidth="0.5" opacity="0.4" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#edc574" strokeWidth="0.5" opacity="0.4" />
            <path
              className={styles.curve}
              d="M 20 180 Q 60 160 80 130 Q 100 100 120 60 Q 140 20 180 10"
              stroke="#edc574"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <text x="190" y="98" fill="#666" fontSize="6">x</text>
            <text x="103" y="10" fill="#666" fontSize="6">y</text>
          </svg>
        </div>
      </div>
    </Section>
  )
}
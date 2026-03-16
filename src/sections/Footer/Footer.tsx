import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.scss'

gsap.registerPlugin(ScrollTrigger)

const NESTED_SHAPES = [
  'M 20 100 A 80 80 0 1 1 180 100 A 80 80 0 1 1 20 100',
  'M 100 20 L 169.28 140 L 30.72 140 Z',
  'M 60 100 A 40 40 0 1 1 140 100 A 40 40 0 1 1 60 100',
  'M 100 60 L 140 100 L 100 140 L 60 100 Z',
  'M 71.72 100 A 28.28 28.28 0 1 1 128.28 100 A 28.28 28.28 0 1 1 71.72 100',
]

export function Footer() {
  const { t } = useTranslation()
  const svgRef = useRef<SVGSVGElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    const svg = svgRef.current
    if (svg) {
      const paths = svg.querySelectorAll('path')
      paths.forEach((path, i) => {
        if (path instanceof SVGGeometryElement) {
          const length = path.getTotalLength()
          tweens.push(
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.5,
                delay: i * 0.4,
                ease: 'power2.inOut',
                scrollTrigger: { trigger: svg, start: 'top 95%', once: true },
              },
            ),
          )
        }
      })
    }

    const content = contentRef.current
    if (content) {
      const items = content.querySelectorAll<HTMLElement>('[data-footer-animate]')
      items.forEach((el, i) => {
        tweens.push(
          gsap.fromTo(
            el,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.3 + i * 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: content, start: 'top 95%', once: true },
            },
          ),
        )
      })
    }

    return () =>
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.revert()
      })
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container} ref={contentRef}>
        <div className={styles.svgWrapper}>
          <svg ref={svgRef} className={styles.shapes} viewBox="0 0 200 200" fill="none">
            {NESTED_SHAPES.map((d, i) => (
              <path key={i} d={d} stroke="#edc574" strokeWidth={0.5 - i * 0.05} opacity="0.3" />
            ))}
          </svg>
        </div>

        <p className={styles.greek} data-footer-animate="">
          γεωμετρία
        </p>

        <p className={styles.closing} data-footer-animate="">
          {t('footer.closing1')}
          <br />
          {t('footer.closing2')}
        </p>

        <div className={styles.line} />

        <div className={styles.meta} data-footer-animate="">
          <div className={styles.links}>
            <a
              href="https://github.com/Vovchensky/geometry-lore"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <span className={styles.dot}>·</span>
            <a
              href="https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.source')}
            </a>
          </div>
          <a
            href="https://github.com/Vovchensky"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.author}
          >
            <img
              src="https://github.com/Vovchensky.png"
              alt=""
              className={styles.avatar}
              loading="lazy"
            />
            <span className={styles.authorName}>vovchensky</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
import { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import styles from './LanguageSwitcher.module.scss'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [switching, setSwitching] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const isRu = i18n.language?.startsWith('ru')
  const next = isRu ? 'en' : 'ru'

  const toggle = useCallback(() => {
    if (switching) return
    setSwitching(true)

    const overlay = overlayRef.current
    if (!overlay) return

    const tl = gsap.timeline({
      onComplete: () => setSwitching(false),
    })

    tl.fromTo(
      overlay,
      { opacity: 0, pointerEvents: 'none' },
      { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power2.in' },
    )
      .call(() => {
        i18n.changeLanguage(next)
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1,
      })
      .set(overlay, { pointerEvents: 'none' })
  }, [switching, i18n, next])

  return (
    <>
      <button
        className={styles.switcher}
        onClick={toggle}
        type="button"
        disabled={switching}
      >
        {next.toUpperCase()}
      </button>
      <div ref={overlayRef} className={styles.overlay} />
    </>
  )
}
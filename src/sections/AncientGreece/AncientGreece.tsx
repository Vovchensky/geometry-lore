import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Paragraph } from '@/components/Paragraph'
import { Quote } from '@/components/Quote'
import { setupScrollAnimations } from '@/utils/animations'

export function AncientGreece() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    return setupScrollAnimations(sectionRef.current)
  }, [])

  return (
    <Section id="ancient-greece">
      <div ref={sectionRef}>
        <SectionTitle data-animate="up">{t('ancientGreece.title')}</SectionTitle>
        <Paragraph data-animate="up">{t('ancientGreece.p1')}</Paragraph>
        <Quote data-animate="left" author={t('ancientGreece.quoteAuthor')}>
          {t('ancientGreece.quote')}
        </Quote>
        <Paragraph data-animate="up">{t('ancientGreece.p2')}</Paragraph>
      </div>
    </Section>
  )
}
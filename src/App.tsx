import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Hero } from '@/sections/Hero'
import { WhatIsGeometry } from '@/sections/WhatIsGeometry'
import { AncientEgypt } from '@/sections/AncientEgypt'
import { AncientGreece } from '@/sections/AncientGreece'
import { Euclid } from '@/sections/Euclid'
import { MiddleAges } from '@/sections/MiddleAges'
import { Descartes } from '@/sections/Descartes'
import { Lobachevsky } from '@/sections/Lobachevsky'
import { ModernGeometry } from '@/sections/ModernGeometry'
import { Philosophy } from '@/sections/Philosophy'
import { Footer } from '@/sections/Footer'
import { Divider } from '@/components/Divider'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { EpochIndicator } from '@/components/EpochIndicator'
import { FloatingFormulas } from '@/components/FloatingFormulas'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useLenis'

function App() {
  const { i18n } = useTranslation()
  const reducedMotion = useReducedMotion()

  useLenis(!reducedMotion)

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('ru') ? 'ru' : 'en'
  }, [i18n.language])

  return (
    <main>
      <LanguageSwitcher />
      <EpochIndicator />
      <Hero />
      <WhatIsGeometry />
      <Divider />
      <AncientEgypt />
      <FloatingFormulas
        items={[
          { text: '∑Δ', x: 82, y: 120 },
        ]}
      />
      <Divider />
      <AncientGreece />
      <Divider />
      <Euclid />
      <Divider />
      <MiddleAges />
      <FloatingFormulas
        items={[
          { text: '∠α = ∠β', x: 88, y: 100, parallax: 35 },
        ]}
      />
      <Divider />
      <Descartes />
      <Divider />
      <Lobachevsky />
      <FloatingFormulas
        items={[
          { text: '∫', x: 10, y: 80, parallax: 50 },
        ]}
      />
      <Divider />
      <ModernGeometry />
      <FloatingFormulas
        items={[
          { text: 'S = πr²', x: 85, y: 100, parallax: 40 },
        ]}
      />
      <Divider />
      <Philosophy />
      <Footer />
    </main>
  )
}

export default App
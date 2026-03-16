import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function setupScrollAnimations(container: HTMLElement): () => void {
  const elements = container.querySelectorAll<HTMLElement>('[data-animate]')
  const underlines = container.querySelectorAll<HTMLElement>('[data-underline]')
  const tweens: gsap.core.Tween[] = []
  const reduced = prefersReducedMotion()

  elements.forEach((el) => {
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const type = el.dataset.animate || 'up'
    const delay = parseFloat(el.dataset.delay || '0')

    const from: gsap.TweenVars = { opacity: 0 }
    const to: gsap.TweenVars = {
      opacity: 1,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    }

    switch (type) {
      case 'up':
        from.y = 50
        to.y = 0
        break
      case 'left':
        from.x = -60
        to.x = 0
        break
      case 'right':
        from.x = 60
        to.x = 0
        break
      case 'scale':
        from.scale = 0.85
        from.y = 30
        to.scale = 1
        to.y = 0
        break
    }

    tweens.push(gsap.fromTo(el, from, to))
  })

  underlines.forEach((el) => {
    if (reduced) {
      gsap.set(el, { scaleX: 1 })
      return
    }

    tweens.push(
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      ),
    )
  })

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill()
      t.revert()
    })
  }
}

export function setupSvgDraw(
  svg: SVGElement,
  options?: { start?: string; duration?: number },
): () => void {
  const { start = 'top 75%', duration = 2 } = options || {}
  const paths = svg.querySelectorAll('path, line, polyline, polygon')
  const tweens: gsap.core.Tween[] = []
  const reduced = prefersReducedMotion()

  paths.forEach((path) => {
    if (path instanceof SVGGeometryElement) {
      if (reduced) {
        gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 })
        return
      }

      const length = path.getTotalLength()
      tweens.push(
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: svg, start, once: true },
          },
        ),
      )
    }
  })

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill()
      t.revert()
    })
  }
}

export function setupParallax(element: HTMLElement, yAmount = 40): () => void {
  if (prefersReducedMotion()) return () => {}

  const tween = gsap.fromTo(
    element,
    { y: 0 },
    {
      y: -yAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    },
  )

  return () => {
    tween.scrollTrigger?.kill()
    tween.revert()
  }
}
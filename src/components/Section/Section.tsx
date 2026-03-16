import { ReactNode } from 'react'
import styles from './Section.module.scss'
import { cn } from '@/utils/cn'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function Section({ children, className, id, fullWidth = false }: SectionProps) {
  return (
    <section className={cn(styles.section, className)} id={id}>
      <div className={cn(styles.container, fullWidth && styles.fullWidth)}>{children}</div>
    </section>
  )
}
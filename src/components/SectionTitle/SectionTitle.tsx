import { ReactNode, forwardRef } from 'react'
import styles from './SectionTitle.module.scss'
import { cn } from '@/utils/cn'

interface SectionTitleProps {
  children: ReactNode
  className?: string
  accent?: boolean
  'data-animate'?: string
  'data-delay'?: string
}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ children, className, accent = false, ...rest }, ref) => {
    return (
      <h2 ref={ref} className={cn(styles.title, accent && styles.accent, className)} {...rest}>
        <span className={styles.content}>{children}</span>
        <span className={styles.underline} data-underline="" />
      </h2>
    )
  },
)

SectionTitle.displayName = 'SectionTitle'
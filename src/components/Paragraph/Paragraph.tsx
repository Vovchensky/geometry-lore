import { ReactNode, forwardRef } from 'react'
import styles from './Paragraph.module.scss'
import { cn } from '@/utils/cn'

interface ParagraphProps {
  children: ReactNode
  className?: string
  secondary?: boolean
  'data-animate'?: string
  'data-delay'?: string
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, className, secondary = false, ...rest }, ref) => {
    return (
      <p ref={ref} className={cn(styles.text, secondary && styles.secondary, className)} {...rest}>
        {children}
      </p>
    )
  },
)

Paragraph.displayName = 'Paragraph'
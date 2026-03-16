import { forwardRef } from 'react'
import styles from './Formula.module.scss'
import { cn } from '@/utils/cn'

interface FormulaProps {
  children: string
  className?: string
  decorative?: boolean
  'data-animate'?: string
  'data-delay'?: string
}

export const Formula = forwardRef<HTMLDivElement, FormulaProps>(
  ({ children, className, decorative = false, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.formula, decorative && styles.decorative, className)}
        {...rest}
      >
        <span className={styles.content}>{children}</span>
      </div>
    )
  },
)

Formula.displayName = 'Formula'
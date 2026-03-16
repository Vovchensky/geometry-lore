import { ReactNode, forwardRef } from 'react'
import styles from './Quote.module.scss'
import { cn } from '@/utils/cn'

interface QuoteProps {
  children: ReactNode
  author?: string
  className?: string
  'data-animate'?: string
  'data-delay'?: string
}

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ children, author, className, ...rest }, ref) => {
    return (
      <blockquote ref={ref} className={cn(styles.quote, className)} {...rest}>
        <p className={styles.text}>{children}</p>
        {author && <cite className={styles.author}>— {author}</cite>}
      </blockquote>
    )
  },
)

Quote.displayName = 'Quote'
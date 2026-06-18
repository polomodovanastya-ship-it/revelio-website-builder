import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  width?: 'prose' | 'wide'
  className?: string
}

export function PageContainer({ children, width = 'wide', className }: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto px-5 pb-16 pt-28 sm:px-8 sm:pb-24',
        width === 'prose' ? 'max-w-4xl' : 'max-w-6xl',
        className
      )}
    >
      {children}
    </main>
  )
}

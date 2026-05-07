import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva('relative w-full rounded-xl border p-4', {
  variants: {
    variant: {
      info: 'border-border bg-background text-text',
      success: 'border-success/30 bg-background text-text',
      error: 'border-danger/30 bg-background text-text',
      warning: 'border-warning/30 bg-background text-text',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props} />
  )
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn('mb-1 text-sm font-semibold', className)} {...props} />
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn('text-sm text-text/70', className)} {...props} />
}


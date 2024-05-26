import { cva, type VariantProps } from 'class-variance-authority';
import React, { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

const variants = cva('', {
  variants: {
    size: {
      default: 'text-base',
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      h4: 'text-base',
      h5: 'text-sm',
      h6: 'text-xs',
    },
    color: {
      default: 'text-[#403636]',
      success: 'text-[#74CF72]',
      danger: 'text-[#F16767]',
      warning: 'text-[#FB8416]',
    },
    bold: {
      true: 'font-bold',
    },
    semibold: {
      true: 'font-semibold',
    },
  },
});

type TypographyProps = React.ComponentPropsWithoutRef<typeof variants> & PropsWithChildren & VariantProps<typeof variants>;

export function Typography({ size, color, bold, semibold, className, children, ...props }: TypographyProps) {
  return (
    <h1 className={cn(variants({ size, color, bold, semibold, className }))} {...props}>
      {children}
    </h1>
  );
}

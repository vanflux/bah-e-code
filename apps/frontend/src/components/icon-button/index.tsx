import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'outline';
}

const classes = {
  default: 'rounded-full p-2 font-medium cursor-default hover:bg-gray-200/10 active:bg-gray-200/20',
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'normal', disabled = false, className, ...rest }, ref) => {
    return (
      <button {...rest} className={cn(classes.default, className)} ref={ref}>
        {children}
      </button>
    );
  },
);

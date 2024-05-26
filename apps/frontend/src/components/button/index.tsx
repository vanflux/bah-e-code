import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from 'react';

const variants = cva('rounded p-2 font-medium cursor-pointer', {
  variants: {
    color: {
      default: 'bg-[#2582F0] hover:bg-[#2582F0]/90 active:bg-[#2582F0]/80',
      success: 'bg-[#74CF72] hover:bg-[#74CF72]/90 active:bg-[#74CF72]/80',
      danger: 'bg-[#F16767] hover:bg-[#F16767]/90 active:bg-[#F16767]/80',
      warning: 'bg-[#FB8416] hover:bg-[#FB8416]/90 active:bg-[#FB8416]/80',
    },
    textColor: {
      white: 'text-white',
      black: 'text-[#403636]',
    },
    full: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    color: 'default',
    textColor: 'white',
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof variants> &
  PropsWithChildren &
  VariantProps<typeof variants> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, color, full, disabled = false, className, ...rest }, ref) => {
  return (
    <button {...rest} className={cn(variants({ color, full, className }))} ref={ref}>
      {children}
    </button>
  );
});

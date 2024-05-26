import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import ReactInputMask from 'react-input-mask';
import { cn } from '../../utils/cn';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftDecoration?: ReactNode;
  inputClassName?: string;
  errorMessage?: string;
  mask?: string;
}

const classes = {
  container: {
    default: 'relative',
  },
  leftDecoration: {
    default: 'absolute w-8 h-full flex items-center justify-center',
    disabled: {
      true: 'fill-gray-400 text-gray-400',
    },
  },
  input: {
    default: 'rounded-xl shadow-system px-3 py-2 font-medium outline-none text-gray-600 bg-white w-full',
    disabled: {
      true: 'bg-gray-200 text-gray-400 text cursor-not-allowed',
    },
  },
  errorMessage: {
    default: 'text-red-500 text-sm pt-1 break-words',
  },
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, leftDecoration, disabled = false, className, inputClassName: inputClassNameProp, errorMessage, mask, ...rest }, ref) => {
    const disabledStr = disabled as unknown as 'true';
    const inputClassName = cn(classes.input.default, classes.input.disabled[disabledStr], leftDecoration && 'pl-8', inputClassNameProp);

    return (
      <div className={cn(classes.container.default, className)}>
        {leftDecoration && (
          <div className={cn(classes.leftDecoration.default, classes.leftDecoration.disabled[disabledStr])}>{leftDecoration}</div>
        )}
        {mask != null ? (
          <ReactInputMask {...rest} className={inputClassName} disabled={disabled} inputRef={ref} mask={mask} />
        ) : (
          <input {...rest} className={inputClassName} disabled={disabled} ref={ref} />
        )}
        {errorMessage && <div className={classes.errorMessage.default}>{errorMessage}</div>}
      </div>
    );
  },
);

import { FocusEvent } from 'react';
import { cn } from '../../utils/cn';
import Select, { components } from 'react-select';

export interface SelectInputProps {
  value?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  errorMessage?: string;
  className?: string;
  onChange?: (value?: string) => void;
  onBlur?: (e: FocusEvent) => void;
}

export function SelectInput({ value, placeholder, options, errorMessage, className, onChange, onBlur }: SelectInputProps) {
  return (
    <div className={cn('flex flex-col font-medium', className)}>
      <Select
        value={options.find((item) => item.value === value)}
        options={options}
        placeholder={placeholder}
        classNames={{
          control: () => '!rounded-xl !border-none !shadow-system pt-[4px]',
        }}
        onChange={(e) => onChange?.(e?.value)}
        onBlur={onBlur}
      />
      {errorMessage && <div className="text-red-500 text-sm pt-1 break-words">{errorMessage}</div>}
    </div>
  );
}

import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface PriceInputProps {
  value: string | number;
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
  autoComplete?: string;
  error?: string;
}

const PriceInputField = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, placeholder, error, inputLabelGap, ...props }, ref) => {
    return (
      <>
        {props.label && (
          <Label
            className='block font-medium text-sm md:text-base'
            style={{ marginBottom: `${inputLabelGap}px` }}
          >
            {props.label}
          </Label>
        )}
        <div className='w-full relative'>
          <Input
            type='text'
            placeholder={placeholder}
            value={value}
            className={`input ${error ? 'border-red-500' : 'border-gray-300'} hover:border-primary`}
            ref={ref}
            {...props}
          />
        </div>
        <p className={`mt-1 text-sm md:text-md text-red-500 h-6`}>{error ? error : ''}</p>
      </>
    );
  },
);

PriceInputField.displayName = 'PriceInputField';

export default PriceInputField;

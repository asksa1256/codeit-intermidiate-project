import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
  autoComplete?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, inputLabelGap, ...props }, ref) => {
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
            type={type}
            placeholder={placeholder}
            autoComplete={props.autoComplete}
            className={`input hover:border-primary ${error ? 'border-red-500' : 'border-gray-300'}`}
            ref={ref}
            {...props}
          />
        </div>
        <p className={`mt-1 text-sm md:text-md text-red-500 h-6`}>{error ? error : ''}</p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;

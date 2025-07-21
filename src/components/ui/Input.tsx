import { Input, Label } from '@headlessui/react';
import { forwardRef, ReactNode, MouseEvent } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
  autoComplete?: string;
  error?: string;
  icon?: ReactNode;
  iconTitle?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, icon, iconTitle, onClick, inputLabelGap, ...props }, ref) => {
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
            className={`input ${error ? 'border-red-500' : 'border-gray-300'}`}
            ref={ref}
            {...props}
          />
          {icon && (
            // 추후 IconButton 컴포넌트로 변경
            <button
              title={iconTitle}
              onClick={onClick}
              className='absolute right-[20px] top-1/2 -translate-y-1/2'
            >
              {icon}
            </button>
          )}
        </div>
        <p className={`mt-1 text-sm md:text-md text-red-500 h-6`}>{error ? error : ''}</p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;

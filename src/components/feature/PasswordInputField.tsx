import { Input, Label } from '@headlessui/react';
import { forwardRef, MouseEvent } from 'react';

import usePwVisibleToggle from '@/hooks/usePwVisibleToggle';

interface PasswordInputProps {
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
  autoComplete?: string;
  error?: string;
  onIconBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, error, inputLabelGap, ...props }, ref) => {
    const { isPwVisible, setIsPwVisible, ToggleIcon } = usePwVisibleToggle();

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
            type={isPwVisible ? 'text' : 'password'}
            placeholder={placeholder}
            autoComplete={props.autoComplete}
            className={`input ${error ? 'border-red-500' : 'border-gray-300'}`}
            ref={ref}
            {...props}
          />
          <button
            type='button'
            title='비밀번호 보기/숨김'
            onClick={() => setIsPwVisible((prev) => !prev)}
            className='absolute right-[20px] top-1/2 -translate-y-1/2'
          >
            <ToggleIcon isPwVisible={isPwVisible} />
          </button>
        </div>
        <p className={`mt-1 text-sm md:text-md text-red-500 h-6`}>{error ? error : ''}</p>
      </>
    );
  },
);

PasswordInputField.displayName = 'PasswordInputField';

export default PasswordInputField;

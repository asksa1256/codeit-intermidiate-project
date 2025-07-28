'use client';

import { Field, Label } from '@headlessui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import InfoIcon from '@/assets/icons/InfoIcon.svg';
import ImageUploader from '@/components/feature/ImageUpload/ImageUploader';
import ButtonDefault from '@/components/ui/ButtonDefault';
import DropdownWithSelectButton from '@/components/ui/Dropdown/DropdownWithSelectButton';
import InputField from '@/components/ui/Input';
import { KEYBOARD_TYPES } from '@/constants';

interface FormValues {
  name: string;
  price: string; // 1,000 단위 포맷팅을 위해 string으로 받음
  company: string;
  passwordCheck: string;
}

const AddKeyboardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    watch,
    trigger,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [type, setType] = useState('');

  const handleChangeType = (value: string) => {
    setType(value);
  };

  const onSubmit = async (formValues: FormValues) => {
    console.log(formValues, type);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col w-full gap-2.5'>
        <Field>
          <InputField
            label='키보드 이름'
            inputLabelGap={16}
            placeholder='키보드 이름 입력'
            {...register('name', {
              required: '키보드 이름을 입력해주세요.',
              setValueAs: (v) => v.trim(),
            })}
            error={errors.name?.message}
          />
        </Field>

        <Field>
          <InputField
            label='가격'
            inputLabelGap={16}
            placeholder='가격 입력'
            {...register('price', {
              required: '가격을 입력해주세요.',
              maxLength: {
                value: 20,
                message: '가격은 0원 이상이어야 합니다.',
              },
              setValueAs: (v) => v.trim(),
            })}
            error={errors.price?.message}
          />
        </Field>

        <Field>
          <InputField
            label='제조사'
            inputLabelGap={16}
            placeholder='제조사 입력'
            {...register('company', {
              required: '제조사를 입력해주세요.',
              setValueAs: (v) => v.trim(),
            })}
            error={errors.company?.message}
          />
        </Field>

        <Field>
          <Label className='block mb-4 font-medium text-sm md:text-base'>타입</Label>
          <DropdownWithSelectButton
            size='md'
            wide
            items={KEYBOARD_TYPES}
            onChange={handleChangeType}
          />
        </Field>

        <Field>
          <Label className='block mb-4 font-medium text-sm md:text-base'>키보드 사진</Label>
          <ImageUploader />
          <p className='flex items-center mt-2 text-md text-gray-500'>
            <InfoIcon className='w-4 h-4 text-gray-500 mr-1' />
            이미지는 세로 방향으로 등록됩니다.
          </p>
        </Field>
      </div>

      <div className='form-btm-actions flex-row'>
        <ButtonDefault type='submit' disabled={false} className='btn-secondary w-[108px]'>
          취소
        </ButtonDefault>
        <ButtonDefault type='submit' disabled={false} className='w-full'>
          키보드 등록하기
        </ButtonDefault>
      </div>
    </form>
  );
};

export default AddKeyboardForm;

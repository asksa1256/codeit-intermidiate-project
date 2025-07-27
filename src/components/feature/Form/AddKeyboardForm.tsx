'use client';

import { Field, Label } from '@headlessui/react';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import ImageUploadButton from '@/components/feature/ImageUploadButton';
import ButtonDefault from '@/components/ui/ButtonDefault';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import DropdownSelectButton from '@/components/ui/Dropdown/DropdownSelectButton';
import DropdownTrigger from '@/components/ui/Dropdown/DropdownTrigger';
import InputField from '@/components/ui/Input';

interface FormValues {
  name: string;
  price: string; // 포맷팅을 위해 string으로 받음
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

  const [dropdownValue, setDropdownValue] = useState<string>('기계식');

  const handleDropdownValue = (value: string) => {
    setDropdownValue(value ?? '기타');
  };

  const onSubmit = async (formValues: FormValues) => {
    console.log(formValues);
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
          <Dropdown size='md' wide>
            <DropdownTrigger className='w-full text-left'>
              <DropdownSelectButton value={dropdownValue} />
            </DropdownTrigger>
            <Dropdown.List>
              <Dropdown.Item onClick={() => handleDropdownValue('기계식')}>기계식</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownValue('멤브레인')}>
                멤브레인
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownValue('펜타그래프')}>
                펜타그래프
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </Field>

        <Field>
          <Label className='block mb-4 font-medium text-sm md:text-base'>와인 사진</Label>
          <ImageUploadButton />
        </Field>
      </div>

      <div className='form-btm-actions flex-row'>
        <ButtonDefault
          type='submit'
          disabled={false}
          className='w-[108px] bg-primary-10 text-primary'
        >
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

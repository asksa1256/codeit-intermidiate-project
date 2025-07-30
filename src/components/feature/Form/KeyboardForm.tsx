'use client';

import { Field, Label } from '@headlessui/react';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';

import InfoIcon from '@/assets/icons/InfoIcon.svg';
import ImageUploader from '@/components/feature/ImageUpload/ImageUploader';
import PriceInputField from '@/components/feature/InputField/PriceInputField';
import ButtonDefault from '@/components/ui/ButtonDefault';
import DropdownWithSelectButton from '@/components/ui/Dropdown/DropdownWithSelectButton';
import HintTextWithIcon from '@/components/ui/HintTextWithIcon';
import InputField from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import convertToTypeArray from '@/utils/convertToTypeArray';
import { formatPrice } from '@/utils/formatters';

export interface KeyboardFormValues {
  name: string;
  price: string; // form에서는 string으로 처리하고, 부모에서 number로 변환하여 api 요청
  region: string;
  type: string;
  image: string;
}

interface KeyboardFormProps {
  initialValues?: KeyboardFormValues;
  onSubmit: (formData: KeyboardFormValues) => void;
  onClose: () => void;
}

const KeyboardForm = ({ initialValues, onSubmit, onClose }: KeyboardFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<KeyboardFormValues>({
    mode: 'onChange',
    defaultValues: {
      ...initialValues,
      type: initialValues?.type === '' ? KEYBOARD_TYPES_MAP[0].type : initialValues?.type,
    },
  });

  const innerWidth = useWindowWidth();
  const isMobile = innerWidth < 640;

  const handleKeyboardFormSubmit = async (formValues: KeyboardFormValues) => {
    const formData = {
      ...formValues,
      type: convertToTypeArray(formValues.type),
    };

    try {
      onSubmit(formData);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert('등록 중 문제가 발생했습니다. 다시 시도해주세요. ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleKeyboardFormSubmit)}>
      <div className='flex flex-col w-full md:gap-2.5'>
        <Field>
          <InputField
            label='키보드 이름'
            inputLabelGap={isMobile ? 8 : 16}
            placeholder='키보드 이름 입력'
            {...register('name', {
              required: '키보드 이름을 입력해주세요.',
              setValueAs: (v) => v.trim(),
            })}
            error={errors.name?.message}
          />
        </Field>

        <Field>
          <PriceInputField
            label='가격'
            inputLabelGap={isMobile ? 8 : 16}
            value={formatPrice(watch('price') || '')} // or 조건: watch('price')가 undefined일 경우 replace 오류 방지 (항상 문자열 보장)
            placeholder='가격 입력'
            {...register('price', {
              required: '가격을 입력해주세요.',
              validate: {
                isNonNegative: (v) => {
                  const num = Number(v);
                  if (num <= 0) return '가격은 0원 이상이어야 합니다.';
                  return true;
                },
              },
              setValueAs: (v) => String(v).trim().replace(/[^\d]/g, ''),
            })}
            error={errors.price?.message}
          />
        </Field>

        <Field>
          <InputField
            label='제조사'
            inputLabelGap={isMobile ? 8 : 16}
            placeholder='제조사 입력'
            {...register('region', {
              required: '제조사를 입력해주세요.',
              setValueAs: (v) => v.trim(),
            })}
            error={errors.region?.message}
          />
        </Field>

        <Field>
          <Label className='block mb-2 md:mb-4 font-medium text-sm md:text-base'>타입</Label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <DropdownWithSelectButton
                items={KEYBOARD_TYPES_MAP}
                size='md'
                wide
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
        </Field>

        <Field>
          <Label className='block mb-2 md:mb-4 font-medium text-sm md:text-base'>키보드 사진</Label>
          <Controller
            name='image'
            control={control}
            rules={{ required: '키보드 이미지를 등록해주세요.' }}
            render={({ field, fieldState }) => (
              <>
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className='text-red-500 mt-1 text-sm'>{fieldState.error.message}</p>
                )}
              </>
            )}
          />

          <div className='mt-2'>
            <HintTextWithIcon
              text='투명 배경의 키보드 이미지를 등록해주세요. (최대 5MB)'
              icon={InfoIcon}
            />
            <HintTextWithIcon text='이미지는 세로 방향으로 등록됩니다.' icon={InfoIcon} />
          </div>
        </Field>
      </div>

      <div className='form-btm-actions flex-row'>
        <ButtonDefault
          type='button'
          disabled={false}
          className='btn-secondary w-[108px]'
          onClick={onClose}
        >
          취소
        </ButtonDefault>
        <ButtonDefault type='submit' disabled={!isValid || isSubmitting} className='w-full'>
          {isSubmitting ? (
            <>
              <LoadingSpinner className='inline-flex' />
              등록중...
            </>
          ) : initialValues ? (
            '수정하기'
          ) : (
            '키보드 등록하기'
          )}
        </ButtonDefault>
      </div>
    </form>
  );
};

export default KeyboardForm;

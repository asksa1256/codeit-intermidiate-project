'use client';

import { useRouter } from 'next/navigation';

import { Field, Label } from '@headlessui/react';
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import InfoIcon from '@/assets/icons/InfoIcon.svg';
import ImageUploader from '@/components/feature/ImageUpload/ImageUploader';
import PriceInputField from '@/components/feature/InputField/PriceInputField';
import ButtonDefault from '@/components/ui/ButtonDefault';
import DropdownWithSelectButton from '@/components/ui/Dropdown/DropdownWithSelectButton';
import HintTextWithIcon from '@/components/ui/HintTextWithIcon';
import InputField from '@/components/ui/Input';
import { KEYBOARD_TYPES_MAP, TEAM_ID } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import { apiClient } from '@/lib/api/apiClient';
import { KeyboardItemBase } from '@/types/keyboardTypes';
import convertToTypeArray from '@/utils/convertToTypeArray';
import { formatPrice } from '@/utils/formatters';

interface FormValues {
  name: string;
  price: string; // 1,000 단위 포맷팅을 위해 string으로 받음
  region: string;
  type: string;
  image: string;
}

const AddKeyboardForm = ({ onClose }: { onClose: () => void }) => {
  const [myKeyboards, setMyKeyboards] = useState<Pick<KeyboardItemBase, 'name'>[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      type: KEYBOARD_TYPES_MAP[0].value,
    },
  });

  const innerWidth = useWindowWidth();
  const isMobile = innerWidth < 640;

  const onSubmit = async (formValues: FormValues) => {
    const formData = {
      ...formValues,
      price: +formValues.price,
      type: convertToTypeArray(formValues.type),
    };

    const isDuplicate = myKeyboards.some((item) => item.name === formData.name);
    if (Array.isArray(myKeyboards) && isDuplicate) {
      setError('name', {
        message: '이미 등록하신 키보드입니다.',
      });

      setTimeout(() => {
        nameRef.current?.scrollIntoView();
        nameRef.current?.focus();
      }, 0);
      return;
    }

    try {
      const res = await apiClient.post(`/${TEAM_ID}/wines`, formData);
      const data = res?.data;
      router.replace(`/keyboards/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // 키보드 중복 등록 방지용 myKeyboards GET
  useEffect(() => {
    const getMyKeyboards = async () => {
      const res = await apiClient.get(`/${TEAM_ID}/users/me/wines?limit=20`);
      const data = res?.data.list;
      setMyKeyboards(data);
    };
    getMyKeyboards();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            // ref={nameRef}
            ref={(el) => {
              nameRef.current = el;
              register('name').ref(el);
            }}
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
              setValueAs: (v) => v.trim().replace(/[^\d]/g, ''), // 숫자만 저장
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
          키보드 등록하기
        </ButtonDefault>
      </div>
    </form>
  );
};

export default AddKeyboardForm;

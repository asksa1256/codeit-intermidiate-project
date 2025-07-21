'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Field } from '@headlessui/react';
import { useForm } from 'react-hook-form';

import EyeIcon from '@/assets/EyeIcon.svg';
import ButtonDefault from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/Input';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center w-full md:w-[496px] bg-white px-5 py-14 md:px-12 md:py-16 rounded-2xl shadow-primary'
    >
      <Link href='/' className='mb-10'>
        <Image src='/images/Logo.svg' alt='타닥 로고' width={118} height={48} priority />
      </Link>

      <div className='flex flex-col w-full gap-2.5'>
        <Field>
          <InputField
            type='email'
            label='이메일'
            inputLabelGap={10}
            placeholder='이메일 입력'
            autoComplete='email'
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: emailRegex,
                message: '이메일 형식으로 작성해주세요.',
              },
            })}
            error={errors.email?.message}
          />
        </Field>

        <Field>
          <InputField
            type='password'
            label='비밀번호'
            inputLabelGap={10}
            placeholder='비밀번호 입력'
            autoComplete='current-password'
            icon={<EyeIcon className='w-5 h-5 text-gray-500' />}
            iconTitle='비밀번호 표시'
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
            })}
            error={errors.password?.message}
          />
        </Field>
      </div>

      <div className='flex flex-col w-full mt-10 md:mt-10 mb-6 md:mb-8 gap-4'>
        <ButtonDefault
          type='submit'
          disabled={!isValid || isSubmitting}
          className='w-full sm:rounded-xl'
        >
          <span className='text-sm md:text-base'>로그인</span>
        </ButtonDefault>
        <ButtonDefault
          type='button'
          className='w-full bg-white border border-gray-300 sm:rounded-xl'
        >
          <span className='relative w-6 h-6 rounded-full'>
            <Image src='/images/KakaoIcon.svg' alt='카카오톡 로고' fill={true} />
          </span>
          <span className='text-gray-800 text-sm md:text-base'>카카오로 시작하기</span>
        </ButtonDefault>
      </div>

      <div className='flex gap-3.5 text-sm md:text-base'>
        <span className='text-gray-500'>계정이 없으신가요?</span>
        <Link href='/signup' className='text-primary underline underline-offset-4'>
          회원가입하기
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

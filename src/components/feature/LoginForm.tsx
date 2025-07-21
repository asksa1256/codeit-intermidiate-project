'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Field, Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';

import EyeIcon from '@/assets/EyeIcon.svg';
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
      className='flex flex-col items-center gap-4 md:gap-6 w-[420px] md:w-[496px] bg-white px-12 py-20 rounded-2xl shadow-primary'
    >
      <Link href='/' className='mb-10'>
        <Image src='/images/Logo.svg' alt='타닥 로고' width={118} height={48} priority />
      </Link>

      <Field className='flex flex-col w-full gap-2.5'>
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

      <Field className='flex flex-col w-full gap-2.5'>
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

      <div className='flex flex-col mt-10 md:mt-14 mb-6 md:mb-8 gap-4'>
        <Button type='submit' disabled={!isValid || isSubmitting}>
          로그인
        </Button>
        <Button type='button'>Kakao로 시작하기</Button>
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

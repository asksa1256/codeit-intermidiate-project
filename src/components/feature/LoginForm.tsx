'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Field } from '@headlessui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import EyeIcon from '@/assets/EyeIcon.svg';
import ButtonDefault from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/Input';
import { AxiosApiAuth } from '@/lib/api/axios';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

const LoginForm = () => {
  const [isPwVisible, setIsPwVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const auth = new AxiosApiAuth();

  const router = useRouter();

  const onSubmit = async (formValues: FormValues) => {
    const { email, password } = formValues;

    try {
      await auth.signInByEmail(email, password);
      router.push('/');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setError('email', {
          type: 'manual',
          message: '이메일 혹은 비밀번호를 확인해주세요.',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
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
            type={isPwVisible ? 'text' : 'password'}
            label='비밀번호'
            inputLabelGap={10}
            placeholder='비밀번호 입력'
            autoComplete='current-password'
            icon={<EyeIcon className='w-5 h-5 text-gray-500' />}
            iconTitle='비밀번호 보기'
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호를 8자 이상 입력해주세요.',
              },
            })}
            onIconBtnClick={() => setIsPwVisible((prev) => !prev)}
            error={errors.password?.message}
          />
        </Field>
      </div>

      <div className='form-btm-actions'>
        <ButtonDefault type='submit' disabled={!isValid || isSubmitting} className='w-full'>
          <span>로그인</span>
        </ButtonDefault>

        <ButtonDefault className='w-full bg-white border border-gray-300 sm:rounded-xl hover:border-primary'>
          <span className='relative w-6 h-6 rounded-full'>
            <Image src='/images/KakaoIcon.svg' alt='카카오톡 로고' fill={true} />
          </span>
          <span className='text-gray-800'>카카오로 시작하기</span>
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

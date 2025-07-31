'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Field } from '@headlessui/react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import PasswordInputField from '@/components/feature/InputField/PasswordInputField';
import KakaoLoginButton from '@/components/feature/KakaoLoginButton';
import ButtonDefault from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/Input';
import { AxiosApiAuth } from '@/lib/api/axios';
import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = new AxiosApiAuth();
  const signIn = useAuthStore((state) => state.signIn);
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (formValues: FormValues) => {
    const { email, password } = formValues;

    try {
      const res = await auth.signInByEmail(email, password);
      const { user, accessToken, refreshToken } = res;
      signIn({ user, accessToken, refreshToken }); // 유저 정보 zustand store에 저장

      // 쿼리 파라미터에서 redirect_url 가져오기 (로그인 후 리다이렉트 처리)
      const redirectUrl = searchParams.get('redirect_url');

      if (redirectUrl) {
        router.replace(redirectUrl);
      } else {
        router.push('/');
      }

      addToast({ message: `안녕하세요, ${user.nickname}님!`, type: 'success', duration: 2000 });
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
              setValueAs: (v) => v.trim(),
            })}
            error={errors.email?.message}
          />
        </Field>

        <Field>
          <PasswordInputField
            label='비밀번호'
            inputLabelGap={10}
            placeholder='비밀번호 입력'
            autoComplete='current-password'
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호를 8자 이상 입력해주세요.',
              },
              setValueAs: (v) => v.trim(),
            })}
            error={errors.password?.message}
          />
        </Field>
      </div>

      <div className='form-btm-actions'>
        <ButtonDefault type='submit' disabled={!isValid || isSubmitting} className='w-full'>
          <span>로그인</span>
        </ButtonDefault>

        <KakaoLoginButton />
      </div>

      <div className='flex gap-3.5 text-sm md:text-base'>
        <span className='text-gray-500'>계정이 없으신가요?</span>
        <Link href='/signUp' className='text-primary underline underline-offset-4'>
          회원가입하기
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

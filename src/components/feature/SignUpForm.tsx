'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Field } from '@headlessui/react';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ButtonDefault from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/Input';
import { AxiosApiAuth } from '@/lib/api/axios';

import PasswordInputField from './PasswordInputField';

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^[A-Za-z0-9!@#$%^&*]+$/;

const SignInForm = () => {
  const router = useRouter();
  const auth = new AxiosApiAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    watch,
    trigger,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (formValues: FormValues) => {
    const { email, nickname, password, passwordCheck: passwordConfirmation } = formValues;

    try {
      await auth.signUpByEmail(email, nickname, password, passwordConfirmation);
      await auth.signInByEmail(email, password);
      router.push('/');
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        // 이메일 중복
        setError('email', {
          type: 'manual',
          message: '이미 사용중인 이메일입니다.',
        });
      }

      if (err.response?.status === 500) {
        // 닉네임 중복
        setError('nickname', {
          type: 'manual',
          message: '이미 사용중인 닉네임입니다.',
        });
      }
    }
  };

  const password = watch('password');
  const passwordCheck = watch('passwordCheck');

  useEffect(() => {
    if (password && passwordCheck.length >= 8) trigger('passwordCheck');
  }, [password, passwordCheck, trigger]);

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
            placeholder='tadak@email.com'
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
            type='text'
            label='닉네임'
            inputLabelGap={10}
            placeholder='tadak'
            {...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 20,
                message: '닉네임은 최대 20자까지 가능합니다.',
              },
            })}
            error={errors.nickname?.message}
          />
        </Field>

        <Field>
          <PasswordInputField
            label='비밀번호'
            inputLabelGap={10}
            placeholder='영문, 숫자, 일부 특수문자(!@#$%^&*) 입력'
            autoComplete='new-password'
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상입니다.',
              },
              pattern: {
                value: passwordRegex,
                message: '비밀번호는 숫자, 영문, 일부 특수문자(!@#$%^&*)로만 가능합니다.',
              },
            })}
            error={errors.password?.message}
          />
        </Field>

        <Field>
          <PasswordInputField
            label='비밀번호 확인'
            inputLabelGap={10}
            placeholder='비밀번호 확인'
            autoComplete='new-password'
            {...register('passwordCheck', {
              required: '비밀번호 확인을 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호가 일치하지 않습니다.',
              },
              validate: (val) => {
                if (val !== watch('password')) {
                  return '비밀번호가 일치하지 않습니다.';
                } else {
                  return true; // 비밀번호 입력값 서로 다를 시, 비밀번호 '확인' 필드에만 에러 표시
                }
              },
            })}
            error={errors.passwordCheck?.message}
          />
        </Field>
      </div>

      <div className='form-btm-actions'>
        <ButtonDefault type='submit' disabled={!isValid || isSubmitting} className='w-full'>
          가입하기
        </ButtonDefault>
      </div>

      <div className='flex gap-3.5 text-sm md:text-base'>
        <span className='text-gray-500'>계정이 이미 있으신가요?</span>
        <Link href='/login' className='text-primary underline underline-offset-4'>
          로그인하기
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;

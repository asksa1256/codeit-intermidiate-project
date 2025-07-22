import LoginForm from '@/components/feature/LoginForm';

import ClientAutoLogin from './ClientAutoLogin';

const LoginPage = async () => {
  return (
    <section className='w-full flex justify-center py-20 px-4'>
      <ClientAutoLogin />
      <LoginForm />
    </section>
  );
};

export default LoginPage;

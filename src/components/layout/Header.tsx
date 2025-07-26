import Link from 'next/link';

const HeaderComponent = () => {
  return (
    <header className="mx-auto my-4 flex min-w-[145px] max-w-[966px] items-center justify-between rounded-2xl bg-[#101318] p-4 text-xl font-bold text-white md:px-[80px] md:py-[25px]">
      <Link href="/">tadak</Link>
      <div className="flex items-center gap-10">
        <Link href="/login">로그인</Link>
        <Link href="/signUp">회원가입</Link>
      </div>
    </header>
  );
};

export default HeaderComponent;


'use client';

import { useEffect } from 'react';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error('런타임 전역 에러 발생: ', error);
  }, [error]);

  return (
    <html>
      <body>
        <main>
          <h2>일시적인 문제가 발생했습니다.</h2>
          <p>잠시 후 다시 시도해 주세요.</p>
          <button onClick={() => reset()}>다시 시도하기</button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;

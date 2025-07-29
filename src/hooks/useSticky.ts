import { useCallback, useEffect, useRef, useState } from 'react';

const TABLET_WIDTH = 640;

//targetY는 타겟 DOM요소가 sticky가 되는 뷰포트상의 y좌표입니다.
const useSticky = (targetY: number, tabletTargetY?: number) => {
  const [isFixedOnTop, setIsFixedOnTop] = useState(false);
  const stickyRef = useRef<HTMLElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!stickyRef.current) {
      return;
    }

    const rect = stickyRef.current?.getBoundingClientRect();
    //스크롤 이벤트 발생시 y값에 소수점 자리의 미세한 변동이 있을 수 있으므로 그 오차 허용값
    const THRESHOLD = 1;
    const currentViewport = window.innerWidth;
    const isTabletView = currentViewport >= TABLET_WIDTH;

    if (tabletTargetY && isTabletView) {
      if (rect.y < tabletTargetY + THRESHOLD) {
        setIsFixedOnTop(true);
        return;
      } else {
        setIsFixedOnTop(false);
        return;
      }
    }

    if (rect.y < targetY + THRESHOLD) {
      setIsFixedOnTop(true);
      return;
    } else {
      setIsFixedOnTop(false);
      return;
    }
  }, [targetY, tabletTargetY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isFixedOnTop, stickyRef };
};

export default useSticky;

import Image from 'next/image';

import { cn } from '@/utils/style';

/**
 * imgSrc: 이미지 경로
 * keyboardName: 이미지 alt에 들어갈 키보드 이름
 * ratio: 비율 조절(mo: 180 → ta/pc: 220) - 길이를 늘이고 싶으면 값을 키워주세요.
 * className: div 클래스네임 병합용
 */
interface Props {
  imgSrc: string;
  keyboardName: string;
  ratio?: {
    mo?: number;
    ta?: number;
    pc?: number;
  };
  className?: string;
}

const DEFAULT_RATIO = {
  mo: 180,
  ta: 220,
  pc: 220,
};

const wrapDefaultStyle = 'relative pt-[180%] overflow-hidden';
const figureDefaultStyle = 'absolute bottom-0 right-full rotate-90 origin-bottom-right';

const KeyboardThumbnail = ({ imgSrc, keyboardName, ratio, className }: Props) => {
  const customRatio = {
    ...DEFAULT_RATIO,
    ...ratio,
  };
  const wrapMergedClassName = cn(wrapDefaultStyle, className);

  const customRatioStyle = `w-[${customRatio.mo}%] aspect-[${customRatio.mo}/100] md:w-[${customRatio.ta}%] md:aspect-[${customRatio.ta}/100] lg:w-[${customRatio.pc}%] lg:aspect-[${customRatio.pc}/100]`;
  const figureMergedClassName = cn(figureDefaultStyle, customRatioStyle);

  return (
    <div className={wrapMergedClassName}>
      <figure className={figureMergedClassName}>
        <Image
          src={imgSrc}
          alt={keyboardName}
          width={300}
          height={300}
          className='w-full h-full object-contain object-left md:object-cover'
        />
      </figure>
    </div>
  );
};

export default KeyboardThumbnail;

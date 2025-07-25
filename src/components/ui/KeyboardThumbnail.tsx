import Image from 'next/image';

import { cn } from '@/utils/style';

/**
 * imgSrc: 이미지 경로
 * keyboardName: 이미지 alt에 들어갈 키보드 이름
 * ratioClass: ratio 조절용 클래스네임,
 * ex) 웹에서 길이를 좀 늘이고 싶다면, ratioClass='lg:w-[230%] lg:aspect-[230/100]' width와 aspect 값 통일 시켜주세요.
 * className: div 클래스네임 병합용
 */
interface Props {
  imgSrc: string;
  keyboardName: string;
  ratioClass?: string;
  className?: string;
}

const wrapDefaultStyle = 'relative pt-[180%] overflow-hidden';
const figureDefaultStyle =
  'absolute bottom-0 right-full rotate-90 origin-bottom-right w-[180%] aspect-[180/100] md:w-[220%] md:aspect-[220/100]';

const KeyboardThumbnail = ({ imgSrc, keyboardName, ratioClass, className }: Props) => {
  const wrapMergedClassName = cn(wrapDefaultStyle, className);
  const figureMergedClassName = cn(figureDefaultStyle, ratioClass);

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

import Image from 'next/image';
import Link from 'next/link';

import StarRating from '@/components/ui/StarRating';
import { KeyboardMiniItem } from '@/types/keyboardTypes';
import { formatRating } from '@/utils/formatters';

const KeyboardMiniCard = ({ item }: KeyboardMiniItem) => {
  return (
    <Link
      href={`/keyboards/${item.id}`}
      className='block w-[192px] h-[160px] md:w-[232px] md:h-[185px] px-6 md:px-[30px] pt-6 bg-white rounded-xl shadow-primary'
    >
      <div className='flex gap-4 md:gap-6'>
        <div className='shrink-0 w-[52px] md:w-[60px] mt-[130%] md:mt-[118%]'>
          <div className='relative'>
            <figure className='absolute bottom-0 rotate-90 right-full origin-bottom-right w-[180px] aspect-[160/44] md:w-[200px] md:aspect-[184/56]'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes={`(max-width: 639px) 128px, 400px`}
              />
            </figure>
          </div>
        </div>
        <div className='flex flex-col gap-1.5 w-full'>
          <span className='font-bold text-[28px] md:text-4xl text-gray-800'>
            {formatRating(item.avgRating)}
          </span>
          <StarRating value={item.avgRating} />
          <h6 className='text-[10px] md:text-xs text-gray-500 break-keep line-clamp-4'>
            {item.name}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default KeyboardMiniCard;

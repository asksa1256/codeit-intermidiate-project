import RangeSliderReadonly from './RangeSliderReadonly';

interface Props {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

const KeyboardProperties = ({ lightBold, smoothTannic, drySweet, softAcidic }: Props) => {
  const properties = [
    { label: '무게감', content: ['가벼움', '무거움'], value: lightBold },
    { label: '타건감', content: ['부드러움', '선명함'], value: smoothTannic },
    { label: '소리', content: ['조용함', '경쾌함'], value: drySweet },
    { label: '반동', content: ['약함', '강함'], value: softAcidic },
  ];

  return (
    <div className='flex flex-col gap-3 md:gap-5 py-4 md:py-6 whitespace-nowrap'>
      {properties.map((property) => (
        <div className='flex items-center gap-3' key={property.label}>
          <span className='text-center text-xs text-gray-500 font-semibold bg-gray-100 rounded-md px-2 py-[5px] w-12 md:w-14 h-[30px]'>
            {property.label}
          </span>
          <span className='text-md md:text-base font-medium w-12 md:w-14'>
            {property.content[0]}
          </span>
          <RangeSliderReadonly className='flex-1 md:flex:none md:w-99' value={property.value} />
          <span className='text-md md:text-base font-medium w-12 md:w-14 text-right'>
            {property.content[1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KeyboardProperties;

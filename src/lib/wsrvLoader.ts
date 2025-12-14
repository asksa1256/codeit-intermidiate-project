type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * wsrv.nl 로더
 * 모든 next/image 최적화 요청을 wsrv.nl 로 전달
 * 자동 webp 변환 + 품질 조정
 */
export default function wsrvLoader({ src, width, quality }: LoaderProps): string {
  //public에 존재하는 로컬 이미지인 경우 서버를 거치지 않고 원본 src반환(경로/로 시작해야 정상 작동)
  if (src.startsWith('/')) return src;

  const q = quality || 75;
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=${q}&output=webp`;
}

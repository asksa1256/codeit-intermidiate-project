import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    //이미지 최적화를 vercel이 아닌 wsrv에서 처리
    loader: 'custom',
    loaderFile: './src/lib/wsrvLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**', // 경로 패턴, 모든 이미지 허용
      },
    ],
  },
};

export default nextConfig;

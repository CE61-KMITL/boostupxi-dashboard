/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/api/:path*',
        destination: `https://api.ceboostup.com/:path*`,
      },
    ];
  };
  return {
    rewrites,
    reactStrictMode: true,
    images: {
      domains: ['boostup-xi.s3.amazonaws.com'],
    },
    //uncomment if production build docker
    output: 'standalone',
  };
};

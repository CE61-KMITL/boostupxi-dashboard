/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}:path*`,
      },
    ];
  };
  return {
    rewrites,
    reactStrictMode: true,

    //uncomment if production build docker
    //output: 'standalone',

  };
};

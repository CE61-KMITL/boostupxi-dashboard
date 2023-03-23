/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5000/:path*',
        
      },
    ];
  };
  return {
    output: 'standalone',
    rewrites,
    reactStrictMode: true,
  };
};

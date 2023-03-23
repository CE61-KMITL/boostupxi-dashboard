/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*',
        
      },
    ];
  };
  return {
    rewrites,
    reactStrictMode: true,
  };
};

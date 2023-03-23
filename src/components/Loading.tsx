import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-xl font-medium text-gray-900">Loading...</p>
    </div>
  );
};

export default Loading;

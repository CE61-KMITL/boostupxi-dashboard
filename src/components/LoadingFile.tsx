const LoadingFile = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center space-x-2 bg-opacity-50 dark:bg-gray-900">
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-700 dark:bg-violet-400"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-700 dark:bg-violet-400"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-700 dark:bg-violet-400"></div>
    </div>
  );
};

export default LoadingFile;

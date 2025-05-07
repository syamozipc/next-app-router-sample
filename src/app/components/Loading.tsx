type LoadingProps = {
  fullscreen?: boolean;
};

const Loading = ({ fullscreen = false }: LoadingProps) => {
  const containerClass = fullscreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClass}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
    </div>
  );
};

export default Loading;

const LoadingSpinner = ({ text }: { text?: string }) => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='w-8 h-8 border-4 mb-4 border-gray-300 border-t-primary rounded-full animate-spin' />
      <p>{text}</p>
    </section>
  );
};

export default LoadingSpinner;

interface Props {
  endRef: React.ForwardedRef<HTMLDivElement>;
  hasNextPage: boolean;
}

const ScrollLoading = ({ endRef, hasNextPage }: Props) => {
  return (
    <div ref={endRef}>
      {hasNextPage ? (
        <div className='w-8 h-8 mx-auto border-4 border-gray-300 border-t-primary rounded-full animate-spin' />
      ) : null}
    </div>
  );
};

export default ScrollLoading;

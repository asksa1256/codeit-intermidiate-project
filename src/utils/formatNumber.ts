const formatNumber = (value: number) => {
  const num = value;
  if (isNaN(num)) {
    return '';
  }
  return num.toLocaleString('ko-kr');
};

export default formatNumber;

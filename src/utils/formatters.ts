export const formatPrice = (value: string | number) => {
  const isString = typeof value === 'string';
  const price = isString ? Number(value.replaceAll(',', '')) : value;
  const formatValue = isNaN(price) ? '0' : price.toLocaleString('ko-KR');
  return formatValue;
};

export const formatRelativeTime = (targetDate: string) => {
  const now = Date.now();
  const timestampTarget = new Date(targetDate).getTime();

  const passedSecond = Math.floor((now - timestampTarget) / 1000);
  const passedMinute = Math.floor(passedSecond / 60);
  const passedHour = Math.floor(passedMinute / 60);
  const passedDay = Math.floor(passedHour / 24);
  const passedMonth = Math.floor(passedDay / 30.4375);
  const passedYear = Math.floor(passedMonth / 12);

  if (passedYear > 0) {
    return `${passedYear}년 전`;
  } else if (passedMonth > 0) {
    return `${passedMonth}달 전`;
  } else if (passedDay > 0) {
    return `${passedDay}일 전`;
  } else if (passedHour > 0) {
    return `${passedHour}시간 전`;
  } else if (passedMinute > 0) {
    return `${passedMinute}분 전`;
  } else {
    return `${passedSecond}초 전`;
  }
};

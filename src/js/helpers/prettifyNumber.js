const prettifyNumber = (number) => {
  const separator = ' ';
  return number
    .toString()
    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${separator}`);
};

export default prettifyNumber;

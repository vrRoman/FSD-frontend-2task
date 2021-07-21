const declinationByNumber = (number, words) => {
  const lastTwoDigits = Math.abs(number) % 100;
  const lastDigit = lastTwoDigits % 10;
  const lastTwoDigitsFrom10To20 = lastTwoDigits > 10 && lastTwoDigits < 20;
  const lastDigitFrom1To5 = lastDigit > 1 && lastDigit < 5;

  if (lastTwoDigitsFrom10To20) {
    return words[2];
  }
  if (lastDigitFrom1To5) {
    return words[1];
  }
  if (lastDigit === 1) {
    return words[0];
  }
  return words[2];
};

export default declinationByNumber;

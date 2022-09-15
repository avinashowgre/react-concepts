import React, { useEffect, useState } from 'react';

const EXPIRY_TIME = 1000;

const genrateCode = (n) => {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ('' + number).substring(add);
};

export function Timer() {
  const [otp, setOtp] = useState(genrateCode(6));
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer === 0) {
        setOtp(genrateCode(6));
        setTimer(30);
      } else {
        setTimer(timer - 1);
      }
    }, EXPIRY_TIME);

    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <div>
      <p>OTP: {otp}</p>
      <span>Expires in {timer} seconds</span>
    </div>
  );
}

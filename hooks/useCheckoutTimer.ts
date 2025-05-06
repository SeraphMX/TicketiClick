// hooks/useCheckoutTimer.ts
// Hook para manejar el timer del checkout

import { useState, useEffect } from 'react';

export const useCheckoutTimer = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return {
    timeLeft,
    expired,
  };
};
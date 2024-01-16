import React from 'react';
import { useQuery } from 'react-query';

const CountdownTimer = ({ endDate }) => {
  const { data } = useQuery('countdown', () => calculateTimeLeft(), {
    refetchInterval: 1000,
  });

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const endDateTime = new Date(endDate).getTime();
    const timeDifference = endDateTime - now;

    if (timeDifference <= 0) {
      // The countdown has ended
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className='d-flex justify-content-center mt-3'>
      <p className='me-2 fs-4 dark-grey-text'>Bidding End at :</p>
      <p className='fs-4 light-grey-text'>{data?.days ?? 0}d {data?.hours ?? 0}h {data?.minutes ?? 0}m {data?.seconds ?? 0}s</p>
    </div>
  );
};

export default CountdownTimer;

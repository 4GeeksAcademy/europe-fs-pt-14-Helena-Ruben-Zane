import React, { useState, useEffect } from "react";
import InputDigitCard from "./Input";

export const TimeCounter = () => {
  const [counter, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10)

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const hours = Math.floor(counter / 360000);
  const minutes = Math.floor((counter % 360000) / 6000);
  const seconds = Math.floor((counter % 6000) / 100);
  const milliseconds = counter % 100;

 

    <div className="container-fluid">
      <InputDigitCard
        Watcher
        digitSix={Math.floor(hours / 10)}
        digitFive={hours % 10}
        digitFour={Math.floor(minutes / 10)}
        digitThree={minutes % 10}
        digitTwo={Math.floor(seconds / 10)}
        digitOne={seconds % 10}
        milliseconds={milliseconds}
      />
    </div>
};



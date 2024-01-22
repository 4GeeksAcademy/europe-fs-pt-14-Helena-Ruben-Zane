import React, { useState, useEffect } from "react";
import Counter from "./counter";

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


    <div className="container-fluid">
      <Counter
        Watcher
        digitThree={Math.floor(hours / 10) % 10 }
        digitTwo={Math.floor(minutes / 10) % 10}
        digitOne={Math.floor(seconds / 10) % 10}
      />
    </div>
};



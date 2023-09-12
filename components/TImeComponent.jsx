import React, { useState, useEffect } from "react";
import moment from "moment";

function TimeComponent() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="">{currentTime.format("HH:mm:ss")}</p>;
}

export default TimeComponent;

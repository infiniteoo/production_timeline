import React from "react";
import TimeComponent from "./TimeComponent";
import WeatherComponent from "./WeatherComponent";

const TimeAndWeather = () => {
  console.log(process.env.NODE_ENV.API_KEY);
  return (
    <div className=" flex flex-col items-center">
      <div className="text-4xl p-1 text-center mr-2">
        <TimeComponent />
      </div>
      <WeatherComponent
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        city={"Boise"}
      />
    </div>
  );
};

export default TimeAndWeather;

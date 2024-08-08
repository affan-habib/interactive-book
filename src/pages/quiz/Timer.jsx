import React, { useState, useEffect } from "react";

const Stopwatch = ({ startTime = 3 }) => {
    const [time, setTime] = useState(startTime * 60);

    useEffect(() => {
        let interval;
        if (time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            console.log('time end')
        }

        return () => clearInterval(interval);
    }, [time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const minuteString = String(minutes).padStart(2, "0"); // Ensure two digits for minutes
    const secondString = String(seconds).padStart(2, "0"); // Ensure two digits for seconds
    const minuteDigits = minuteString.split("");
    const secondDigits = secondString.split("");

    return (
        <div>
            <div className="p-3 shadow-lg mb-2 rounded-md border border-slate-200">
                <h6 className="flex items-center">
                    {minuteDigits.map((digit, index) => (
                        <span
                            key={index}
                            className="bg-rose-400 rounded-sm py-1 px-2 mr-1 h-[40px] w-[30px] flex items-center justify-center text-white text-3xl"
                        >
                            {digit}
                        </span>
                    ))}
                    <span className="bg-rose-400 rounded-sm py-1 px-2 mr-1 w-[15px]  h-[40px] flex items-center justify-center text-white text-3xl">
                        :
                    </span>
                    {secondDigits.map((digit, index) => (
                        <span
                            key={index}
                            className="bg-rose-400 rounded-sm py-1 px-2 mr-1  h-[40px] w-[30px] flex items-center justify-center text-white text-3xl"
                        >
                            {digit}
                        </span>
                    ))}
                </h6>
            </div>
        </div>
    );
};

export default Stopwatch;

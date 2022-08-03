import React from "react";
import { useState, useEffect } from "react";

export const TimeCounter = () => {
    const [seconds, setSecondsCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsCount(seconds => seconds + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <p>You have used {seconds} seconds on this website</p>
    )
} 
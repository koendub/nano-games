"use client";

import { useEffect, useState } from "react";
import { Timer } from 'lucide-react';
import useSound from 'use-sound';


interface CountDownTimerProps {
    duration: number;
    onEnd: () => void;
}

export default function CountDownTimer({ duration, onEnd }: CountDownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [ playEndSound ] = useSound("/alarm_analog_timer.mp3");

  useEffect(() => {
    if (timeLeft === 0) {
      playEndSound();
      onEnd();
    }
  }, [onEnd, timeLeft, playEndSound]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center">
      <Timer size={24} />
      <div className="text-xl ml-2">
        {timeLeft}
      </div>
    </div>
  )
}
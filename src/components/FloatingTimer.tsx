import React, { useState, useEffect } from "react";

interface FloatingTimerProps {
  totalMinutes: number;
  questionCount: number;
  onReset: () => void;
}

const FloatingTimer: React.FC<FloatingTimerProps> = ({
  totalMinutes,
  questionCount,
  onReset,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalMinutes * 60);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(
    Math.floor((totalMinutes * 60) / questionCount)
  );
  const [isRunning, setIsRunning] = useState(true);

  const timePerQuestion = Math.floor((totalMinutes * 60) / questionCount);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && totalTimeLeft > 0) {
      interval = setInterval(() => {
        setTotalTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });

        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentQuestion < questionCount) {
              setCurrentQuestion((q) => q + 1);
              return timePerQuestion;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalTimeLeft, currentQuestion, questionCount, timePerQuestion]);

  // Format for per-question timer (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Format for total time (hrs + mins)
  const formatTimeHM = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  // Progress calculations
  const questionProgress = ((currentQuestion - 1) / questionCount) * 100;
  const totalProgress =
    ((totalMinutes * 60 - totalTimeLeft) / (totalMinutes * 60)) * 100;

  // Color coding based on total time left %
  const remainingPercent = (totalTimeLeft / (totalMinutes * 60)) * 100;
  let timeColor = "text-green-400";
  let barColor = "bg-green-400";

  if (remainingPercent <= 30 && remainingPercent > 10) {
    timeColor = "text-yellow-400";
    barColor = "bg-yellow-400";
  } else if (remainingPercent <= 10) {
    timeColor = "text-red-500";
    barColor = "bg-red-500";
  }

  return (
    <div className="bg-slate-900/95 backdrop-blur-lg border border-white/40 rounded-3xl shadow-3xl p-12 w-[90%] max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-4xl font-bold text-white">⏳ Exam Timer</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-4 hover:bg-white/10 rounded-xl transition-colors"
          >
            {isRunning ? (
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onReset}
            className="p-4 hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Current Question Timer */}
      <div className="text-center mb-12">
        <div className="text-8xl font-extrabold text-green-400 mb-4">
          {formatTime(questionTimeLeft)}
        </div>
        <div className="text-2xl text-white/80 mb-4">
          Question {currentQuestion} of {questionCount}
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="bg-green-400 h-4 rounded-full transition-all duration-1000"
            style={{
              width: `${
                ((timePerQuestion - questionTimeLeft) / timePerQuestion) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Total Time */}
      <div className="text-center mb-10 p-8 bg-slate-800/60 rounded-2xl">
        <div className={`text-7xl font-extrabold mb-3 ${timeColor}`}>
          {formatTimeHM(totalTimeLeft)}
        </div>
        <div className="text-xl text-white/70 mb-4">Total Time Remaining</div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className={`${barColor} h-3 rounded-full transition-all duration-1000`}
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Progress Info */}
      <div className="text-xl text-white/70 text-center">
        {Math.round(questionProgress)}% Complete •{" "}
        {questionCount - currentQuestion + 1} Questions Left
      </div>
    </div>
  );
};

export default FloatingTimer;

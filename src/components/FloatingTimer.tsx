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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const questionProgress = ((currentQuestion - 1) / questionCount) * 100;
  const totalProgress =
    ((totalMinutes * 60 - totalTimeLeft) / (totalMinutes * 60)) * 100;

  return (
    <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 min-w-[320px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Question Timer</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isRunning ? (
              <svg
                className="w-4 h-4 text-white"
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
                className="w-4 h-4 text-white"
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
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
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
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-green-400 mb-2">
          {formatTime(questionTimeLeft)}
        </div>
        <div className="text-sm text-white/70">
          Question {currentQuestion} of {questionCount}
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-1000"
            style={{
              width: `${
                ((timePerQuestion - questionTimeLeft) / timePerQuestion) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Total Time */}
      <div className="text-center mb-4 p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-semibold text-blue-400 mb-1">
          {formatTime(totalTimeLeft)}
        </div>
        <div className="text-xs text-white/60">Total Time Remaining</div>
        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
          <div
            className="bg-blue-400 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Progress Info */}
      <div className="text-xs text-white/60 text-center">
        {Math.round(questionProgress)}% Complete •{" "}
        {questionCount - currentQuestion + 1} Questions Left
      </div>
    </div>
  );
};

export default FloatingTimer;

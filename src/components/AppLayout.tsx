import React, { useState } from "react";
import TimerSetup from "./TimerSetup";
import FloatingTimer from "./FloatingTimer";

const AppLayout: React.FC = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerConfig, setTimerConfig] = useState({
    totalMinutes: 0,
    questionCount: 0,
  });

  const handleStartTimer = (totalMinutes: number, questionCount: number) => {
    setTimerConfig({ totalMinutes, questionCount });
    setTimerActive(true);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimerConfig({ totalMinutes: 0, questionCount: 0 });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {!timerActive ? (
        // Landing + Setup Page
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
            <div className="text-center mb-12">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/68d020a9c78ae34555974d7c_1758470356240_d13b0520.webp"
                alt="Floating Timer Interface"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8 opacity-80"
              />
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Floating Question Timer
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                Intelligent time management for exams and quizzes. Set your total
                time and question count, and let our floating timer pace your
                questions while tracking progress.
              </p>
            </div>

            <TimerSetup onStart={handleStartTimer} />

            {/* Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Smart Time Splitting
                </h3>
                <p className="text-white/70 text-sm">
                  Automatically divides your total time evenly across all
                  questions
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Draggable & Floating
                </h3>
                <p className="text-white/70 text-sm">
                  Move the timer anywhere on your screen, stays on top of other
                  apps
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Dual Progress Tracking
                </h3>
                <p className="text-white/70 text-sm">
                  See both per-question countdown and total time remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Active Timer Page (centered timer on plain background)
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <FloatingTimer
            totalMinutes={timerConfig.totalMinutes}
            questionCount={timerConfig.questionCount}
            onReset={handleResetTimer}
          />
        </div>
      )}
    </div>
  );
};

export default AppLayout;

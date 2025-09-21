import React, { useState } from "react";
import TimerSetup from "./TimerSetup";
import FloatingTimer from "./FloatingTimer";
import logo from '../img/edu_logo.jpg'

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
                src={logo}
                alt="Floating Timer Interface"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8 opacity-80"
              />
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Floating Question Timer
              </h1>
            </div>

            <TimerSetup onStart={handleStartTimer} />

            {/* Features */}
            
              {/* Feature 1 */}

              {/* Feature 2 */}

              {/* Feature 3 */}
              
  
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

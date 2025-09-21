import React, { useState } from 'react';

interface TimerSetupProps {
  onStart: (totalMinutes: number, questionCount: number) => void;
}

const TimerSetup: React.FC<TimerSetupProps> = ({ onStart }) => {
  const [totalMinutes, setTotalMinutes] = useState<number>(60);
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handleStart = () => {
    if (totalMinutes > 0 && questionCount > 0) {
      onStart(totalMinutes, questionCount);
    }
  };

  const timePerQuestion = totalMinutes / questionCount;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Timer Setup</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Total Time (minutes)
          </label>
          <input
            type="number"
            value={totalMinutes}
            onChange={(e) => setTotalMinutes(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            min="1"
            max="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            min="1"
            max="100"
          />
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-white/80 text-sm">
            Time per question: <span className="font-semibold text-green-400">{timePerQuestion.toFixed(1)} minutes</span>
          </p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Start Timer
        </button>
      </div>
    </div>
  );
};

export default TimerSetup;
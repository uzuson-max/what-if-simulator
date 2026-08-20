'use client';

import React, { useState, useEffect } from 'react';

export default function WhatIfApp() {
  const [step, setStep] = useState('HOME'); // 'HOME' | 'RUNNING' | 'RESULT'
  const [speed, setSpeed] = useState(30); // 기본 속도 30%
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSimulatingLag, setIsSimulatingLag] = useState(false);

  // 실행 중일 때 타이머 작동
  useEffect(() => {
    let timer;
    if (step === 'RUNNING') {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  // 가상의 지연(Lag) 효과 체험 버튼 클릭 시
  const handleTriggerLag = () => {
    setIsSimulatingLag(true);
    setTimeout(() => {
      setIsSimulatingLag(false);
    }, 2000 - (speed * 15)); // 속도가 낮을수록 로딩이 더 김
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const startSimulation = () => {
    setSecondsElapsed(0);
    setStep('RUNNING');
  };

  const stopSimulation = () => {
    setStep('RESULT');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col justify-between p-6 font-sans max-w-md mx-auto selection:bg-neutral-800">
      
      {/* 상단 브랜드 */}
      <div className="flex justify-between items-center text-xs tracking-widest text-neutral-500 font-mono">
        <span>WHAT IF? // TOOL</span>
        {step === 'RUNNING' && (
          <span className="text-emerald-400 animate-pulse">● LIVE</span>
        )}
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col justify-center my-auto space-y-8">
        
        {/* 1. HOME 화면: 슬라이더와 시작 버튼 */}
        {step === 'HOME' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <h1 className="text-4xl font-light tracking-tight text-white">WHAT IF?</h1>
              <p className="text-neutral-400 text-sm leading-relaxed pt-1">
                인터넷 속도가 제한된다면<br />당신은 어떤 시간을 보내시겠습니까?
              </p>
            </div>

            {/* 속도 조절 슬라이더 카드 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-neutral-400">NETWORK SPEED</span>
                <span className="text-lg font-mono font-medium text-emerald-400">{speed}%</span>
              </div>
              
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800 h-1 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>10% (Extreme Lag)</span>
                <span>100% (Normal)</span>
              </div>
            </div>

            <button
              onClick={startSimulation}
              className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition active:scale-[0.98]"
            >
              START
            </button>
          </div>
        )}

        {/* 2. RUNNING 화면: 도구 작동 중 (타이머 & 여백) */}
        {step === 'RUNNING' && (
          <div className="space-y-8 text-center animate-fadeIn">
            <div className="space-y-1">
              <span className="text-xs font-mono text-neutral-500">CONTROL ACTIVE ({speed}%)</span>
              <div className="text-6xl font-light font-mono tracking-tight text-white py-4">
                {formatTime(secondsElapsed)}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 space-y-4">
              <p className="text-sm text-neutral-300">
                인터넷 연결이 제한된 상태입니다.<br />이 창을 띄워두고 다른 행동(공부, 작업, 휴식)을 시작하세요.
              </p>

              <button
                onClick={handleTriggerLag}
                disabled={isSimulatingLag}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono rounded-lg transition text-neutral-300"
              >
                {isSimulatingLag ? '데이터 요청 지연 중...' : '🔗 느린 네트워크 상태 테스트하기'}
              </button>
            </div>

            <button
              onClick={stopSimulation}
              className="w-full py-3 bg-neutral-800 text-neutral-300 font-medium rounded-xl hover:bg-neutral-700 transition text-sm"
            >
              세션 종료하기
            </button>
          </div>
        )}

        {/* 3. RESULT 화면: 결과 및 공유 */}
        {step === 'RESULT' && (
          <div className="space-y-6 animate-fadeIn py-4">
            <div className="space-y-1 text-center">
              <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">Session Summary</span>
              <div className="text-5xl font-light text-white tracking-tight pt-2 font-mono">
                {formatTime(secondsElapsed)}
              </div>
              <p className="text-xs text-emerald-400 pt-1 font-mono">SPEED: {speed}%</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-center">
              <p className="text-sm text-neutral-300 font-medium">
                "느린 디지털 환경 속에서 온전히 집중한 시간입니다."
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`나는 WHAT IF?에서 속도 ${speed}%로 설정하고 ${formatTime(secondsElapsed)} 동안 집중을 유지했습니다. 너도 해볼래?`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition"
              >
                {copied ? '클립보드에 복사되었습니다!' : 'SHARE SESSION'}
              </button>

              <button
                onClick={() => setStep('HOME')}
                className="w-full py-3 bg-transparent text-neutral-500 hover:text-neutral-300 text-xs transition"
              >
                처음으로 돌아가기
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 하단 푸터 */}
      <div className="text-center pt-6 text-[10px] text-neutral-600 font-mono">
        WHAT IF? // DIGITAL SANDBOX TOOL
      </div>

    </div>
  );
}

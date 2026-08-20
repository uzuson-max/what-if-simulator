'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${mins}:${formattedSecs}`;
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        {!started ? (
          <>
            <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">What If? Experiment #1</span>
            <h1 className="text-2xl font-bold mt-2 mb-4">SLOW INTERNET</h1>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              지금 당장 스마트폰 인터넷 속도가 <strong className="text-neutral-200">256Kbps</strong>로 떨어진다면 어떤 일이 벌어질까요? 
              <br /><br />
              5분 동안 평소처럼 폰을 만져보며 극한의 답답함을 직접 체험해보세요.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 cursor-pointer"
            >
              5분 체험 시작하기
            </button>
          </>
        ) : !finished ? (
          <div className="text-center py-6">
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-medium rounded-full mb-4 animate-pulse">
              🔴 시뮬레이션 진행 중...
            </span>
            <div className="text-5xl font-mono font-bold tracking-tight mb-6 text-amber-400">
              {formatTime(timeLeft)}
            </div>
            
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-left text-sm space-y-2 text-neutral-300 mb-6">
              <p className="font-semibold text-neutral-100 mb-2">📌 지금 수행해야 할 미션:</p>
              <p>1. 네이버 앱 켜서 오늘 뉴스 보기</p>
              <p>2. 지도 앱으로 주변 편의점 찾기</p>
              <p>3. 카카오톡으로 사진 한 장 보내보기</p>
            </div>

            <p className="text-xs text-neutral-500">
              화면을 나가거나 다른 앱을 써도 됩니다. <br />실제로 불편함을 느껴보세요.
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold mb-2">🎉 5분 체험 종료!</h2>
            <p className="text-neutral-400 text-sm mb-6">
              인터넷 제한 상황에서 무사히(?) 살아남으셨습니다.<br />
              생각보다 엄청 답답하셨죠? 이 답답함을 친구에게도 선물해보세요!
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={async () => {
                  const shareData = {
                    title: 'What If? - SLOW INTERNET 시뮬레이션',
                    text: '나 5분 동안 256Kbps로 인터넷 참아봤는데 진짜 목 타는 줄 알았다... 너도 한번 해봐 ㅋㅋ',
                    url: window.location.href,
                  };
                  try {
                    if (navigator.share) {
                      await navigator.share(shareData);
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      alert('링크가 복사되었습니다! 친구에게 공유해 보세요.');
                    }
                  } catch (err) {
                    console.log('공유 취소됨');
                  }
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>📤 친구에게 이 고통(?) 공유하기</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 클립보드에 복사되었습니다!');
                }}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium py-2.5 px-4 rounded-xl transition duration-200 text-xs"
              >
                🔗 링크 복사하기
              </button>
            </div>
            
            <button
              onClick={() => {
                setStarted(false);
                setTimeLeft(300);
                setFinished(false);
              }}
              className="text-neutral-500 hover:text-neutral-300 text-xs transition duration-200 underline"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

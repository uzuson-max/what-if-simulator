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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${mins}:${formattedSecs}`;
  };

  return (
    <main>
      <div className="card">
        {!started ? (
          <>
            <span className="tag">What If? Experiment #1</span>
            <h1>SLOW INTERNET</h1>
            <p>
              지금 당장 스마트폰 인터넷 속도가 <strong>256Kbps</strong>로 떨어진다면 어떤 일이 벌어질까요? 
              <br /><br />
              5분 동안 평소처럼 폰을 만져보며 극한의 답답함을 직접 체험해보세요.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="btn-primary"
            >
              5분 체험 시작하기
            </button>
          </>
        ) : !finished ? (
          <div className="text-center">
            <span className="badge">
              🔴 시뮬레이션 진행 중...
            </span>
            <div className="timer">
              {formatTime(timeLeft)}
            </div>
            
            <div className="mission-box">
              <p style={{ fontWeight: 'bold', color: '#f5f5f5', marginBottom: '12px' }}>📌 지금 수행해야 할 미션:</p>
              <p>1. 네이버 앱 켜서 오늘 뉴스 보기</p>
              <p>2. 지도 앱으로 주변 편의점 찾기</p>
              <p>3. 카카오톡으로 사진 한 장 보내보기</p>
            </div>

            <p style={{ fontSize: '12px', color: '#737373' }}>
              화면을 나가거나 다른 앱을 써도 됩니다. <br />실제로 불편함을 느껴보세요.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 style={{ fontSize: '20px' }}>🎉 5분 체험 종료!</h2>
            <p>
              인터넷 제한 상황에서 무사히(?) 살아남으셨습니다.<br />
              생각보다 엄청 답답하셨죠? 이 답답함을 친구에게도 선물해보세요!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
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
                className="btn-primary"
                style={{ fontSize: '14px' }}
              >
                📤 친구에게 이 고통(?) 공유하기
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 클립보드에 복사되었습니다!');
                }}
                className="btn-secondary"
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
              className="link-btn"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

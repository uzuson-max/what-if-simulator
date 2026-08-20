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
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#f5f5f5', fontFamily: 'sans-serif', margin: 0 }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#121212', border: '1px solid #262626', borderRadius: '16px', padding: '32px', boxSizing: 'border-box' }}>
        {!started ? (
          <>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', color: '#f59e0b', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>What If? Experiment #1</span>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#ffffff' }}>SLOW INTERNET</h1>
            <p style={{ color: '#a3a3a3', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              지금 당장 스마트폰 인터넷 속도가 <strong style={{ color: '#f5f5f5' }}>256Kbps</strong>로 떨어진다면 어떤 일이 벌어질까요? 
              <br /><br />
              5분 동안 평소처럼 폰을 만져보며 극한의 답답함을 직접 체험해보세요.
            </p>
            <button
              onClick={() => setStarted(true)}
              style={{ width: '100%', backgroundColor: '#f59e0b', color: '#0a0a0a', fontWeight: '700', padding: '14px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '15px' }}
            >
              5분 체험 시작하기
            </button>
          </>
        ) : !finished ? (
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '12px', fontWeight: '500', borderRadius: '9999px', marginBottom: '16px' }}>
              🔴 시뮬레이션 진행 중...
            </span>
            <div style={{ fontFamily: 'monospace', fontSize: '48px', fontWeight: '700', color: '#fbbf24', textAlign: 'center', margin: '24px 0' }}>
              {formatTime(timeLeft)}
            </div>
            
            <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #262626', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontWeight: 'bold', color: '#f5f5f5', marginBottom: '12px', fontSize: '13px' }}>📌 지금 수행해야 할 미션:</p>
              <p style={{ color: '#d4d4d4', fontSize: '13px', marginBottom: '8px' }}>1. 네이버 앱 켜서 오늘 뉴스 보기</p>
              <p style={{ color: '#d4d4d4', fontSize: '13px', marginBottom: '8px' }}>2. 지도 앱으로 주변 편의점 찾기</p>
              <p style={{ color: '#d4d4d4', fontSize: '13px', marginBottom: '0' }}>3. 카카오톡으로 사진 한 장 보내보기</p>
            </div>

            <p style={{ fontSize: '12px', color: '#737373' }}>
              화면을 나가거나 다른 앱을 써도 됩니다. <br />실제로 불편함을 느껴보세요.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#ffffff' }}>🎉 5분 체험 종료!</h2>
            <p style={{ color: '#a3a3a3', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
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
                style={{ width: '100%', backgroundColor: '#f59e0b', color: '#0a0a0a', fontWeight: '700', padding: '14px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '14px' }}
              >
                📤 친구에게 이 고통(?) 공유하기
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 클립보드에 복사되었습니다!');
                }}
                style={{ width: '100%', backgroundColor: '#262626', color: '#d4d4d4', fontWeight: '500', padding: '12px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '13px' }}
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
              style={{ background: 'none', border: 'none', color: '#737373', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer', marginTop: '16px' }}
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What If? - 현실 시뮬레이터',
  description: '평소에는 경험할 수 없는 비정상적인 환경을 안전하게 체험해보세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}

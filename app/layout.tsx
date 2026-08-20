import './globals.css';

export const metadata = {
  title: 'What If? - SLOW INTERNET',
  description: '5분 동안 256Kbps 인터넷 속도를 체험해보세요.',
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

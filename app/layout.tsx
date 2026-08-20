import './globals.css';

export const metadata = {
  title: 'WHAT IF? // Digital Sandbox',
  description: 'Reality simulation tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-[#0a0a0c] text-white antialiased">
        {children}
      </body>
    </html>
  );
}

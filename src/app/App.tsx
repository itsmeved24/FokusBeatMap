import { FocusMusicMaker } from '@/app/components/FocusMusicMaker';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <FocusMusicMaker />
      <Toaster position="top-center" />
      <Analytics />
    </>
  );
}
import { FocusMusicMaker } from '@/app/components/FocusMusicMaker';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <FocusMusicMaker />
      <Toaster position="top-center" />
    </>
  );
}
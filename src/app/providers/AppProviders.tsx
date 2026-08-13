import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

export interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Ilova darajasidagi providerlar. Hozircha faqat router —
 * server holati yo'q (localStorage manba), global store ham kerak emas.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {children}
    </BrowserRouter>
  );
}

export default AppProviders;

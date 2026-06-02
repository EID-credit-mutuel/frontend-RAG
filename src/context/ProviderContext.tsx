import { createContext, useContext, useState } from 'react';
import type { Provider } from '../types';

interface ProviderCtx {
  provider: Provider;
  setProvider: (p: Provider) => void;
}

const Ctx = createContext<ProviderCtx>({ provider: 'Mistral', setProvider: () => {} });

export function ProviderContextProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<Provider>(
    () => {
    const saved = localStorage.getItem('rag-provider');
    return (saved === 'Mistral' || saved === 'Claude') ? saved : 'Mistral';
  }
  );

  function handleSet(p: Provider) {
    setProvider(p);
    localStorage.setItem('rag-provider', p);
  }

  return <Ctx.Provider value={{ provider, setProvider: handleSet }}>{children}</Ctx.Provider>;
}

export function useProvider() {
  return useContext(Ctx);
}

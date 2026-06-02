import { createContext, useContext, useState, useEffect } from 'react';

const SESSION_KEY = 'rag-api-key';

interface AuthCtx {
  apiKey: string | null;
  login: (key: string) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({ apiKey: null, login: () => {}, logout: () => {} });

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  );

  function login(key: string) {
    sessionStorage.setItem(SESSION_KEY, key);
    setApiKey(key);
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setApiKey(null);
  }

  useEffect(() => {
    window.addEventListener('rag-unauthorized', logout);
    return () => window.removeEventListener('rag-unauthorized', logout);
  }, []);

  return <Ctx.Provider value={{ apiKey, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}

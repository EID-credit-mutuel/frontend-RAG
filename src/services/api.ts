import type { IngestResult, AskResult, Provider } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:7167';

function headers(provider: Provider): Record<string, string> {
  const apiKey = sessionStorage.getItem('rag-api-key') ?? '';
  return {
    'Content-Type': 'application/json',
    'X-Provider': provider,
    'X-Api-Key': apiKey,
  };
}

function checkStatus(res: Response, label: string) {
  if (res.status === 401) {
    sessionStorage.removeItem('rag-api-key');
    window.dispatchEvent(new Event('rag-unauthorized'));
    throw new Error('Session expirée');
  }
  if (!res.ok) throw new Error(`${label} failed: ${res.status}`);
}

export async function verifyKey(key: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/auth`, {
    headers: { 'X-Api-Key': key },
  });
  return res.ok;
}

export async function ingest(text: string, provider: Provider): Promise<IngestResult> {
  const res = await fetch(`${BASE_URL}/ingest`, {
    method: 'POST',
    headers: headers(provider),
    body: JSON.stringify({ text }),
  });
  checkStatus(res, 'Ingest');
  return res.json();
}

export async function reset(provider: Provider): Promise<void> {
  const res = await fetch(`${BASE_URL}/reset`, {
    method: 'DELETE',
    headers: headers(provider),
  });
  checkStatus(res, 'Reset');
}

export async function ask(question: string, provider: Provider): Promise<AskResult> {
  const res = await fetch(`${BASE_URL}/ask`, {
    method: 'POST',
    headers: headers(provider),
    body: JSON.stringify({ question }),
  });
  checkStatus(res, 'Ask');
  return res.json();
}

import { useState } from 'react';
import type { QuizResult, DiscoveryResponse } from '@shared';

const ERROR_MESSAGE =
  'Your assessment could not be generated. Please retake the quiz.';

/**
 * Hook for calling POST /exposure/discover.
 *
 * Returns:
 *  - discover(quizResult, stabilityPriority) — fires the request
 *  - response — the parsed DiscoveryResponse on success, or null
 *  - isLoading — true while the request is in flight
 *  - error — user-facing error string on failure, or null
 */
function useDiscover(): {
  discover: (quizResult: QuizResult, stabilityPriority: number) => Promise<void>;
  response: DiscoveryResponse | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
} {
  const [response, setResponse] = useState<DiscoveryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  };

  const discover = async (quizResult: QuizResult, stabilityPriority: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const apiUrl = ((import.meta as any).env?.VITE_API_URL ?? '');
        const res = await fetch(`${apiUrl}/exposure/discover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quizResult, stabilityPriority }),
        });

        if (!res.ok) {
          if (attempt === 0) continue; // retry once on failure
          setError(ERROR_MESSAGE);
          setIsLoading(false);
          return;
        }

        const data: DiscoveryResponse = await res.json();
        setResponse(data);
        setIsLoading(false);
        return;
      } catch {
        if (attempt === 0) continue;
        setError(ERROR_MESSAGE);
        setIsLoading(false);
      }
    }
  };
  
  return { discover, response, isLoading, error, reset };
}

export default useDiscover;

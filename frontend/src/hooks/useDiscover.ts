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

  const discover = async (
    quizResult: QuizResult,
    stabilityPriority: number,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/exposure/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizResult, stabilityPriority }),
      });

      if (!res.ok) {
        // HTTP 4xx, 502, or any other non-2xx status
        setError(ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }

      const data: DiscoveryResponse = await res.json();
      setResponse(data);
      setIsLoading(false);
    } catch {
      // Network failure (fetch threw — no response received)
      setError(ERROR_MESSAGE);
      setIsLoading(false);
    }
  };

  return { discover, response, isLoading, error, reset };
}

export default useDiscover;

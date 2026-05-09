import { useEffect, useRef } from 'react';

function useAutoScroll(dependency: any) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [dependency]);

  return messagesEndRef;
}

export default useAutoScroll;

'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { realtime, type RealtimeConfig } from '@/lib/realtime';
import { notificationActions } from '@/store/slices/notificationSlice';
import { toast } from '@/lib/toast';

interface UseRealtimeOptions {
  config: RealtimeConfig;
  showToasts?: boolean;
  enabled?: boolean;
}

/**
 * Hook to connect the realtime client and dispatch notifications to Redux.
 *
 * @example
 * ```tsx
 * function App() {
 *   useRealtime({
 *     config: { url: 'wss://api.example.com/ws' },
 *     showToasts: true,
 *   });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useRealtime({ config, showToasts = true, enabled = true }: UseRealtimeOptions) {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (!enabled) return;

    realtime.connect(configRef.current);

    const unsubscribe = realtime.subscribe((event) => {
      switch (event.type) {
        case 'connected':
          setConnected(true);
          break;

        case 'disconnected':
          setConnected(false);
          break;

        case 'notification':
          dispatch(notificationActions.addNotification(event.payload));
          if (showToasts) {
            const severity = event.payload.severity ?? 'info';
            toast[severity](event.payload.title, event.payload.message);
          }
          break;

        case 'notification:read':
          dispatch(notificationActions.markAsRead(event.payload.id));
          break;

        case 'notification:clear':
          dispatch(notificationActions.markAllAsRead());
          break;
      }
    });

    return () => {
      unsubscribe();
      realtime.disconnect();
    };
  }, [dispatch, showToasts, enabled]);

  return { connected, send: realtime.send.bind(realtime), disconnect: realtime.disconnect.bind(realtime) };
}

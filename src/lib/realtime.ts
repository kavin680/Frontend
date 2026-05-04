import type { Notification } from '@/types/notification';

type RealtimeEvent =
  | { type: 'notification'; payload: Notification }
  | { type: 'notification:read'; payload: { id: string } }
  | { type: 'notification:clear'; payload: null }
  | { type: 'connected'; payload: null }
  | { type: 'disconnected'; payload: { reason: string } };

type RealtimeListener = (event: RealtimeEvent) => void;

interface RealtimeConfig {
  url: string;
  transport?: 'websocket' | 'sse';
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

const DEFAULT_CONFIG: Required<Omit<RealtimeConfig, 'url'>> = {
  transport: 'websocket',
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 10,
  heartbeatInterval: 30000,
};

class RealtimeClient {
  private ws: WebSocket | null = null;
  private sse: EventSource | null = null;
  private listeners: Set<RealtimeListener> = new Set();
  private config: Required<RealtimeConfig> | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private _connected = false;

  get connected(): boolean {
    return this._connected;
  }

  connect(config: RealtimeConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config } as Required<RealtimeConfig>;
    this.reconnectAttempts = 0;

    if (this.config.transport === 'sse') {
      this.connectSSE();
    } else {
      this.connectWebSocket();
    }
  }

  disconnect(): void {
    this.stopReconnect();
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
    if (this.sse) {
      this.sse.close();
      this.sse = null;
    }

    this._connected = false;
    this.emit({ type: 'disconnected', payload: { reason: 'manual' } });
  }

  subscribe(listener: RealtimeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  send(data: Record<string, unknown>): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private connectWebSocket(): void {
    if (!this.config) return;

    try {
      this.ws = new WebSocket(this.config.url);

      this.ws.onopen = () => {
        this._connected = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.emit({ type: 'connected', payload: null });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch {
          // ignore malformed messages
        }
      };

      this.ws.onclose = (event) => {
        this._connected = false;
        this.stopHeartbeat();
        this.emit({ type: 'disconnected', payload: { reason: event.reason || 'connection closed' } });
        this.attemptReconnect();
      };

      this.ws.onerror = () => {
        // onclose will fire after onerror
      };
    } catch {
      this.attemptReconnect();
    }
  }

  private connectSSE(): void {
    if (!this.config) return;

    try {
      this.sse = new EventSource(this.config.url);

      this.sse.onopen = () => {
        this._connected = true;
        this.reconnectAttempts = 0;
        this.emit({ type: 'connected', payload: null });
      };

      this.sse.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch {
          // ignore malformed messages
        }
      };

      this.sse.addEventListener('notification', (event) => {
        try {
          const notification = JSON.parse((event as MessageEvent).data);
          this.emit({ type: 'notification', payload: notification });
        } catch {
          // ignore
        }
      });

      this.sse.onerror = () => {
        this._connected = false;
        this.sse?.close();
        this.sse = null;
        this.emit({ type: 'disconnected', payload: { reason: 'SSE error' } });
        this.attemptReconnect();
      };
    } catch {
      this.attemptReconnect();
    }
  }

  private handleMessage(data: Record<string, unknown>): void {
    const eventType = data.type as string;

    switch (eventType) {
      case 'notification':
        this.emit({ type: 'notification', payload: data.payload as Notification });
        break;
      case 'notification:read':
        this.emit({ type: 'notification:read', payload: data.payload as { id: string } });
        break;
      case 'notification:clear':
        this.emit({ type: 'notification:clear', payload: null });
        break;
      default:
        break;
    }
  }

  private emit(event: RealtimeEvent): void {
    this.listeners.forEach((fn) => fn(event));
  }

  private attemptReconnect(): void {
    if (!this.config?.reconnect) return;
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) return;

    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => {
      if (this.config?.transport === 'sse') {
        this.connectSSE();
      } else {
        this.connectWebSocket();
      }
    }, this.config.reconnectInterval * Math.min(this.reconnectAttempts, 5));
  }

  private stopReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private startHeartbeat(): void {
    if (!this.config) return;
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

/**
 * Global realtime client — connect once, receive notifications everywhere.
 *
 * @example
 * ```tsx
 * import { realtime } from '@/lib/realtime';
 *
 * // Connect via WebSocket
 * realtime.connect({ url: 'wss://api.example.com/ws', transport: 'websocket' });
 *
 * // Or via Server-Sent Events
 * realtime.connect({ url: '/api/events', transport: 'sse' });
 *
 * // Subscribe to events
 * const unsubscribe = realtime.subscribe((event) => {
 *   if (event.type === 'notification') {
 *     toast.info(event.payload.title);
 *   }
 * });
 *
 * // Send data (WebSocket only)
 * realtime.send({ type: 'markRead', id: '123' });
 *
 * // Disconnect
 * realtime.disconnect();
 * ```
 */
export const realtime = new RealtimeClient();

export type { RealtimeEvent, RealtimeConfig, RealtimeListener };

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Notification,
  NotificationPreferences,
  NotificationState,
  ToastNotification,
} from '@/types/notification';

interface NotificationSliceState extends NotificationState {
  toasts: ToastNotification[];
}

const initialState: NotificationSliceState = {
  notifications: [],
  unreadCount: 0,
  preferences: null,
  isLoading: false,
  error: null,
  toasts: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => { n.read = true; });
      state.unreadCount = 0;
    },
    removeNotification(state, action: PayloadAction<string>) {
      const idx = state.notifications.findIndex((n) => n.id === action.payload);
      if (idx !== -1) {
        if (!state.notifications[idx].read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(idx, 1);
      }
    },
    setPreferences(state, action: PayloadAction<NotificationPreferences>) {
      state.preferences = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    addToast(state, action: PayloadAction<Omit<ToastNotification, 'id'>>) {
      state.toasts.push({
        ...action.payload,
        id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;

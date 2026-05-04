'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from './store';
import { setApiStore } from '@/lib/api/client';

function createStore(): AppStore {
  const store = makeStore();
  setApiStore(store);
  return store;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(createStore);

  return <Provider store={store}>{children}</Provider>;
}

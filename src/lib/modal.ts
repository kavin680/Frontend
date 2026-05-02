import type { ReactNode } from 'react';

type ModalListener = (event: ModalEvent) => void;
type ConfirmListener = (event: ConfirmEvent) => void;

interface ModalEvent {
  id: string;
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
}

interface ConfirmEvent {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  resolve: (value: boolean) => void;
}

let modalListeners: ModalListener[] = [];
let confirmListeners: ConfirmListener[] = [];
let closeListeners: Array<(id: string) => void> = [];

/**
 * Global modal API — open modals from anywhere.
 *
 * @example
 * ```tsx
 * import { modal } from '@/lib/modal';
 *
 * modal.open(<EditUserForm userId={123} />, { title: 'Edit User' });
 * modal.close('modal-id');
 * ```
 */
export const modal = {
  open(content: ReactNode, options?: Omit<ModalEvent, 'id' | 'content'>): string {
    const id = `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const event: ModalEvent = { id, content, ...options };
    modalListeners.forEach((fn) => fn(event));
    return id;
  },
  close(id: string) {
    closeListeners.forEach((fn) => fn(id));
  },
  /** @internal */
  _subscribeOpen(fn: ModalListener) {
    modalListeners.push(fn);
    return () => { modalListeners = modalListeners.filter((l) => l !== fn); };
  },
  /** @internal */
  _subscribeClose(fn: (id: string) => void) {
    closeListeners.push(fn);
    return () => { closeListeners = closeListeners.filter((l) => l !== fn); };
  },
};

/**
 * Global confirm dialog — returns a Promise<boolean>.
 *
 * @example
 * ```tsx
 * import { confirm } from '@/lib/modal';
 *
 * const ok = await confirm('Delete user?', 'This action cannot be undone.');
 * if (ok) { // delete }
 *
 * const ok = await confirm('Remove item?', 'Are you sure?', {
 *   confirmText: 'Yes, remove',
 *   variant: 'destructive',
 * });
 * ```
 */
export function confirm(
  title: string,
  message: string,
  options?: { confirmText?: string; cancelText?: string; variant?: 'default' | 'destructive' }
): Promise<boolean> {
  return new Promise((resolve) => {
    const event: ConfirmEvent = {
      title,
      message,
      confirmText: options?.confirmText ?? 'Confirm',
      cancelText: options?.cancelText ?? 'Cancel',
      variant: options?.variant ?? 'default',
      resolve,
    };
    confirmListeners.forEach((fn) => fn(event));
  });
}

/** @internal */
export function _subscribeConfirm(fn: ConfirmListener) {
  confirmListeners.push(fn);
  return () => { confirmListeners = confirmListeners.filter((l) => l !== fn); };
}

export type { ModalEvent, ConfirmEvent };

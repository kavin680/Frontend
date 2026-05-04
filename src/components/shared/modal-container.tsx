'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { modal as modalApi, type ModalEvent, _subscribeConfirm, type ConfirmEvent } from '@/lib/modal';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]',
};

function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusFirst = () => {
      const first = container.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    };

    // Focus first element on open
    requestAnimationFrame(focusFirst);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = container.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [active]);

  return containerRef;
}

export function ModalContainer() {
  const [modals, setModals] = useState<ModalEvent[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmEvent | null>(null);

  const modalRef = useFocusTrap(modals.length > 0);
  const confirmRef = useFocusTrap(confirmDialog !== null);

  useEffect(() => {
    const unsub1 = modalApi._subscribeOpen((event) => {
      setModals((prev) => [...prev, event]);
    });
    const unsub2 = modalApi._subscribeClose((id) => {
      setModals((prev) => prev.filter((m) => m.id !== id));
    });
    const unsub3 = _subscribeConfirm((event) => {
      setConfirmDialog(event);
    });
    return () => { unsub1(); unsub2(); unsub3(); };
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleConfirm = useCallback((value: boolean) => {
    confirmDialog?.resolve(value);
    setConfirmDialog(null);
  }, [confirmDialog]);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      if (confirmDialog) {
        handleConfirm(false);
        return;
      }

      const topModal = modals[modals.length - 1];
      if (topModal && topModal.closable !== false) {
        closeModal(topModal.id);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [modals, confirmDialog, closeModal, handleConfirm]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modals.length > 0 || confirmDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modals.length, confirmDialog]);

  return (
    <>
      {modals.map((m) => (
        <div
          key={m.id}
          className="fixed inset-0 z-[9998] flex items-center justify-center animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={m.title ?? 'Modal dialog'}
          ref={m === modals[modals.length - 1] ? modalRef : undefined}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => m.closable !== false && closeModal(m.id)}
            aria-hidden="true"
          />
          <div
            className={cn(
              'relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full mx-4',
              'animate-in zoom-in-95 slide-in-from-bottom-4 duration-300',
              sizeClasses[m.size ?? 'md']
            )}
          >
            {m.title && (
              <div className="flex items-center justify-between mb-4">
                <h2 id={`modal-title-${m.id}`} className="text-lg font-semibold">{m.title}</h2>
                {m.closable !== false && (
                  <button
                    onClick={() => closeModal(m.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
            {m.content}
          </div>
        </div>
      ))}

      {confirmDialog && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-200"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-message"
          ref={confirmRef}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => handleConfirm(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <h3 id="confirm-title" className="text-lg font-semibold mb-2">{confirmDialog.title}</h3>
            <p id="confirm-message" className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => handleConfirm(false)}
              >
                {confirmDialog.cancelText ?? 'Cancel'}
              </Button>
              <Button
                variant={confirmDialog.variant === 'destructive' ? 'destructive' : 'default'}
                onClick={() => handleConfirm(true)}
              >
                {confirmDialog.confirmText ?? 'Confirm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

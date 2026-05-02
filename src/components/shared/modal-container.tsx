'use client';

import { useState, useEffect, useCallback } from 'react';
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

export function ModalContainer() {
  const [modals, setModals] = useState<ModalEvent[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmEvent | null>(null);

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

  return (
    <>
      {modals.map((m) => (
        <div
          key={m.id}
          className="fixed inset-0 z-[9998] flex items-center justify-center animate-in fade-in duration-200"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => m.closable !== false && closeModal(m.id)}
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
                <h2 className="text-lg font-semibold">{m.title}</h2>
                {m.closable !== false && (
                  <button
                    onClick={() => closeModal(m.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
            {m.content}
          </div>
        </div>
      ))}

      {confirmDialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => handleConfirm(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <h3 className="text-lg font-semibold mb-2">{confirmDialog.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
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

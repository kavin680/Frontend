'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/form-field';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, ShieldCheck } from 'lucide-react';

export function MfaForm() {
  const { verifyMfa, isLoading, error } = useAuth();
  const [code, setCode] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    try {
      await verifyMfa({ code, trustDevice });
    } catch {
      // Error handled by useAuth
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <FormField label="Authentication code" htmlFor="mfa-code">
        <Input
          id="mfa-code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          className="text-center text-2xl tracking-[0.5em] font-mono"
          autoFocus
        />
      </FormField>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="trustDevice"
          checked={trustDevice}
          onChange={(e) => setTrustDevice(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="trustDevice" className="text-sm text-muted-foreground">
          Trust this device for 30 days
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify
      </Button>
    </form>
  );
}

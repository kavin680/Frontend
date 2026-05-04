'use client';

import { useForm, type FieldValues, type DefaultValues, type Path, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  | 'textarea' | 'select' | 'checkbox' | 'switch' | 'date' | 'hidden';

interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string }>;
  className?: string;
  autoFocus?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyZodSchema = { _output: any; parse: (...args: any[]) => any };

interface SmartFormProps<T extends FieldValues> {
  fields: FieldConfig<T>[];
  schema?: AnyZodSchema;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  isLoading?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: 1 | 2 | 3 | 4;
  footer?: ReactNode;
}

/**
 * Schema-driven form — just pass fields + schema, get a complete validated form.
 *
 * @example
 * ```tsx
 * <SmartForm
 *   fields={[
 *     { name: 'email', type: 'email', label: 'Email', required: true },
 *     { name: 'role', type: 'select', label: 'Role', options: [
 *       { label: 'Admin', value: 'admin' },
 *       { label: 'User', value: 'user' },
 *     ]},
 *   ]}
 *   schema={myZodSchema}
 *   onSubmit={(data) => api.post('/users', data)}
 *   submitText="Create User"
 * />
 * ```
 */
export function SmartForm<T extends FieldValues>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  submitText = 'Submit',
  resetText = 'Reset',
  showReset = false,
  isLoading = false,
  className,
  layout = 'vertical',
  columns = 1,
  footer,
}: SmartFormProps<T>) {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: schema ? (zodResolver(schema as any) as unknown as Resolver<T>) : undefined,
    defaultValues,
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;

  const gridClass = columns > 1
    ? `grid gap-4 grid-cols-1 md:grid-cols-${columns}`
    : 'space-y-4';

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data as T);
      })}
      className={cn('animate-in fade-in-50 duration-300', className)}
    >
      <div className={gridClass}>
        {fields.map((field) => {
          if (field.type === 'hidden') {
            return <input key={field.name} type="hidden" {...register(field.name)} />;
          }

          const error = errors[field.name];
          const errorMessage = error?.message as string | undefined;

          return (
            <div
              key={field.name}
              className={cn(
                'space-y-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-300',
                layout === 'horizontal' && 'flex items-center gap-4',
                field.className
              )}
            >
              {field.label && field.type !== 'checkbox' && field.type !== 'switch' && (
                <Label htmlFor={field.name} className={cn(error && 'text-red-500')}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}

              {(field.type === 'text' || field.type === 'email' || field.type === 'password'
                || field.type === 'number' || field.type === 'tel' || field.type === 'url'
                || field.type === 'date' || !field.type) && (
                <Input
                  id={field.name}
                  type={field.type ?? 'text'}
                  placeholder={field.placeholder}
                  disabled={field.disabled || isLoading}
                  autoFocus={field.autoFocus}
                  className={cn(
                    'transition-all duration-200',
                    error && 'border-red-500 focus-visible:ring-red-500'
                  )}
                  {...register(field.name, {
                    valueAsNumber: field.type === 'number',
                  })}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  disabled={field.disabled || isLoading}
                  className={cn(
                    'transition-all duration-200',
                    error && 'border-red-500 focus-visible:ring-red-500'
                  )}
                  {...register(field.name)}
                />
              )}

              {field.type === 'select' && field.options && (
                <Select
                  value={watch(field.name) as string}
                  onValueChange={(val) => setValue(field.name, val as T[Path<T>], { shouldValidate: true })}
                  disabled={field.disabled || isLoading}
                >
                  <SelectTrigger className={cn(error && 'border-red-500')}>
                    <SelectValue placeholder={field.placeholder ?? 'Select...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === 'checkbox' && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={field.name}
                    checked={watch(field.name) as boolean}
                    onCheckedChange={(checked) =>
                      setValue(field.name, checked as T[Path<T>], { shouldValidate: true })
                    }
                    disabled={field.disabled || isLoading}
                  />
                  {field.label && (
                    <Label htmlFor={field.name} className="cursor-pointer">
                      {field.label}
                    </Label>
                  )}
                </div>
              )}

              {field.type === 'switch' && (
                <div className="flex items-center justify-between">
                  {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
                  <Switch
                    id={field.name}
                    checked={watch(field.name) as boolean}
                    onCheckedChange={(checked) =>
                      setValue(field.name, checked as T[Path<T>], { shouldValidate: true })
                    }
                    disabled={field.disabled || isLoading}
                  />
                </div>
              )}

              {field.description && (
                <p className="text-xs text-muted-foreground">{field.description}</p>
              )}

              {errorMessage && (
                <p className="text-xs text-red-500 animate-in fade-in-50 slide-in-from-top-1 duration-200">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-6">
        {footer ?? (
          <>
            <Button type="submit" disabled={isLoading} className="transition-all duration-200">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitText}
            </Button>
            {showReset && (
              <Button type="button" variant="outline" onClick={() => reset()} disabled={isLoading}>
                {resetText}
              </Button>
            )}
          </>
        )}
      </div>
    </form>
  );
}

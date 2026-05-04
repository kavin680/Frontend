'use client';

import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileText, Image, Film, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FileUploadProps {
  /** Accepted file types (e.g., 'image/*', '.pdf,.docx') */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Callback when files are selected */
  onUpload?: (files: File[]) => void;
  /** Callback when a file is removed */
  onRemove?: (file: File) => void;
  /** Custom upload handler — return URL or throw */
  uploadHandler?: (file: File) => Promise<string>;
  /** Disable the upload */
  disabled?: boolean;
  className?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  url?: string;
  error?: string;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return Image;
  if (type.startsWith('video/')) return Film;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  return FileIcon;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  onUpload,
  onRemove,
  uploadHandler,
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (newFiles: File[]) => {
      const validFiles = newFiles.filter((f) => {
        if (f.size > maxSize) return false;
        return true;
      });

      if (files.length + validFiles.length > maxFiles) {
        validFiles.splice(maxFiles - files.length);
      }

      const uploadEntries: UploadedFile[] = validFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: uploadHandler ? 'uploading' : 'done',
        progress: uploadHandler ? 0 : 100,
      }));

      setFiles((prev) => [...prev, ...uploadEntries]);
      onUpload?.(validFiles);

      if (uploadHandler) {
        for (const entry of uploadEntries) {
          try {
            const url = await uploadHandler(entry.file);
            setFiles((prev) =>
              prev.map((f) =>
                f.file === entry.file ? { ...f, status: 'done', progress: 100, url } : f
              )
            );
          } catch (err) {
            setFiles((prev) =>
              prev.map((f) =>
                f.file === entry.file
                  ? { ...f, status: 'error', error: err instanceof Error ? err.message : 'Upload failed' }
                  : f
              )
            );
          }
        }
      }
    },
    [files.length, maxSize, maxFiles, onUpload, uploadHandler]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [disabled, processFiles]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files ?? []);
      processFiles(selectedFiles);
      if (inputRef.current) inputRef.current.value = '';
    },
    [processFiles]
  );

  const removeFile = useCallback(
    (file: File) => {
      setFiles((prev) => {
        const entry = prev.find((f) => f.file === file);
        if (entry?.preview) URL.revokeObjectURL(entry.preview);
        return prev.filter((f) => f.file !== file);
      });
      onRemove?.(file);
    },
    [onRemove]
  );

  return (
    <div className={cn('space-y-3', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {accept ? `Accepted: ${accept}` : 'Any file type'} · Max {formatSize(maxSize)}
            {multiple && ` · Up to ${maxFiles} files`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
          aria-hidden="true"
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Uploaded files">
          {files.map((entry, idx) => {
            const Icon = getFileIcon(entry.file.type);
            return (
              <li
                key={`${entry.file.name}-${idx}`}
                className="flex items-center gap-3 rounded-lg border p-3 bg-card"
              >
                {entry.preview ? (
                  <img
                    src={entry.preview}
                    alt={entry.file.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{entry.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(entry.file.size)}
                    {entry.status === 'uploading' && ` · Uploading...`}
                    {entry.status === 'error' && (
                      <span className="text-destructive"> · {entry.error}</span>
                    )}
                  </p>
                  {entry.status === 'uploading' && (
                    <div className="mt-1 h-1 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(entry.file);
                  }}
                  aria-label={`Remove ${entry.file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

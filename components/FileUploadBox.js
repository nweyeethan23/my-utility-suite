"use client";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploadBox({ onFilesAccepted, accept, multiple = false, title = 'Upload files' }) {
  const onDrop = useCallback((files) => onFilesAccepted(files), [onFilesAccepted]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'is-active' : ''}`}>
      <input {...getInputProps()} />
      <span className="text-4xl" aria-hidden="true">⬆️</span>
      <p className="mt-2 font-display text-lg font-bold text-ink">
        {isDragActive ? 'Drop it here' : multiple ? 'Drop files here or click to browse' : 'Drop a file here or click to browse'}
      </p>
      <p className="mt-1 text-sm text-muted">{title}</p>
    </div>
  );
}

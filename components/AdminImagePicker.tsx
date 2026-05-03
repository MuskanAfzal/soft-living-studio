'use client';

import { useState } from 'react';

type AdminImagePickerProps = {
  help?: string;
  name: string;
  label: string;
  defaultValue?: string;
};

export function AdminImagePicker({ help, name, label, defaultValue = '' }: AdminImagePickerProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [message, setMessage] = useState('');

  async function uploadImage(file: File) {
    setMessage('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || 'Upload failed.');
      return;
    }

    setImageUrl(result.url);
    setMessage('Image uploaded.');
  }

  return (
    <div className="image-picker">
      <label className="field-label" htmlFor={`${name}-upload`}>
        {label}
      </label>
      {help && <p className="field-help">{help}</p>}
      <input
        id={`${name}-upload`}
        className="input"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) uploadImage(file);
        }}
      />
      <input
        className="input"
        name={name}
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        placeholder="/uploads/image.webp or https://..."
      />
      {imageUrl && <img className="image-preview" src={imageUrl} alt="" />}
      {message && <p className="field-help">{message}</p>}
    </div>
  );
}

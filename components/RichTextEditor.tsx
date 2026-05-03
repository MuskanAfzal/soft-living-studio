'use client';

import { useEffect, useRef, useState } from 'react';

type RichTextEditorProps = {
  help?: string;
  label?: string;
  name: string;
  defaultValue?: string;
};

export function RichTextEditor({ help, label = 'Blog content', name, defaultValue = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [html, setHtml] = useState(defaultValue);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

  function syncHtml() {
    setHtml(editorRef.current?.innerHTML || '');
  }

  function command(name: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(name, false, value);
    syncHtml();
  }

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setImageAlt() {
    if (!selectedImage) {
      setStatus('Click an image in the editor first, then choose Image Alt.');
      return;
    }

    const altText = window.prompt('Alt text for this image', selectedImage.alt || '');
    if (altText === null) return;

    selectedImage.alt = altText.trim();
    setStatus('Image alt text updated.');
    syncHtml();
  }

  function addLink(type: 'internal' | 'external' | 'affiliate') {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || '';
    const label = selectedText || window.prompt('Text to show in the blog, example: Apple Watch');

    if (!label) return;

    const url = window.prompt(type === 'internal' ? 'Internal URL, example: /blog/my-post' : 'Full URL');
    if (!url) return;

    editorRef.current?.focus();

    if (!selectedText) {
      document.execCommand('insertHTML', false, `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`);
    } else {
      document.execCommand('createLink', false, url);
    }

    const currentSelection = window.getSelection();
    const links = Array.from(editorRef.current?.querySelectorAll('a') || []);
    const anchor = currentSelection?.anchorNode?.parentElement?.closest('a') || links[links.length - 1];

    if (anchor) {
      if (type !== 'internal') {
        anchor.target = '_blank';
        anchor.rel = type === 'affiliate' ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer';
      } else {
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
      }
    }

    syncHtml();
  }

  async function uploadInlineImage(file: File) {
    setStatus('Uploading image...');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus(result.error || 'Image upload failed.');
      return;
    }

    const altText = window.prompt('Alt text for this image, example: Apple Watch on a bedside table', file.name.replace(/\.[^/.]+$/, ''));
    editorRef.current?.focus();
    document.execCommand('insertHTML', false, `<img src="${escapeHtml(result.url)}" alt="${escapeHtml(altText || '')}">`);
    syncHtml();
    setStatus('Image inserted.');
  }

  return (
    <div className="rich-editor-wrap">
      <div>
        <span className="field-label">{label}</span>
        {help && <p className="field-help">{help}</p>}
      </div>
      <input type="hidden" name={name} value={html} />
      <div className="editor-toolbar" aria-label="Editor toolbar">
        <select className="toolbar-select" onChange={(event) => command('formatBlock', event.target.value)} defaultValue="p">
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Quote</option>
        </select>
        <button type="button" title="Bold selected text" onClick={() => command('bold')}>B</button>
        <button type="button" title="Italicize selected text" onClick={() => command('italic')}>I</button>
        <button type="button" title="Underline selected text" onClick={() => command('underline')}>U</button>
        <button type="button" title="Strikethrough selected text" onClick={() => command('strikeThrough')}>S</button>
        <button type="button" title="Create a bullet list" onClick={() => command('insertUnorderedList')}>Bullets</button>
        <button type="button" title="Create a numbered list" onClick={() => command('insertOrderedList')}>Numbered</button>
        <button type="button" title="Decrease indentation" onClick={() => command('outdent')}>Outdent</button>
        <button type="button" title="Increase indentation" onClick={() => command('indent')}>Indent</button>
        <button type="button" title="Align text left" onClick={() => command('justifyLeft')}>Left</button>
        <button type="button" title="Align text center" onClick={() => command('justifyCenter')}>Center</button>
        <button type="button" title="Align text right" onClick={() => command('justifyRight')}>Right</button>
        <label className="toolbar-color">
          Text
          <input type="color" onChange={(event) => command('foreColor', event.target.value)} />
        </label>
        <label className="toolbar-color">
          Highlight
          <input type="color" defaultValue="#fff2a8" onChange={(event) => command('hiliteColor', event.target.value)} />
        </label>
        <button type="button" title="Link to another page on your own site" onClick={() => addLink('internal')}>Internal Link</button>
        <button type="button" title="Link to a normal external website" onClick={() => addLink('external')}>External Link</button>
        <button type="button" title="Link to a sponsored or affiliate product" onClick={() => addLink('affiliate')}>Affiliate Link</button>
        <button type="button" title="Upload and insert an image inside the article" onClick={() => fileRef.current?.click()}>Image</button>
        <button type="button" title="Update alt text for the selected image" onClick={setImageAlt}>Image Alt</button>
        <button type="button" title="Insert a horizontal divider" onClick={() => command('insertHorizontalRule')}>Line</button>
        <button type="button" title="Remove formatting from selected text" onClick={() => command('removeFormat')}>Clear</button>
        <button type="button" title="Undo the last editor change" onClick={() => command('undo')}>Undo</button>
        <button type="button" title="Redo the last undone editor change" onClick={() => command('redo')}>Redo</button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) uploadInlineImage(file);
          event.currentTarget.value = '';
        }}
      />
      <div
        ref={editorRef}
        className="rich-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={syncHtml}
        onBlur={syncHtml}
        onClick={(event) => {
          const target = event.target;
          setSelectedImage(target instanceof HTMLImageElement ? target : null);
        }}
      />
      {status && <p className="field-help">{status}</p>}
    </div>
  );
}

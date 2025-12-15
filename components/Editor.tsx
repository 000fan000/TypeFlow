import React, { useRef, useEffect } from 'react';
import { StyleSettings } from '../types';

interface EditorProps {
  text: string;
  settings: StyleSettings;
  onTextChange: (text: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ text, settings, onTextChange }) => {
  return (
    <ContentEditableEditor text={text} settings={settings} onTextChange={onTextChange} />
  );
};

export const ContentEditableEditor: React.FC<EditorProps> = ({ text, settings, onTextChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if the last update was internal to avoid cursor jumping
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (editorRef.current) {
        const currentText = editorRef.current.innerText;
        // Only update DOM if the text prop is different from current content
        // and we didn't just type it ourselves.
        if (currentText !== text && !isInternalUpdate.current) {
            // Convert plain text to HTML paragraphs for rendering
            // This ensures paragraph spacing works correctly
            const html = text.split('\n').map(line => {
                // simple escape to prevent rendering raw HTML tags from text
                const safeLine = line
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                return `<div>${safeLine || '<br>'}</div>`;
            }).join('');
            
            editorRef.current.innerHTML = html;
        }
        // Reset the flag after effect runs
        isInternalUpdate.current = false;
    }
  }, [text]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    isInternalUpdate.current = true;
    if (editorRef.current) {
        // innerText normalizes the divs back to newlines
        onTextChange(editorRef.current.innerText);
    }
  };

  return (
     <div 
        className="flex-1 w-full h-full flex flex-col transition-colors duration-500 relative overflow-y-auto"
        style={{ backgroundColor: settings.backgroundColor }}
    >
      {/* Inject dynamic styles for paragraph spacing */}
      <style>{`
        .prose-editor > div {
            margin-bottom: ${settings.paragraphSpacing}em;
        }
        .prose-editor > div:last-child {
            margin-bottom: 0;
        }
      `}</style>

      <div className="flex-1 w-full flex justify-center">
         <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            spellCheck={false}
            suppressContentEditableWarning
            className="prose-editor w-full min-h-full outline-none transition-all duration-300 block focus:ring-0 border-none"
            style={{
              maxWidth: `${settings.maxWidth}px`,
              paddingLeft: `${settings.paddingHorizontal}px`,
              paddingRight: `${settings.paddingHorizontal}px`,
              paddingTop: `${settings.paddingVertical}px`,
              paddingBottom: `${settings.paddingVertical}px`,
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight,
              letterSpacing: `${settings.letterSpacing}px`,
              color: settings.color,
              fontWeight: settings.fontWeight,
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
            }}
          />
      </div>
    </div>
  )
}
import React from 'react';
import { StyleSettings } from '../types';

interface EditorProps {
  text: string;
  settings: StyleSettings;
  onTextChange: (text: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ text, settings, onTextChange }) => {
  return (
    <div 
        className="flex-1 h-full overflow-y-auto transition-colors duration-500"
        style={{ backgroundColor: settings.backgroundColor }}
    >
      <div className="min-h-full w-full flex justify-center">
        <div 
            className="w-full transition-all duration-500 ease-in-out"
            style={{ 
                maxWidth: `${settings.maxWidth}px`,
                paddingLeft: `${settings.paddingHorizontal}px`,
                paddingRight: `${settings.paddingHorizontal}px`,
                paddingTop: `${settings.paddingVertical}px`,
                paddingBottom: `${settings.paddingVertical}px`
            }}
        >
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            spellCheck={false}
            placeholder="Type or paste your text here..."
            className="w-full h-full min-h-[80vh] bg-transparent resize-none outline-none transition-all duration-300 placeholder:opacity-30"
            style={{
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight,
              letterSpacing: `${settings.letterSpacing}px`,
              color: settings.color,
              fontWeight: settings.fontWeight,
              // We use white-space pre-wrap to preserve basic formatting
              whiteSpace: 'pre-wrap', 
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Re-implementing as ContentEditable for better typography control (paragraph spacing)
export const ContentEditableEditor: React.FC<EditorProps> = ({ text, settings, onTextChange }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  return (
     <div 
        className="flex-1 h-full overflow-y-auto transition-colors duration-500 relative scroll-smooth"
        style={{ backgroundColor: settings.backgroundColor }}
    >
      <div className="min-h-full w-full flex justify-center">
         <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            spellCheck={false}
            placeholder="Start typing..."
            className="w-full h-full bg-transparent resize-none outline-none transition-all duration-300 placeholder:opacity-30 block focus:ring-0 border-none"
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
            }}
          />
      </div>
    </div>
  )
}
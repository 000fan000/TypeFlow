import React from 'react';
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
  return (
     <div 
        className="flex-1 w-full h-full flex flex-col transition-colors duration-500 relative"
        style={{ backgroundColor: settings.backgroundColor }}
    >
      {/* 
        Container for centering the textarea. 
        Using flex-1 to fill the remaining vertical space. 
        overflow-hidden ensures no double scrollbars, let textarea handle scroll.
      */}
      <div className="flex-1 w-full flex justify-center overflow-hidden">
         <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            spellCheck={false}
            placeholder="Start typing..."
            className="h-full bg-transparent resize-none outline-none transition-all duration-300 placeholder:opacity-30 block focus:ring-0 border-none"
            style={{
              width: '100%',
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
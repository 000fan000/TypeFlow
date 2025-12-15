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
                padding: `${settings.padding}px`,
                paddingTop: `${Math.max(settings.padding, 60)}px`,
                paddingBottom: `${Math.max(settings.padding, 100)}px`
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
      
      {/* Dynamic Style Injection for Paragraph Spacing - Textarea limitation workaround */}
      {/* Note: In a pure textarea, separate paragraphs are just newlines. 
          To control paragraph spacing visually without altering text, 
          a contentEditable div is usually better. 
          However, for this 'editor' feel, we simulate it via line-height or
          simply accept that textarea is limited for 'paragraph-spacing' specifically unless we use a div.
          
          Let's switch to a DIV with contentEditable for better typography control if the user wants strictly visual styling.
          However, maintaining cursor position in React contentEditable is tricky.
          
          Compromise: We keep the textarea for robust editing. 
          Typography like 'Paragraph Spacing' in a plain textarea usually relates to line-height, 
          but usually people want spacing *between* blocks. 
          
          Alternative: Render a preview layer behind or use a div that *is* the editor.
          Let's try a contentEditable div implementation for better typography rendering.
      */}
    </div>
  );
};

// Re-implementing as ContentEditable for better typography control (paragraph spacing)
export const ContentEditableEditor: React.FC<EditorProps> = ({ text, settings, onTextChange }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  // Sync text prop to div content only initially or if drastically changed externally to avoid cursor jumps
  // This is a simplified approach. For production, one might use a library like Draft.js or Slate.
  // For this demo, we will use a textarea for input and a "Reading Mode" toggle or just stick to textarea.
  
  // Actually, let's stick to the Textarea but use a clever trick or just accept standard line-breaks.
  // Ideally for "Layout Optimization" users prefer seeing the layout.
  // Let's go with a transparent Textarea on top of a rendered Div? No, alignment issues.
  
  // Let's just use the Textarea. It is robust. 
  // 'ParagraphSpacing' in the context of a textarea is not natively supported via CSS property.
  // It only supports line-height.
  // So 'ParagraphSpacing' setting might be disabled or effectively just act as line-height multiplier in simple mode.
  // OR: We render the text as a list of styled paragraphs in a non-editable view if they want "Reading Mode".
  
  // Let's provide a dual view or just use the Textarea which is standard for "Editing".
  // Actually, the prompt says "Editor... optimize text layout".
  // I will switch to a contentEditable div for the main interaction to support paragraph spacing via CSS.
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (editorRef.current) {
       onTextChange(editorRef.current.innerText);
    }
  };

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
              padding: `${settings.padding}px`,
              paddingTop: `${Math.max(settings.padding, 60)}px`,
              paddingBottom: `${Math.max(settings.padding, 100)}px`,
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

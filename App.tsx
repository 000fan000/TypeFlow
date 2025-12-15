import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ContentEditableEditor } from './components/Editor';
import { StyleSettings } from './types';
import { DEFAULT_SETTINGS, DEFAULT_TEXT } from './constants';
import { suggestStyles } from './services/geminiService';

const App: React.FC = () => {
  const [text, setText] = useState<string>(DEFAULT_TEXT);
  const [settings, setSettings] = useState<StyleSettings>(DEFAULT_SETTINGS);
  const [isAutoLoading, setIsAutoLoading] = useState(false);

  const handleUpdateSettings = useCallback((newSettings: Partial<StyleSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleAutoOptimize = async () => {
    setIsAutoLoading(true);
    try {
      const suggestions = await suggestStyles(text);
      if (suggestions) {
        handleUpdateSettings(suggestions);
      }
    } catch (error) {
      alert("Failed to optimize layout. Please check your connection.");
    } finally {
      setIsAutoLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
      // Optional: Auto-optimize on upload? Let's leave it manual for now.
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      <ControlPanel 
        settings={settings} 
        onUpdateSettings={handleUpdateSettings} 
        onAutoOptimize={handleAutoOptimize}
        isAutoLoading={isAutoLoading}
        onFileUpload={handleFileUpload}
      />
      <main className="flex-1 relative h-full">
        <ContentEditableEditor 
            text={text} 
            settings={settings} 
            onTextChange={setText} 
        />
        
        {/* Mobile floating action button if needed, but sidebar handles it */}
      </main>
    </div>
  );
};

export default App;

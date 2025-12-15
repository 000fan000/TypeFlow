import React, { useState } from 'react';
import { Settings, Wand2, Type, Layout, Palette, ChevronLeft, ChevronRight, Upload, FileText } from 'lucide-react';
import { StyleSettings, FontFamily } from '../types';
import { FONT_OPTIONS, PRESETS, COLOR_THEMES } from '../constants';

interface ControlPanelProps {
  settings: StyleSettings;
  onUpdateSettings: (newSettings: Partial<StyleSettings>) => void;
  onAutoOptimize: () => void;
  isAutoLoading: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onUpdateSettings,
  onAutoOptimize,
  isAutoLoading,
  onFileUpload,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'style' | 'layout' | 'color'>('style');

  if (collapsed) {
    return (
      <div className="w-16 h-full bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6 transition-all duration-300">
        <button onClick={() => setCollapsed(false)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight size={20} />
        </button>
        <button onClick={onAutoOptimize} disabled={isAutoLoading} className={`p-3 rounded-xl ${isAutoLoading ? 'animate-pulse bg-indigo-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          <Wand2 size={20} />
        </button>
      </div>
    );
  }

  const handleChange = (key: keyof StyleSettings, value: string | number) => {
    onUpdateSettings({ [key]: value });
  };

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden shadow-xl z-20">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
            <span className="bg-indigo-600 p-1.5 rounded-lg">
                <Settings size={18} className="text-white" />
            </span>
            <h2 className="font-bold text-gray-800 text-lg">Editor</h2>
        </div>
        <button onClick={() => setCollapsed(true)} className="text-gray-400 hover:text-gray-600">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Primary Actions */}
      <div className="p-5 space-y-4 border-b border-gray-100">
        <button
          onClick={onAutoOptimize}
          disabled={isAutoLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            isAutoLoading
              ? 'bg-indigo-100 text-indigo-400 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
          }`}
        >
          <Wand2 size={18} className={isAutoLoading ? 'animate-spin' : ''} />
          {isAutoLoading ? 'Optimizing...' : 'Auto Optimize'}
        </button>

        <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <Upload size={16} />
          <span>Upload .txt / .md</span>
          <input type="file" accept=".txt,.md" className="hidden" onChange={onFileUpload} />
        </label>
      </div>

      {/* Tabs */}
      <div className="flex px-2 mt-2">
        {(['style', 'layout', 'color'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex justify-center items-center gap-2 capitalize ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'style' && <Type size={16} />}
            {tab === 'layout' && <Layout size={16} />}
            {tab === 'color' && <Palette size={16} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Controls Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        
        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Font Family</label>
              <select
                value={FONT_OPTIONS.find(f => f.value === settings.fontFamily)?.value || settings.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <optgroup label="English / Universal">
                    {FONT_OPTIONS.filter(f => f.lang === 'en').map((font) => (
                    <option key={font.name} value={font.value}>{font.name}</option>
                    ))}
                </optgroup>
                <optgroup label="Chinese">
                    {FONT_OPTIONS.filter(f => f.lang === 'zh').map((font) => (
                    <option key={font.name} value={font.value}>{font.name}</option>
                    ))}
                </optgroup>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Font Size</label>
                <span>{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="48"
                step="1"
                value={settings.fontSize}
                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Font Weight</label>
              <div className="grid grid-cols-3 gap-2">
                {['300', '400', '700'].map((w) => (
                  <button
                    key={w}
                    onClick={() => handleChange('fontWeight', w)}
                    className={`py-2 text-sm rounded-md border transition-all ${
                      settings.fontWeight === w
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {w === '300' ? 'Light' : w === '400' ? 'Regular' : 'Bold'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-100">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Presets</label>
               <div className="grid grid-cols-2 gap-2">
                   {PRESETS.map(preset => (
                       <button
                           key={preset.name}
                           onClick={() => onUpdateSettings(preset.settings)}
                           className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-left transition-colors"
                       >
                           {preset.name}
                       </button>
                   ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Line Height</label>
                <span>{settings.lineHeight.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => handleChange('lineHeight', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Paragraph Spacing</label>
                <span>{settings.paragraphSpacing}em</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="0.25"
                value={settings.paragraphSpacing}
                onChange={(e) => handleChange('paragraphSpacing', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Letter Spacing</label>
                <span>{settings.letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="-2"
                max="10"
                step="0.5"
                value={settings.letterSpacing}
                onChange={(e) => handleChange('letterSpacing', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
             <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Max Width</label>
                <span>{settings.maxWidth}px</span>
              </div>
              <input
                type="range"
                min="400"
                max="1200"
                step="50"
                value={settings.maxWidth}
                onChange={(e) => handleChange('maxWidth', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
             <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Vertical Margin</label>
                <span>{settings.paddingVertical}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={settings.paddingVertical}
                onChange={(e) => handleChange('paddingVertical', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

             <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <label>Horizontal Margin</label>
                <span>{settings.paddingHorizontal}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={settings.paddingHorizontal}
                onChange={(e) => handleChange('paddingHorizontal', Number(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'color' && (
          <div className="space-y-6">
             <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Color Themes</label>
                <div className="grid grid-cols-3 gap-3">
                    {COLOR_THEMES.map((theme) => (
                        <button
                            key={theme.name}
                            onClick={() => onUpdateSettings({ color: theme.color, backgroundColor: theme.backgroundColor })}
                            className="group relative flex flex-col items-center gap-1.5"
                            title={theme.name}
                        >
                            <div 
                                className="w-full h-12 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-md"
                                style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
                            >
                                <span className="font-bold text-sm">Aa</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">{theme.name}</span>
                        </button>
                    ))}
                </div>
             </div>
             
             <div className="h-px bg-gray-100 my-2"></div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Text Color</label>
              <div className="flex gap-3 items-center">
                 <input
                  type="color"
                  value={settings.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer overflow-hidden p-0"
                />
                <input 
                    type="text" 
                    value={settings.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm uppercase font-mono"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Background</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer overflow-hidden p-0"
                />
                 <input 
                    type="text" 
                    value={settings.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm uppercase font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mt-6">
                <p className="text-xs text-gray-500 mb-2">Contrast Preview</p>
                <div 
                    className="w-full h-16 rounded flex items-center justify-center font-bold text-lg border border-gray-200"
                    style={{ backgroundColor: settings.backgroundColor, color: settings.color }}
                >
                    Aa Bb Cc
                </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
        Powered by Gemini 2.5
      </div>
    </div>
  );
};
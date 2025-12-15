import { StyleSettings, FontFamily, Preset } from './types';

export const DEFAULT_TEXT = `# TypoFlow
## Intelligent Text Styler

Welcome to TypoFlow. Paste your text here or upload a file to get started. 

TypoFlow uses advanced AI to analyze the sentiment and structure of your content, automatically suggesting the best typographic settings for readability and aesthetics. It supports both English and Chinese content perfectly.

### Features
- **Auto Mode**: Let AI decide the best look.
- **Manual Mode**: Fine-tune every detail.
- **Bilingual**: Optimized for mixed language content.

Try pasting a poem, a technical article, or a novel excerpt!`;

export const DEFAULT_SETTINGS: StyleSettings = {
  fontFamily: '"Inter", "Noto Sans SC", sans-serif',
  fontSize: 18,
  lineHeight: 1.6,
  letterSpacing: 0,
  paragraphSpacing: 1.5, // em
  color: '#334155',
  backgroundColor: '#ffffff',
  maxWidth: 800,
  fontWeight: '400',
  paddingHorizontal: 40,
  paddingVertical: 60,
};

export const FONT_OPTIONS: FontFamily[] = [
  // English Oriented
  { name: 'Inter (Sans)', value: '"Inter", "Noto Sans SC", sans-serif', category: 'sans', lang: 'en' },
  { name: 'Merriweather (Serif)', value: '"Merriweather", "Noto Serif SC", serif', category: 'serif', lang: 'en' },
  { name: 'Playfair Display (Display)', value: '"Playfair Display", "Noto Serif SC", serif', category: 'display', lang: 'en' },
  { name: 'Fira Code (Mono)', value: '"Fira Code", monospace', category: 'mono', lang: 'en' },
  { name: 'Dancing Script (Hand)', value: '"Dancing Script", cursive', category: 'display', lang: 'en' },
  
  // Chinese Oriented
  { name: 'Noto Sans SC (Sans)', value: '"Noto Sans SC", sans-serif', category: 'sans', lang: 'zh' },
  { name: 'Noto Serif SC (Serif)', value: '"Noto Serif SC", serif', category: 'serif', lang: 'zh' },
  { name: 'Ma Shan Zheng (Calligraphy)', value: '"Ma Shan Zheng", cursive', category: 'display', lang: 'zh' },
  { name: 'ZCOOL XiaoWei (Serif)', value: '"ZCOOL XiaoWei", serif', category: 'display', lang: 'zh' },
];

export const PRESETS: Preset[] = [
  {
    name: 'Clean Reading',
    settings: { ...DEFAULT_SETTINGS }
  },
  {
    name: 'Night Mode',
    settings: {
      ...DEFAULT_SETTINGS,
      color: '#e2e8f0',
      backgroundColor: '#1e293b',
      fontFamily: '"Inter", "Noto Sans SC", sans-serif',
    }
  },
  {
    name: 'Paperback',
    settings: {
      ...DEFAULT_SETTINGS,
      color: '#2e2e2e',
      backgroundColor: '#fdf6e3',
      fontFamily: '"Merriweather", "Noto Serif SC", serif',
      lineHeight: 1.8,
    }
  },
    {
    name: 'Typewriter',
    settings: {
      ...DEFAULT_SETTINGS,
      color: '#1a1a1a',
      backgroundColor: '#f5f5f5',
      fontFamily: '"Fira Code", monospace',
      fontSize: 16,
      letterSpacing: 0.5,
      paddingHorizontal: 60,
      paddingVertical: 80,
    }
  }
];

export const COLOR_THEMES = [
  { name: 'Classic', color: '#334155', backgroundColor: '#ffffff' },
  { name: 'Dark', color: '#e2e8f0', backgroundColor: '#0f172a' },
  { name: 'Sepia', color: '#433422', backgroundColor: '#f4ecd8' },
  { name: 'Navy', color: '#cbd5e1', backgroundColor: '#1e293b' },
  { name: 'Hacker', color: '#22c55e', backgroundColor: '#0f0f0f' },
  { name: 'Slate', color: '#f8fafc', backgroundColor: '#475569' },
];
export interface StyleSettings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  paragraphSpacing: number;
  color: string;
  backgroundColor: string;
  maxWidth: number;
  fontWeight: string;
  paddingHorizontal: number;
  paddingVertical: number;
}

export interface Preset {
  name: string;
  settings: StyleSettings;
}

export type FontFamily = {
  name: string;
  value: string;
  category: 'sans' | 'serif' | 'mono' | 'display';
  lang: 'en' | 'zh' | 'both';
};
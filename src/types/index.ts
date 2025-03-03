
export type PrivacyLevel = 'anonymous' | 'throwaway';

export type VisibilityOption = 'public' | 'time-limited' | 'self-destruct';

export type ContentCategory = 
  | 'personal' 
  | 'relationships' 
  | 'work' 
  | 'family' 
  | 'dreams' 
  | 'fears' 
  | 'regrets' 
  | 'happiness' 
  | 'other';

export type EmotionTag = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'confused' 
  | 'relieved' 
  | 'anxious' 
  | 'hopeful' 
  | 'guilty' 
  | 'proud' 
  | 'grateful';

export interface Confession {
  id: string;
  content: string;
  createdAt: Date;
  privacyLevel: PrivacyLevel;
  throwawayName?: string;
  category: ContentCategory;
  visibility: VisibilityOption;
  timeLimit?: Date;
  emotionTags: EmotionTag[];
  hasBeenRead?: boolean;
}


import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ContentCategory, EmotionTag } from '@/types';

interface CategoryTagProps {
  category: ContentCategory | EmotionTag;
  variant?: 'category' | 'emotion';
  className?: string;
}

const categoryColors: Record<ContentCategory, string> = {
  personal: 'bg-blue-100 text-blue-800 border-blue-200',
  relationships: 'bg-pink-100 text-pink-800 border-pink-200',
  work: 'bg-amber-100 text-amber-800 border-amber-200',
  family: 'bg-green-100 text-green-800 border-green-200',
  dreams: 'bg-purple-100 text-purple-800 border-purple-200',
  fears: 'bg-red-100 text-red-800 border-red-200',
  regrets: 'bg-orange-100 text-orange-800 border-orange-200',
  happiness: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200'
};

const emotionColors: Record<EmotionTag, string> = {
  happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  sad: 'bg-blue-100 text-blue-800 border-blue-200',
  angry: 'bg-red-100 text-red-800 border-red-200',
  confused: 'bg-purple-100 text-purple-800 border-purple-200',
  relieved: 'bg-green-100 text-green-800 border-green-200',
  anxious: 'bg-orange-100 text-orange-800 border-orange-200',
  hopeful: 'bg-teal-100 text-teal-800 border-teal-200',
  guilty: 'bg-gray-100 text-gray-800 border-gray-200',
  proud: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  grateful: 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

const categoryIcons: Record<ContentCategory, ReactNode> = {
  personal: '👤',
  relationships: '❤️',
  work: '💼',
  family: '👪',
  dreams: '✨',
  fears: '😨',
  regrets: '😔',
  happiness: '😊',
  other: '📝'
};

const emotionIcons: Record<EmotionTag, ReactNode> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  confused: '😕',
  relieved: '😌',
  anxious: '😰',
  hopeful: '🤞',
  guilty: '😳',
  proud: '😎',
  grateful: '🙏'
};

export const CategoryTag = ({ 
  category, 
  variant = 'category',
  className 
}: CategoryTagProps) => {
  const colors = variant === 'category' 
    ? categoryColors[category as ContentCategory] 
    : emotionColors[category as EmotionTag];
  
  const icon = variant === 'category'
    ? categoryIcons[category as ContentCategory]
    : emotionIcons[category as EmotionTag];

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      colors,
      className
    )}>
      <span className="mr-1">{icon}</span>
      {category}
    </span>
  );
};

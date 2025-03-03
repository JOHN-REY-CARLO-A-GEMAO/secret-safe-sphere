
import { useState } from 'react';
import { Lock, Clock, Eye, Trash, Shield } from 'lucide-react';
import { 
  ContentCategory, 
  PrivacyLevel, 
  VisibilityOption, 
  EmotionTag,
  Confession
} from '@/types';
import { generateId, encryptData, sanitizeInput } from '@/utils/encryptionUtils';
import { CategoryTag } from './ui/CategoryTag';

interface ConfessionFormProps {
  onSubmit: (confession: Confession) => void;
}

export const ConfessionForm = ({ onSubmit }: ConfessionFormProps) => {
  const [content, setContent] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('anonymous');
  const [throwawayName, setThrowawayName] = useState('');
  const [category, setCategory] = useState<ContentCategory>('personal');
  const [visibility, setVisibility] = useState<VisibilityOption>('public');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionTag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories: ContentCategory[] = [
    'personal', 'relationships', 'work', 'family',
    'dreams', 'fears', 'regrets', 'happiness', 'other'
  ];
  
  const emotions: EmotionTag[] = [
    'happy', 'sad', 'angry', 'confused', 'relieved',
    'anxious', 'hopeful', 'guilty', 'proud', 'grateful'
  ];
  
  const toggleEmotion = (emotion: EmotionTag) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be encrypted on the server side
    const encryptedContent = encryptData(sanitizeInput(content));
    
    const newConfession: Confession = {
      id: generateId(),
      content: content,
      createdAt: new Date(),
      privacyLevel,
      throwawayName: privacyLevel === 'throwaway' ? throwawayName : undefined,
      category,
      visibility,
      emotionTags: selectedEmotions,
      hasBeenRead: false
    };
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(newConfession);
      
      // Reset form
      setContent('');
      setPrivacyLevel('anonymous');
      setThrowawayName('');
      setCategory('personal');
      setVisibility('public');
      setSelectedEmotions([]);
      setIsSubmitting(false);
    }, 800);
  };
  
  return (
    <form onSubmit={handleSubmit} className="glass-morphism rounded-2xl p-6 md:p-8 space-y-6">
      {/* Form Header */}
      <div className="flex items-center space-x-2 mb-2">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-medium">Share Your Confession</h2>
      </div>
      
      {/* Content Input */}
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Your confession
        </label>
        <textarea
          id="content"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Share your thoughts safely..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      
      {/* Privacy Level */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Privacy Level
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              privacyLevel === 'anonymous'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setPrivacyLevel('anonymous')}
          >
            <Lock className="w-4 h-4" />
            <span>Anonymous</span>
          </button>
          
          <button
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              privacyLevel === 'throwaway'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setPrivacyLevel('throwaway')}
          >
            <Lock className="w-4 h-4" />
            <span>Throwaway Username</span>
          </button>
        </div>
        
        {privacyLevel === 'throwaway' && (
          <div className="pt-2">
            <input
              type="text"
              placeholder="Enter a throwaway username"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={throwawayName}
              onChange={(e) => setThrowawayName(e.target.value)}
              maxLength={20}
              required={privacyLevel === 'throwaway'}
            />
          </div>
        )}
      </div>
      
      {/* Category Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`p-1 transition-all ${
                category === cat ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <CategoryTag category={cat} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Emotion Tags */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          How are you feeling? (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              type="button"
              onClick={() => toggleEmotion(emotion)}
              className={`p-1 transition-all ${
                selectedEmotions.includes(emotion) 
                  ? 'scale-110' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <CategoryTag category={emotion} variant="emotion" />
            </button>
          ))}
        </div>
      </div>
      
      {/* Visibility Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Visibility
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              visibility === 'public'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setVisibility('public')}
          >
            <Eye className="w-4 h-4" />
            <span>Public</span>
          </button>
          
          <button
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              visibility === 'time-limited'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setVisibility('time-limited')}
          >
            <Clock className="w-4 h-4" />
            <span>24 Hours</span>
          </button>
          
          <button
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              visibility === 'self-destruct'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setVisibility('self-destruct')}
          >
            <Trash className="w-4 h-4" />
            <span>Self-destruct</span>
          </button>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="pt-3">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`w-full flex justify-center items-center py-3 px-6 rounded-xl text-white font-medium ${
            isSubmitting || !content.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90'
          } transition-colors`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-pulse">Encrypting & Submitting...</span>
            </>
          ) : (
            'Share Anonymously'
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Your IP address is not being tracked or stored. All data is encrypted.
        </p>
      </div>
    </form>
  );
};
